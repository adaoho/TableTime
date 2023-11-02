const { comparePassword } = require("../helpers/bcrypt");
const { createToken } = require("../helpers/jwt");
const { User } = require("../models");

class UserStatic {
  static async addUser(req, res, next) {
    try {
      const { username, email, password, phoneNumber, address } = req.body;

      if (!email) throw { name: `EmailEmpty` };
      if (!password) throw { name: `PasswordEmpty` };

      await User.create({
        username,
        email,
        password,
        phoneNumber,
        address,
        role: "staff",
      });

      const newUser = await User.findOne({
        attributes: {
          exclude: ["password", "phoneNumber", "createdAt", "updatedAt"],
        },
        where: { email },
      });

      // console.log(newUser);

      res.status(201).json({
        newUser,
      });
    } catch (error) {
      next(error);
    }
  }

  static async userLogin(req, res, next) {
    try {
      const { email, password } = req.body;

      if (!email) throw { name: `EmailEmpty` };
      if (!password) throw { name: `PasswordEmpty` };

      const findUser = await User.findOne({ where: { email } });

      if (!findUser) throw { name: "InvalidLogin" };

      const isValidPassword = comparePassword(password, findUser.password);

      if (!isValidPassword) throw { name: "InvalidLogin" };

      const access_token = createToken({
        id: findUser.id,
        email: findUser.email,
        role: findUser.role,
      });

      res.status(200).json({
        access_token,
      });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = UserStatic;
