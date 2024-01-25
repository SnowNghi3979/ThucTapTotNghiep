const Post = require("../models/PostModel")

const createPost = (newPost) => {
    return new Promise(async (resolve, reject) => {
        const { name, image, type, description,title, detail, slug } = newPost
        try {
            const checkPost = await Post.findOne({
                name: name
            })
            if (checkPost !== null) {
                resolve({
                    status: 'ERR',
                    message: 'The name of post is already'
                })
            }
            const newPost = await Post.create({
                name, 
                title,
                slug,
                detail,
                description,
                image,
                type
            })
            if (newPost) {
                resolve({
                    status: 'OK',
                    message: 'SUCCESS',
                    data: newPost
                })
            }
        } catch (e) {
            reject(e)
        }
    })
}

const updatePost = (id, data) => {
    return new Promise(async (resolve, reject) => {
        try {
            const checkPost = await Post.findOne({
                _id: id
            })
            if (checkPost === null) {
                resolve({
                    status: 'ERR',
                    message: 'The post is not defined'
                })
            }

            const updatedPost = await Post.findByIdAndUpdate(id, data, { new: true })
            resolve({
                status: 'OK',
                message: 'SUCCESS',
                data: updatedPost
            })
        } catch (e) {
            reject(e)
        }
    })
}

const deletePost = (id) => {
    return new Promise(async (resolve, reject) => {
        try {
            const checkPost = await Post.findOne({
                _id: id
            })
            if (checkPost === null) {
                resolve({
                    status: 'ERR',
                    message: 'The post is not defined'
                })
            }

            await Post.findByIdAndDelete(id)
            resolve({
                status: 'OK',
                message: 'Delete post success',
            })
        } catch (e) {
            reject(e)
        }
    })
}

const deleteManyPost = (ids) => {
    return new Promise(async (resolve, reject) => {
        try {
            await Post.deleteMany({ _id: ids })
            resolve({
                status: 'OK',
                message: 'Delete post success',
            })
        } catch (e) {
            reject(e)
        }
    })
}

const getDetailsPost = (id) => {
    return new Promise(async (resolve, reject) => {
        try {
            const post = await Post.findOne({
                _id: id
            })
            if (post === null) {
                resolve({
                    status: 'ERR',
                    message: 'The post is not defined'
                })
            }

            resolve({
                status: 'OK',
                message: 'SUCESS',
                data: post
            })
        } catch (e) {
            reject(e)
        }
    })
}

const getAllPost = (limit, page, sort, filter) => {
    return new Promise(async (resolve, reject) => {
        try {
            const totalPost = await Post.countDocuments();

            if (filter) {
                const label = filter[0];
                const allObjectFilter = await Post.find({ [label]: { '$regex': filter[1] } })
                    .limit(limit)
                    .skip(page * limit)
                    .sort({ createdAt: -1, updatedAt: -1 });
                resolve({
                    status: 'OK',
                    message: 'Success',
                    data: allObjectFilter,
                    total: totalPost,
                    pageCurrent: Number(page + 1),
                    totalPage: Math.ceil(totalPost / limit),
                });
            }

            if (sort) {
                const objectSort = {};
                objectSort[sort[1]] = sort[0];
                const allPostSort = await Post.find()
                    .limit(limit)
                    .skip(page * limit)
                    .sort(objectSort);
                resolve({
                    status: 'OK',
                    message: 'Success',
                    data: allPostSort,
                    total: totalPost,
                    pageCurrent: Number(page + 1),
                    totalPage: Math.ceil(totalPost / limit),
                });
            }

            let allPost = [];

            if (!limit && !page) {
                allPost = await Post.find().sort({ createdAt: -1, updatedAt: -1 });
            } else {
                allPost = await Post.find()
                    .limit(limit)
                    .skip(page * limit)
                    .sort({ createdAt: -1, updatedAt: -1 });
            }

            resolve({
                status: 'OK',
                message: 'Success',
                data: allPost,
                total: totalPost,
                pageCurrent: Number(page + 1),
                totalPage: Math.ceil(totalPost / limit),
            });
        } catch (e) {
            reject(e);
        }
    });
};

const getAllType = () => {
    return new Promise(async (resolve, reject) => {
        try {
            const allType = await Post.distinct('type')
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
    createPost,
    updatePost,
    getDetailsPost,
    deletePost,
    getAllPost,
    deleteManyPost,
    getAllType
}