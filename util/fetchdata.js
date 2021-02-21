const { LEGACY_BASE_URL } = require("../config");
const axios = require("axios");
const redis = require("redis");
const { promisify } = require("util");
const redis_port = 6379;

const client = redis.createClient(redis_port);
client.on("error", (err) => {
  console.error(err);
});

/**
 * This essentially checks if the product/availability is already
 * in cache, if it is it fetches it from there instead of fetching
 * from the api
 *
 * @param {String} api products/availability
 * @param {String} end manufacturer/category
 */
async function getData(api, end) {
  return new Promise((resolve, reject) => {
    client.get(end, async (err, data) => {
      if (err) {
        reject(err);
      }

      if (data) {
        console.log("cache hit");
        const json = JSON.parse(data);
        resolve(json);
      } else {
        console.log("cache miss");
        const fetched_data = await axios.get(
          `${LEGACY_BASE_URL}/${api}/${end}`
        );

        client.setex(end, 5 * 60, JSON.stringify(fetched_data.data));
        resolve(fetched_data);
      }
    });
  });
}
/**
 * Fetches the products from a given category
 * @param {String} category category to fetch products from
 */
function getProducts(category) {
  console.log("fetching products for: ", category);
  return getData("products", category);
}

/**
 * Fetches availability for a given manufacturer
 * @param {String} manufacturer The manufacturer to fetch availability for
 */
function getAvailability(manufacturer) {
  console.log("fetching availability for: ", manufacturer);
  return getData("availability", manufacturer);
}

module.exports = {
  getAvailability,
  getProducts,
};
