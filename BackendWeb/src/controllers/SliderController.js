const SliderService = require('../services/SliderService')

const createSlider = async (req, res) => {
    try {
        const { name, image, type, link, position,description } = req.body
        if (!name || !image || !type || !link || !position ) {
            return res.status(200).json({
                status: 'ERR',
                message: 'The input is required'
            })
        }
        const response = await SliderService.createSlider(req.body)
        return res.status(200).json(response)
    } catch (e) {
        return res.status(404).json({
            message: e
        })
    }
}

const updateSlider = async (req, res) => {
    try {
        const sliderId = req.params.id
        const data = req.body
        if (!sliderId) {
            return res.status(200).json({
                status: 'ERR',
                message: 'The sliderId is required'
            })
        }
        const response = await SliderService.updateSlider(sliderId, data)
        return res.status(200).json(response)
    } catch (e) {
        return res.status(404).json({
            message: e
        })
    }
}

const getDetailsSlider = async (req, res) => {
    try {
        const sliderId = req.params.id
        if (!sliderId) {
            return res.status(200).json({
                status: 'ERR',
                message: 'The sliderId is required'
            })
        }
        const response = await SliderService.getDetailsSlider(sliderId)
        return res.status(200).json(response)
    } catch (e) {
        return res.status(404).json({
            message: e
        })
    }
}

const deleteSlider = async (req, res) => {
    try {
        const sliderId = req.params.id
        if (!sliderId) {
            return res.status(200).json({
                status: 'ERR',
                message: 'The sliderId is required'
            })
        }
        const response = await SliderService.deleteSlider(sliderId)
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
        const response = await SliderService.deleteManySlider(ids)
        return res.status(200).json(response)
    } catch (e) {
        return res.status(404).json({
            message: e
        })
    }
}

const getAllSlider = async (req, res) => {
    try {
        const { limit, page, sort, filter } = req.query
        const response = await SliderService.getAllSlider(Number(limit) || null, Number(page) || 0, sort, filter)
        return res.status(200).json(response)
    } catch (e) {
        return res.status(404).json({
            message: e
        })
    }
}

const getAllSliderImage = async (req, res) => {
    try {
        const response = await SliderService.getAllSliderImage()
        return res.status(200).json(response)
    } catch (e) {
        return res.status(404).json({
            message: e
        })
    }
}

module.exports = {
    createSlider,
    updateSlider,
    getDetailsSlider,
    deleteSlider,
    getAllSlider,
    deleteMany,
    getAllSliderImage
}
