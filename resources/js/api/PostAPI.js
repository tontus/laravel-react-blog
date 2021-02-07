const baseURL = 'http://127.0.0.1:8000/api/users/'
export function fetchAllPosts(){
     axios.get(baseURL)
        .then(function (response) {
            // console.log(response)
            return response;

        })
        .catch(function (error) {
            // handle error
            console.log(error);
        })
    return null
}
