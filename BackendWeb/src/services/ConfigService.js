const Config = require("../models/ConfigModel")

const createConfig = (newConfig) => {
    return new Promise(async (resolve, reject) => {
        const { author, email, type, phone,zalo,facebook,address, metadesc, metakey } = newConfig
        try {
            const checkConfig = await Config.findOne({
                author: author
            })
            if (checkConfig !== null) {
                resolve({
                    status: 'ERR',
                    message: 'The author of config is already'
                })
            }
            const newConfig = await Config.create({
                author, 
                email, 
                type, 
                phone,
                zalo,
                facebook,
                address,metadesc,metakey
            })
            if (newConfig) {
                resolve({
                    status: 'OK',
                    message: 'SUCCESS',
                    data: newConfig
                })
            }
        } catch (e) {
            reject(e)
        }
    })
}

const updateConfig = (id, data) => {
    return new Promise(async (resolve, reject) => {
        try {
            const checkConfig = await Config.findOne({
                _id: id
            })
            if (checkConfig === null) {
                resolve({
                    status: 'ERR',
                    message: 'The config is not defined'
                })
            }

            const updatedConfig = await Config.findByIdAndUpdate(id, data, { new: true })
            resolve({
                status: 'OK',
                message: 'SUCCESS',
                data: updatedConfig
            })
        } catch (e) {
            reject(e)
        }
    })
}

const deleteConfig = (id) => {
    return new Promise(async (resolve, reject) => {
        try {
            const checkConfig = await Config.findOne({
                _id: id
            })
            if (checkConfig === null) {
                resolve({
                    status: 'ERR',
                    message: 'The config is not defined'
                })
            }

            await Config.findByIdAndDelete(id)
            resolve({
                status: 'OK',
                message: 'Delete config success',
            })
        } catch (e) {
            reject(e)
        }
    })
}

const deleteManyConfig = (ids) => {
    return new Promise(async (resolve, reject) => {
        try {
            await Config.deleteMany({ _id: ids })
            resolve({
                status: 'OK',
                message: 'Delete config success',
            })
        } catch (e) {
            reject(e)
        }
    })
}

const getDetailsConfig = (id) => {
    return new Promise(async (resolve, reject) => {
        try {
            const config = await Config.findOne({
                _id: id
            })
            if (config === null) {
                resolve({
                    status: 'ERR',
                    message: 'The config is not defined'
                })
            }

            resolve({
                status: 'OK',
                message: 'SUCESS',
                data: config
            })
        } catch (e) {
            reject(e)
        }
    })
}

const getAllConfig = (limit, page, sort, filter) => {
    return new Promise(async (resolve, reject) => {
        try {
            const totalConfig = await Config.countDocuments();

            if (filter) {
                const label = filter[0];
                const allObjectFilter = await Config.find({ [label]: { '$regex': filter[1] } })
                    .limit(limit)
                    .skip(page * limit)
                    .sort({ createdAt: -1, updatedAt: -1 });
                resolve({
                    status: 'OK',
                    message: 'Success',
                    data: allObjectFilter,
                    total: totalConfig,
                    pageCurrent: Number(page + 1),
                    totalPage: Math.ceil(totalConfig / limit),
                });
            }

            if (sort) {
                const objectSort = {};
                objectSort[sort[1]] = sort[0];
                const allConfigSort = await Config.find()
                    .limit(limit)
                    .skip(page * limit)
                    .sort(objectSort);
                resolve({
                    status: 'OK',
                    message: 'Success',
                    data: allConfigSort,
                    total: totalConfig,
                    pageCurrent: Number(page + 1),
                    totalPage: Math.ceil(totalConfig / limit),
                });
            }

            let allConfig = [];

            if (!limit && !page) {
                allConfig = await Config.find().sort({ createdAt: -1, updatedAt: -1 });
            } else {
                allConfig = await Config.find()
                    .limit(limit)
                    .skip(page * limit)
                    .sort({ createdAt: -1, updatedAt: -1 });
            }

            resolve({
                status: 'OK',
                message: 'Success',
                data: allConfig,
                total: totalConfig,
                pageCurrent: Number(page + 1),
                totalPage: Math.ceil(totalConfig / limit),
            });
        } catch (e) {
            reject(e);
        }
    });
};

const getAllType = () => {
    return new Promise(async (resolve, reject) => {
        try {
            const allType = await Config.distinct('type')
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
    createConfig,
    updateConfig,
    getDetailsConfig,
    deleteConfig,
    getAllConfig,
    deleteManyConfig,
    getAllType
}