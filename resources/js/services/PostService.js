import axios from "axios";

const baseURL = 'http://127.0.0.1:8000/api/posts/'

export const fetchAllPosts = async () => {
    return await axios.get(baseURL)
        .then(res => {
            let data = res.data;
            return data
        })

}

export const fetchPost = async (id) => {
    return await axios.get(baseURL.concat(id))
        .then( res=>{
            return res.data
            }
        )
}
