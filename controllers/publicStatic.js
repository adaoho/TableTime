const { Cuisine, Category } = require("../models");
const { Op } = require("sequelize");

class PublicStatic {
  static async getCuisinePublic(req, res, next) {
    try {
      let option = {
        include: {
          model: Category,
          attributes: {
            exclude: ["createdAt", "updatedAt"],
          },
        },
        attributes: {
          exclude: ["createdAt", "updatedAt"],
        },
      };

      let limit = 10;
      const { name, page, category, sort } = req.query;

      if (name || category || sort) {
        option.where = {};
        if (name) {
          option.where.name = { [Op.iLike]: `%${name}%` };
        }
        if (category) {
          let splitCategory = category.split(",");
          option.where.categoryId = { [Op.or]: splitCategory };
        }
        if (sort) {
          if (sort.charAt(0) !== "-") {
            option.order = [[sort, "ASC"]];
          } else {
            option.order = [[sort.slice(1), "DESC"]];
          }
        }
      }

      if (page) {
        option.limit = limit;
        option.offset = page * limit - limit;
      } else {
        option.offset = 0;
        option.limit = limit;
      }

      const { rows, count } = await Cuisine.findAndCountAll(option);

      res.status(200).json({
        currentPage: page || 1,
        totalData: count,
        totalPage: Math.ceil(count / limit),
        getCuisine: rows,
      });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = PublicStatic;
