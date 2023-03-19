const mongoose = require("mongoose");

const app = require("./app");

const { DB_HOST, PORT = 4444 } = process.env;

mongoose.set("strictQuery", true);

mongoose
  .connect(DB_HOST)
  .then(() => {
    app.listen(PORT);
    console.log("connected sucess");
  })
  .catch((err) => {
    console.log(err);
    process.exit(1);
  });
