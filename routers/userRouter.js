const UserStatic = require("../controllers/userStatic");
const router = require("express").Router();

router.post("/login", UserStatic.userLogin);
router.post("/register", UserStatic.userRegister);

module.exports = router;
