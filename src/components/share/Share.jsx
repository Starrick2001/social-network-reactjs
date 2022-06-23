import "./share.css";
import { PermMedia } from "@material-ui/icons";

const Share = () => {
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;

  return (
    <div className="share">
      <div className="shareWrapper">
        <div className="shareTop">
          <img src={PF+"logo.png"} alt="" className="shareProfileImg" />
          <input placeholder="Write something" className="shareInput" />
        </div>
        <hr className="shareHr" />
        <div className="shareBottom">
            <div className="shareOptions">
                <div className="shareOption">
                    <PermMedia className="shareIcon"/>
                    <span className="shareOptionText">Photo or Video</span>
                </div>
            </div>
            <button className="shareButton">Share</button>
        </div>
      </div>
    </div>
  );
};

export default Share;
