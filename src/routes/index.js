const express = require('express');

const tableRouter = require('./table/table.route');
const dishRouter = require('./dish/dish.route');

const router = express.Router();

router.use('/table', tableRouter);
router.use('/dish', dishRouter);

router.get('/health', (req, res, next) => res.json({ok: true}));

module.exports = router;
