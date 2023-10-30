const router = require("express").Router();
const CuisineStatic = require("../controllers/cuisineStatic");

router.get("/", CuisineStatic.getCuisine);
router.get("/:id", CuisineStatic.detailCuisine);

module.exports = router;
