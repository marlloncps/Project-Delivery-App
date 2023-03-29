const { Router } = require('express');
const salesController = require('../controller/salesController');
const validate = require('../middlewares/Validate');

const router = Router();

router.post('/sales', validate.validateToken, salesController.findSellerSales);

module.exports = router;
