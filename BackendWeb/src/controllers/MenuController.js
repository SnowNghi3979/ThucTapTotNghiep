const MenuService = require('../services/MenuService')

const createMenu = async (req, res) => {
    try {
        const { name, type,  description, link } = req.body
        if (!name || !link || !type ) {
            return res.status(200).json({
                status: 'ERR',
                message: 'The input is required'
            })
        }
        const response = await MenuService.createMenu(req.body)
        return res.status(200).json(response)
    } catch (e) {
        return res.status(404).json({
            message: e
        })
    }
}

const updateMenu = async (req, res) => {
    try {
        const menuId = req.params.id
        const data = req.body
        if (!menuId) {
            return res.status(200).json({
                status: 'ERR',
                message: 'The menuId is required'
            })
        }
        const response = await MenuService.updateMenu(menuId, data)
        return res.status(200).json(response)
    } catch (e) {
        return res.status(404).json({
            message: e
        })
    }
}

const getDetailsMenu = async (req, res) => {
    try {
        const menuId = req.params.id
        if (!menuId) {
            return res.status(200).json({
                status: 'ERR',
                message: 'The menuId is required'
            })
        }
        const response = await MenuService.getDetailsMenu(menuId)
        return res.status(200).json(response)
    } catch (e) {
        return res.status(404).json({
            message: e
        })
    }
}

const deleteMenu = async (req, res) => {
    try {
        const menuId = req.params.id
        if (!menuId) {
            return res.status(200).json({
                status: 'ERR',
                message: 'The menuId is required'
            })
        }
        const response = await MenuService.deleteMenu(menuId)
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
        const response = await MenuService.deleteManyMenu(ids)
        return res.status(200).json(response)
    } catch (e) {
        return res.status(404).json({
            message: e
        })
    }
}

const getAllMenu = async (req, res) => {
    try {
        const { limit, page, sort, filter } = req.query
        const response = await MenuService.getAllMenu(Number(limit) || null, Number(page) || 0, sort, filter)
        return res.status(200).json(response)
    } catch (e) {
        return res.status(404).json({
            message: e
        })
    }
}

const getAllTypeMenu = async (req, res) => {
    try {
        const response = await MenuService.getAllTypeMenu()
        return res.status(200).json(response)
    } catch (e) {
        return res.status(404).json({
            message: e
        })
    }
}

module.exports = {
    createMenu,
    updateMenu,
    getDetailsMenu,
    deleteMenu,
    getAllMenu,
    deleteMany,
    getAllTypeMenu
}
