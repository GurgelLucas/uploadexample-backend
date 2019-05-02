const routes = require("express").Router();
const multer = require("multer");
const multerConfig = require("./config/multer");

// multer.single = '1 arquivo',mais de um arquivo multer.array
//utilizaremos o single para ser realista quando cada arquivo estiver carregendo.

//o parametro multer é middleware.
const Post = require("./models/Post");

routes.post("/posts", multer(multerConfig).single("file"), async (req, res) => {
  const { originalname: name, size, filename: key } = req.file;

  const post = await Post.create({
    name,
    size,
    key,
    url: ""
  });

  return res.json(post);
});

module.exports = routes;
