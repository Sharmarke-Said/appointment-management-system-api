const mongoose = require("mongoose");

function MongoDb() {
  mongoose
    .connect(
      // 'mongodb+srv://ajb1434:nkKbBiDV6ByVow4Y@cluster0.bmydzw6.mongodb.net/AppointmentSystem'
      "mongodb+srv://asadhalane:vGz8NzRuIkNsIP65@cluster0.cd3i6.mongodb.net/appointment-ms-db"
    )
    .then(
      console.log("Database connection established successfully.")
    )
    .catch((err) => console.log(err));
}

module.exports = {
  MongoDb,
};
