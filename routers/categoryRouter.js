const CategoryStatic = require("../controllers/categoryStatic");
const router = require("express").Router();

router.post("/", CategoryStatic.postCategory);
router.get("/", CategoryStatic.getCategory);
router.put("/:id", CategoryStatic.getCategory);
router.delete("/:id", CategoryStatic.getCategory);

module.exports = router;
