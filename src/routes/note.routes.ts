import express from "express";
import BaseController from "../controllers/base.controller";
import NoteControllers from "../controllers/note.controllers";
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
	this.router.get("/", this.controllers.getAllNotes);
  }
}