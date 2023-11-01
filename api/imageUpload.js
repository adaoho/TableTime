const axios = require("axios");

const instance = axios.create({
  baseURL: "https://upload.imagekit.io/api/v1",
  headers: {
    Authorization: "Basic cHJpdmF0ZV95K0VhUVMzSEpmWjhxVDRuclIzNDFGLzFUZGs9Og==",
  },
});

module.exports = instance;
