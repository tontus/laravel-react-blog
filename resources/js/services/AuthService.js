import axios from "axios";

const baseURL = 'http://127.0.0.1:8000/api/auth/'

export const register = async (data) => {
    console.log(data)
    return await axios.post(baseURL.concat('register'),data)
        .then(res => {
            return  res.data;
        })

}
