import './write.css'
import profpic from '../../assets/venice.JPG'; // with import

export default function Write() {
    return (
        <div className='write'>
            <img src={profpic} className="writeImg" alt="" />
            <form className='writeForm'>
                <div className='writeFormGroup'>
                    <label htmlFor="fileInput"><i class="writeIcon fas fa-plus"></i></label>
                    <input type="file" id="fileInput" style={{ display: "none" }} />
                    <input type="text" id="Title" className="writeInput" autoFocus={true} />
                </div>
                    <div className="writeFormGroup">
                        <textarea placeholder="Tell your story..." type="text"
                            className="writeInput writeText"></textarea>
                    </div>
                    <button className="writeSubmit">Publish</button>
               

            </form>
        </div>
    )
}