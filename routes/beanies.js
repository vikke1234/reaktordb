const express = require("express");
const { getProducts } = require("../util/fetchdata");

const router = express.Router();

router.get("/beanies", async (req, res) => {
  const data = await getProducts("beanies");
  res.status(200).send(data);
})

router.get("/beanies/:id", (req, res) => {})

module.exports = router;