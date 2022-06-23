import "./rightbar.css";
import { users } from "../../dummyData";
import Online from "../online/Online";

const Rightbar = ({ profile }) => {
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

  const ProfileRightbar = () => {
    return (
      <>
        <div className="rightbarTitle">User information</div>
        <div className="rightbarInfo">
          <div className="rightbarInfoItem">
            <span className="rightbarInfoKey">City: </span>
            <span className="rightbarInfoValue">New York</span>
          </div>
          <div className="rightbarInfoItem">
            <span className="rightbarInfoKey">From: </span>
            <span className="rightbarInfoValue">Madrid</span>
          </div>
          <div className="rightbarInfoItem">
            <span className="rightbarInfoKey">Relationship: </span>
            <span className="rightbarInfoValue">Single</span>
          </div>
        </div>
        <h4 className="rightbarTitle">User friends</h4>
        <div className="rightbarFollowings">
          <div className="rightbarFollowing">
            <img
              src="assets/user1.jpg"
              alt=""
              className="rightbarFollowingImg"
            />
            <span className="rightbarProfileFollowingName">Hoa Le</span>
          </div>
          <div className="rightbarFollowing">
            <img
              src="assets/user2.jpg"
              alt=""
              className="rightbarFollowingImg"
            />
            <span className="rightbarProfileFollowingName">Johnny Depp</span>
          </div>
          <div className="rightbarFollowing">
            <img
              src="assets/user1.jpg"
              alt=""
              className="rightbarFollowingImg"
            />
            <span className="rightbarProfileFollowingName">Hoa Le</span>
          </div>
          <div className="rightbarFollowing">
            <img
              src="assets/user1.jpg"
              alt=""
              className="rightbarFollowingImg"
            />
            <span className="rightbarProfileFollowingName">Hoa Le</span>
          </div>
          <div className="rightbarFollowing">
            <img
              src="assets/user1.jpg"
              alt=""
              className="rightbarFollowingImg"
            />
            <span className="rightbarProfileFollowingName">Hoa Le</span>
          </div>
          <div className="rightbarFollowing">
            <img
              src="assets/user1.jpg"
              alt=""
              className="rightbarFollowingImg"
            />
            <span className="rightbarProfileFollowingName">Hoa Le</span>
          </div>
        </div>
      </>
    );
  };
  return (
    <div className="rightbar">
      <div className="rightbarWrapper">
        {profile ? ProfileRightbar() : HomeRightbar()}
      </div>
    </div>
  );
};

export default Rightbar;
