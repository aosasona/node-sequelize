import express from "express";
import NoteControllers from "../controllers/note.controllers";
import AuthMiddleware from "../middleware/auth.middleware";
import BaseRoute from "./base.route";

export default class NoteRoutes extends BaseRoute {

	public path: string = "notes";
	public router = express.Router();
	protected controllers = NoteControllers;

	constructor() {
		super();
		this.initRoutes();
	}

	private initRoutes(): void {
		this.router.get("/", AuthMiddleware.verifyToken, this.controllers.getAllNotes);
		this.router.get("/:id", AuthMiddleware.verifyToken, this.controllers.getNoteById);
		this.router.post("/", AuthMiddleware.verifyToken, this.controllers.createNote);
	}
}