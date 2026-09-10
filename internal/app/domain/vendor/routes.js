/*
    Layer ini mendefinisikan endpoint untuk supplier
*/
const express = require("express");
const router = express.Router();
const vendorHandler = require("./handler");

router.get("/", vendorHandler.getAll);

router.post("/create", vendorHandler.create);

// router.put("/edit/:id", vendorHandler.edit);

// router.get("/detail/:id", vendorHandler.detail);

// router.delete("/remove/:id", vendorHandler.remove);

module.exports = router;
