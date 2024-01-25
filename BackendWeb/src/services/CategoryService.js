const Category = require("../models/CategoryModel")

const createCategory = (newCategory) => {
    return new Promise(async (resolve, reject) => {
        const { name, image, type, description,slug } = newCategory
        try {
            const checkCategory = await Category.findOne({
                name: name
            })
            if (checkCategory !== null) {
                resolve({
                    status: 'ERR',
                    message: 'The name of category is already'
                })
            }
            const newCategory = await Category.create({
                name, 
                image, 
                type, 
                description,
                slug
            })
            if (newCategory) {
                resolve({
                    status: 'OK',
                    message: 'SUCCESS',
                    data: newCategory
                })
            }
        } catch (e) {
            reject(e)
        }
    })
}

const updateCategory = (id, data) => {
    return new Promise(async (resolve, reject) => {
        try {
            const checkCategory = await Category.findOne({
                _id: id
            })
            if (checkCategory === null) {
                resolve({
                    status: 'ERR',
                    message: 'The category is not defined'
                })
            }

            const updatedCategory = await Category.findByIdAndUpdate(id, data, { new: true })
            resolve({
                status: 'OK',
                message: 'SUCCESS',
                data: updatedCategory
            })
        } catch (e) {
            reject(e)
        }
    })
}

const deleteCategory = (id) => {
    return new Promise(async (resolve, reject) => {
        try {
            const checkCategory = await Category.findOne({
                _id: id
            })
            if (checkCategory === null) {
                resolve({
                    status: 'ERR',
                    message: 'The category is not defined'
                })
            }

            await Category.findByIdAndDelete(id)
            resolve({
                status: 'OK',
                message: 'Delete category success',
            })
        } catch (e) {
            reject(e)
        }
    })
}

const deleteManyCategory = (ids) => {
    return new Promise(async (resolve, reject) => {
        try {
            await Category.deleteMany({ _id: ids })
            resolve({
                status: 'OK',
                message: 'Delete category success',
            })
        } catch (e) {
            reject(e)
        }
    })
}

const getDetailsCategory = (id) => {
    return new Promise(async (resolve, reject) => {
        try {
            const category = await Category.findOne({
                _id: id
            })
            if (category === null) {
                resolve({
                    status: 'ERR',
                    message: 'The category is not defined'
                })
            }

            resolve({
                status: 'OK',
                message: 'SUCESS',
                data: category
            })
        } catch (e) {
            reject(e)
        }
    })
}

const getAllCategory = (limit, page, sort, filter) => {
    return new Promise(async (resolve, reject) => {
        try {
            const totalCategory = await Category.countDocuments();

            if (filter) {
                const label = filter[0];
                const allObjectFilter = await Category.find({ [label]: { '$regex': filter[1] } })
                    .limit(limit)
                    .skip(page * limit)
                    .sort({ createdAt: -1, updatedAt: -1 });
                resolve({
                    status: 'OK',
                    message: 'Success',
                    data: allObjectFilter,
                    total: totalCategory,
                    pageCurrent: Number(page + 1),
                    totalPage: Math.ceil(totalCategory / limit),
                });
            }

            if (sort) {
                const objectSort = {};
                objectSort[sort[1]] = sort[0];
                const allCategorySort = await Category.find()
                    .limit(limit)
                    .skip(page * limit)
                    .sort(objectSort);
                resolve({
                    status: 'OK',
                    message: 'Success',
                    data: allCategorySort,
                    total: totalCategory,
                    pageCurrent: Number(page + 1),
                    totalPage: Math.ceil(totalCategory / limit),
                });
            }

            let allCategory = [];

            if (!limit && !page) {
                allCategory = await Category.find().sort({ createdAt: -1, updatedAt: -1 });
            } else {
                allCategory = await Category.find()
                    .limit(limit)
                    .skip(page * limit)
                    .sort({ createdAt: -1, updatedAt: -1 });
            }

            resolve({
                status: 'OK',
                message: 'Success',
                data: allCategory,
                total: totalCategory,
                pageCurrent: Number(page + 1),
                totalPage: Math.ceil(totalCategory / limit),
            });
        } catch (e) {
            reject(e);
        }
    });
};

const getAllType = () => {
    return new Promise(async (resolve, reject) => {
        try {
            const allType = await Category.distinct('type')
            resolve({
                status: 'OK',
                message: 'Success',
                data: allType,
            })
        } catch (e) {
            reject(e)
        }
    })
}

module.exports = {
    createCategory,
    updateCategory,
    getDetailsCategory,
    deleteCategory,
    getAllCategory,
    deleteManyCategory,
    getAllType
}