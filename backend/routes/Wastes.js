const express = require('express');
const router = express.Router();

const { Wastes, sequelize } = require("../models");


router.get("/maps", async (req, res) => { 
    const wasteList = await Wastes.findAll();
    res.json(wasteList);
});

router.post("/", async (req, res) => {
    const Posts=req.body;
    await Wastes.create(Posts);
});
module.exports = router ;