const expres = require("express");
const errorHandler = require("./middlewire/errorhandler");
const connectDb = require("./config/dbCOnfig");
const dotenv = require("dotenv").config();
connectDb();
const app = expres();
app.use(expres.json());
app.use("/api/contacts", require("./Routes/contactRoutes"));
app.use(errorHandler);

port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`server listnig at port http://localhost:${port}/`);
});
