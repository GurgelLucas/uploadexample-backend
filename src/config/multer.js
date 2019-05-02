const multer = require("multer");
const path = require("path");
const crypto = require("crypto");

module.exports = {
  dest: path.resolve(__dirname, "..", "..", "tmp", "uploads"),
  storage: multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, path.resolve(__dirname, "..", "..", "tmp", "uploads"));
    },
    //Cria um hash para cada img ter um nome único
    filename: (req, file, cb) => {
      //Metodo que gera o hash
      crypto.randomBytes(16, (err, hash) => {
        if (err) cb(err);

        //Nome do arquivo que ficará salvo.
        const fileName = `${hash.toString("hex")}-${file.originalname}`;

        cb(null, fileName);
      });
    }
  }),
  //Configurações de importação de arquivos: tamanho, quantidade e etc.
  limits: {
    fileSize: 2 * 1024 * 1024
  },
  //Formatos de imagens.
  fileFilter: (req, file, cb) => {
    const allowedMines = [
      "image/jpeg",
      "image/pjpeg",
      "image/png",
      "image/gif"
    ];
    if (allowedMines.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error("Invalid file type."));
    }
  }
};
