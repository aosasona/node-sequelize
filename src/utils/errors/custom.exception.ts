export default class CustomException extends Error {
  public status: number;
  public message: string;

  constructor(message?: string, status: number = 500) {
	super(message);
	this.status = status || 500;
	this.message = message || "Internal Server Error";
  }
}