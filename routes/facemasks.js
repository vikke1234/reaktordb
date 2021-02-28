const express = require("express");
const { getProducts, getAvailability } = require("../util/fetchdata");

const router = express.Router();

router.get("/facemasks", async (req, res) => {
  const data = await getProducts("facemasks");
  res.status(200).end(data);
});

router.get("/facemasks/:id", (req, res) => {
  getProducts("facemasks").map((mask) => mask == req.params.id);
});

module.exports = router;
