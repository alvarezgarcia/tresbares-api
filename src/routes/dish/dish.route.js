const express = require('express');

const dishController = require('./../../controllers/dish/dish.controller');

const router = express.Router();

router.get('/:dishId', dishController.get);
router.get('/', dishController.getAll);

router.use((err, req, res, next) => {
  console.log(err);

  res.status(err.status);
  return res.send(err)
});

module.exports = router;
