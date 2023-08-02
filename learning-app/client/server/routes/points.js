var express = require('express');
var router = express.Router();
const db = require("../models");

router.get('/', function(req, res, next) {
  db.Points.findAll()
    .then(points => {
      res.json(points);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({msg: "error", details: err});
    });
});

router.put('/:id', function(req, res, next) {
  db.Points.update(
    req.body,
    { where: { id: req.params.id }}
  )
  .then(() => {
    res.status(200).json({msg: "Updated Successfully"});
  })
  .catch(err => {
    console.log(err);
    res.status(500).json({msg: "error", details: err});
  });
});

module.exports = router;