const { Category } = require("../models");

class CategoryStatic {
  static async getCategory(req, res, next) {
    try {
      const allCategory = await Category.findAll();

      rest.status(200).json({
        message: `Success get all category`,
      });
    } catch (error) {
      next(error);
    }
  }

  static async postCategory(req, res, next) {
    try {
      const { name } = req.body;

      const addCategory = await Category.create({
        name,
      });

      res.status(201).json({
        message: `Data with ${name} success registered`,
      });
    } catch (error) {
      next(error);
    }
  }

  static async updateCategory(req, res, next) {
    try {
      const { id } = req.params;
      const { name } = req.body;

      const findCategory = await Category.findByPk(id);
      if (!findCategory) throw { name: "NotFound" };

      const updateCategory = await Category.update(
        { name: name },
        { where: { id } }
      );

      res.status(200).json({
        message: `Data with Id ${id} Success Update`,
      });
    } catch (error) {
      next(error);
    }
  }

  static async deleteCategory(req, res, next) {
    try {
      const { id } = req.params;

      const delCategory = await Category.destroy({
        where: { id },
      });

      res.status(200).json({
        message: `Data with Id ${id} success deleted`,
      });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = CategoryStatic;
