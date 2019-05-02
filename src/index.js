const express = require("express");
const morgan = require("morgan");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();

/**Database setup */
mongoose.connect("mongodb://localhost:27017/upload", {
  useNewUrlParser: true
});

app.use(cors()); //deixando em branco está permitindo para qualquer cliente acessar a aplication
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan("dev"));

app.use(require("./routes"));

app.listen(process.env.PORT || 3000);
