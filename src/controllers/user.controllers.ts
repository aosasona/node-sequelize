import {NextFunction, Request, Response} from 'express';
import User from "../models/user.model";
import rules from "../rules/user.rules";
import AuthUtil from "../utils/auth.util";
import CustomException from "../utils/errors/custom.exception";
import ResponseUtil from "../utils/handlers/response.util";
import Validator from "../utils/validator.util";
import BaseController from "./base.controller";


export default class UserControllers extends BaseController {
	public static async createUser(req: Request, res: Response, next: NextFunction): Promise<void> {
		try {
			const validationError = await Validator.validate({data: req?.body, rules: rules.signup, returnFirst: true});
			if (validationError) throw new CustomException(validationError, 400);

			let {first_name, last_name, email, password} = req.body;
			const emailExists = (await User.findAndCountAll({where: {email}})).count > 0;
			if (emailExists) throw new CustomException("Email already exists!", 400);

			password = await AuthUtil.hashPassword(password);

			const user = await User.create({
				firstName: first_name.toLowerCase(),
				lastName: last_name.toLowerCase(),
				email: email.toLowerCase(),
				password,
			}) as any;
			if (!user) throw new CustomException("Something went wrong!", 500);

			return ResponseUtil.send(res, {status: 201, data: {id: user.id, first_name, last_name, email}});
		}
		catch (err: unknown) {
			next(err);
		}
	}

	public static async login(req: Request, res: Response, next: NextFunction): Promise<void> {
		try {
			const validationError = await Validator.validate({data: req?.body, rules: rules.login, returnFirst: true});
			if (validationError) throw new CustomException(validationError, 400);

			let {email, password} = req.body;
			const user = await User.findOne({where: {email: email.toLowerCase()}}) as any;
			if (!user) throw new CustomException("Invalid credentials!", 400);

			const isMatch = await AuthUtil.comparePassword(password, user.password);
			if (!isMatch) throw new CustomException("Invalid credentials!", 400);

			const token = await AuthUtil.generateToken(user.id);
			if (!token) throw new CustomException("Something went wrong!", 500);

			return ResponseUtil.send(res, {status: 200, data: {token, user: {name: `${user.firstName} ${user.lastName}`, email: user.email}}});
		}
		catch (err: unknown) {
			next(err);
		}
	}
}