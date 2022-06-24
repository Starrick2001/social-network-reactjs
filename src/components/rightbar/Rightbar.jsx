import "./rightbar.css";
import { users } from "../../dummyData";
import Online from "../online/Online";
import { useEffect } from "react";
import axios from "axios";
import { useState } from "react";
import { initializeApp } from "firebase/app";
import { getStorage, ref, getDownloadURL } from "firebase/storage";

const Rightbar = ({ user }) => {
  const HomeRightbar = () => {
    return (
      <>
        <h4 className="rightbarTitle">Online friends</h4>
        <ul className="rightbarFriendList">
          {users.map((u) => (
            <Online key={u.id} user={u} />
          ))}
        </ul>
      </>
    );
  };

  const BE = process.env.REACT_APP_BACKEND_SERVER;
  const [friends, setFriends] = useState([]);

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

      getFriends();
    }
  }, [user, BE]);

  const ProfileRightbar = () => {
    return (
      <>
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
          {friends.map((friend) => {
            const imgUrl = "";
            const firebaseConfig = {
              apiKey: process.env.REACT_APP_FIREBASE_APIKEY,
              authDomain: process.env.REACT_APP_FIREBASE_AUTHDOMAIN,
              projectId: process.env.REACT_APP_FIREBASE_PROJECTID,
              storageBucket: process.env.REACT_APP_FIREBASE_STORAGEBUCKET,
              messagingSenderId:
                process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
              appId: process.env.REACT_APP_FIREBASE_APP_ID,
              measurementId: process.env.REACT_APP_FIREBASE_MEASUREMENT_ID,
            };

            // Initialize Firebase
            const app = initializeApp(firebaseConfig);
            // const analytics = getAnalytics(app);
            const storage = getStorage(app);
            <div className="rightbarFollowing">
              {getDownloadURL(
                ref(
                  storage,
                  "users/" + friend._id + "/" + friend.profilePicture
                )
              ).then(async (url) => {
                imgUrl = url;
                <img src={imgUrl} alt="" className="rightbarFollowingImg" />;
              })}
              <span className="rightbarProfileFollowingName">Hoa Le</span>
            </div>;
          })}
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
