import './topbar.css'
//import profpic from '../../assets/mypic.png'; // with import
import { Link } from "react-router-dom";
import { useContext } from "react";
import { Context } from '../../context/Context';

export default function TopBar() {
    const PF = "http://localhost:5000/images/";
    const { user , dispatch} = useContext(Context);

    const handleLogout = () => {
        dispatch({ type: "LOGOUT" });
    }
    return (
        <div className="top">
            <div className="topLeft">
                <i className="topIcon fab fa-facebook-square"></i>
                <i className="topIcon fab fa-twitter-square"></i>
                <i className="topIcon fab fa-pinterest-square"></i>
                <i className="topIcon fab fa-instagram-square"></i>
            </div>
            <div className="topCenter">
                <ul className="topList">
                    <li className="topListItem">
                        <Link className="link" to="/">HOME</Link>
                    </li>
                    <li className="topListItem">
                        <Link className="link" to="/">ABOUT</Link>
                    </li>
                    <li className="topListItem">
                        <Link className="link" to="/">CONTACT</Link>
                    </li>
                    <li className="topListItem">
                        <Link className="link" to="/write">WRITE</Link>
                    </li>
                    <li className="topListItem" onClick={handleLogout}>
                        { user && "LOGOUT"}
                    </li>
                </ul>

            </div>
            <div className="topRight">
                {user ? (<Link to="/settings">
                    <img src={PF+user.profilePic} className="topImg" alt="" />
                    </Link>) :
                    (<ul className="topList">
                        <li className="topListItem">
                            <Link className="link" to="/register">REGISTER</Link>
                        </li>
                        <li className="topListItem">
                            <Link className="link" to="/login">LOGIN</Link>
                        </li>
                    </ul>
                        )}
               
                <i className="topSearchIcon fas fa-search"></i>
            </div>
            
        </div>
    )

}