const express = require('express');
const router = express.Router();
const { Tutorial, Sequelize } = require('../models');
const yup = require("yup");

router.post("/", async (req, res) => {
    let data = req.body;
    // Validate request body
    let validationSchema = yup.object().shape({
        area: yup.string().trim().min(3).max(100).required(),
        location: yup.string().trim().min(3).max(500).required(),
        stationid: yup.string().trim().min(3).max(100).required(),
        status: yup.string().trim().min(3).max(100).required(),
    });
    try {
        await validationSchema.validate(data, { abortEarly: false });
    }
    catch (err) {
        console.error(err);
        res.status(400).json({ errors: err.errors });
        return;
    }

    data.area = data.area.trim();
    data.location = data.location.trim();
    data.stationid = data.stationid.trim();
    data.status = data.status.trim();
    let result = await Tutorial.create(data);
    res.json(result);
});

router.get("/", async (req, res) => {
    let condition = {};
    let search = req.query.search;
    if (search) {
        condition[Sequelize.Op.or] = [
            { area: { [Sequelize.Op.like]: `%${search}%` } },
            { location: { [Sequelize.Op.like]: `%${search}%` } },
            { stationid: { [Sequelize.Op.like]: `%${search}%` } },
            { status: { [Sequelize.Op.like]: `%${search}%` } }
        ];
    }

    let list = await Tutorial.findAll({
        where: condition,
        order: [['createdAt', 'DESC']]
    });
    res.json(list);
});

router.get("/:id", async (req, res) => {
    let id = req.params.id;
    let tutorial = await Tutorial.findByPk(id);
    // Check id not found
    if (!tutorial) {
        res.sendStatus(404);
        return;
    }
    res.json(tutorial);
});

router.put("/:id", async (req, res) => {
    let id = req.params.id;
    // Check id not found
    let tutorial = await Tutorial.findByPk(id);
    if (!tutorial) {
        res.sendStatus(404);
        return;
    }
    
    let data = req.body;
    // Validate request body
    let validationSchema = yup.object().shape({
        area: yup.string().trim().min(3).max(100).required(),
        location: yup.string().trim().min(3).max(500).required(),
        stationid: yup.string().trim().min(3).max(100).required(),
        status: yup.string().trim().min(3).max(100).required(),
    });
    try {
        await validationSchema.validate(data, { abortEarly: false });
    }
    catch (err) {
        console.error(err);
        res.status(400).json({ errors: err.errors });
        return;
    }

    data.area = data.area.trim();
    data.location = data.location.trim();
    data.stationid = data.stationid.trim();
    data.status = data.status.trim();
    let num = await Tutorial.update(data, {
        where: { id: id }
    });
    if (num == 1) {
        res.json({
            message: "Charging Station was updated successfully."
        });
    }
    else {
        res.status(400).json({
            message: `Cannot update Charging Station with id ${id}.`
        });
    }
});

router.delete("/:id", async (req, res) => {
    let id = req.params.id;
    // Check id not found
    let tutorial = await Tutorial.findByPk(id);
    if (!tutorial) {
        res.sendStatus(404);
        return;
    }

    let num = await Tutorial.destroy({
        where: { id: id }
    })
    if (num == 1) {
        res.json({
            message: "Charging Station was deleted successfully."
        });
    }
    else {
        res.status(400).json({
            message: `Cannot delete Charging Station with id ${id}.`
        });
    }
});

module.exports = router;