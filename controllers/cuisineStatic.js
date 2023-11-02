const axios = require("axios");
const { Cuisine } = require("../models");
const instance = require("../api/imageUpload");
const FormData = require("form-data");

class CuisineStatic {
  static async postCuisine(req, res, next) {
    try {
      const { id } = req.user;
      const { name, description, price, imgUrl, categoryId } = req.body;

      const newCuisine = await Cuisine.create({
        name,
        description,
        price,
        imgUrl,
        categoryId,
        authorId: id,
      });

      res.status(201).json({
        newCuisine,
      });
    } catch (error) {
      next(error);
    }
  }

  static async getCuisine(req, res, next) {
    try {
      const getCuisine = await Cuisine.findAll();

      res.status(200).json({
        getCuisine,
      });
    } catch (error) {
      next(error);
    }
  }

  static async detailCuisine(req, res, next) {
    try {
      const { id } = req.params;

      const findCuisine = await Cuisine.findByPk(id);

      if (!findCuisine) throw { name: "NotFound" };

      res.status(200).json({
        findCuisine,
      });
    } catch (error) {
      next(error);
    }
  }

  static async updateCuisine(req, res, next) {
    try {
      const authorId = req.user.id;
      const { id } = req.params;
      const { name, description, price, imageUrl, categoryId } = req.body;

      const findCuisine = await Cuisine.findOne({ where: { id } });
      if (!findCuisine) throw { name: "NotFound" };

      const editCuisine = await Cuisine.update(
        { name, description, price, imageUrl, categoryId, authorId },
        { where: { id } }
      );

      console.log(editCuisine);
      const updatedCuisine = await Cuisine.findByPk(id);

      res.status(201).json({
        updatedCuisine,
      });
    } catch (error) {
      next(error);
    }
  }

  static async updateImageUrl(req, res, next) {
    try {
      const { id } = req.params;

      const findCuisine = await Cuisine.findByPk(id);
      if (!findCuisine) throw { name: "InvalidData" };

      const fileData = req.file.buffer.toString("base64");

      const form = new FormData();
      form.append("file", fileData);
      form.append("fileName", req.file.originalname);
      // console.log(form);

      const response = await instance.post("/files/upload", form);

      // console.log(response.data);

      await Cuisine.update({ imgUrl: response.url }, { where: { id } });

      res.status(200).json({
        message: `Image ${findCuisine.name} success to update`,
      });
    } catch (error) {
      next(error);
    }
  }

  static async deleteCuisine(req, res, next) {
    try {
      const { id } = req.params;
      const findCuisine = await Cuisine.findOne({ where: { id } });

      if (!findCuisine) throw { name: "NotFound" };

      const deleteCuisine = await Cuisine.destroy({ where: { id } });

      res.status(200).json({
        message: `${findCuisine.name} success to delete`,
      });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = CuisineStatic;
