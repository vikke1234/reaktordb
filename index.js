const express = require("express");
const morgan = require("morgan");
const axios = require("axios");
const cors = require("cors");
const { getProducts, getAvailability } = require("./util/fetchdata");
require("dotenv").config();

const beanies = require("./routes/beanies");
const facemasks = require("./routes/facemasks");
const gloves = require("./routes/gloves");

const app = express();

app.use(morgan("dev"));
app.use(cors());
app.use("/api", beanies);
app.use("/api", facemasks);
app.use("/api", gloves);

app.get("/", async (req, res) => {
  /* 
  since the initial load time can be a little longer we'll populate
  the caches then 
  */
  const products = await Promise.all([
    getProducts("beanies"),
    getProducts("gloves"),
    getProducts("facemasks")
  ]);

  // let manufactuers = new Set();
  // products.map(product => product.map(item => {
  //   manufactuers.add(item.manufacturer);
  // }));

  /* TODO: 
  figure out how to optimize availability data
  though it may be a good idea to use clusters and
  fetch it separately
  */
  // let avail = [];
  // let response = [];
  // for (let manufacturer of manufactuers) {
  //   avail.push(getAvailability(manufacturer));
  // }
  // let avail_data = await Promise.all(avail);
  
  res.status(200).send(response);
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Listening on: ${PORT}`);
});
