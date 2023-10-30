const router = require("express").Router();
const userRouter = require("./userRouter");
const cuisineRouter = require("./cuisineRouter");
const categoryRouter = require("./categoryRouter");
const publicRouter = require("./publicRouter");
const authentication = require("../middlewares/authentication");

// router.use(authentication)

// Dashboard Admin -- Authentication
router.use("/user", userRouter);
router.use("/cuisine", cuisineRouter);
router.use("/category", categoryRouter);

// Ini untuk Public
router.use("/pub", publicRouter);

module.exports = router;
