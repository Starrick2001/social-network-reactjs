import "./post.css";
import { MoreVert, ThumbUp, Favorite } from "@material-ui/icons";
import { users } from "../../dummyData";
import { useState } from "react";

const Post = ({ post }) => {
  const [like,setLike] = useState(post.like)
  const [isLiked, setIsLiked] = useState(false)
  const likeHandler = () => {
    setLike(isLiked ? like - 1 : like + 1)
    setIsLiked(!isLiked)
  }
  return (
    <div className="post">
      <div className="postWrapper">
        <div className="postTop">
          <div className="postTopLeft">
            <img src={users.filter(u=>u.id===post.userId)[0].profilePicture} alt="" className="postProfileImg" />
            <span className="postUsername">{users.filter(u=>u.id===post.userId)[0].username}</span>
            <span className="postDate">{post.date}</span>
          </div>
          <div className="postTopRight">
            <MoreVert />
          </div>
        </div>
        <div className="postCenter">
          <span className="postText">{post.description}</span>
          <img src={post.photo} alt="" className="postImg" />
        </div>
        <div className="postBottom">
          <div className="postBottomLeft">
            <ThumbUp className="likeIcon" onClick={likeHandler}/>
            <Favorite className="likeIcon" onClick={likeHandler}/>
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
