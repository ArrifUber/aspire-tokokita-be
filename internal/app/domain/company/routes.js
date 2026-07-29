const express = require("express");
const router = express.Router();
const companyHandler = require("./handler");
const JWTMiddleware = require("../../../pkg/middleware/jwt");

// Apply JWT Middleware
router.use(JWTMiddleware);

router.get("/", companyHandler.getAll);
router.get("/:id", companyHandler.getById);
router.post("/", companyHandler.create);
router.put("/:id", companyHandler.update);
router.delete("/:id", companyHandler.remove);

module.exports = router;
