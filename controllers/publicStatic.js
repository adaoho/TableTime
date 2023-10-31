const { Cuisine, Category } = require("../models");
const { Op } = require("sequelize");

class PublicStatic {
  static async getCuisinePublic(req, res, next) {
    try {
      let option = {
        order: ["id", "ASC"],
        include: Category,
      };

      let limit = 10;
      const { name, page, category } = req.query;

      if (name || category) {
        option.where = {};
        if (name) {
          option.where.name = { [Op.iLike]: `%${name}%` };
        }
        if (category) {
          option.where.categoryId = { [Op.eq]: category };
        }
      }

      if (page) {
        option.limit = limit;
        option.offer = page * limit - limit;
      } else {
        option.offset = 0;
        option.limit = limit;
      }

      const { row, count } = await Cuisine.findAndCountAll(option);

      res.status(200).json({
        currentPage: page || 1,
        totalPage: Math.ceil(count / limit),
        getCuisine: row,
      });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = PublicStatic;
