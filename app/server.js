const express = require("express");

class App {
  static app;
  constructor() {
    this.app = express();
    this.routes();
  }

  routes() {
    this.app.get("/", (req, res) => {
      res.send("welcome to start project");
    });
  }
}

const app = new App().app;
const port = 3001;

app.listen(port, () => console.info("server started"));
