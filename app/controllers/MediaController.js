const formidalbe = require("formidable");
const mongoose = require("mongoose");
const Video = require("../models/video");
const config = require("../config/config");
const connect = require("../database/Database");

class MediaController {
  static gfs;
  constructor() {
    connect.once("open", () => {
      this.gfs = new mongoose.mongo.GridFSBucket(connect.db, {
        bucketName: "uploads",
      });
    });
  }

  index = (req, res) => {
    res.json({ message: "Welcome to Media Controller" });
  };

  store = (req, res) => {
    const form = formidalbe({ multiples: true });
    form.parse(req, (err, fields, files) => {
      if (err) {
        console.error(err);
      }
      res.json({ fields, files });
    });
    // res.json({ message: "Stored media done" });
  };

  uplaod = async (req, res, next) => {
    try {
      const video = await Video.findOne({ filename: req.body.filename });
      if (video) {
        res.status(200).json({
          success: false,
          message: "Image already exists",
        });
      }

      const newVideo = new Video({
        filename: req.file.filename,
        fileId: req.file.id,
      });

      const nvideo = await newVideo.save();

      res.status(200).json({
        success: true,
        message: nvideo,
      });
    } catch (error) {
      res.status(500).json({ error });
    }
  };
}

module.exports = new MediaController();
