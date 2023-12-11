const request = require("supertest");
const app = require("../app");
const { createToken } = require("../helpers/jwt");
const { hashPassword } = require("../helpers/bcrypt");
const { sequelize } = require("../models");
const { queryInterface } = sequelize;
const fs = require("fs");
const { log } = require("console");

const payloadAdmin = {
  id: 1,
  email: "adaoho@mail.com",
  role: "admin",
};

const payloadStaff = {
  id: 3,
  email: "ohouhu@mail.com",
  role: "staff",
};

let access_token_admin = createToken(payloadAdmin);
let access_token_staff = createToken(payloadStaff);

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

        expect(response.status).toBe(201);
        expect(response.body).toBeInstanceOf(Object);
        expect(response.body).toHaveProperty("newCuisine", expect.any(Object));
      });
    });

    describe("failed", () => {
      it("401 - should return error while not Authenticated", async () => {
        const bodyAdd = {
          name: "pizza",
          description: "best food",
          price: 10000,
          imgUrl: "https://example.com/pizza.jpeg",
          categoryId: 1,
        };
        const response = await request(app).post("/cuisine").send(bodyAdd);

        expect(response.status).toBe(401);
        expect(response.body).toBeInstanceOf(Object);
        expect(response.body).toHaveProperty(
          "message",
          "You're Not Authenticated"
        );
      });

      it("401 - should return error while Token is Invalid", async () => {
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
          .set("authorization", "Bearer " + access_token_admin + "a");

        expect(response.status).toBe(401);
        expect(response.body).toBeInstanceOf(Object);
        expect(response.body).toHaveProperty("message", "Invalid Token");
      });

      it("400 - should return error while name is empty", async () => {
        const bodyAdd = {
          name: "",
          description: "best food",
          price: 10000,
          imgUrl: "https://example.com/pizza.jpeg",
          categoryId: 1,
        };
        const response = await request(app)
          .post("/cuisine")
          .send(bodyAdd)
          .set("authorization", "Bearer " + access_token_admin);

        expect(response.status).toBe(400);
        expect(response.body).toBeInstanceOf(Object);
        expect(response.body).toHaveProperty("message", "Name can't be Empty");
      });

      it("400 - should return error while description is empty", async () => {
        const bodyAdd = {
          name: "pizza",
          description: "",
          price: 10000,
          imgUrl: "https://example.com/pizza.jpeg",
          categoryId: 1,
        };
        const response = await request(app)
          .post("/cuisine")
          .send(bodyAdd)
          .set("authorization", "Bearer " + access_token_admin);

        expect(response.status).toBe(400);
        expect(response.body).toBeInstanceOf(Object);
        expect(response.body).toHaveProperty(
          "message",
          "Description can't be Empty"
        );
      });

      it("400 - should return error while price is empty", async () => {
        const bodyAdd = {
          name: "pizza",
          description: "best food",
          price: "",
          imgUrl: "https://example.com/pizza.jpeg",
          categoryId: 1,
        };
        const response = await request(app)
          .post("/cuisine")
          .send(bodyAdd)
          .set("authorization", "Bearer " + access_token_admin);

        expect(response.status).toBe(400);
        expect(response.body).toBeInstanceOf(Object);
        expect(response.body).toHaveProperty("message", "Price can't be Empty");
      });

      it("400 - should return error while price isn't meet minimum price", async () => {
        const bodyAdd = {
          name: "pizza",
          description: "best food",
          price: 100,
          imgUrl: "https://example.com/pizza.jpeg",
          categoryId: 1,
        };
        const response = await request(app)
          .post("/cuisine")
          .send(bodyAdd)
          .set("authorization", "Bearer " + access_token_admin);

        expect(response.status).toBe(400);
        expect(response.body).toBeInstanceOf(Object);
        expect(response.body).toHaveProperty(
          "message",
          "Mimimum Price is Rp 8.000"
        );
      });

      it("400 - should return error while imageUrl is empty", async () => {
        const bodyAdd = {
          name: "pizza",
          description: "best food",
          price: 100000,
          imgUrl: "",
          categoryId: 1,
        };
        const response = await request(app)
          .post("/cuisine")
          .send(bodyAdd)
          .set("authorization", "Bearer " + access_token_admin);

        expect(response.status).toBe(400);
        expect(response.body).toBeInstanceOf(Object);
        expect(response.body).toHaveProperty(
          "message",
          "Image URL can't be Empty"
        );
      });

      it("400 - should return error while categoryId is empty", async () => {
        const bodyAdd = {
          name: "pizza",
          description: "best food",
          price: 100000,
          imgUrl: "https://example.com/pizza.jpeg",
          categoryId: "",
        };
        const response = await request(app)
          .post("/cuisine")
          .send(bodyAdd)
          .set("authorization", "Bearer " + access_token_admin);

        expect(response.status).toBe(400);
        expect(response.body).toBeInstanceOf(Object);
        expect(response.body).toHaveProperty(
          "message",
          "categoryId can't be Empty"
        );
      });
    });
  });

  describe("GET /cuisine/", () => {
    describe("succeed", () => {
      it("200 - should return object getCuisine", async () => {
        const response = await request(app)
          .get("/cuisine")
          .set("authorization", "Bearer " + access_token_admin);

        expect(response.status).toBe(200);
        expect(response.body).toBeInstanceOf(Object);
        expect(response.body).toHaveProperty("getCuisine", expect.any(Object));
      });
    });

    describe("failed", () => {
      it("401 - should return error while not Authenticated", async () => {
        const response = await request(app).get("/cuisine");

        expect(response.status).toBe(401);
        expect(response.body).toBeInstanceOf(Object);
        expect(response.body).toHaveProperty(
          "message",
          "You're Not Authenticated"
        );
      });

      it("401 - should return error while Token is Invalid", async () => {
        const response = await request(app)
          .get("/cuisine")
          .set("authorization", "Bearer " + access_token_admin + "a");

        expect(response.status).toBe(401);
        expect(response.body).toBeInstanceOf(Object);
        expect(response.body).toHaveProperty("message", "Invalid Token");
      });
    });
  });

  describe("GET /cuisine/:id", () => {
    describe("succeed", () => {
      it("200 - should return object getCuisine", async () => {
        const response = await request(app)
          .get("/cuisine/1")
          .set("authorization", "Bearer " + access_token_admin);

        expect(response.status).toBe(200);
        expect(response.body).toBeInstanceOf(Object);
        expect(response.body).toHaveProperty("findCuisine", expect.any(Object));
      });
    });

    describe("failed", () => {
      it("401 - should return error while not Authenticated", async () => {
        const response = await request(app).get("/cuisine/1");

        expect(response.status).toBe(401);
        expect(response.body).toBeInstanceOf(Object);
        expect(response.body).toHaveProperty(
          "message",
          "You're Not Authenticated"
        );
      });

      it("401 - should return error while Token is Invalid", async () => {
        const response = await request(app)
          .get("/cuisine/1")
          .set("authorization", "Bearer " + access_token_admin + "a");

        expect(response.status).toBe(401);
        expect(response.body).toBeInstanceOf(Object);
        expect(response.body).toHaveProperty("message", "Invalid Token");
      });

      it("404 - should return error while data Id not found", async () => {
        const response = await request(app)
          .get("/cuisine/100")
          .set("authorization", "Bearer " + access_token_admin);

        expect(response.status).toBe(404);
        expect(response.body).toBeInstanceOf(Object);
        expect(response.body).toHaveProperty("message", "Error Data Not Found");
      });
    });
  });

  describe("PUT /cuisine/:id", () => {
    describe("succeed", () => {
      it("200 - should return object updatedCuisine", async () => {
        const bodyPut = {
          name: "pizza",
          description: "best food",
          price: 100000,
          imgUrl: "https://example.com/pizza.jpeg",
          categoryId: 1,
        };

        const response = await request(app)
          .put("/cuisine/1")
          .send(bodyPut)
          .set("authorization", "Bearer " + access_token_admin);

        expect(response.status).toBe(201);
        expect(response.body).toBeInstanceOf(Object);
        expect(response.body).toHaveProperty(
          "updatedCuisine",
          expect.any(Object)
        );
      });
    });

    describe("failed", () => {
      it("401 - should return error while not Authenticated", async () => {
        const bodyPut = {
          name: "pizza",
          description: "best food",
          price: 100000,
          imgUrl: "https://example.com/pizza.jpeg",
          categoryId: 1,
        };

        const response = await request(app).put("/cuisine/1").send(bodyPut);

        expect(response.status).toBe(401);
        expect(response.body).toBeInstanceOf(Object);
        expect(response.body).toHaveProperty(
          "message",
          "You're Not Authenticated"
        );
      });

      it("401 - should return error while Token is Invalid", async () => {
        const bodyPut = {
          name: "pizza",
          description: "best food",
          price: 100000,
          imgUrl: "https://example.com/pizza.jpeg",
          categoryId: 1,
        };

        const response = await request(app)
          .put("/cuisine/1")
          .send(bodyPut)
          .set("authorization", "Bearer " + access_token_admin + "a");

        expect(response.status).toBe(401);
        expect(response.body).toBeInstanceOf(Object);
        expect(response.body).toHaveProperty("message", "Invalid Token");
      });

      it("404 - should return error while data Id not found", async () => {
        const bodyPut = {
          name: "pizza",
          description: "best food",
          price: 100000,
          imgUrl: "https://example.com/pizza.jpeg",
          categoryId: 1,
        };

        const response = await request(app)
          .put("/cuisine/100")
          .send(bodyPut)
          .set("authorization", "Bearer " + access_token_admin);

        expect(response.status).toBe(404);
        expect(response.body).toBeInstanceOf(Object);
        expect(response.body).toHaveProperty("message", "Error Data Not Found");
      });

      it("403 - should return error while user role is forbidden", async () => {
        const bodyPut = {
          name: "pizza",
          description: "best food",
          price: 100000,
          imgUrl: "https://example.com/pizza.jpeg",
          categoryId: 1,
        };

        const response = await request(app)
          .put("/cuisine/1")
          .send(bodyPut)
          .set("authorization", "Bearer " + access_token_staff);

        expect(response.status).toBe(403);
        expect(response.body).toBeInstanceOf(Object);
        expect(response.body).toHaveProperty(
          "message",
          "You're Not Authorized"
        );
      });

      it("400 - should return error while name is empty", async () => {
        const bodyAdd = {
          name: "",
          description: "best food",
          price: 10000,
          imgUrl: "https://example.com/pizza.jpeg",
          categoryId: 1,
        };
        const response = await request(app)
          .post("/cuisine")
          .send(bodyAdd)
          .set("authorization", "Bearer " + access_token_admin);

        expect(response.status).toBe(400);
        expect(response.body).toBeInstanceOf(Object);
        expect(response.body).toHaveProperty("message", "Name can't be Empty");
      });

      it("400 - should return error while description is empty", async () => {
        const bodyAdd = {
          name: "pizza",
          description: "",
          price: 10000,
          imgUrl: "https://example.com/pizza.jpeg",
          categoryId: 1,
        };
        const response = await request(app)
          .post("/cuisine")
          .send(bodyAdd)
          .set("authorization", "Bearer " + access_token_admin);

        expect(response.status).toBe(400);
        expect(response.body).toBeInstanceOf(Object);
        expect(response.body).toHaveProperty(
          "message",
          "Description can't be Empty"
        );
      });

      it("400 - should return error while price is empty", async () => {
        const bodyAdd = {
          name: "pizza",
          description: "best food",
          price: "",
          imgUrl: "https://example.com/pizza.jpeg",
          categoryId: 1,
        };
        const response = await request(app)
          .post("/cuisine")
          .send(bodyAdd)
          .set("authorization", "Bearer " + access_token_admin);

        expect(response.status).toBe(400);
        expect(response.body).toBeInstanceOf(Object);
        expect(response.body).toHaveProperty("message", "Price can't be Empty");
      });

      it("400 - should return error while price isn't meet minimum price", async () => {
        const bodyAdd = {
          name: "pizza",
          description: "best food",
          price: 100,
          imgUrl: "https://example.com/pizza.jpeg",
          categoryId: 1,
        };
        const response = await request(app)
          .post("/cuisine")
          .send(bodyAdd)
          .set("authorization", "Bearer " + access_token_admin);

        expect(response.status).toBe(400);
        expect(response.body).toBeInstanceOf(Object);
        expect(response.body).toHaveProperty(
          "message",
          "Mimimum Price is Rp 8.000"
        );
      });

      it("400 - should return error while imageUrl is empty", async () => {
        const bodyAdd = {
          name: "pizza",
          description: "best food",
          price: 100000,
          imgUrl: "",
          categoryId: 1,
        };
        const response = await request(app)
          .post("/cuisine")
          .send(bodyAdd)
          .set("authorization", "Bearer " + access_token_admin);

        expect(response.status).toBe(400);
        expect(response.body).toBeInstanceOf(Object);
        expect(response.body).toHaveProperty(
          "message",
          "Image URL can't be Empty"
        );
      });

      it("400 - should return error while categoryId is empty", async () => {
        const bodyAdd = {
          name: "pizza",
          description: "best food",
          price: 100000,
          imgUrl: "https://example.com/pizza.jpeg",
          categoryId: "",
        };
        const response = await request(app)
          .post("/cuisine")
          .send(bodyAdd)
          .set("authorization", "Bearer " + access_token_admin);

        expect(response.status).toBe(400);
        expect(response.body).toBeInstanceOf(Object);
        expect(response.body).toHaveProperty(
          "message",
          "categoryId can't be Empty"
        );
      });
    });
  });

  describe("DELETE /cuisine/:id", () => {
    describe("succeed", () => {
      it("200 - should return object updatedCuisine", async () => {
        const response = await request(app)
          .delete("/cuisine/1")
          .set("authorization", "Bearer " + access_token_admin);

        expect(response.status).toBe(200);
        expect(response.body).toBeInstanceOf(Object);
        expect(response.body).toHaveProperty("message", expect.any(String));
      });
    });

    describe("failed", () => {
      it("401 - should return error while not Authenticated", async () => {
        const response = await request(app).delete("/cuisine/1");

        expect(response.status).toBe(401);
        expect(response.body).toBeInstanceOf(Object);
        expect(response.body).toHaveProperty(
          "message",
          "You're Not Authenticated"
        );
      });

      it("401 - should return error while Token is Invalid", async () => {
        const response = await request(app)
          .delete("/cuisine/1")
          .set("authorization", "Bearer " + access_token_admin + "a");

        expect(response.status).toBe(401);
        expect(response.body).toBeInstanceOf(Object);
        expect(response.body).toHaveProperty("message", "Invalid Token");
      });

      it("404 - should return error while data Id not found", async () => {
        const response = await request(app)
          .delete("/cuisine/100")
          .set("authorization", "Bearer " + access_token_admin);

        expect(response.status).toBe(404);
        expect(response.body).toBeInstanceOf(Object);
        expect(response.body).toHaveProperty("message", "Error Data Not Found");
      });

      it("403 - should return error while user role is forbidden", async () => {
        const response = await request(app)
          .delete("/cuisine/10")
          .set("authorization", "Bearer " + access_token_staff);

        expect(response.status).toBe(403);
        expect(response.body).toBeInstanceOf(Object);
        expect(response.body).toHaveProperty(
          "message",
          "You're Not Authorized"
        );
      });
    });
  });

  describe("PATCH /cuisine/:id", () => {
    describe("succeed", () => {
      it("200 - should return object updatedImageUrl", async () => {
        try {
          const response = await request(app)
            .patch("/cuisine/3")
            .set("authorization", "Bearer " + access_token_admin)
            .attach(
              "imageUrl",
              fs.readFileSync("./__test__/picture/image_food.png"),
              "image_food.png"
            );

          expect(response.status).toBe(200);
          expect(response.body).toBeInstanceOf(Object);
          expect(response.body).toHaveProperty("message", expect.any(String));
        } catch (error) {
          console.log(error);
        }
      });
    });

    describe("failed", () => {
      it("401 - should return error while not Authenticated", async () => {
        const response = await request(app)
          .patch("/cuisine/3")
          .attach(
            "imageUrl",
            fs.readFileSync("./__test__/picture/image_food.png"),
            "image_food.png"
          );

        expect(response.status).toBe(401);
        expect(response.body).toBeInstanceOf(Object);
        expect(response.body).toHaveProperty(
          "message",
          "You're Not Authenticated"
        );
      });

      it("401 - should return error while Token is Invalid", async () => {
        const response = await request(app)
          .patch("/cuisine/3")
          .set("authorization", "Bearer " + access_token_admin + "a")
          .attach(
            "imageUrl",
            fs.readFileSync("./__test__/picture/image_food.png"),
            "image_food.png"
          );

        expect(response.status).toBe(401);
        expect(response.body).toBeInstanceOf(Object);
        expect(response.body).toHaveProperty("message", "Invalid Token");
      });

      it("404 - should return error while data Id not found", async () => {
        const response = await request(app)
          .patch("/cuisine/100")
          .set("authorization", "Bearer " + access_token_admin)
          .attach(
            "imageUrl",
            fs.readFileSync("./__test__/picture/image_food.png"),
            "image_food.png"
          );

        expect(response.status).toBe(404);
        expect(response.body).toBeInstanceOf(Object);
        expect(response.body).toHaveProperty("message", "Error Data Not Found");
      });

      it("403 - should return error while user role is forbidden", async () => {
        const response = await request(app)
          .patch("/cuisine/3")
          .set("authorization", "Bearer " + access_token_staff)
          .attach(
            "imageUrl",
            fs.readFileSync("./__test__/picture/image_food.png"),
            "image_food.png"
          );

        expect(response.status).toBe(403);
        expect(response.body).toBeInstanceOf(Object);
        expect(response.body).toHaveProperty(
          "message",
          "You're Not Authorized"
        );
      });

      it("400 - should return error while imageUrl file is empty", async () => {
        const response = await request(app)
          .patch("/cuisine/3")
          .set("authorization", "Bearer " + access_token_admin)
          .attach("imageUrl");

        console.log(response.text);

        expect(response.status).toBe(400);
        expect(response.body).toBeInstanceOf(Object);
        expect(response.body).toHaveProperty(
          "message",
          "ImageUrl can't be Empty"
        );
      });
    });
  });

  describe("GET /category/", () => {
    describe("succeed", () => {
      it("200 - should return object updatedCuisine", async () => {
        const response = await request(app)
          .get("/category/")
          .set("authorization", "Bearer " + access_token_admin);

        expect(response.status).toBe(200);
        expect(response.body).toBeInstanceOf(Object);
        expect(response.body).toHaveProperty("getCategory", expect.any(Object));
      });
    });

    describe("failed", () => {
      it("401 - should return error while not Authenticated", async () => {
        const response = await request(app).get("/category/");

        expect(response.status).toBe(401);
        expect(response.body).toBeInstanceOf(Object);
        expect(response.body).toHaveProperty(
          "message",
          "You're Not Authenticated"
        );
      });

      it("401 - should return error while Token is Invalid", async () => {
        const response = await request(app)
          .get("/category/")
          .set("authorization", "Bearer " + access_token_admin + "a");

        expect(response.status).toBe(401);
        expect(response.body).toBeInstanceOf(Object);
        expect(response.body).toHaveProperty("message", "Invalid Token");
      });
    });
  });

  describe("GET /pub/", () => {
    describe("succeed", () => {
      it("200 - should return object getCuisine", async () => {
        const response = await request(app).get("/pub/");

        // console.log(response);

        expect(response.status).toBe(200);
        expect(response.body).toBeInstanceOf(Object);

        expect(response.body).toEqual(
          expect.objectContaining({
            currentPage: expect.any(Number),
            totalData: expect.any(Number),
            totalPage: expect.any(Number),
            getCuisine: expect.any(Array),
          })
        );
      });

      it("200 - should return object while added Query Filter", async () => {
        const response = await request(app).get("/pub/?category=1,2");

        expect(response.status).toBe(200);
        expect(response.body).toBeInstanceOf(Object);

        expect(response.body).toEqual({
          currentPage: expect.any(Number),
          totalData: expect.any(Number),
          totalPage: expect.any(Number),
          getCuisine: expect.any(Array),
        });
      });

      it("200 - should return an object with 10 items based on pagination", async () => {
        const response = await request(app).get("/pub/?page=1");

        expect(response.status).toBe(200);
        expect(response.body).toBeInstanceOf(Object);

        expect(response.body).toEqual({
          currentPage: expect.any(String),
          totalData: expect.any(Number),
          totalPage: expect.any(Number),
          getCuisine: expect.objectContaining({ length: 10 }),
        });
      });
    });
  });

  describe("GET /pub/:id", () => {
    describe("succeed", () => {
      it("200 - should return object Cuisine based on Params", async () => {
        const response = await request(app).get("/pub/3");

        expect(response.status).toBe(200);
        expect(response.body).toBeInstanceOf(Object);
        expect(response.body).toHaveProperty("findCuisine", expect.any(Object));
      });
    });

    describe("failed", () => {
      it("404 - should return error while data Id not found", async () => {
        const response = await request(app).get("/pub/1000");

        expect(response.status).toBe(404);
        expect(response.body).toBeInstanceOf(Object);
        expect(response.body).toHaveProperty("message", "Error Data Not Found");
      });
    });
  });

  describe("POST /category/", () => {
    describe("succeed", () => {
      it("200 - should return object Cuisine based on Params", async () => {
        const bodyCategory = { name: "Padang Souce" };
        const response = await request(app)
          .post("/category/")
          .send(bodyCategory)
          .set("authorization", "Bearer " + access_token_admin);

        expect(response.status).toBe(201);
        expect(response.body).toBeInstanceOf(Object);
        expect(response.body).toHaveProperty("addCategory", expect.any(Object));
      });
    });
  });

  describe("PUT /category/:id", () => {
    describe("succeed", () => {
      it("200 - should return object Cuisine based on Params", async () => {
        const bodyCategory = { name: "Padang Souce" };
        const response = await request(app)
          .put("/category/3")
          .send(bodyCategory)
          .set("authorization", "Bearer " + access_token_admin);

        expect(response.status).toBe(200);
        expect(response.body).toBeInstanceOf(Object);
        expect(response.body).toHaveProperty(
          "updatedCategory",
          expect.any(Object)
        );
      });
    });
  });

  describe("DELETE /category/:id", () => {
    describe("succeed", () => {
      it("200 - should return object Cuisine based on Params", async () => {
        const response = await request(app)
          .delete("/category/2")
          .set("authorization", "Bearer " + access_token_admin);

        expect(response.status).toBe(200);
        expect(response.body).toBeInstanceOf(Object);
        expect(response.body).toHaveProperty("message", expect.any(String));
      });
    });
  });
});
