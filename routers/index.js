const router = require("express").Router();
const userRouter = require("./userRouter");
const cuisineRouter = require("./cuisineRouter");
const categoryRouter = require("./categoryRouter");
const publicRouter = require("./publicRouter");
const authentication = require("../middlewares/authentication");

router.use("/user", userRouter);
router.use("/pub", publicRouter);

router.use(authentication);
router.use("/cuisine", cuisineRouter);
router.use("/category", categoryRouter);

module.exports = router;
