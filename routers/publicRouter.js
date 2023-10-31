const router = require("express").Router();
const CuisineStatic = require("../controllers/cuisineStatic");
const PublicStatic = require("../controllers/publicStatic");

router.get("/", PublicStatic.getCuisinePublic);
router.get("/:id", CuisineStatic.detailCuisine);

module.exports = router;
