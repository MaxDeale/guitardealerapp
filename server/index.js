const express = require("express");
const app = express();
const path = require("path");
const cors = require("cors");

const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");

const config = require("./config/key");

const mongoose = require("mongoose");
const connect = mongoose
  .connect(
    "mongodb+srv://max123:max123@cluster0-nzqdd.mongodb.net/test?retryWrites=true&w=majority",
    { useNewUrlParser: true, useUnifiedTopology: true }
  )
  .then(() => console.log("MongoDB Connected..."))
  .catch((err) => console.log(err));

app.use(cors());

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cookieParser());

app.use("/api/users", require("./routes/users"));
app.use("/api/product", require("./routes/product"));

app.use("/uploads", express.static("uploads"));

app.get("/", (req, res) => {
  res.send("HELLO BACKEND");
});

// Serve static assets if in production
if (process.env.NODE_ENV === "production") {
  // Set static folder for client build folder
  app.use(express.static("client/build"));

  //  setting index.html as default page to load
  app.use("*", express.static(path.join(__dirname, "client", "build")));
}
//running saerver on port 5000
const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log(`Server Running at ${port}`);
});
