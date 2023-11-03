const request = require("supertest");
const app = require("../app");
const { sequelize } = require("../models");
const { queryInteface } = sequelize;

beforeAll(async () => {
  const data = require("./");
});
