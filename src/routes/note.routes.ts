import express from "express";
import BaseRoute from "./base.route";

export default class NoteRoutes extends BaseRoute {

  public path: string = "notes";
  public router = express.Router();

  constructor() {
	super();
	this.initRoutes();
  }

  private initRoutes(): void {
	this.router.get("/", (req, res) => {
	  res.send("Hello World");
	});
  }
}