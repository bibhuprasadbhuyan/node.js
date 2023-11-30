const express = require("express");
const router = require("./routers/users");

const app = express();

app.use(express.json());

app.use(router);

app.listen("3000", () => {
  console.log("server listing at port 3000");
});
