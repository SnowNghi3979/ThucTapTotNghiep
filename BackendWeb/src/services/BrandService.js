const Brand = require("../models/BrandModel")

const createBrand = (newBrand) => {
    return new Promise(async (resolve, reject) => {
        const { name, image, type, description,slug } = newBrand
        try {
            const checkBrand = await Brand.findOne({
                name: name
            })
            if (checkBrand !== null) {
                resolve({
                    status: 'ERR',
                    message: 'The name of brand is already'
                })
            }
            const newBrand = await Brand.create({
                name, 
                image, 
                type, 
                description,
                slug
            })
            if (newBrand) {
                resolve({
                    status: 'OK',
                    message: 'SUCCESS',
                    data: newBrand
                })
            }
        } catch (e) {
            reject(e)
        }
    })
}

const updateBrand = (id, data) => {
    return new Promise(async (resolve, reject) => {
        try {
            const checkBrand = await Brand.findOne({
                _id: id
            })
            if (checkBrand === null) {
                resolve({
                    status: 'ERR',
                    message: 'The brand is not defined'
                })
            }

            const updatedBrand = await Brand.findByIdAndUpdate(id, data, { new: true })
            resolve({
                status: 'OK',
                message: 'SUCCESS',
                data: updatedBrand
            })
        } catch (e) {
            reject(e)
        }
    })
}

const deleteBrand = (id) => {
    return new Promise(async (resolve, reject) => {
        try {
            const checkBrand = await Brand.findOne({
                _id: id
            })
            if (checkBrand === null) {
                resolve({
                    status: 'ERR',
                    message: 'The brand is not defined'
                })
            }

            await Brand.findByIdAndDelete(id)
            resolve({
                status: 'OK',
                message: 'Delete brand success',
            })
        } catch (e) {
            reject(e)
        }
    })
}

const deleteManyBrand = (ids) => {
    return new Promise(async (resolve, reject) => {
        try {
            await Brand.deleteMany({ _id: ids })
            resolve({
                status: 'OK',
                message: 'Delete brand success',
            })
        } catch (e) {
            reject(e)
        }
    })
}

const getDetailsBrand = (id) => {
    return new Promise(async (resolve, reject) => {
        try {
            const brand = await Brand.findOne({
                _id: id
            })
            if (brand === null) {
                resolve({
                    status: 'ERR',
                    message: 'The brand is not defined'
                })
            }

            resolve({
                status: 'OK',
                message: 'SUCESS',
                data: brand
            })
        } catch (e) {
            reject(e)
        }
    })
}

const getAllBrand = (limit, page, sort, filter) => {
    return new Promise(async (resolve, reject) => {
        try {
            const totalBrand = await Brand.countDocuments();

            if (filter) {
                const label = filter[0];
                const allObjectFilter = await Brand.find({ [label]: { '$regex': filter[1] } })
                    .limit(limit)
                    .skip(page * limit)
                    .sort({ createdAt: -1, updatedAt: -1 });
                resolve({
                    status: 'OK',
                    message: 'Success',
                    data: allObjectFilter,
                    total: totalBrand,
                    pageCurrent: Number(page + 1),
                    totalPage: Math.ceil(totalBrand / limit),
                });
            }

            if (sort) {
                const objectSort = {};
                objectSort[sort[1]] = sort[0];
                const allBrandSort = await Brand.find()
                    .limit(limit)
                    .skip(page * limit)
                    .sort(objectSort);
                resolve({
                    status: 'OK',
                    message: 'Success',
                    data: allBrandSort,
                    total: totalBrand,
                    pageCurrent: Number(page + 1),
                    totalPage: Math.ceil(totalBrand / limit),
                });
            }

            let allBrand = [];

            if (!limit && !page) {
                allBrand = await Brand.find().sort({ createdAt: -1, updatedAt: -1 });
            } else {
                allBrand = await Brand.find()
                    .limit(limit)
                    .skip(page * limit)
                    .sort({ createdAt: -1, updatedAt: -1 });
            }

            resolve({
                status: 'OK',
                message: 'Success',
                data: allBrand,
                total: totalBrand,
                pageCurrent: Number(page + 1),
                totalPage: Math.ceil(totalBrand / limit),
            });
        } catch (e) {
            reject(e);
        }
    });
};

const getAllType = () => {
    return new Promise(async (resolve, reject) => {
        try {
            const allType = await Brand.distinct('type')
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
    createBrand,
    updateBrand,
    getDetailsBrand,
    deleteBrand,
    getAllBrand,
    deleteManyBrand,
    getAllType
}