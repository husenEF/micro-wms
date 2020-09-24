require("dotenv").config();

const express = require("express");
const cors = require("cors");
// untuk upload ke cloudinary
const fileUpload = require("express-fileupload");

const app = express();

const port = process.env.PORT || 3000;

const userRoute = require("./routes/user");
// const productRoute = require("./routes/product");
// const productInRoute = require("./routes/product_in");
const authRoute = require("./routes/auth");
// const productOutRoute = require("./routes/product_out");
// const reportRoute = require("./routes/print");
const auth = require("./middleware/AuthMiddleware");
const taskScheduler = require("./helpers/taskScheduler");

const whitelist = [
  "http://localhost:3000",
  "http://localhost:8080",
  "http://localhost:8081",
  "http://localhost",
  /\.heroku\.com$/,
];

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

//cors
app.use(cors());
// app.use(
//   cors({
//     origin: function (origin, callback) {
//       console.log({ origin, ada: whitelist.indexOf(origin) });
//       if (whitelist.indexOf(origin) !== -1) {
//         callback(null, true);
//       } else {
//         callback(new Error("Not allowed by CORS"));
//       }
//     },
//   })
// );

// untuk cloudinary
app.use(
  fileUpload({
    useTempFiles: true,
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/hello", (req, res) => {
  res.json({ hello: "world" });
});
app.use("/", auth, userRoute);
// app.use("product", auth, productRoute);
// app.use("in", auth, productInRoute);
app.use("auth", authRoute);
// app.use("/api/v1/out", auth, productOutRoute);
// app.use("/api/v1/print", auth, reportRoute);

taskScheduler();

app.listen(port, () => console.log("Listened on port " + port));
