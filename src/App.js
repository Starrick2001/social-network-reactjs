import Home from "./pages/home/Home";
import Sidebar from "./components/sidebar/Sidebar";
import Feed from "./components/feed/Feed";
import Rightbar from "./components/rightbar/Rightbar";

function App() {
  return (
    <>
      <Home />
      <div className="homeContainer">
        <Sidebar />
        <Feed />
        <Rightbar />
      </div>
    </>
  );
}

export default App;
