require("dotenv").config();

const { createApp } = require("./app");
const { appDataSource } = require("./models/data-source");

const startServer = async () => {
  const app = createApp();
  const PORT = process.env.PORT;

  await appDataSource.initialize();
  console.log("database has been initialized!");

  app.listen(PORT, () => {
    console.log(`Listening on Port ${PORT}`);
  });
};

startServer();
