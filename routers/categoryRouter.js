const CategoryStatic = require("../controllers/categoryStatic");
const router = require("express").Router();

router.post("/", CategoryStatic.postCategory);
router.get("/", CategoryStatic.getCategory);
router.put("/:id", CategoryStatic.updateCategory);
router.delete("/:id", CategoryStatic.deleteCategory);

module.exports = router;
