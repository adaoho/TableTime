const CuisineStatic = require("../controllers/cuisineStatic");
const { authorizationCuisine } = require("../middlewares/authorization");
const router = require("express").Router();

router.post("/", CuisineStatic.postCuisine);
router.get("/", CuisineStatic.getCuisine);
router.get("/:id", CuisineStatic.detailCuisine);
router.put("/:id", authorizationCuisine, CuisineStatic.updateCuisine);
router.patch("/:id", authorizationCuisine, CuisineStatic.updateImageUrl);
router.delete("/:id", authorizationCuisine, CuisineStatic.deleteCuisine);

module.exports = router;
