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

  index = async (req, res, next) => {
    try {
      const dataAll = await Video.find({});
      res.status(200).json({ dataAll });
    } catch (error) {
      res.status(500).json({ error });
    }
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

  getFiles = async (req, res) => {
    const idFile = req.params.id;
    try {
      const files = await this.gfs
        .find(new mongoose.Types.ObjectId(idFile))
        .toArray();
      if (!files || files.length === 0) {
        res.status(200).json({
          success: false,
          message: "No files available",
        });
      }

      res.status(200).json({
        success: true,
        data: files,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: error,
      });
    }
  };

  show = async (req, res) => {
    const { filename } = req.params;
    const range = req.headers.range;
    try {
      const video = await this.gfs.find({ filename: filename }).toArray();
      if (!video[0] || video.length === 0) {
        res.status(200).json({
          success: false,
          message: "no files available",
        });
      }

      const videoSize = video[0].length;
      const start = Number(range.replace(/\D/g, ""));
      const end = videoSize - 1;

      const contentLength = end - start + 1;
      const headers = {
        "Content-Range": `bytes ${start}-${end}/${videoSize}`,
        "Accept-Ranges": "bytes",
        "Content-Length": contentLength,
        "Content-Type": video[0].contentType,
      };

      res.writeHead(206, headers);

      const stream = this.gfs.openDownloadStreamByName(filename, {
        start,
        end,
      });
      stream.pipe(res);
    } catch (error) {
      res.status(500).json({ error });
    }
  };

  delete = async (req, res) => {
    const idfile = req.params.id;
  };
}

module.exports = new MediaController();
