const { Cuisine, User } = require("../models");

async function authorizationCuisine(req, res, next) {
  const { id, role } = req.user;
  const idCuisine = req.params.id;

  try {
    const findCuisine = await Cuisine.findOne({ where: { id: idCuisine } });

    if (!findCuisine) {
      throw { name: `NotFound` };
    } else {
      if (findCuisine.authorId === id) {
        next();
      } else {
        if (role === "admin") {
          next();
        } else {
          throw { name: `InvalidRole` };
        }
      }
    }
  } catch (error) {
    next(error);
  }
}

async function authorizationUser(req, res, next) {
  try {
    const { id, role } = req.user;

    const findUser = await User.findByPk(id);

    if (!findUser) {
      throw { name: `InvalidId` };
    } else {
      if (role === "admin") {
        next();
      } else {
        throw { name: `InvalidRole` };
      }
    }
  } catch (error) {
    next(error);
  }
}

module.exports = { authorizationCuisine, authorizationUser };
