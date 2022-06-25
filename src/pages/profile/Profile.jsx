import "./profile.css";
import Topbar from "../../components/topbar/Topbar";
import Sidebar from "../../components/sidebar/Sidebar";
import Feed from "../../components/feed/Feed";
import Rightbar from "../../components/rightbar/Rightbar";
import { CameraAlt } from "@material-ui/icons";
import { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { getStorage, ref, getDownloadURL, uploadBytes } from "firebase/storage";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";

const Profile = () => {
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  const BE = process.env.REACT_APP_BACKEND_SERVER;
  const username = useParams().username;
  const [user, setUser] = useState({});
  const { user: currentUser } = useContext(AuthContext);

  useEffect(() => {
    const fetchUser = async () => {
      const res = await axios.get(`${BE}users?username=${username}`);
      setUser(res.data);
    };
    fetchUser();
  }, [username, BE]);

  const avatarHandler = (e) => {
    const file = e.target.files[0];
    const filename = Date.now() + "-" + file.name;

    const storage = getStorage();
    const storageRef = ref(
      storage,
      "users/" + currentUser.username + "/" + filename
    );

    // 'file' comes from the Blob or File API
    uploadBytes(storageRef, file).then((snapshot) => {
      getDownloadURL(storageRef)
        .then((url) => {
          axios
            .put(BE + "users/" + currentUser._id, {
              userId: currentUser._id,
              profilePicture: url,
            })
            .then(window.location.reload())
            .catch((err) => console.log(err));
        })
        .catch((err) => console.log(err));
    });
  };

  return (
    <>
      <Topbar />
      <div className="profile">
        <Sidebar />
        <div className="profileRight">
          <div className="profileRightTop">
            <div className="profileCover">
              <img
                src={
                  user.coverPicture ? user.coverPicture : PF + "logo.png"
                }
                alt=""
                className="profileCoverImg"
              />
              <div className="profilePictureContainer">
                <img
                  src={
                    user.profilePicture
                      ? user.profilePicture
                      : PF + "logo.png"
                  }
                  alt=""
                  className="profileUserImg"
                />
                {user.username === currentUser.username && (
                  <label for="file">
                    <CameraAlt className="profileCameraIcon" />
                    <input
                      style={{ display: "none" }}
                      type="file"
                      id="file"
                      accept=".png,.jpg,.jpeg"
                      onChange={avatarHandler}
                    />
                  </label>
                )}
              </div>
            </div>
            <div className="profileInfo">
              <h4 className="profileInfoName">{user.username}</h4>
              <span className="profileInfoDesc">{user.description}</span>
            </div>
          </div>
          <div className="profileRightBottom">
            <Feed username={username} />
            <Rightbar user={user} key={user._id} />
          </div>
        </div>
      </div>
    </>
  );
};

export default Profile;
