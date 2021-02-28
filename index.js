const express = require("express");
const morgan = require("morgan");
const axios = require("axios");
const cors = require("cors");
const { getProducts, getAvailability } = require("./util/fetchdata");
require("dotenv").config();

const beanies = require("./routes/beanies");
const facemasks = require("./routes/facemasks");
const gloves = require("./routes/gloves");
const avail = require("./routes/avail");

const app = express();

app.use(cors());
app.use(morgan("dev"));

app.use("/api", beanies);
app.use("/api", facemasks);
app.use("/api", gloves);
app.use("/api", avail);

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Listening on: ${PORT}`);
});
