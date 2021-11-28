import './home.css';
import {useState, useEffect} from "react"
import Header from '../../components/header/Header'
import Posts from '../../components/posts/Posts'
import Sidebar from '../../components/sidebar/Sidebar'
import axios from  "axios"

export default function Home() {
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        const fetchPost = async () => {
            const res = await axios.get("http://localhost:5000/api/posts")
            setPosts(res.data);
            //console.log(res);
        }
        fetchPost();
    });

    return (
        <>
            <Header />
            <div className="home">

                <Posts posts={posts}/>
                <Sidebar />
            </div>
        </>

    )
}