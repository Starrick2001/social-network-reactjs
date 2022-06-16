import "./feed.css";
import Share from "../share/Share";
import Post from "../post/Post";
import { posts } from "../../dummyData";

const Feed = () => {
  return (
    <div className="feed">
      <div className="feedWrapper">
        <Share />
        {posts.map((p) => (
          <Post post={p} key={p.id} />
        ))}
      </div>
    </div>
  );
};

export default Feed;
