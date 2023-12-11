const { Category } = require("../models");

class CategoryStatic {
  static async getCategory(req, res, next) {
    try {
      const getCategory = await Category.findAll();

      res.status(200).json({
        getCategory,
      });
    } catch (error) {
      next(error);
    }
  }

  static async postCategory(req, res, next) {
    try {
      const { name } = req.body;

      if (!name) throw { name: "NameEmpty" };

      const addCategory = await Category.create({
        name,
      });

      res.status(201).json({
        addCategory,
      });
    } catch (error) {
      next(error);
    }
  }

  static async updateCategory(req, res, next) {
    try {
      const { id } = req.params;
      const { name } = req.body;

      if (!name) throw { name: "NameEmpty" };

      const findCategory = await Category.findByPk(id);
      if (!findCategory) throw { name: "NotFound" };

      const editCategory = await Category.update(
        { name: name },
        { where: { id } }
      );

      const updatedCategory = await Category.findByPk(id);

      res.status(200).json({
        updatedCategory,
      });
    } catch (error) {
      next(error);
    }
  }

  static async deleteCategory(req, res, next) {
    try {
      const { id } = req.params;

      const findCategory = await Category.findByPk(id);
      if (!findCategory) throw { name: "NotFound" };

      const delCategory = await Category.destroy({
        where: { id },
      });

      res.status(200).json({
        message: `${findCategory.name} success to delete`,
      });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = CategoryStatic;
