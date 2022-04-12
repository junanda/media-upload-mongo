const BaseRouter = require("./BaseRoute");

const mediaController = require("../controllers/MediaController");

class MediaRoute extends BaseRouter {
  routes() {
    this.router.get("/", mediaController.index);
    this.router.post("/", mediaController.store);
  }
}

module.exports = new MediaRoute().router;
