import "./share.css";
import { PermMedia } from "@material-ui/icons";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import { useRef } from "react";
import { useState } from "react";
import axios from "axios";

const Share = () => {
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  const BE = process.env.REACT_APP_BACKEND_SERVER;
  const { user } = useContext(AuthContext);

  const desc = useRef();

  const [file, setFile] = useState(null);
  const imageHandler = (e) => {
    setFile(e.target.files[0]);
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    const newPost = {
      userId: user._id,
      description: desc.current.value,
    };

    const data = new FormData();
    if (file) {
      const filename = Date.now() + "-" + file.name;
      data.append("file", file);
      data.append("name", filename);
      newPost.img = filename;
    }
    axios
      .post(BE + "posts/", newPost)
      .then((res) => {
        if (file) {
          try {
            axios.post(BE + "posts/" + res.data._id + "/uploadImg", data);
          } catch (err) {
            console.log(err);
          }
        }
        window.location.reload()
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="share">
      <div className="shareWrapper">
        <div className="shareTop">
          <img
            src={
              user.profilePicture ? PF + user.profilePicture : PF + "logo.png"
            }
            alt=""
            className="shareProfileImg"
          />
          <input
            placeholder="Write something"
            className="shareInput"
            ref={desc}
          />
        </div>
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
