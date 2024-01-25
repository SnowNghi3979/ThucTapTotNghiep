import axios from "axios"
import { axiosJWT } from "./UserService"

export const getAllSlider = async (search, limit) => {
    let res = {}
    if (search?.length > 0) {
        res = await axios.get(`${process.env.REACT_APP_API_URL}/slider/get-all?filter=name&filter=${search}&limit=${limit}`)
    } else {
        res = await axios.get(`${process.env.REACT_APP_API_URL}/slider/get-all?limit=${limit}`)
    }
    return res.data
}

export const getSliderType = async (type, page, limit) => {
    if (type) {
        const res = await axios.get(`${process.env.REACT_APP_API_URL}/slider/get-all?filter=type&filter=${type}&limit=${limit}&page=${page}`)
        return res.data
    }
}

export const createSlider = async (data) => {
    const res = await axios.post(`${process.env.REACT_APP_API_URL}/slider/create`, data)
    return res.data
}

export const getDetailsSlider = async (id) => {
    const res = await axios.get(`${process.env.REACT_APP_API_URL}/slider/get-details/${id}`)
    return res.data
}

export const updateSlider = async (id, access_token, data) => {
    const res = await axiosJWT.put(`${process.env.REACT_APP_API_URL}/slider/update/${id}`, data, {
        headers: {
            token: `Bearer ${access_token}`,
        }
    })
    return res.data
}

export const deleteSlider = async (id, access_token) => {
    const res = await axiosJWT.delete(`${process.env.REACT_APP_API_URL}/slider/delete/${id}`, {
        headers: {
            token: `Bearer ${access_token}`,
        }
    })
    return res.data
}

export const deleteManySlider = async (data, access_token,) => {
    const res = await axiosJWT.post(`${process.env.REACT_APP_API_URL}/slider/delete-many`, data, {
        headers: {
            token: `Bearer ${access_token}`,
        }
    })
    return res.data
}

export const getAllSliderImage = async () => {
    try {
      const res = await axios.get(`${process.env.REACT_APP_API_URL}/slider/get-all-image`);
      
      // Extracting image URLs from the response data
      const imageUrls = res.data.map(slider => slider.image);
  
      return imageUrls;
    } catch (error) {
      // Handle error, e.g., log it or throw an exception
      console.error("Error fetching slider images:", error);
      throw error;
    }
  }