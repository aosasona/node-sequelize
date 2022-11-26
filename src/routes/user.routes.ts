import express from "express";
import UserControllers from "../controllers/user.controllers";
import BaseRoute from "./base.route";

export default class UserRoutes extends BaseRoute {

	public path: string = "users";
	public router = express.Router();
	protected controllers = UserControllers;

	constructor() {
		super();
		this.initRoutes();
	}

	private initRoutes(): void {
		this.router.post("/", this.controllers.createUser);
	}
}