const express = require('express');
const router = express.Router();
const { Tutorial, Sequelize } = require('../models');
const yup = require("yup");

router.post("/", async (req, res) => {
    let data = req.body;
    // Validate request body
    let validationSchema = yup.object().shape({
        couponCode: yup.string().trim().min(3).max(100).required(),
        discounts: yup.string().trim().oneOf(['10%', '20%', '30%', '40%', '100%']).required(),
        remarks: yup.string().trim().min(3).max(500),
        isRedeemed: yup.bool()
    });
    try {
        await validationSchema.validate(data, { abortEarly: false });
    }
    catch (err) {
        console.error(err);
        res.status(400).json({ errors: err.errors });
        return;
    }

    data.couponCode = data.couponCode.trim();
    data.remarks = data.remarks.trim();
    let result = await Tutorial.create(data);
    res.json(result);
});

router.get("/", async (req, res) => {
    let condition = {};
    let search = req.query.search;
    if (search) {
        condition[Sequelize.Op.or] = [
            { couponCode: { [Sequelize.Op.like]: `%${search}%` } },
            { remarks: { [Sequelize.Op.like]: `%${search}%` } }
        ];
    }

    let list = await Tutorial.findAll({
        where: condition,
        order: [['timeCreated', 'DESC']]
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
        couponCode: yup.string().trim().min(3).max(100).required(),
        discounts: yup.string().trim().oneOf(['10%', '20%', '30%', '40%', '100%']).required(),
        remarks: yup.string().trim().min(3).max(500),
        isRedeemed: yup.bool()
    });
    try {
        await validationSchema.validate(data, { abortEarly: false });
    }
    catch (err) {
        console.error(err);
        res.status(400).json({ errors: err.errors });
        return;
    }

    data.couponCode = data.couponCode.trim();
    data.remarks = data.remarks.trim();
    let num = await Tutorial.update(data, {
        where: { id: id }
    });
    if (num == 1) {
        res.json({
            message: "Tutorial was updated successfully."
        });
    }
    else {
        res.status(400).json({
            message: `Cannot update tutorial with id ${id}.`
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
            message: "Tutorial was deleted successfully."
        });
    }
    else {
        res.status(400).json({
            message: `Cannot delete tutorial with id ${id}.`
        });
    }
});

module.exports = router;