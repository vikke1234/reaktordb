const express = require("express");
const morgan = require("morgan");
const axios = require("axios");

require("dotenv").config();

const beanies = require("./routes/beanies")
const facemasks = require("./routes/facemasks")
const gloves = require("./routes/gloves")

const app = express();
const redis_port = 6379;

client.on("error", (err) => {
  console.error(err);
});

app.use(morgan("dev"));
app.use("/api", beanies);
app.use("/api", facemasks);
app.use("/api", gloves);

app.get("/", (request, response) => {
  axios.all()
});

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Listening on: ${PORT}`);
});
