const { Cuisine } = require("../models");

async function authorization(req, res, next) {
  const { id, role } = req.user;
  const idCuisine = req.params.id;

  try {
    const findCuisine = await Cuisine.findOne({ where: { id: idCuisine } });

    if (!findCuisine) {
      throw { name: `InvalidId` };
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

module.exports = authorization;
