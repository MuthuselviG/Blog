import "./setting.css";
import Sidebar from "../../components/sidebar/Sidebar";
import { useContext, useState } from "react";
import { Context } from "../../context/Context";
import axiosInstance from '../../config';

export default function Setting() {
    const PF = "../../../images/";
    const { user, dispatch } = useContext(Context);
    const [file, setFile] = useState("");
    const [userName, setUsername] = useState();
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const [success, setSuccess] = useState(false);


    const handleSubmit = async (e) => {
        e.preventDefault();
        dispatch({ type: "UPDATE_START" });
        const updatedUser = {
            userId: user._id,
            userName,
            email,
            password
        }
        if (file) {
            console.log("file available")
            const data = new FormData();
            const filename = Date.now() + file.name;
            console.log("file available" + filename)
            data.append("name", filename);
            data.append("file", file);
            updatedUser.profilePic = filename;
            try {
                const res = await axiosInstance.post("/upload", data);
                dispatch({ type: "UPDATE_SUCCESS", payload: res.data });

            } catch (e) {
                dispatch({ type: "UPDATE_FAILURE" });
            }
        }

        try {
            await axiosInstance.put("/users/" + user._id, updatedUser);
            setSuccess(true);
        } catch (e) {
            console.log(e)
        }
    }


    return (
        <div className="settings">
            <div className="settingsWrapper">
                <div className="settingsTitle">
                    <span className="settingsUpdateTitle">Update Your Account</span>
                    <span className="settingDeleteTitle">Delete Account</span>

                </div>
                <form className="settingsForm" onSubmit={handleSubmit}>
                    <label>Profile Picture</label>
                    <div className="settingsPP">
                        <img src={file? URL.createObjectURL(file): PF+user.profilePic} alt="" />
                        <label htmlFor="fileInput">
                            <i class="settingsPPIcon far fa-user-circle"></i>
                        </label>
                        <input type="file" id="fileInput" style={{ display: "none" }}
                            onChange={(e) => setFile(e.target.files[0])} />
                    </div>
                    <label>Username</label>
                    <input type="text" placeholder={user.userName}
                        onChange={(e) => setUsername(e.target.value)} />
                    <label>Email</label>
                    <input type="email" placeholder={user.email}
                        onChange={(e) => setEmail(e.target.value)} />
                    <label>Password</label>
                    <input type="password" onChange={(e) => setPassword(e.target.value)} />
                    <button className="settingsSubmit" type="submit" > Update</button>
                    {success &&
                        <span style={{ color: "green", textAlign: "center", marginTop: "20px" }}>Profile has been updated.....
                        </span>}

                </form>
            </div>
            <Sidebar />
        </div>
    )
}