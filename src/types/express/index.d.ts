import {Sequelize} from "sequelize";

declare global {
  namespace Express {
	interface Request {
	  db: Sequelize;
	}
  }
}