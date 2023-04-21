const express = require("express");

const ctrl = require("../../controllers/auth-controllers");

const { validateBody } = require("../../utils");

const { authenficate, upload, imageCompression } = require("../../middlewares");

const { schemas } = require("../../models/user");

const router = express.Router();

router.post("/register", validateBody(schemas.registerSchema), ctrl.register);

router.post("/login", validateBody(schemas.loginSchema), ctrl.login);

router.get("/current", authenficate, ctrl.getCurrent);

router.post("/logout", authenficate, ctrl.logout);

router.patch("/", authenficate, validateBody(schemas.subscriptionSchema), ctrl.updateSubscription);

router.patch(
  "/avatars",
  authenficate,
  upload.single("avatar"),
  imageCompression,
  ctrl.updateAvatar
);

module.exports = router;
