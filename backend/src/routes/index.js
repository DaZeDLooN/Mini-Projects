const router = require("express").Router();
const userRouter = require("./user.route");

router.use("/users", userRouter);

module.exports = router;
