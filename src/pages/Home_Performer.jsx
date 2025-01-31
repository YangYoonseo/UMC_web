import Navbar_Performer from "../components/common/Navbar_Performer"
import HomeImage from "../components/_test_/Home/HomeImage";
import MainInfo from "../components/_test_/Home/mainInfo";
import Footer from "../components/common/Footer";
import "../styles/Jisu/home.css";
import NotionNav from "../components/_test_/Home/NotionNav";

const Home_Performer = () => {
  return (
    <div className="Home">
      <Navbar_Performer />
      <Footer />
      <div className="HomeContent">
        <HomeImage />
        <MainInfo />
        <NotionNav />
      </div>
    </div>
  );
};

export default Home_Performer;