import "./sidebar.css";
import { RssFeed, Chat } from "@material-ui/icons";

const Sidebar = () => {
  return (
    <div className="sidebar">
      <div className="sidebarWrapper">
        <ul className="sidebarList">
          <li className="sidebarListItem">
            <RssFeed className="sidebarIcon" />
            <span className="sidebarListItemText">Feed</span>
          </li>
          <li className="sidebarListItem">
            <Chat className="sidebarIcon" />
            <span className="sidebarListItemText">Chat</span>
          </li>
        </ul>
        <hr className="sidebarHr" />
        <ul className="sidebarFriendList">
          <li className="sidebarFriend">
            <img src="/assets/logo.png" alt="" className="sidebarFriendImg" />
            <span className="sidebarFriendName">friend 1</span>
          </li>
          <li className="sidebarFriend">
            <img src="/assets/logo.png" alt="" className="sidebarFriendImg" />
            <span className="sidebarFriendName">friend 2</span>
          </li>
          <li className="sidebarFriend">
            <img src="/assets/logo.png" alt="" className="sidebarFriendImg" />
            <span className="sidebarFriendName">friend 3</span>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
