const Slider = require("../models/SliderModel")

const createSlider = (newSlider) => {
    return new Promise(async (resolve, reject) => {
        const { name, image, type, link, position,  description } = newSlider
        try {
            const checkSlider = await Slider.findOne({
                name: name
            })
            if (checkSlider !== null) {
                resolve({
                    status: 'ERR',
                    message: 'The name of slider is already'
                })
            }
            const newSlider = await Slider.create({
                name, 
                image, 
                type, 
                link ,
                position, 
                
                description,
            })
            if (newSlider) {
                resolve({
                    status: 'OK',
                    message: 'SUCCESS',
                    data: newSlider
                })
            }
        } catch (e) {
            reject(e)
        }
    })
}

const updateSlider = (id, data) => {
    return new Promise(async (resolve, reject) => {
        try {
            const checkSlider = await Slider.findOne({
                _id: id
            })
            if (checkSlider === null) {
                resolve({
                    status: 'ERR',
                    message: 'The slider is not defined'
                })
            }

            const updatedSlider = await Slider.findByIdAndUpdate(id, data, { new: true })
            resolve({
                status: 'OK',
                message: 'SUCCESS',
                data: updatedSlider
            })
        } catch (e) {
            reject(e)
        }
    })
}

const deleteSlider = (id) => {
    return new Promise(async (resolve, reject) => {
        try {
            const checkSlider = await Slider.findOne({
                _id: id
            })
            if (checkSlider === null) {
                resolve({
                    status: 'ERR',
                    message: 'The slider is not defined'
                })
            }

            await Slider.findByIdAndDelete(id)
            resolve({
                status: 'OK',
                message: 'Delete slider success',
            })
        } catch (e) {
            reject(e)
        }
    })
}

const deleteManySlider = (ids) => {
    return new Promise(async (resolve, reject) => {
        try {
            await Slider.deleteMany({ _id: ids })
            resolve({
                status: 'OK',
                message: 'Delete slider success',
            })
        } catch (e) {
            reject(e)
        }
    })
}

const getDetailsSlider = (id) => {
    return new Promise(async (resolve, reject) => {
        try {
            const slider = await Slider.findOne({
                _id: id
            })
            if (slider === null) {
                resolve({
                    status: 'ERR',
                    message: 'The slider is not defined'
                })
            }

            resolve({
                status: 'OK',
                message: 'SUCESS',
                data: slider
            })
        } catch (e) {
            reject(e)
        }
    })
}

const getAllSlider = (limit, page, sort, filter) => {
    return new Promise(async (resolve, reject) => {
        try {
            const totalSlider = await Slider.countDocuments();

            if (filter) {
                const label = filter[0];
                const allObjectFilter = await Slider.find({ [label]: { '$regex': filter[1] } })
                    .limit(limit)
                    .skip(page * limit)
                    .sort({ createdAt: -1, updatedAt: -1 });
                resolve({
                    status: 'OK',
                    message: 'Success',
                    data: allObjectFilter,
                    total: totalSlider,
                    pageCurrent: Number(page + 1),
                    totalPage: Math.ceil(totalSlider / limit),
                });
            }

            if (sort) {
                const objectSort = {};
                objectSort[sort[1]] = sort[0];
                const allSliderSort = await Slider.find()
                    .limit(limit)
                    .skip(page * limit)
                    .sort(objectSort);
                resolve({
                    status: 'OK',
                    message: 'Success',
                    data: allSliderSort,
                    total: totalSlider,
                    pageCurrent: Number(page + 1),
                    totalPage: Math.ceil(totalSlider / limit),
                });
            }

            let allSlider = [];

            if (!limit && !page) {
                allSlider = await Slider.find().sort({ createdAt: -1, updatedAt: -1 });
            } else {
                allSlider = await Slider.find()
                    .limit(limit)
                    .skip(page * limit)
                    .sort({ createdAt: -1, updatedAt: -1 });
            }

            resolve({
                status: 'OK',
                message: 'Success',
                data: allSlider,
                total: totalSlider,
                pageCurrent: Number(page + 1),
                totalPage: Math.ceil(totalSlider / limit),
            });
        } catch (e) {
            reject(e);
        }
    });
};

const getAllSliderImage = () => {
    return new Promise(async (resolve, reject) => {
        try {
            const allImage = await Slider.distinct('image')
            resolve({
                status: 'OK',
                message: 'Success',
                data: allImage,
            })
        } catch (e) {
            reject(e)
        }
    })
}

module.exports = {
    createSlider,
    updateSlider,
    getDetailsSlider,
    deleteSlider,
    getAllSlider,
    deleteManySlider,
    getAllSliderImage
}