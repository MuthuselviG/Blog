import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { useLocation } from "react-router";
import { Link } from "react-router-dom";
import { Context } from "../../context/Context";
import './singlepost.css';


//import profpic from '../../assets/matterhorn.JPG'; // with import

export default function SinglePost() {

    const PF = "http://localhost:5000/images/";
    const location = useLocation();
    const path = location.pathname.split("/")[2];
    //console.log(path)
    const [post, setPost] = useState({});
    const { user } = useContext(Context);
    const [title, setTitle] = useState("");
    const [desc, setDesc] = useState("");
    const [updateMode, setUpdateMode] = useState(false);

    useEffect(() => {
        const getPost = async () => {
        
            const urlpath = "/posts/" + path;
            const res = await axios(urlpath);
            setPost(res.data);
            setTitle(res.data.title);
            setDesc(res.data.desc);

        }
        getPost();
    }, [path]);

    const handleDelete = async () => {
        try {
            await axios.delete(`/posts/${post._id}`, {
                data: { username: user.userName }
            });
            window.location.replace("/");
        } catch (err) {
            console.log(err);
        }
    }

    const handleUpdate = async () => {
        try {
            await axios.put(`/posts/${post._id}`, {
                username: user.userName, title, desc
            });
            setUpdateMode(false);
        } catch (err) {
            console.log(err);
        }
    }

    return (
        <div className="singlePost">

            <div className='singlePostWrapper'>
                {post.photo && <img src={PF + post.photo} className='singlePostImg' alt="" />}
                {updateMode ?
                    <input type="text" value={title} className='singlePostTitleInput' autoFocus
                        onChange={(e) => setTitle(e.target.value)} /> :
                    < h1 className='singlePostTitle'>{title}
                        {post.username === user?.userName && (
                            <div className='singlePostEdit'>
                                <i className="singlePostIcon far fa-edit" onClick={
                                    () => setUpdateMode(true)}></i>
                                <i className="singlePostIcon far fa-trash-alt" onClick={handleDelete}></i>
                            </div>)}

                    </h1>}
                <div className='singlePostInfo'>
                    <span className='singlePostAuthor'> Author:
                        <Link to={`/?user=${post.username}`} className="link">
                            <b>{post.username}</b></Link> </span>
                    <span className='singlePostDate'>{new Date(post.date).toDateString}</span>

                </div>
                {updateMode ?
                    <input type="text" value={desc} className="singlePostDescInput"
                        onChange={(e) => setDesc(e.target.value)} /> :
                    <p className='singlePostDesc'>{desc}</p>}
                {updateMode &&
                    <button className='singlePostButton' onClick={handleUpdate}> Update </button> }
            </div>
        </div>


    )
}