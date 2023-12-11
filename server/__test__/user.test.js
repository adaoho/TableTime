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

      it("401 - should return error if invalid email", async () => {
        const bodyLogin = { email: "oho@mail.com", password: "12345678" };
        const response = await request(app).post("/user/login").send(bodyLogin);

        expect(response.status).toBe(401);
        expect(response.body).toBeInstanceOf(Object);
        expect(response.body).toHaveProperty(
          "message",
          "Invalid email/password"
        );
      });

      it("401 - should return error if invalid password", async () => {
        const bodyLogin = { email: "adaoho@mail.com", password: "1234567" };
        const response = await request(app).post("/user/login").send(bodyLogin);

        expect(response.status).toBe(401);
        expect(response.body).toBeInstanceOf(Object);
        expect(response.body).toHaveProperty(
          "message",
          "Invalid email/password"
        );
      });
    });
  });

  // POST USER ADD USER
  describe("POST /user/add-user", () => {
    describe("succeed", () => {
      it("201 - should return object with newUser", async () => {
        const bodyAdduser = {
          username: "Adnan Nugroho",
          email: "adnan@mail.com",
          password: "12345678",
          phoneNumber: "",
          address: "",
        };
        const response = await request(app)
          .post("/user/add-user")
          .send(bodyAdduser)
          .set("authorization", `Bearer ${access_token}`);

        // console.log(response.text);

        expect(response.status).toBe(201);
        expect(response.body).toBeInstanceOf(Object);
        expect(response.body).toHaveProperty("newUser", expect.any(Object));
      });
    });

    describe("failed", () => {
      it("400 - should return error with email null", async () => {
        const bodyAdduser = {
          username: "Adnan Nugroho",
          email: "",
          password: "12345678",
          phoneNumber: "",
          address: "",
        };
        const response = await request(app)
          .post("/user/add-user")
          .send(bodyAdduser)
          .set("authorization", `Bearer ${access_token}`);

        expect(response.status).toBe(400);
        expect(response.body).toBeInstanceOf(Object);
        expect(response.body).toHaveProperty("message", "Email Can't be Empty");
      });

      it("400 - should return error with password null", async () => {
        const bodyAdduser = {
          username: "Adnan Nugroho",
          email: "adnan@mail.com",
          password: "",
          phoneNumber: "",
          address: "",
        };
        const response = await request(app)
          .post("/user/add-user")
          .send(bodyAdduser)
          .set("authorization", `Bearer ${access_token}`);

        expect(response.status).toBe(400);
        expect(response.body).toBeInstanceOf(Object);
        expect(response.body).toHaveProperty(
          "message",
          "Password Can't be Empty"
        );
      });

      it("400 - should return error with email required", async () => {
        const bodyAdduser = {
          username: "Adnan Nugroho",
          email: " ",
          password: "12345678",
          phoneNumber: "",
          address: "",
        };
        const response = await request(app)
          .post("/user/add-user")
          .send(bodyAdduser)
          .set("authorization", `Bearer ${access_token}`);

        expect(response.status).toBe(400);
        expect(response.body).toBeInstanceOf(Object);
        expect(response.body).toHaveProperty("message", "Email is Required");
      });

      it("400 - should return error with password required", async () => {
        const bodyAdduser = {
          username: "Adnan Nugroho",
          email: "adnan@mail.com",
          password: " ",
          phoneNumber: "",
          address: "",
        };
        const response = await request(app)
          .post("/user/add-user")
          .send(bodyAdduser)
          .set("authorization", `Bearer ${access_token}`);

        expect(response.status).toBe(400);
        expect(response.body).toBeInstanceOf(Object);
        expect(response.body).toHaveProperty("message", "Password is Required");
      });

      it("400 - should return error with invalid email format", async () => {
        const bodyAdduser = {
          username: "Adnan Nugroho",
          email: "adnanmail.com",
          password: " ",
          phoneNumber: "",
          address: "",
        };
        const response = await request(app)
          .post("/user/add-user")
          .send(bodyAdduser)
          .set("authorization", `Bearer ${access_token}`);

        expect(response.status).toBe(400);
        expect(response.body).toBeInstanceOf(Object);
        expect(response.body).toHaveProperty("message", "Invalid Email Format");
      });

      it("400 - should return error with Email Already Registered", async () => {
        const bodyAdduser = {
          username: "Adnan Nugroho",
          email: "adaoho@mail.com",
          password: "12345678",
          phoneNumber: "",
          address: "",
        };
        const response = await request(app)
          .post("/user/add-user")
          .send(bodyAdduser)
          .set("authorization", `Bearer ${access_token}`);

        expect(response.status).toBe(400);
        expect(response.body).toBeInstanceOf(Object);
        expect(response.body).toHaveProperty(
          "message",
          "Email already registered!"
        );
      });

      it("401 - should return error with access_token is required", async () => {
        const bodyAdduser = {
          username: "Adnan Nugroho",
          email: "adaoho@mail.com",
          password: "12345678",
          phoneNumber: "",
          address: "",
        };
        const response = await request(app)
          .post("/user/add-user")
          .send(bodyAdduser);

        expect(response.status).toBe(401);
        expect(response.body).toBeInstanceOf(Object);
        expect(response.body).toHaveProperty(
          "message",
          "You're Not Authenticated"
        );
      });

      it("401 - should return error with false access_token", async () => {
        const bodyAdduser = {
          username: "Adnan Nugroho",
          email: "adaoho@mail.com",
          password: "12345678",
          phoneNumber: "",
          address: "",
        };
        const response = await request(app)
          .post("/user/add-user")
          .send(bodyAdduser)
          .set("authorization", `Bearer ${access_token + "a"}`);

        expect(response.status).toBe(401);
        expect(response.body).toBeInstanceOf(Object);
        expect(response.body).toHaveProperty("message", "Invalid Token");
      });
    });
  });
});
