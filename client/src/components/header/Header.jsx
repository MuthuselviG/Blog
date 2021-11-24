import './header.css';
import headerpic from '../../assets/matterhorn.JPG';

export default function Header() {
    return (
        <div className="header">
            <div className="headerTitles">
                <span className="headerTitleSm"> React & Node</span>
                <span className="headerTitleLg"> Blog </span>
            </div>
            <img src={headerpic} className="headerImg" alt="" />
        </div>
        )
}