import axios from "axios";

const axiosInstance = axios.create({
    baseURL : "https://muthu-blog.herokuapp.com/api/"
})

export default axiosInstance;
