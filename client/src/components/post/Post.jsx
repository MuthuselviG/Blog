import './post.css'
import { Link } from "react-router-dom";
//import postpic from '../../assets/venice.JPG'; // with import


export default function Posts({ post }) {
    const PF = "http://localhost:5000/images/";
    //console.log(PF + post.photo)
    return (
        <div className='post'>
            {post.photo && <img src={PF+post.photo} className="postImg" alt="" /> }
            <div className='postInfo'>
                <div className='postCats'>
                    {post.categories.map((c) =>
                        <span className='postCat'>{c.name}</span>
                        )}
                </div>
                <Link to={`/post/${post._id}`} className="link">
                    <span className='postTitle'>{post.title}</span>
                 </Link>
                <hr />
                <span className='postDate'>{new Date(post.createdAt).toDateString()}</span>

            </div>
            <p className='postDesc'>{post.desc}</p>
        </div>
    )

}