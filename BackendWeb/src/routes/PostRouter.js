const express = require("express");
const router = express.Router()
const PostController = require('../controllers/PostController');
const { authMiddleWare } = require("../middleware/authMiddleware");

router.post('/create', PostController.createPost)
router.put('/update/:id',  PostController.updatePost)
router.get('/get-details/:id', PostController.getDetailsPost)
router.delete('/delete/:id',  PostController.deletePost)
router.get('/get-all', PostController.getAllPost)
router.post('/delete-many', authMiddleWare, PostController.deleteMany)
router.get('/get-all-type', PostController.getAllType)

module.exports = router