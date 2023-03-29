const { Router } = require('express');
const registerController = require('../controller/registerController');

const router = Router();

router.post('/', registerController);

module.exports = router;
