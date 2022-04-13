const express = require("express");
const cors = require("cors");
// const bodyParser = require("body-parser");
const morgan = require("morgan");
const helmet = require("helmet");
const methodOverride = require("method-override");

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
    // this.app.use(bodyParser.json());
    this.app.use(express.json());
    this.app.use(cors());
    this.app.use(morgan("dev"));
    this.app.use(helmet());
  }
}

const app = new App().app;
const port = 3001;

app.listen(port, () => console.info("server started"));
