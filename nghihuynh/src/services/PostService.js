import axios from "axios"
import { axiosJWT } from "./UserService"

export const getAllPost = async (search, limit) => {
    let res = {}
    if (search?.length > 0) {
        res = await axios.get(`${process.env.REACT_APP_API_URL}/post/get-all?filter=name&filter=${search}&limit=${limit}`)
    } else {
        res = await axios.get(`${process.env.REACT_APP_API_URL}/post/get-all?limit=${limit}`)
    }
    return res.data
}

export const getPostType = async (type, page, limit) => {
    if (type) {
        const res = await axios.get(`${process.env.REACT_APP_API_URL}/post/get-all?filter=type&filter=${type}&limit=${limit}&page=${page}`)
        return res.data
    }
}

export const createPost = async (data) => {
    const res = await axios.post(`${process.env.REACT_APP_API_URL}/post/create`, data)
    return res.data
}

export const getDetailsPost = async (id) => {
    const res = await axios.get(`${process.env.REACT_APP_API_URL}/post/get-details/${id}`)
    return res.data
}

export const updatePost = async (id, access_token, data) => {
    const res = await axiosJWT.put(`${process.env.REACT_APP_API_URL}/post/update/${id}`, data, {
        headers: {
            token: `Bearer ${access_token}`,
        }
    })
    return res.data
}

export const deletePost = async (id, access_token) => {
    const res = await axiosJWT.delete(`${process.env.REACT_APP_API_URL}/post/delete/${id}`, {
        headers: {
            token: `Bearer ${access_token}`,
        }
    })
    return res.data
}

export const deleteManyPost = async (data, access_token,) => {
    const res = await axiosJWT.post(`${process.env.REACT_APP_API_URL}/post/delete-many`, data, {
        headers: {
            token: `Bearer ${access_token}`,
        }
    })
    return res.data
}

export const getAllTypePost = async () => {
    const res = await axios.get(`${process.env.REACT_APP_API_URL}/post/get-all-type`)
    return res.data
}
// postService.js

// Import necessary dependencies and modules

export const getRelatedPosts = async (type) => {
      const res = await axios.get(`${process.env.REACT_APP_API_URL}/related?type=${type}`)

      return res.data
    }  
  