/*
    Layer ini mendefinisikan endpoint untuk supplier
*/
const express = require("express");
const router = express.Router();
const supplierHandler = require("./handler");

router.get("/", supplierHandler.getAll);

router.post("/create", supplierHandler.create);

router.put("/edit/:id", supplierHandler.edit);

router.get("/detail/:id", supplierHandler.detail);

router.delete("/remove/:id", supplierHandler.remove);

module.exports = router;
