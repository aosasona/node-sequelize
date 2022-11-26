import express, { Express, Request, Response, NextFunction } from "express";
import cors from "cors";
import {Sequelize} from "sequelize";
import BaseRoute from "./routes/base.route";
import CustomException from "./utils/errors/custom.exception";
import ResponseUtil from "./utils/handlers/response.util";

export default class App {
  private readonly app: Express;
  private readonly routes: BaseRoute[] = [];
  private readonly database: Sequelize | undefined = undefined;

  constructor(routes?: BaseRoute[]) {
	this.app = express();
	this.routes = routes || [];
	try {
	  this.initApp();
	} catch (err: any) {
	  console.error(`Error initializing server: ${err.message}`);
	}
  }

  private initApp(): void {
	this.parseEnv();
	this.initMiddlewares();
	this.initRoutes();
	this.handleErrors();
  }

  private initMiddlewares(): void {
	this.app.use(cors());
	this.app.use(express.json());
	this.app.use(express.urlencoded({ extended: true }));
	this.app.disable("x-powered-by");
  }

  private initRoutes(): void {
	this.routes.forEach((route) => {
	  this.app.use(`/v1/${route.path}`, route.router);
	});
	this.app.get("/status", (req: Request, res: Response) => ResponseUtil.send(res, { status: 200, message: "OK"}));
	this.app.use("*", (req: Request, res: Response) => ResponseUtil.send(res, { status: 404, message: "Not Found" }));
  }


  private handleErrors(): void {
	this.app.use((err: Error, req: Request, res:Response, next: NextFunction) => {
	  if(err instanceof CustomException) {
		return ResponseUtil.send(res, {
		  status: err.status,
		  message: err.message,
		})
	  }
	  console.error(err);
	  return ResponseUtil.send(res, {
		status: 500,
		message: this.isDev() ? "Internal Server Error" : err.message,
	  })
	});
  }

  private parseEnv(): void {
	require("dotenv").config();
  }

  private isDev(): boolean {
	return process.env.NODE_ENV === "development";
  }

  public getServer(): Express {
	return this.app;
  }
}