const { Cuisine } = require("../models");

class CuisineStatic {
  static async postCuisine(req, res, next) {
    try {
      const { name, description, price, imgUrl, categoryId } = req.body;
    } catch (error) {
      next(error);
    }
  }

  static async getCuisine(req, res, next) {
    try {
    } catch (error) {
      next(error);
    }
  }

  static async detailCuisine(req, res, next) {
    try {
    } catch (error) {
      next(error);
    }
  }

  static async updateCuisine(req, res, next) {
    try {
    } catch (error) {
      next(error);
    }
  }

  static async deleteCuisine(req, res, next) {
    try {
    } catch (error) {
      next(error);
    }
  }
}

module.exports = CuisineStatic;
