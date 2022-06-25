import "./post.css";
import { MoreVert, ThumbUp, Favorite } from "@material-ui/icons";
import { useEffect, useState } from "react";
import axios from "axios";
import { format } from "timeago.js";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";

const Post = ({ post }) => {
  const BE = process.env.REACT_APP_BACKEND_SERVER;
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;

  const [user, setUser] = useState({});
  useEffect(() => {
    const fetchUser = async () => {
      const res = await axios.get(`${BE}users?userId=${post.userId}`);
      setUser(res.data);
    };
    fetchUser();
  }, [post.userId, BE]);
  const { user: currentUser } = useContext(AuthContext);

  const [like, setLike] = useState(post.likes.length);
  const [isLiked, setIsLiked] = useState(false);

  //setIsLiked
  useEffect(() => {
    setIsLiked(post.likes.includes(currentUser._id));
  }, [post.likes, currentUser._id]);

  const likeHandler = () => {
    try {
      axios.put(BE + "posts/" + post._id + "/like", {
        userId: currentUser._id,
      });
    } catch (err) {
      console.log(err);
    }
    setLike(isLiked ? like - 1 : like + 1);
    setIsLiked(!isLiked);
  };

  return (
    <div className="post">
      <div className="postWrapper">
        <div className="postTop">
          <div className="postTopLeft">
            <Link
              to={`profile/${user.username}`}
              style={{ textDecoration: "none" }}
            >
              <img
                src={
                  user.profilePicture ? user.profilePicture : `${PF}logo.png`
                }
                alt=""
                className="postProfileImg"
              />
            </Link>
            <span className="postUsername">{user.username}</span>
            <span className="postDate">{format(post.createdAt)}</span>
          </div>
          <div className="postTopRight">
            <MoreVert />
          </div>
        </div>
        <div className="postCenter">
          <span className="postText">{post.description}</span>
          <img src={post.img ? post.img : ""} alt="" className="postImg" />
        </div>
        <div className="postBottom">
          <div className="postBottomLeft">
            <ThumbUp className="likeIcon" onClick={likeHandler} />
            <Favorite className="likeIcon" onClick={likeHandler} />
            <span className="postLikeCounter">{like} people like it</span>
          </div>
          <div className="postBottomRight">
            <span className="postCommentCounter">{post.comment} comments</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Post;
