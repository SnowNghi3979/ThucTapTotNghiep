const BrandService = require('../services/BrandService')

const createBrand = async (req, res) => {
    try {
        const { name, image, type,  description, slug } = req.body
        if (!name || !image || !type ||  !slug) {
            return res.status(200).json({
                status: 'ERR',
                message: 'The input is required'
            })
        }
        const response = await BrandService.createBrand(req.body)
        return res.status(200).json(response)
    } catch (e) {
        return res.status(404).json({
            message: e
        })
    }
}

const updateBrand = async (req, res) => {
    try {
        const brandId = req.params.id
        const data = req.body
        if (!brandId) {
            return res.status(200).json({
                status: 'ERR',
                message: 'The brandId is required'
            })
        }
        const response = await BrandService.updateBrand(brandId, data)
        return res.status(200).json(response)
    } catch (e) {
        return res.status(404).json({
            message: e
        })
    }
}

const getDetailsBrand = async (req, res) => {
    try {
        const brandId = req.params.id
        if (!brandId) {
            return res.status(200).json({
                status: 'ERR',
                message: 'The brandId is required'
            })
        }
        const response = await BrandService.getDetailsBrand(brandId)
        return res.status(200).json(response)
    } catch (e) {
        return res.status(404).json({
            message: e
        })
    }
}

const deleteBrand = async (req, res) => {
    try {
        const brandId = req.params.id
        if (!brandId) {
            return res.status(200).json({
                status: 'ERR',
                message: 'The brandId is required'
            })
        }
        const response = await BrandService.deleteBrand(brandId)
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
        const response = await BrandService.deleteManyBrand(ids)
        return res.status(200).json(response)
    } catch (e) {
        return res.status(404).json({
            message: e
        })
    }
}

const getAllBrand = async (req, res) => {
    try {
        const { limit, page, sort, filter } = req.query
        const response = await BrandService.getAllBrand(Number(limit) || null, Number(page) || 0, sort, filter)
        return res.status(200).json(response)
    } catch (e) {
        return res.status(404).json({
            message: e
        })
    }
}

const getAllType = async (req, res) => {
    try {
        const response = await BrandService.getAllType()
        return res.status(200).json(response)
    } catch (e) {
        return res.status(404).json({
            message: e
        })
    }
}

module.exports = {
    createBrand,
    updateBrand,
    getDetailsBrand,
    deleteBrand,
    getAllBrand,
    deleteMany,
    getAllType
}
