class RouteInterface {
  constructor() {
    if (!this.routes) {
      throw new Error("Router class must have route");
    }
  }
}

module.exports = RouteInterface;
