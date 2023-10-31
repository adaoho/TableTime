const UserStatic = require("../controllers/userStatic");
const router = require("express").Router();
const authentication = require("../middlewares/authentication");
const { authorizationUser } = require("../middlewares/authorization");

router.post("/login", UserStatic.userLogin);

router.use(authentication);
router.post("/add-user", authorizationUser, UserStatic.addUser);

module.exports = router;
