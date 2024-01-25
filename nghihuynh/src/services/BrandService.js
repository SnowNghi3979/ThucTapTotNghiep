import axios from "axios"
import { axiosJWT } from "./UserService"

export const getAllBrand = async (search, limit) => {
    let res = {}
    if (search?.length > 0) {
        res = await axios.get(`${process.env.REACT_APP_API_URL}/brand/get-all?filter=name&filter=${search}&limit=${limit}`)
    } else {
        res = await axios.get(`${process.env.REACT_APP_API_URL}/brand/get-all?limit=${limit}`)
    }
    return res.data
}

export const getBrandType = async (type, page, limit) => {
    if (type) {
        const res = await axios.get(`${process.env.REACT_APP_API_URL}/brand/get-all?filter=type&filter=${type}&limit=${limit}&page=${page}`)
        return res.data
    }
}

export const createBrand = async (data) => {
    const res = await axios.post(`${process.env.REACT_APP_API_URL}/brand/create`, data)
    return res.data
}

export const getDetailsBrand = async (id) => {
    const res = await axios.get(`${process.env.REACT_APP_API_URL}/brand/get-details/${id}`)
    return res.data
}

export const updateBrand = async (id, access_token, data) => {
    const res = await axiosJWT.put(`${process.env.REACT_APP_API_URL}/brand/update/${id}`, data, {
        headers: {
            token: `Bearer ${access_token}`,
        }
    })
    return res.data
}

export const deleteBrand = async (id, access_token) => {
    const res = await axiosJWT.delete(`${process.env.REACT_APP_API_URL}/brand/delete/${id}`, {
        headers: {
            token: `Bearer ${access_token}`,
        }
    })
    return res.data
}

export const deleteManyBrand = async (data, access_token,) => {
    const res = await axiosJWT.post(`${process.env.REACT_APP_API_URL}/brand/delete-many`, data, {
        headers: {
            token: `Bearer ${access_token}`,
        }
    })
    return res.data
}

export const getAllTypeBrand = async () => {
    const res = await axios.get(`${process.env.REACT_APP_API_URL}/brand/get-all-type`)
    return res.data
}