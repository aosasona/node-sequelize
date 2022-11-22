import {Response, Request, NextFunction} from "express";
import BaseController from "./base.controller";

export default class NoteControllers extends BaseController{
	public static async getAllNotes(req: Request, res: Response, next: NextFunction): Promise<void> {

	}
}