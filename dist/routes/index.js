"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const router = express.Router();
router.get("/", (req, res) => {
    res.send("我是主路由!!!!!!");
});
module.exports = router;
