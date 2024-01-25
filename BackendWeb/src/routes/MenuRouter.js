const express = require("express");
const router = express.Router()
const MenuController = require('../controllers/MenuController');
const { authMiddleWare } = require("../middleware/authMiddleware");

router.post('/create', MenuController.createMenu)
router.put('/update/:id',  MenuController.updateMenu)
router.get('/get-details/:id', MenuController.getDetailsMenu)
router.delete('/delete/:id',  MenuController.deleteMenu)
router.get('/get-all', MenuController.getAllMenu)
router.post('/delete-many', authMiddleWare, MenuController.deleteMany)
router.get('/get-all-link', MenuController.getAllTypeMenu)

module.exports = router