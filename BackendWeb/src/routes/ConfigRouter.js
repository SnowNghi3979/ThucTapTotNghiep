const express = require("express");
const router = express.Router()
const ConfigController = require('../controllers/ConfigController');
const { authMiddleWare } = require("../middleware/authMiddleware");

router.post('/create', ConfigController.createConfig)
router.put('/update/:id',  ConfigController.updateConfig)
router.get('/get-details/:id', ConfigController.getDetailsConfig)
router.delete('/delete/:id',  ConfigController.deleteConfig)
router.get('/get-all', ConfigController.getAllConfig)
router.post('/delete-many', authMiddleWare, ConfigController.deleteMany)
router.get('/get-all-type', ConfigController.getAllType)

module.exports = router