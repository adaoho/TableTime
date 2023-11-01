const CuisineStatic = require("../controllers/cuisineStatic");
const { authorizationCuisine } = require("../middlewares/authorization");
const router = require("express").Router();
const middlewareUpload = require("../middlewares/uploadFile");

router.post("/", CuisineStatic.postCuisine);
router.get("/", CuisineStatic.getCuisine);
router.get("/:id", CuisineStatic.detailCuisine);
router.put("/:id", authorizationCuisine, CuisineStatic.updateCuisine);
router.patch(
  "/:id",
  authorizationCuisine,
  middlewareUpload,
  CuisineStatic.updateImageUrl
);
router.delete("/:id", authorizationCuisine, CuisineStatic.deleteCuisine);

module.exports = router;
