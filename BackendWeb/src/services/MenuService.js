const Menu = require("../models/MenuModel")

const createMenu = (newMenu) => {
    return new Promise(async (resolve, reject) => {
        const { name, link, type,  description } = newMenu
        try {
            const checkMenu = await Menu.findOne({
                name: name
            })
            if (checkMenu !== null) {
                resolve({
                    status: 'ERR',
                    message: 'The name of menu is already'
                })
            }
            const newMenu = await Menu.create({
                name, 
                link, 
                type, 
                description,
            })
            if (newMenu) {
                resolve({
                    status: 'OK',
                    message: 'SUCCESS',
                    data: newMenu
                })
            }
        } catch (e) {
            reject(e)
        }
    })
}

const updateMenu = (id, data) => {
    return new Promise(async (resolve, reject) => {
        try {
            const checkMenu = await Menu.findOne({
                _id: id
            })
            if (checkMenu === null) {
                resolve({
                    status: 'ERR',
                    message: 'The menu is not defined'
                })
            }

            const updatedMenu = await Menu.findByIdAndUpdate(id, data, { new: true })
            resolve({
                status: 'OK',
                message: 'SUCCESS',
                data: updatedMenu
            })
        } catch (e) {
            reject(e)
        }
    })
}

const deleteMenu = (id) => {
    return new Promise(async (resolve, reject) => {
        try {
            const checkMenu = await Menu.findOne({
                _id: id
            })
            if (checkMenu === null) {
                resolve({
                    status: 'ERR',
                    message: 'The menu is not defined'
                })
            }

            await Menu.findByIdAndDelete(id)
            resolve({
                status: 'OK',
                message: 'Delete menu success',
            })
        } catch (e) {
            reject(e)
        }
    })
}

const deleteManyMenu = (ids) => {
    return new Promise(async (resolve, reject) => {
        try {
            await Menu.deleteMany({ _id: ids })
            resolve({
                status: 'OK',
                message: 'Delete menu success',
            })
        } catch (e) {
            reject(e)
        }
    })
}

const getDetailsMenu = (id) => {
    return new Promise(async (resolve, reject) => {
        try {
            const menu = await Menu.findOne({
                _id: id
            })
            if (menu === null) {
                resolve({
                    status: 'ERR',
                    message: 'The menu is not defined'
                })
            }

            resolve({
                status: 'OK',
                message: 'SUCESS',
                data: menu
            })
        } catch (e) {
            reject(e)
        }
    })
}

const getAllMenu = (limit, page, sort, filter) => {
    return new Promise(async (resolve, reject) => {
        try {
            const totalMenu = await Menu.countDocuments();

            if (filter) {
                const label = filter[0];
                const allObjectFilter = await Menu.find({ [label]: { '$regex': filter[1] } })
                    .limit(limit)
                    .skip(page * limit)
                    .sort({ createdAt: -1, updatedAt: -1 });
                resolve({
                    status: 'OK',
                    message: 'Success',
                    data: allObjectFilter,
                    total: totalMenu,
                    pageCurrent: Number(page + 1),
                    totalPage: Math.ceil(totalMenu / limit),
                });
            }

            if (sort) {
                const objectSort = {};
                objectSort[sort[1]] = sort[0];
                const allMenuSort = await Menu.find()
                    .limit(limit)
                    .skip(page * limit)
                    .sort(objectSort);
                resolve({
                    status: 'OK',
                    message: 'Success',
                    data: allMenuSort,
                    total: totalMenu,
                    pageCurrent: Number(page + 1),
                    totalPage: Math.ceil(totalMenu / limit),
                });
            }

            let allMenu = [];

            if (!limit && !page) {
                allMenu = await Menu.find().sort({ createdAt: -1, updatedAt: -1 });
            } else {
                allMenu = await Menu.find()
                    .limit(limit)
                    .skip(page * limit)
                    .sort({ createdAt: -1, updatedAt: -1 });
            }

            resolve({
                status: 'OK',
                message: 'Success',
                data: allMenu,
                total: totalMenu,
                pageCurrent: Number(page + 1),
                totalPage: Math.ceil(totalMenu / limit),
            });
        } catch (e) {
            reject(e);
        }
    });
};

const getAllTypeMenu = () => {
    return new Promise(async (resolve, reject) => {
        try {
            const allLink = await Menu.distinct('link')
            resolve({
                status: 'OK',
                message: 'Success',
                data: allLink,
            })
        } catch (e) {
            reject(e)
        }
    })
}

module.exports = {
    createMenu,
    updateMenu,
    getDetailsMenu,
    deleteMenu,
    getAllMenu,
    deleteManyMenu,
    getAllTypeMenu
}