import axios from "axios"
import { axiosJWT } from "./UserService"

export const getAllCategory = async (search, limit) => {
    let res = {}
    if (search?.length > 0) {
        res = await axios.get(`${process.env.REACT_APP_API_URL}/category/get-all?filter=name&filter=${search}&limit=${limit}`)
    } else {
        res = await axios.get(`${process.env.REACT_APP_API_URL}/category/get-all?limit=${limit}`)
    }
    return res.data
}

export const getCategoryType = async (type, page, limit) => {
    if (type) {
        const res = await axios.get(`${process.env.REACT_APP_API_URL}/category/get-all?filter=type&filter=${type}&limit=${limit}&page=${page}`)
        return res.data
    }
}

export const createCategory = async (data) => {
    const res = await axios.post(`${process.env.REACT_APP_API_URL}/category/create`, data)
    return res.data
}

export const getDetailsCategory = async (id) => {
    const res = await axios.get(`${process.env.REACT_APP_API_URL}/category/get-details/${id}`)
    return res.data
}

export const updateCategory = async (id, access_token, data) => {
    const res = await axiosJWT.put(`${process.env.REACT_APP_API_URL}/category/update/${id}`, data, {
        headers: {
            token: `Bearer ${access_token}`,
        }
    })
    return res.data
}

export const deleteCategory = async (id, access_token) => {
    const res = await axiosJWT.delete(`${process.env.REACT_APP_API_URL}/category/delete/${id}`, {
        headers: {
            token: `Bearer ${access_token}`,
        }
    })
    return res.data
}

export const deleteManyCategory = async (data, access_token,) => {
    const res = await axiosJWT.post(`${process.env.REACT_APP_API_URL}/category/delete-many`, data, {
        headers: {
            token: `Bearer ${access_token}`,
        }
    })
    return res.data
}

export const getAllTypeCategory = async () => {
    const res = await axios.get(`${process.env.REACT_APP_API_URL}/category/get-all-type`)
    return res.data
}
// categoryService.js

// Import necessary dependencies and modules

export const getRelatedCategorys = async (type) => {
      const res = await axios.get(`${process.env.REACT_APP_API_URL}/related?type=${type}`)

      return res.data
    }  
  