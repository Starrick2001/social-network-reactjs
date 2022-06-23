import "./feed.css";
import Share from "../share/Share";
import Post from "../post/Post";
import { useEffect, useState } from "react";
import axios from "axios";

const Feed = ({ username }) => {
  const BE = process.env.REACT_APP_BACKEND_SERVER;
  const [posts, setPosts] = useState([]);
  useEffect(() => {
    const fetchPosts = async () => {
      const res = username
        ? await axios.get(BE + "posts/profile/" + username)
        : await axios.get(BE + "posts/timeline/62aae700f452132ba9ac1773");
        console.log(username);
      setPosts(res.data);
    };
    fetchPosts();
  }, [username]);
  return (
    <div className="feed">
      <div className="feedWrapper">
        <Share />
        {posts.map((p) => (
          <Post post={p} key={p._id} />
        ))}
      </div>
    </div>
  );
};

export default Feed;
