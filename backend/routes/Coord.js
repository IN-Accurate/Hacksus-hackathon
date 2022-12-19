const express = require('express');
const router = express.Router();

const { Coord, sequelize } = require("../models");


router.get("/maps", async (req, res) => { 
    const CoordList = await Coord.findAll();
    res.json(CoordList);
});

router.post("/", async (req, res) => {
    const Posts=req.body;
    await Coord.create(Posts);
});
module.exports = router ;