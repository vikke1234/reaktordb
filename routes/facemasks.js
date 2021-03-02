const express = require("express");
const { getProducts, getAvailability } = require("../util/fetchdata");

const router = express.Router();

router.get("/facemasks", async (req, res) => {
  const data = await getProducts("facemasks");
  res.status(200).send(data);
});

module.exports = router;
