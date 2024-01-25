import axios from "axios"
import { axiosJWT } from "./UserService"

export const getAllMenu = async (search, limit) => {
    let res = {}
    if (search?.length > 0) {
        res = await axios.get(`${process.env.REACT_APP_API_URL}/menu/get-all?filter=name&filter=${search}&limit=${limit}`)
    } else {
        res = await axios.get(`${process.env.REACT_APP_API_URL}/menu/get-all?limit=${limit}`)
    }
    return res.data
}

export const getMenuType = async (type, page, limit) => {
    if (type) {
        const res = await axios.get(`${process.env.REACT_APP_API_URL}/menu/get-all?filter=type&filter=${type}&limit=${limit}&page=${page}`)
        return res.data
    }
}

export const createMenu = async (data) => {
    const res = await axios.post(`${process.env.REACT_APP_API_URL}/menu/create`, data)
    return res.data
}

export const getDetailsMenu = async (id) => {
    const res = await axios.get(`${process.env.REACT_APP_API_URL}/menu/get-details/${id}`)
    return res.data
}

export const updateMenu = async (id, access_token, data) => {
    const res = await axiosJWT.put(`${process.env.REACT_APP_API_URL}/menu/update/${id}`, data, {
        headers: {
            token: `Bearer ${access_token}`,
        }
    })
    return res.data
}

export const deleteMenu = async (id, access_token) => {
    const res = await axiosJWT.delete(`${process.env.REACT_APP_API_URL}/menu/delete/${id}`, {
        headers: {
            token: `Bearer ${access_token}`,
        }
    })
    return res.data
}

export const deleteManyMenu = async (data, access_token,) => {
    const res = await axiosJWT.post(`${process.env.REACT_APP_API_URL}/menu/delete-many`, data, {
        headers: {
            token: `Bearer ${access_token}`,
        }
    })
    return res.data
}

export const getAllTypeMenu = async () => {
    const res = await axios.get(`${process.env.REACT_APP_API_URL}/menu/get-all-link`)
    return res.data
}
// menuService.js

// Import necessary dependencies and modules

export const getRelatedMenus = async (type) => {
      const res = await axios.get(`${process.env.REACT_APP_API_URL}/related?type=${type}`)

      return res.data
    }  
  