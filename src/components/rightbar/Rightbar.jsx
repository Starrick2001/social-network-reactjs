import "./rightbar.css";
import Online from "../online/Online";
import { useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { useState } from "react";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import { Add, Remove } from "@material-ui/icons";

const Rightbar = ({ user }) => {
  const BE = process.env.REACT_APP_BACKEND_SERVER;
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  const [friends, setFriends] = useState([]);
  const { user: currentUser, dispatch } = useContext(AuthContext);
  const [followed, setFollowed] = useState(currentUser.followings.includes(user?._id));

  const HomeRightbar = () => {
    
    return (
      <>
        <h4 className="rightbarTitle">Friends</h4>
        <ul className="rightbarFriendList">
          {friends.map((u) => (
            <Online key={u.id} user={u} />
          ))}
        </ul>
      </>
    );
  };

  //get friends
  useEffect(() => {
    if (user) {
      const getFriends = async () => {
        try {
          const friendList = await axios.get(BE + "users/friends/" + user._id);
          setFriends(friendList.data);
        } catch (err) {
          console.log(err);
        }
      };

      if (user._id) {
        getFriends();
      }
    } else {
      const getFriends = async () => {
        try {
          const friendList = await axios.get(BE + "users/friends/" + currentUser._id);
          setFriends(friendList.data);
        } catch (err) {
          console.log(err);
        }
      };

      if (currentUser._id) {
        getFriends();
      }
    }
  }, [user, BE, currentUser]);


  const followHandler = async () => {
    try {
      if (followed) {
        await axios.put(BE + "users/" + user._id + "/unfollow", {
          userId: currentUser._id,
        });
        dispatch({type: "UNFOLLOW", payload: user._id})
      } else {
        await axios.put(BE + "users/" + user._id + "/follow", {
          userId: currentUser._id,
        });
        dispatch({type: "FOLLOW", payload: user._id})
      }
      setFollowed(!followed);
    } catch (err) {
      console.log(err);
    }
  };

  const ProfileRightbar = () => {
    return (
      <>
        {user.username !== currentUser.username && (
          <button className="rightbarFollowButton" onClick={followHandler}>
            {followed ? <Remove /> : <Add />}
            {followed ? "Unfollow" : "Follow"}
          </button>
        )}
        <div className="rightbarTitle">User information</div>
        <div className="rightbarInfo">
          <div className="rightbarInfoItem">
            <span className="rightbarInfoKey">City: </span>
            <span className="rightbarInfoValue">
              {user.city ? user.city : "None"}
            </span>
          </div>
          <div className="rightbarInfoItem">
            <span className="rightbarInfoKey">From: </span>
            <span className="rightbarInfoValue">
              {user.from ? user.from : "None"}
            </span>
          </div>
          <div className="rightbarInfoItem">
            <span className="rightbarInfoKey">Relationship: </span>
            <span className="rightbarInfoValue">
              {user.relationship === 1
                ? "Single"
                : user.relationship === 2
                ? "Married"
                : "None"}
            </span>
          </div>
        </div>
        <h4 className="rightbarTitle">User friends</h4>
        <div className="rightbarFollowings">
          {friends.map((friend) => (
            <div className="rightbarFollowing">
              <Link to={"/profile/" + friend.username}>
                <img
                  src={
                    friend.profilePicture
                      ? friend.profilePicture
                      : PF + "logo.png"
                  }
                  alt=""
                  className="rightbarFollowingImg"
                />
              </Link>
              <span className="rightbarProfileFollowingName">
                {friend.username}
              </span>
            </div>
          ))}
        </div>
      </>
    );
  };
  return (
    <div className="rightbar">
      <div className="rightbarWrapper">
        {user ? ProfileRightbar() : HomeRightbar()}
      </div>
    </div>
  );
};

export default Rightbar;
