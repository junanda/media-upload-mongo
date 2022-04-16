const BaseRouter = require("./BaseRoute");
const upload = require("../middlewares/upload");
const mediaController = require("../controllers/MediaController");

class MediaRoute extends BaseRouter {
  routes() {
    this.router.get("/", mediaController.index);
    this.router.post("/", mediaController.store);
    this.router.post("/upload", upload.single("video"), mediaController.uplaod);
    this.router.get("/videos/:id", mediaController.getFiles);
    this.router.get("/video/play/:filename", mediaController.show);
  }
}

module.exports = new MediaRoute().router;
