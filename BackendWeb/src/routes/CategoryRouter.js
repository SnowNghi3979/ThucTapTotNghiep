const express = require("express");
const router = express.Router()
const CategoryController = require('../controllers/CategoryController');
const { authMiddleWare } = require("../middleware/authMiddleware");

router.post('/create', CategoryController.createCategory)
router.put('/update/:id',  CategoryController.updateCategory)
router.get('/get-details/:id', CategoryController.getDetailsCategory)
router.delete('/delete/:id',  CategoryController.deleteCategory)
router.get('/get-all', CategoryController.getAllCategory)
router.post('/delete-many', authMiddleWare, CategoryController.deleteMany)
router.get('/get-all-type', CategoryController.getAllType)

module.exports = router