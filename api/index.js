const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv")

const problemRoute = require("./routes/problem")

dotenv.config();

mongoose
  .connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
   
  })
  .then(() => console.log("DB Connection Successfull"))
  .catch((err) => {
    console.error(err);
  });

  app.use(express.json());

  app.use("/api/problem", problemRoute);

app.listen(8800, ()=>{
    console.log("Backend server is running!");
})