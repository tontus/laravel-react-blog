import axios from "axios";

const baseURL = 'http://127.0.0.1:8000/api/users/'

export const fetchAllUsers = async () => {
    return await axios.get(baseURL)
        .then(res => {
            return res.data;
        })

}

export const fetchUser = async (id) => {
    return await axios.get(baseURL.concat(id))
        .then( res=>{
                return res.data
            }
        )
}
