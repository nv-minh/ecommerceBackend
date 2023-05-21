const app = require("./src/app");
require("dotenv").config();
const configs = require("./src/configs/config.mongodb");
const PORT = configs.app.port;
const server = app.listen(PORT, () => {
  console.log(`WSV eCommerce start with port: ${PORT}`);
});

process.on("SIGINT", () => {
  server.close(() => {
    console.log(`Exit Server Express`);
    process.exit(0);
  });
});
