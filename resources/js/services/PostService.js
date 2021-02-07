const baseURL = 'http://127.0.0.1:8000/api/posts/'

export const fetchAllPosts = async () =>{
    return await axios.get(baseURL)
        .then(function (response) {
            return response.data
        })

}
