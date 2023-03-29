const { Router } = require('express');
const productController = require('../controller/productController');
const salesController = require('../controller/salesController');

const router = Router();

router.get(
  '/products',
  productController.findAllProduct,
);
router.get(
  '/:id',
  productController.findIdProduct,
);
router.post(
  '/order',
  salesController.createSales,
);
router.get(
  '/order/:id',
  salesController.findIdSales,
);
router.get(
  '/order',
  salesController.findUserSales,
);

module.exports = router;
