const ConfigService = require('../services/ConfigService')

const createConfig = async (req, res) => {
    try {
        const { author, email, type, phone, zalo, facebook, address, metadesc,metakey } = req.body
        if (!author || !email || !type || !phone || !zalo || !facebook || !address || !metadesc || !metakey) {
            return res.status(200).json({
                status: 'ERR',
                message: 'The input is required'
            })
        }
        const response = await ConfigService.createConfig(req.body)
        return res.status(200).json(response)
    } catch (e) {
        return res.status(404).json({
            message: e
        })
    }
}

const updateConfig = async (req, res) => {
    try {
        const configId = req.params.id
        const data = req.body
        if (!configId) {
            return res.status(200).json({
                status: 'ERR',
                message: 'The configId is required'
            })
        }
        const response = await ConfigService.updateConfig(configId, data)
        return res.status(200).json(response)
    } catch (e) {
        return res.status(404).json({
            message: e
        })
    }
}

const getDetailsConfig = async (req, res) => {
    try {
        const configId = req.params.id
        if (!configId) {
            return res.status(200).json({
                status: 'ERR',
                message: 'The configId is required'
            })
        }
        const response = await ConfigService.getDetailsConfig(configId)
        return res.status(200).json(response)
    } catch (e) {
        return res.status(404).json({
            message: e
        })
    }
}

const deleteConfig = async (req, res) => {
    try {
        const configId = req.params.id
        if (!configId) {
            return res.status(200).json({
                status: 'ERR',
                message: 'The configId is required'
            })
        }
        const response = await ConfigService.deleteConfig(configId)
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
        const response = await ConfigService.deleteManyConfig(ids)
        return res.status(200).json(response)
    } catch (e) {
        return res.status(404).json({
            message: e
        })
    }
}

const getAllConfig = async (req, res) => {
    try {
        const { limit, page, sort, filter } = req.query
        const response = await ConfigService.getAllConfig(Number(limit) || null, Number(page) || 0, sort, filter)
        return res.status(200).json(response)
    } catch (e) {
        return res.status(404).json({
            message: e
        })
    }
}

const getAllType = async (req, res) => {
    try {
        const response = await ConfigService.getAllType()
        return res.status(200).json(response)
    } catch (e) {
        return res.status(404).json({
            message: e
        })
    }
}

module.exports = {
    createConfig,
    updateConfig,
    getDetailsConfig,
    deleteConfig,
    getAllConfig,
    deleteMany,
    getAllType
}
