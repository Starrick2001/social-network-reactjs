import "./share.css";
import { PermMedia, Cancel } from "@material-ui/icons";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import { useRef } from "react";
import { useState } from "react";
import axios from "axios";
import { getStorage, ref, getDownloadURL, uploadBytes } from "firebase/storage";

const Share = () => {
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  const BE = process.env.REACT_APP_BACKEND_SERVER;
  const { user } = useContext(AuthContext);

  const desc = useRef();

  const [file, setFile] = useState(null);
  const imageHandler = (e) => {
    setFile(e.target.files[0]);
    const reader = new FileReader();
    reader.onload = () => {
      document.getElementById("inputPostImg").src = reader.result;
    };
    reader.readAsDataURL(e.target.files[0]);
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    const newPost = {
      userId: user._id,
      description: desc.current.value,
    };

    axios
      .post(BE + "posts/", newPost)
      .then((res) => {
        if (file) {
          const filename = Date.now() + "-" + file.name;

          const storage = getStorage();
          const storageRef = ref(
            storage,
            "posts/" + res.data._id + "/" + filename
          );

          // 'file' comes from the Blob or File API
          uploadBytes(storageRef, file).then((snapshot) => {
            console.log("Uploaded a blob or file!");
            getDownloadURL(storageRef)
              .then((url) => {
                newPost.img = url;
                axios
                  .put(BE + "posts/" + res.data._id, newPost)
                  .then(window.location.reload())
                  .catch((err) => console.log(err));
              })
              .catch((err) => console.log(err));
          });
        }
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="share">
      <div className="shareWrapper">
        <div className="shareTop">
          <img
            src={user.profilePicture ? user.profilePicture : PF + "logo.png"}
            alt=""
            className="shareProfileImg"
          />
          <input
            placeholder="Write something"
            className="shareInput"
            ref={desc}
          />
        </div>
        {file && (
          <div className="shareImgContainer">
            <img
              id="inputPostImg"
              className="sharePostImg"
              src={URL.createObjectURL(file)}
              alt=""
            />
            <Cancel className="shareCancelImg" onClick={() => setFile(null)} />
          </div>
        )}
        <hr className="shareHr" />
        <form className="shareBottom" onSubmit={submitHandler}>
          <div className="shareOptions">
            <label htmlFor="file" className="shareOption">
              <PermMedia className="shareIcon" />
              <span className="shareOptionText">Photo or Video</span>
              <input
                style={{ display: "none" }}
                type="file"
                id="file"
                accept=".png,.jpg,.jpeg"
                onChange={imageHandler}
              />
            </label>
          </div>
          <button className="shareButton" type="submit">
            Share
          </button>
        </form>
      </div>
    </div>
  );
};

export default Share;
