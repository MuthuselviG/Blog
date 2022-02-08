import axios from "axios";

export const axiosInstance = axios.create({
    baseURL : "https://muthu-blog.herokuapp.com/api/"
})

