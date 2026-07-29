/**
 * Role Routes
 */

const express = require("express");
const router = express.Router();
const roleHandler = require("./handler");
const authMiddleware = require("../../middleware/auth");
const { ADMIN } = require("../../../pkg/constants/roles");

// Admin only routes
router.use(authMiddleware([ADMIN]));

router.get("/", roleHandler.getAll);
router.get("/:id", roleHandler.getById);
router.post("/", roleHandler.create);
router.put("/:id", roleHandler.update);
router.delete("/:id", roleHandler.remove);

module.exports = router;
