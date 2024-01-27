import dotenv from "dotenv";
import connectDB from "./DB/index.js";

dotenv.config({
  path: "./.env",
});

connectDB();

// Uncomment the following lines when you are ready to use Express
// import express from "express";
// const app = express();

// (async () => {
//   try {
//     // Add the necessary imports for mongoose and your DB_NAME constant
//     // const mongoose = require("mongoose");
//     // import { DB_NAME } from "./Constant.js";

//     await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`, {
//       useNewUrlParser: true,
//       useUnifiedTopology: true,
//     });

//     app.listen(process.env.PORT, () => {
//       console.log(`App is listening on port ${process.env.PORT}`);
//     });
//   } catch (error) {
//     console.error("Error", error);
//     throw error;
//   }
// })();
