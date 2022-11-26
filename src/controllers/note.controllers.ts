import {NextFunction, Request, Response} from "express";
import Notes from "../models/note.model";
import rules from "../rules/note.rules";
import CustomException from "../utils/errors/custom.exception";
import ResponseUtil from "../utils/handlers/response.util";
import Validator from "../utils/validator.util";
import BaseController from "./base.controller";

export default class NoteControllers implements BaseController {

	public static async createNote(req: Request, res: Response, next: NextFunction): Promise<void> {
		try {
			const {user} = req;

			const validationError = await Validator.validate({data: req.body, rules: rules.create, returnFirst: true});
			if (validationError) throw new CustomException(validationError, 400);


			const {title, content} = req.body;
			const note = await Notes.create({title, content, userId: user});
			if (!note) throw new CustomException("Something went wrong!", 500);

			return ResponseUtil.send(res, {status: 201, data: note});
		}
		catch (err: unknown) {
			next(err);
		}
	}

	public static async getNoteById(req: Request, res: Response, next: NextFunction): Promise<void> {
		try {
			const {user} = req;
			const {id} = req.params;
			if (isNaN(Number(id))) throw new CustomException("Invalid ID!", 400);

			const note = await Notes.findByPk(id) as any;
			if (!note) throw new CustomException("Note not found!", 404);

			if (note.userId !== user) throw new CustomException("You are not authorized to view this note!", 401);

			return ResponseUtil.send(res, {status: 200, data: note});
		}
		catch (err: unknown) {
			next(err);
		}
	}

	public static async getAllNotes(req: Request, res: Response, next: NextFunction): Promise<void> {
		try {
			const {user} = req;
			const notes = await Notes.findAll({where: {userId: user}});
			if (!notes) throw new CustomException("No notes found!", 404);
			return ResponseUtil.send(res, {status: 200, data: notes});
		}
		catch (err: unknown) {
			next(err);
		}
	}

	public static async updateNoteById(req: Request, res: Response, next: NextFunction): Promise<void> {
		try {
			const {user} = req;
			const {id} = req.params;
			if (isNaN(Number(id))) throw new CustomException("Invalid ID!", 400);

			const note = await Notes.findByPk(id) as any;
			if (!note) throw new CustomException("Note not found!", 404);

			if (note.userId !== user) throw new CustomException("You are not authorized to update this note!", 401);

			let {title, content} = req.body;
			if (!title && !content) throw new CustomException("Nothing to update!", 400);

			title = title || note.title;
			content = content || note.content;
			const updatedNote = await Notes.update({title, content}, {where: {id}});
			if (!updatedNote) throw new CustomException("Something went wrong!", 500);

			return ResponseUtil.send(res, {status: 200, data: {id, title, content}});
		}
		catch (err: unknown) {
			next(err);
		}
	}

	public static async deleteNoteById(req: Request, res: Response, next: NextFunction): Promise<void> {
		try {
			const {user} = req;
			const {id} = req.params;
			if (isNaN(Number(id))) throw new CustomException("Invalid ID!", 400);

			const note = await Notes.findByPk(id) as any;
			if (!note) throw new CustomException("Note not found!", 404);

			if (note.userId !== user) throw new CustomException("You are not authorized to delete this note!", 401);

			const deletedNote = await Notes.destroy({where: {id}});
			if (!deletedNote) throw new CustomException("Something went wrong!", 500);

			return ResponseUtil.send(res, {status: 200, data: {id}});
		}
		catch (err: unknown) {
			next(err);
		}
	}
}