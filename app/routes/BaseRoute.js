const { Router } = require("express");
const RouteInterface = require("./RouteInterface");

class BaseRouter extends RouteInterface {
  constructor() {
    super();
    this.router = Router();
    this.routes();
  }
}

module.exports = BaseRouter;
