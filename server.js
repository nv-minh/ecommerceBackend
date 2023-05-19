const app = require("./src/app");
require("dotenv").config();

const server = app.listen(() => {
  console.log(`WSV eCommerce start with port: ${process.env.PORT}`);
});

process.on("SIGINT", () => {
  server.close(() => console.log(`Exit Server Express`));
});
