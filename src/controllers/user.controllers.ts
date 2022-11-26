import {NextFunction, Request, Response} from 'express';
import constraints from "../rules/user.rules";
import CustomException from "../utils/errors/custom.exception";
import Validator from "../utils/validator.util";
import BaseController from "./base.controller";


export default class UserControllers extends BaseController {
	public static async createUser(req: Request, res: Response, next: NextFunction): Promise<void> {
		try {
			const validationError = await Validator.validate({data: req?.body, rules: constraints.signup, returnFirst: true});
			if (!!validationError) {
				throw new CustomException(validationError, 400);
			}


		}
		catch (err: unknown) {
			next(err);
		}
	}
}