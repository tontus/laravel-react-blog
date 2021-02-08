import axios from "axios";

const baseURL = 'http://127.0.0.1:8000/api/auth/'

export const register = async (data) => {
    console.log(data)
    return await axios.post(baseURL.concat('register'),data)
        .then(res => {
            return  res.data;
        })

}
export const login = async (data) => {
    return await axios.post(baseURL.concat('login'),data)
        .then(res => {
            localStorage.setItem('loginData',JSON.stringify(res.data));
            return  res.data;
        })

}

export const checkAuth = ()=>{
    const getLoginData = localStorage.getItem('loginData')
    if(getLoginData !== null){
        const data = JSON.parse(getLoginData)
        if (data.success && data.access_token !== null)
            return data.user
        else
            return false
    }
    else
        return false
}
export const logout = async() =>{
    return await axios.get(baseURL.concat('logout'))
        .then(res => {
            localStorage.removeItem('loginData');
            return  true;
        })
}
