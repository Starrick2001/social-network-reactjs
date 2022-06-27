import "./topbar.css";
// import { Search, Person, Chat, Notifications } from "@material-ui/icons";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";

const Topbar = () => {
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  const { user, dispatch } = useContext(AuthContext);

  const logoutHandler = () => {
    dispatch({type: "LOGOUT"})
  };

  return (
    <div className="topbarContainer">
      <div className="topbarLeft">
        <Link to="/" style={{ textDecoration: "none" }}>
          <span className="logo">Social Network</span>
        </Link>
      </div>
      <div className="topbarCenter">
        {/* <div className="searchBar">
          <Search className="searchIcon" />
          <input
            placeholder="Search for friend, post"
            className="searchInput"
          />
        </div> */}
      </div>
      <div className="topbarRight">
        <div className="topbarIcons">
          {/* <div className="topbarIconItem">
            <Person />
            <div className="topbarIconBadge">1</div>
          </div>
          <div className="topbarIconItem">
            <Chat />
            <div className="topbarIconBadge">1</div>
          </div>
          <div className="topbarIconItem">
            <Notifications />
            <div className="topbarIconBadge">1</div>
          </div> */}
        </div>
        <div className="topbarInfo">
          <Link
            to={`profile/${user.username}`}
            style={{ textDecoration: "none" }}
          >
            <img
              src={user.profilePicture ? user.profilePicture : PF + "logo.png"}
              alt=""
              className="topbarImg"
            />
          </Link>
          <span className="topbarInfoUsername">{user.username}</span>
          {user && (
            <button className="topbarLogoutButton" onClick={logoutHandler}>
              Logout
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
export default Topbar;
