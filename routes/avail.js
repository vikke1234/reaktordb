const { getAvailability } = require("../util/fetchdata");
const express = require("express");

const router = express.Router();

router.get("/availability/:manufacturer", async (req, res) => {
  let data = [];
  let timeout = 0;

  while (!data.length) {
    data = await getAvailability(req.params.manufacturer);

    if (timeout >= 3) {
      break;
    }
    timeout++;
  }

  console.log("data:", data);
  if (!data.response.length) {
    console.log("ERROR data empty");
  }
  res.status(!data.response.length ? 404 : 200).send(data.response);
});

module.exports = router;