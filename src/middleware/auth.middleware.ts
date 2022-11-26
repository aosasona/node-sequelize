import {NextFunction, Request, Response} from 'express';
import User from "../models/user.model";
import AuthUtil from "../utils/auth.util";
import CustomException from "../utils/errors/custom.exception";

export default class AuthMiddleware {
	public static async verifyToken(req: Request, res: Response, next: NextFunction): Promise<void> {
		try {
			const authHeader = req.headers.authorization;
			if (!authHeader) throw new CustomException("No token provided!", 401);

			if (!authHeader.startsWith("Bearer ")) throw new CustomException("Invalid token!", 401);

			const token = authHeader.split(" ")[1];

			if (!token) throw new CustomException("Invalid token!", 401);

			const decoded = await AuthUtil.verifyToken(token);
			if (!decoded) throw new CustomException("Invalid token!", 401);

			const user = await User.findByPk(decoded.id) as any;
			if (!user) throw new CustomException("Invalid token!", 401);

			req.user = user.id as number;
			next();
		}
		catch (err: unknown) {
			next(err);
		}
	}
}