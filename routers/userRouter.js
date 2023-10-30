const UserStatic = require("../controllers/userStatic");
const router = require("express").Router();
const authentication = require("../middlewares/authentication");

router.post("/login", UserStatic.userLogin);
router.post("/register", authentication, UserStatic.userRegister);

module.exports = router;
