const express = require("express");
const router = express.Router()
const BrandController = require('../controllers/BrandController');
const { authMiddleWare } = require("../middleware/authMiddleware");

router.post('/create', BrandController.createBrand)
router.put('/update/:id',  BrandController.updateBrand)
router.get('/get-details/:id', BrandController.getDetailsBrand)
router.delete('/delete/:id',  BrandController.deleteBrand)
router.get('/get-all', BrandController.getAllBrand)
router.post('/delete-many', authMiddleWare, BrandController.deleteMany)
router.get('/get-all-type', BrandController.getAllType)

module.exports = router