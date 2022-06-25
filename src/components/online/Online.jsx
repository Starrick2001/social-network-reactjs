import "./online.css";
import { Link } from "react-router-dom";

const Online = ({ user }) => {
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;

  return (
    <li className="rightbarFriend">
      <div className="rightbarProfileImgContainer">
        <Link to={"/profile/" + user.username}>
          <img
            src={user.profilePicture ? user.profilePicture : PF + "logo.png"}
            alt=""
            className="rightbarProfileImg"
          />
        </Link>
        <span className="rightbarOnline"></span>
      </div>
      <span className="rightbarUsername">{user.username}</span>
    </li>
  );
};

export default Online;
