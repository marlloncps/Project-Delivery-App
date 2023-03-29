const { Router } = require('express');
const salesController = require('../controller/salesController');

const router = Router();

router.get(
  '/:id',
  salesController.findSaleById,
);

router.post(
  '/',
  salesController.updateSales,
);

module.exports = router;
