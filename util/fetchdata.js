import axios from "axios";
import { LEGACY_BASE_URL } from "../config";

const redis = require("redis");
const client = redis.createClient(redis_port);

/**
 * This essentially checks if the product/availability is already 
 * in cache, if it is it fetches it from there instead of fetching 
 * from the api
 * 
 * @param {String} api products/availability 
 * @param {String} end manufacturer/category
 */
function getData(api, end) {
  try {
    client.get(end, async (err, data) => {
      if (err) {
        throw err;
      }

      if (data) {
        response.status(200).send({
          data: JSON.parse(data),
        });
      } else {
        const fetched_data = await axios.get(
          `${LEGACY_BASE_URL}/${api}/${end}`
        );

        client.setex(end, 5 * 60, JSON.stringify(fetched_data.data));
        response.status(200).send({
          data: fetched_data.data,
        });
      }
    });
  } catch (error) {
    console.error(error.message);
  }
}
/**
 * Fetches the products from a given category
 * @param {String} category category to fetch products from
 */
function getProducts(category) {
  return getData("products", category);
}

/**
 * Fetches availability for a given manufacturer
 * @param {String} manufacturer The manufacturer to fetch availability for
 */
function getAvailability(manufacturer) {
  return getData("availability", manufacturer);
}

module.exports = {
  getAvailability, getProducts
};