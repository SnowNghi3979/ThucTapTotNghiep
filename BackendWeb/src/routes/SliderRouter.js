const express = require("express");
const router = express.Router()
const SliderController = require('../controllers/SliderController');
const { authMiddleWare } = require("../middleware/authMiddleware");

router.post('/create', SliderController.createSlider)
router.put('/update/:id',  SliderController.updateSlider)
router.get('/get-details/:id', SliderController.getDetailsSlider)
router.delete('/delete/:id',  SliderController.deleteSlider)
router.get('/get-all', SliderController.getAllSlider)
router.post('/delete-many', authMiddleWare, SliderController.deleteMany)
router.get('/get-all-image', SliderController.getAllSliderImage)

module.exports = router