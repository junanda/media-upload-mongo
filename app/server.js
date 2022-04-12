const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");

const media = require("./routes/MediaRoute");

class App {
  static app;
  constructor() {
    this.app = express();
    this.plugin();
    this.routes();
  }

  routes() {
    this.app.route("/", (req, res) => {
      res.send("welcome to start project");
    });

    this.app.use("/api/v1/media", media);
  }

  plugin() {
    this.app.use(bodyParser.json());
    this.app.use(cors());
  }
}

const app = new App().app;
const port = 3001;

app.listen(port, () => console.info("server started"));
