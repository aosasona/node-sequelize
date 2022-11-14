import express, { Express } from "express";
import BaseRoute from "./routes/BaseRoute";

export default class App {
  private readonly app: Express;
  private readonly routes: BaseRoute[] = [];

  constructor(routes?: BaseRoute[]) {
	this.app = express();
	this.routes = routes || [];
	this.initMiddlewares();
  }

  private initMiddlewares(): void {
	this.app.use(express.json());
	this.app.use(express.urlencoded({ extended: true }));
  }

  private initRoutes(): void {
	this.routes.forEach((route) => {
	  this.app.use(route.path, route.router);
	});
  }

  public getServer(): Express {
	return this.app;
  }

}