export default {} // TS doesn't like empty files

declare global {
	namespace Express {
		interface Request {
			user: number;
		}
	}
}