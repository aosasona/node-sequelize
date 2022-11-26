const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

export default class AuthUtil {
	public static async hashPassword(password: string): Promise<string> {
		return await bcrypt.hash(password, 10);
	}

	public static async comparePassword(password: string, hash: string): Promise<boolean> {
		return await bcrypt.compare(password, hash);
	}

	public static async generateToken(payload: string): Promise<string> {
		return await jwt.sign({id: payload}, process.env.JWT_SECRET, {expiresIn: process.env.JWT_EXPIRES_IN});
	}

	public static async verifyToken(token: string): Promise<{ id: string }> {
		return await jwt.verify(token, process.env.JWT_SECRET);
	}
}