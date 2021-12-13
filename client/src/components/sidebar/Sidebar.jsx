import './sidebar.css'
import profpic from '../../assets/mypic.png'; // with import
import axios from "axios";
import { useState, useEffect } from "react";

import { Link } from "react-router-dom";


export default function Sidebar() {
    const [ cats, setCats ] = useState([]);

    useEffect(() => {
        const getCats = async () => {
            console.log("before get cats")
            const res = await axios.get("/categories");
            console.log("after get cat")
            setCats(res.data);
        }
        getCats();
    })
    return (
        <div className='sidebar'>
            <div className='sidebarItem'>
                <span className='sidebarTitle'>ABOUT ME</span>
                <img src={profpic} className="" alt="" />

                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. </p>
            </div>
            <div className='sidebarItem'>
                <span className='sidebarTitle'>CATEGORIES</span>
                <ul className='sidebarList'>
                    {cats.map((c) => (
                        <Link to={`/?cat=${c.name}`} className="link">
                            <li className='sidebarListItem'>{c.name}</li>
                        </Link>
                    ))}
                </ul>

            </div>
            <div className='sidebarItem'>
                <span className='sidebarTitle'>FOLLOW US</span>
                <div className='sidebarSocial'>
                    <i className="sidebarIcon fab fa-facebook-square"></i>
                    <i className="sidebarIcon fab fa-twitter-square"></i>
                    <i className="sidebarIcon fab fa-pinterest-square"></i>
                    <i className="sidebarIcon fab fa-instagram-square"></i>
                </div>

            </div>

        </div>
    )

}