require("dotenv").config();
const axios = require("axios");

const instance = axios.create({
  baseURL: "https://upload.imagekit.io/api/v1",
  headers: {
    Authorization: process.env.IMAGEKIT_AUTH,
  },
});

module.exports = instance;
