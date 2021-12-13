import './singlepost.css';
import axios from "axios";
import { useState, useEffect } from "react";
import { useLocation } from "react-router";
import { Link } from "react-router-dom";

//import profpic from '../../assets/matterhorn.JPG'; // with import

export default function SinglePost() {

    const PF = "http://localhost:5000/images/";
    const location = useLocation();
    const path = location.pathname.split("/")[2];
    //console.log(path)
    const [post, setPost] = useState({});

    useEffect(() => {
        const getPost = async () => {
            //console.log("here")
            const urlpath = "/posts/" + path;
            //console.log(urlpath);
            const res = await axios(urlpath);
            //console.log("here1"+res)
            //console.log(res.data);
            setPost(res.data);
            
        }
        //console.log("before getpost")
        getPost();
    }, [path]);


    return (
        <div className="singlePost">

            <div className='singlePostWrapper'>
                {post.photo && <img src={PF+post.photo} className='singlePostImg' alt="" />}
                <h1 className='singlePostTitle'>{post.title}
                    <div className='singlePostEdit'><i className="singlePostIcon far fa-edit"></i><i className="singlePostIcon far fa-trash-alt"></i></div>
                </h1>
                <div className='singlePostInfo'>
                    <span className='singlePostAuthor'> Author:
                        <Link to={`/?user=${post.username}`} className="link">
                        <b>{post.username}</b></Link> </span>
                    <span className='singlePostDate'>{new Date(post.date).toDateString}</span>

                </div>
                <p className='singlePostDesc'>{post.desc}</p>
            </div>
        </div>


    )
}