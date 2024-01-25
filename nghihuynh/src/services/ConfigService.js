import axios from "axios"
import { axiosJWT } from "./UserService"

export const getAllConfig = async (search, limit) => {
    let res = {}
    if (search?.length > 0) {
        res = await axios.get(`${process.env.REACT_APP_API_URL}/config/get-all?filter=name&filter=${search}&limit=${limit}`)
    } else {
        res = await axios.get(`${process.env.REACT_APP_API_URL}/config/get-all?limit=${limit}`)
    }
    return res.data
}

export const getConfigType = async (type, page, limit) => {
    if (type) {
        const res = await axios.get(`${process.env.REACT_APP_API_URL}/config/get-all?filter=type&filter=${type}&limit=${limit}&page=${page}`)
        return res.data
    }
}

export const createConfig = async (data) => {
    const res = await axios.post(`${process.env.REACT_APP_API_URL}/config/create`, data)
    return res.data
}

export const getDetailsConfig = async (id) => {
    const res = await axios.get(`${process.env.REACT_APP_API_URL}/config/get-details/${id}`)
    return res.data
}

export const updateConfig = async (id, access_token, data) => {
    const res = await axiosJWT.put(`${process.env.REACT_APP_API_URL}/config/update/${id}`, data, {
        headers: {
            token: `Bearer ${access_token}`,
        }
    })
    return res.data
}

export const deleteConfig = async (id, access_token) => {
    const res = await axiosJWT.delete(`${process.env.REACT_APP_API_URL}/config/delete/${id}`, {
        headers: {
            token: `Bearer ${access_token}`,
        }
    })
    return res.data
}

export const deleteManyConfig = async (data, access_token,) => {
    const res = await axiosJWT.post(`${process.env.REACT_APP_API_URL}/config/delete-many`, data, {
        headers: {
            token: `Bearer ${access_token}`,
        }
    })
    return res.data
}

export const getAllTypeConfig = async () => {
    const res = await axios.get(`${process.env.REACT_APP_API_URL}/config/get-all-type`)
    return res.data
}
// configService.js

// Import necessary dependencies and modules

export const getRelatedConfigs = async (type) => {
      const res = await axios.get(`${process.env.REACT_APP_API_URL}/related?type=${type}`)

      return res.data
    }  
  