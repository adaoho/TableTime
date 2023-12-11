"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Cuisine extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Cuisine.belongsTo(models.User, { foreignKey: "authorId" });
      Cuisine.belongsTo(models.Category, { foreignKey: "categoryId" });
    }
  }
  Cuisine.init(
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: {
            msg: `Name can't be Empty`,
          },
          notNull: {
            msg: `Name can't be Empty`,
          },
        },
      },
      description: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: {
            msg: `Description can't be Empty`,
          },
          notNull: {
            msg: `Description can't be Empty`,
          },
        },
      },
      price: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: {
            msg: `Price can't be Empty`,
          },
          notNull: {
            msg: `Price can't be Empty`,
          },
          min: {
            args: 8000,
            msg: "Mimimum Price is Rp 8.000",
          },
        },
      },
      imgUrl: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: {
            msg: `Image URL can't be Empty`,
          },
          notNull: {
            msg: `Image URL can't be Empty`,
          },
        },
      },
      categoryId: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: {
            msg: `categoryId can't be Empty`,
          },
          notNull: {
            msg: `categoryId can't be Empty`,
          },
        },
      },
      authorId: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: {
            msg: `authorId can't be Empty`,
          },
          notNull: {
            msg: `authorId can't be Empty`,
          },
        },
      },
    },
    {
      sequelize,
      modelName: "Cuisine",
    }
  );
  return Cuisine;
};
