const request = require("supertest");
const app = require("../app");
const { createToken } = require("../helpers/jwt");
const { hashPassword } = require("../helpers/bcrypt");
const { sequelize } = require("../models");
const { queryInterface } = sequelize;

const payloadAdmin = {
  id: 1,
  email: "adaoho@mail.com",
  role: "admin",
};

let access_token_admin = createToken(payloadAdmin);

beforeAll(async () => {
  const dataCuisine = require("../db/cuisine.json");
  const dataUser = require("../db/admin.json");
  const dataCategory = require("../db/category.json");

  dataUser.forEach((element) => {
    element.createdAt = element.updatedAt = new Date();
  });
  dataCategory.forEach((element) => {
    element.createdAt = element.updatedAt = new Date();
  });
  dataCuisine.forEach((element) => {
    element.createdAt = element.updatedAt = new Date();
  });

  await queryInterface.bulkInsert("Users", dataUser, {});
  await queryInterface.bulkInsert("Categories", dataCategory, {});
  await queryInterface.bulkInsert("Cuisines", dataCuisine, {});
});

afterAll(async () => {
  await queryInterface.bulkDelete("Cuisines", null, {
    truncate: true,
    cascade: true,
    restartIdentity: true,
  });
  await queryInterface.bulkDelete("Categories", null, {
    truncate: true,
    cascade: true,
    restartIdentity: true,
  });
  await queryInterface.bulkDelete("Users", null, {
    truncate: true,
    cascade: true,
    restartIdentity: true,
  });
});

describe("Cuisine Router Test", () => {
  describe("POST /cuisine/", () => {
    describe("succeed", () => {
      it("201 - should return object newCuisine", async () => {
        const bodyAdd = {
          name: "pizza",
          description: "best food",
          price: 10000,
          imgUrl: "https://example.com/pizza.jpeg",
          categoryId: 1,
        };
        const response = await request(app)
          .post("/cuisine")
          .send(bodyAdd)
          .set("authorization", "Bearer " + access_token_admin);

        console.log(response.text);

        expect(response.status).toBe(201);
        expect(response.body).toBeInstanceOf(Object);
        expect(response.body).toHaveProperty("newCuisine", expect.any(Object));
      });
    });

    describe("failed", () => {
      it("201 - should return object newCuisine", async () => {
        const bodyAdd = {
          name: "pizza",
          description: "best food",
          price: 10000,
          imgUrl: "https://example.com/pizza.jpeg",
          categoryId: 1,
        };
        const response = await request(app)
          .post("/cuisine")
          .send(bodyAdd)
          .set("Authorization", "Bearer " + access_token_admin);

        // console.log(response.text);

        expect(response.status).toBe(201);
        expect(response.body).toBeInstanceOf(Object);
        expect(response.body).toHaveProperty("newCuisine", expect.any(Object));
      });
    });
  });
});
