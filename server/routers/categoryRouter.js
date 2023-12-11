const CategoryStatic = require("../controllers/categoryStatic");
const router = require("express").Router();
const { authorizationUser } = require("../middlewares/authorization");

router.post("/", CategoryStatic.postCategory);
router.get("/", CategoryStatic.getCategory);
router.put("/:id", authorizationUser, CategoryStatic.updateCategory);
router.delete("/:id", authorizationUser, CategoryStatic.deleteCategory);

module.exports = router;
