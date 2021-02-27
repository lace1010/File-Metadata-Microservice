const express = require("express");
const cors = require("cors");
require("dotenv").config();

// Got these two lines from https://expressjs.com/en/resources/middleware/multer.html
const multer = require("multer");
const upload = multer({ dest: "uploads/" });

const app = express();

app.use(cors());
app.use("/public", express.static(process.cwd() + "/public"));

app.get("/", (req, res) => {
  res.sendFile(process.cwd() + "/views/index.html");
});

// Bc we are only uploading one file we use upload.single("") string inside that we are uploading must be same as name in html
app.post("/api/fileanalyse", upload.single("upfile"), (req, res) => {
  if (req.file) {
    console.log(req.file);
    let responseObject = {
      name: req.file.originalname,
      type: req.file.mimetype,
      size: req.file.size,
    };
    res.json(responseObject);
  } else return res.json({ error: "No file was selected for upload" });
});

const port = process.env.PORT || 3000;
app.listen(port, function () {
  console.log("Your app is listening on port " + port);
});
