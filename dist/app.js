"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
class App {
    constructor(routes) {
        this.routes = [];
        this.app = (0, express_1.default)();
        this.routes = routes || [];
        this.initMiddlewares();
    }
    initMiddlewares() {
        this.app.use(express_1.default.json());
        this.app.use(express_1.default.urlencoded({ extended: true }));
    }
    initRoutes() {
        this.routes.forEach((route) => {
            this.app.use(route.path, route.router);
        });
    }
    getServer() {
        return this.app;
    }
}
exports.default = App;
