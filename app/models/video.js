const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const VideoSchema = new Schema({
  filename: {
    required: true,
    type: String,
  },
  fileId: {
    required: true,
    type: String,
  },
  createdAt: {
    default: Date.now(),
    type: Date,
  },
});

const Video = mongoose.model("Video", VideoSchema);

module.exports = Video;
