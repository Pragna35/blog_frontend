import "../styles/navbar.css";
import blog_logo from "../assets/blog-logo.jpg";
import { Link, useNavigate } from "react-router-dom";
import { useContext, useState } from "react";
import { AuthContext } from "../../context/authContext";

const NavBar = () => {
  const { currentUser, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };
  return (
    <header className="navbar">
      <div className="container">
        <div className="logo">
          <Link to="/">
            <h1 className="blog_logo"> [̲̅B][̲̅l][̲̅o][̲̅g]</h1>
          </Link>
        </div>
        <span className="hamburger" onClick={toggleMenu}>
          <i class="ri-menu-2-line"></i>
        </span>

        <div className={`links ${isMenuOpen ? "open" : ""}`}>
          <span onClick={toggleMenu}>
            <Link to="/?cat=art" className="nav_items">
              Art
            </Link>
          </span>
          <span onClick={toggleMenu}>
            <Link to="/?cat=food" className="nav_items">
              Food
            </Link>
          </span>
          <span onClick={toggleMenu}>
            <Link to="/?cat=pets" className="nav_items">
              Pets
            </Link>
          </span>
          <span onClick={toggleMenu}>
            <Link to="/?cat=technology" className="nav_items">
              Technology
            </Link>
          </span>
          <span onClick={toggleMenu}>
            <Link to="/?cat=cinema" className="nav_items">
              Cinema
            </Link>
          </span>
          <span onClick={toggleMenu}>
            <Link to="/?cat=design" className="nav_items">
              Design
            </Link>
          </span>
        </div>

        <div className="nav_right ">
          <span>{currentUser?.username}</span>
          {currentUser ? (
            <span onClick={handleLogout}>Logout</span>
          ) : (
            <Link to="/login" className="login_link">
              Login
            </Link>
          )}

          <span className="write_btn">
            <Link to="/write">Write</Link>
          </span>
        </div>
      </div>
    </header>
  );
};
export default NavBar;
