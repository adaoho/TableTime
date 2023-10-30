const { Cuisine } = require("../models");

class CuisineStatic {
  static async postCuisine(req, res, next) {
    try {
      const authorId = req.user.id;
      const { name, description, price, imgUrl, categoryId } = req.body;

      const createCuisine = await Cuisine.create({
        name,
        description,
        price,
        imgUrl,
        categoryId,
        authordId,
      });

      res.status(201).json({
        message: `${name} is added successfully!`,
      });
    } catch (error) {
      next(error);
    }
  }

  static async getCuisine(req, res, next) {
    try {
      const getCuisine = await Cuisine.findAll();

      res.status(200).json({
        message: `Get All Data Cuisine Success`,
      });
    } catch (error) {
      next(error);
    }
  }

  static async detailCuisine(req, res, next) {
    try {
      const { id } = req.params;

      const detailCuisine = await Cuisine.findByPk(id);

      if (!detailCuisine) throw { name: "NotFound" };

      res.status(200).json({
        message: `Get Data from id from ${id} Success`,
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

      const updateCuisine = await Cuisine.update(
        { name, description, price, imageUrl, categoryId },
        { where: { id } }
      );

      res.status(201).json({
        message: `Data ${name} updated successfully`,
      });
    } catch (error) {
      next(error);
    }
  }

  static async deleteCuisine(req, res, next) {
    try {
      const { id } = req.params;
      const deleteCuisine = await Cuisine.destroy({ where: { id } });

      res.status(200).json({
        message: `Delete data with Id ${id} Success Delete`,
      });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = CuisineStatic;
