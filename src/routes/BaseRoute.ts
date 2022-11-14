import { Router} from 'express';

export default abstract class BaseRoute {
  public abstract path: string;
  public abstract router: Router;
}