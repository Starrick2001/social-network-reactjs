import "./sidebar.css";
import { RssFeed, Chat } from "@material-ui/icons";
import CloseFriend from "../closeFriend/CloseFriend";
import {users} from "../../dummyData"

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
        {/* <ul className="sidebarFriendList">
          {users.map(u => <CloseFriend key={u.id} user={u}/>)}
        </ul> */}
      </div>
    </div>
  );
};

export default Sidebar;
