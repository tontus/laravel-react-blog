import axios from "axios";

const baseURL = 'http://127.0.0.1:8000/api/comments/'


export const createComment= async (data) =>{
    return await axios.post(baseURL,data).then(res => {
        console.log(res.data)
        return  res.data;
    })
}
