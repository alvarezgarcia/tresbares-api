const express = require('express');

const tableController = require('./../../controllers/table/table.controller');

const router = express.Router();

router.delete('/:tableId/dish/:idServed', tableController.deleteDish);
router.post('/:tableId/dish', tableController.addDish);
router.post('/:tableId/open', tableController.openTable);
router.post('/:tableId/close', tableController.closeTable);
router.get('/:tableId', tableController.get);
router.get('/', tableController.getAll);

router.use((err, req, res, next) => {
  console.log(err);

  res.status(err.status);
  return res.send(err)
});


module.exports = router;
