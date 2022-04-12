const formidalbe = require("formidable");

class MediaController {
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
}

module.exports = new MediaController();
