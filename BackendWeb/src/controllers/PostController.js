const PostService = require('../services/PostService')

const createPost = async (req, res) => {
    try {
        const { name, title, slug, detail, description, image, type } = req.body
        if (!name || !title || !slug || !detail ||  !image || !type) {
            return res.status(200).json({
                status: 'ERR',
                message: 'The input is required'
            })
        }
        const response = await PostService.createPost(req.body)
        return res.status(200).json(response)
    } catch (e) {
        return res.status(404).json({
            message: e
        })
    }
}

const updatePost = async (req, res) => {
    try {
        const postId = req.params.id
        const data = req.body
        if (!postId) {
            return res.status(200).json({
                status: 'ERR',
                message: 'The postId is required'
            })
        }
        const response = await PostService.updatePost(postId, data)
        return res.status(200).json(response)
    } catch (e) {
        return res.status(404).json({
            message: e
        })
    }
}

const getDetailsPost = async (req, res) => {
    try {
        const postId = req.params.id
        if (!postId) {
            return res.status(200).json({
                status: 'ERR',
                message: 'The postId is required'
            })
        }
        const response = await PostService.getDetailsPost(postId)
        return res.status(200).json(response)
    } catch (e) {
        return res.status(404).json({
            message: e
        })
    }
}

const deletePost = async (req, res) => {
    try {
        const postId = req.params.id
        if (!postId) {
            return res.status(200).json({
                status: 'ERR',
                message: 'The postId is required'
            })
        }
        const response = await PostService.deletePost(postId)
        return res.status(200).json(response)
    } catch (e) {
        return res.status(404).json({
            message: e
        })
    }
}

const deleteMany = async (req, res) => {
    try {
        const ids = req.body.ids
        if (!ids) {
            return res.status(200).json({
                status: 'ERR',
                message: 'The ids is required'
            })
        }
        const response = await PostService.deleteManyPost(ids)
        return res.status(200).json(response)
    } catch (e) {
        return res.status(404).json({
            message: e
        })
    }
}

const getAllPost = async (req, res) => {
    try {
        const { limit, page, sort, filter } = req.query
        const response = await PostService.getAllPost(Number(limit) || null, Number(page) || 0, sort, filter)
        return res.status(200).json(response)
    } catch (e) {
        return res.status(404).json({
            message: e
        })
    }
}

const getAllType = async (req, res) => {
    try {
        const response = await PostService.getAllType()
        return res.status(200).json(response)
    } catch (e) {
        return res.status(404).json({
            message: e
        })
    }
}

module.exports = {
    createPost,
    updatePost,
    getDetailsPost,
    deletePost,
    getAllPost,
    deleteMany,
    getAllType
}
