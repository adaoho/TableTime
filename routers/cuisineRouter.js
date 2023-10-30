const CuisineStatic = require("../controllers/cuisineStatic");
const router = require("express").Router();

router.post("/", CuisineStatic.postCuisine);
router.get("/", CuisineStatic.getCuisine);
router.get("/:id", CuisineStatic.detailCuisine);
router.put("/:id", CuisineStatic.updateCuisine);
router.delete("/:id", CuisineStatic.deleteCuisine);

module.exports = router;
