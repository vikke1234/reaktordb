const express = require("express");
const { getProducts } = require("../util/fetchdata");

const router = express.Router();

router.get("/gloves", async (req, res) => {
  const data = await getProducts("gloves");
  res.status(200).send(data);
});

router.get("/gloves/:id", (req, res) => {});

module.exports = router;