import './write.css'
//import profpic from '../../assets/venice.JPG'; // with import
import axios from 'axios';
import { useState, useContext } from 'react';
import { Context } from "../../context/Context";

export default function Write() {
    const [title, setTitle] = useState("");
    const [desc, setDesc] = useState("");
    const [file, setFile] = useState("");

    const { user } = useContext(Context);

    const handleSubmit = async (e) => {
        e.preventDefault();

        const newPost = {
            username: user.userName,
            title,
            desc
        }
        //console.log(user)
        //console.log("12345")
        ////console.log(newPost)
        if (file) {
            console.log("file available")
            const data = new FormData();
            const filename = Date.now() + file.name;
            console.log("file available"+filename)
            data.append("name", filename);
            data.append("file", file);
            newPost.photo = filename;
            console.log(newPost)
            try {
                const res = await axios.post("/upload", data);
                console.log(res.data)

            } catch (e) {
                console.log(e)
            }
        }

        try {
            console.log(newPost);
            const res = await axios.post("/posts/", newPost);
            //console.log(res.data)
            window.location.replace("/post/" + res.data._id);
        } catch (e) {
            console.log(e)
        }
    }

    return (
        <div className='write'>
            {file &&
                <img src={URL.createObjectURL(file)} className="writeImg" alt="" />
            }
            <form className='writeForm' onSubmit={handleSubmit}>
                <div className='writeFormGroup'>
                    <label htmlFor="fileInput"><i class="writeIcon fas fa-plus"></i></label>
                    <input type="file" id="fileInput" style={{ display: "none" }}
                        onChange={(e) => setFile(e.target.files[0])} />
                    <input type="text" id="Title" className="writeInput" autoFocus={true}
                        onChange={(e) => setTitle(e.target.value)}                     />
                </div>
                    <div className="writeFormGroup">
                        <textarea placeholder="Tell your story..." type="text"
                        className="writeInput writeText"
                        onChange={(e) => setDesc(e.target.value)}                     ></textarea>
                    </div>
                    <button className="writeSubmit" type="submit">Publish</button>
               

            </form>
        </div>
    )
}