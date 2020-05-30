const mongoose = require("mongoose");
require("dotenv").config({ path: "variables.env" });

const conectatDB = async () => {
  try {
    await mongoose.connect(process.env.DB_MONGO, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
      useCreateIndex: true
    });
    console.log("db conectada.");
  } catch (error) {
    console.log('hubo un error', error);
    process.exit(1);
  }
};

module.exports = conectatDB;
