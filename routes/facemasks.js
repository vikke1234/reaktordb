const express = require("express");
const { getProducts, getAvailability } = require("../util/fetchdata");

const router = express.Router();

router.get("/facemasks", (req, res) => {
  return getProducts("facemasks");
});

router.get("/facemasks/:id", (req, res) => {
  return getProducts("facemasks").map((mask) => mask == req.params.id);
});

module.exports = router;
