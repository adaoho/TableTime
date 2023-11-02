const request = require("supertest");
const app = require("../app");
const { sequelize } = require("../models");
const { createToken } = require("../helpers/jwt");
const { hashPassword } = require("../helpers/bcrypt");
const { queryInterface } = sequelize;

beforeAll(async () => {
  const adminData = require("../db/admin.json");
  adminData.forEach((element) => {
    element.password = hashPassword(element.password);
    element.createdAt = element.updatedAt = new Date();
  });

  await queryInterface.bulkInsert("Users", adminData, {});
});

afterAll(async () => {
  await queryInterface.bulkDelete("Users", null, {
    truncate: true,
    cascade: true,
    restartIdentity: true,
  });
});

describe("User Router Test", () => {
  describe("POST /user/login - succed", () => {
    it("response string access_token", async () => {
      const bodyLogin = { email: "adaoho@mail.com", password: "12345678" };
      const response = await request(app).post("/user/login").send(bodyLogin);

      expect(response.status).toBe(200);
      expect(response.body).toBeInstanceOf(Object);
      expect(response.body).toHaveProperty("access_token", expect.any(String));
    });
  });

  describe("POST /user/login - failed", () => {
    it("return object with message", async () => {
      const bodyLogin = { email: "adaoho@mail.com", password: "" };
      const response = await request(app).post("/user/login").send(bodyLogin);

      expect(response.status).toBe(400);
      expect(response.body).toBeInstanceOf(Object);
      expect(response.body).toHaveProperty("message", expect.any(String));
    });
  });
});
