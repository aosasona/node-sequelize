import {Response, Request, NextFunction} from "express";
import CustomException from "../utils/errors/custom.exception";
import ResponseUtil from "../utils/handlers/response.util";
import BaseController from "./base.controller";
import Notes from  "../models/note.model";

export default class NoteControllers implements BaseController {

  public static async createNote(req: Request, res: Response, next: NextFunction): Promise<void> {}

  public static async getNoteById(req: Request, res: Response, next: NextFunction): Promise<void> {
		try {
		  const { id } = req.params;
		  if (isNaN(Number(id))) throw new CustomException("Invalid ID!", 400);
		  const note = await Notes.findByPk(id);
		  if (!note) throw new CustomException("Note not found!", 404);
		  return ResponseUtil.send(res, { status: 200, data: note });
		} catch (err: unknown) {
			next(err);
		}
	}

	public static async getAllNotes(req: Request, res: Response, next: NextFunction): Promise<void> {
		try {
		  const notes = await Notes.findAll();
		  if (!notes) throw new CustomException("No notes found!", 404);
		  return ResponseUtil.send(res, { status: 200, data: notes });
		} catch (err: unknown) {
			next(err);
		}
	}
}