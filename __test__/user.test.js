const request = require("supertest");
const app = require("../app");
const { sequelize } = require("../models");
const { createToken } = require("../helpers/jwt");
const { hashPassword } = require("../helpers/bcrypt");
const { queryInterface } = sequelize;

const payload = {
  id: 1,
  email: "adaoho@mail.com",
  role: "admin",
};

const access_token = createToken(payload);

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
  // POST USER LOGIN
  describe("POST /user/login", () => {
    describe("succeed", () => {
      it("200 - should return access_token", async () => {
        const bodyLogin = { email: "adaoho@mail.com", password: "12345678" };
        const response = await request(app).post("/user/login").send(bodyLogin);

        expect(response.status).toBe(200);
        expect(response.body).toBeInstanceOf(Object);
        expect(response.body).toHaveProperty(
          "access_token",
          expect.any(String)
        );
      });
    });

    describe("failed", () => {
      it("400 - should return error email empty", async () => {
        const bodyLogin = { email: "", password: "12345678" };
        const response = await request(app).post("/user/login").send(bodyLogin);

        expect(response.status).toBe(400);
        expect(response.body).toBeInstanceOf(Object);
        expect(response.body).toHaveProperty("message", "Email Can't be Empty");
      });

      it("400 - should return error password empty", async () => {
        const bodyLogin = { email: "adaoho@mail.com", password: "" };
        const response = await request(app).post("/user/login").send(bodyLogin);

        expect(response.status).toBe(400);
        expect(response.body).toBeInstanceOf(Object);
        expect(response.body).toHaveProperty(
          "message",
          "Password Can't be Empty"
        );
      });

      it("400 - should return error if invalid email", async () => {
        const bodyLogin = { email: "oho@mail.com", password: "12345678" };
        const response = await request(app).post("/user/login").send(bodyLogin);

        expect(response.status).toBe(400);
        expect(response.body).toBeInstanceOf(Object);
        expect(response.body).toHaveProperty(
          "message",
          "Invalid email/password"
        );
      });

      it("400 - should return error if invalid password", async () => {
        const bodyLogin = { email: "adaoho@mail.com", password: "1234567" };
        const response = await request(app).post("/user/login").send(bodyLogin);

        expect(response.status).toBe(400);
        expect(response.body).toBeInstanceOf(Object);
        expect(response.body).toHaveProperty(
          "message",
          "Invalid email/password"
        );
      });
    });
  });

  // POST USER ADD USER
  describe.only("POST /user/add-user", () => {
    describe("succeed", () => {
      it("200 - should return access_token", async () => {
        const bodyAdduser = { username, email, password, phoneNumber, address };
        const response = await request(app)
          .post("/user/add-user")
          .send(bodyLogin)
          .set("authorization", `Bearer ${access_token}`);

        expect(response.status).toBe(200);
        expect(response.body).toBeInstanceOf(Object);
        expect(response.body).toHaveProperty("newUser", expect.any(Object));
      });
    });

    describe("failed", () => {
      it("400 - should return error email empty", async () => {
        const bodyLogin = { email: "", password: "12345678" };
        const response = await request(app).post("/user/login").send(bodyLogin);

        expect(response.status).toBe(400);
        expect(response.body).toBeInstanceOf(Object);
        expect(response.body).toHaveProperty("message", "Email Can't be Empty");
      });

      it("400 - should return error password empty", async () => {
        const bodyLogin = { email: "adaoho@mail.com", password: "" };
        const response = await request(app).post("/user/login").send(bodyLogin);

        expect(response.status).toBe(400);
        expect(response.body).toBeInstanceOf(Object);
        expect(response.body).toHaveProperty(
          "message",
          "Password Can't be Empty"
        );
      });

      it("400 - should return error if invalid email", async () => {
        const bodyLogin = { email: "oho@mail.com", password: "12345678" };
        const response = await request(app).post("/user/login").send(bodyLogin);

        expect(response.status).toBe(400);
        expect(response.body).toBeInstanceOf(Object);
        expect(response.body).toHaveProperty(
          "message",
          "Invalid email/password"
        );
      });

      it("400 - should return error if invalid password", async () => {
        const bodyLogin = { email: "adaoho@mail.com", password: "1234567" };
        const response = await request(app).post("/user/login").send(bodyLogin);

        expect(response.status).toBe(400);
        expect(response.body).toBeInstanceOf(Object);
        expect(response.body).toHaveProperty(
          "message",
          "Invalid email/password"
        );
      });
    });
  });
});
