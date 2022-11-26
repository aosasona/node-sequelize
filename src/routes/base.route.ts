import { Router} from 'express';
import BaseController from "../controllers/base.controller";

export default abstract class BaseRoute {
  public abstract path: string;
  public abstract router: Router;
  protected controllers?: BaseController;
}