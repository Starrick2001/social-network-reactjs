import "./rightbar.css";
import { users } from "../../dummyData";
import Online from "../online/Online";

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

  const ProfileRightbar = () => {
    return (
      <>
        <div className="rightbarTitle">User information</div>
        <div className="rightbarInfo">
          <div className="rightbarInfoItem">
            <span className="rightbarInfoKey">City: </span>
            <span className="rightbarInfoValue">{user.city}</span>
          </div>
          <div className="rightbarInfoItem">
            <span className="rightbarInfoKey">From: </span>
            <span className="rightbarInfoValue">{user.from}</span>
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
        {user ? ProfileRightbar() : HomeRightbar()}
      </div>
    </div>
  );
};

export default Rightbar;
