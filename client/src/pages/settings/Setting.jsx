import "./setting.css";
import Sidebar from "../../components/sidebar/Sidebar";
import matter from "../../assets/matterhorn.JPG";

export default function Setting() {
    return (
        <div className="settings">
            <div className="settingsWrapper">
                <div className="settingsTitle">
                    <span className="settingsUpdateTitle">Update Your Account</span>
                    <span className="settingDeleteTitle">Delete Account</span>

                </div>
                <form className="settingsForm">
                    <label>Profile Picture</label>
                    <div className="settingsPP">
                        <img src={matter } alt="" />
                        <label htmlFor="fileInput">
                            <i class="settingsPPIcon far fa-user-circle"></i>
                        </label>
                        <input type="file" id="fileInput" style={{display:"none"}}/>
                    </div>
                    <label>Username</label>
                    <input type="text" placeholder="username" />
                    <label>Email</label>
                    <input type="email" placeholder="muthuselvi2018@gmail.com" />
                    <label>Password</label>
                    <input type="password" />
                    <button className="settingsSubmit"> Update</button>

                </form>
            </div>
            <Sidebar />
        </div>
    )
}