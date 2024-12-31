import blog_logo from "../assets/blog-logo.jpg";
import "../styles/footer.css";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer
      style={{
        padding: "0px 20px",
        marginTop: "50px",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        backgroundColor: "lightcyan",
      }}
      className="footer_div"
    >
      <div className="footer-logo">
        <Link to="/">
          <img
            src={blog_logo}
            alt="logo"
            style={{
              width: "120px",
              height: "120px",
              borderRadius: "50%",
            }}
          />
        </Link>
      </div>
      <div style={{ textAlign: "center" }}>
        <p style={{ margin: "5px" }}>
          "The best way to predict the future is to create it." - Pragna
          Murkiker
        </p>
        <p style={{ margin: "0" }}>
          &copy; 2024 <b>Dhrushya</b>. All Rights Reserved.
        </p>
      </div>
      <div>
        made with ♥️ and <b>React.js</b>
      </div>
    </footer>
  );
};
export default Footer;
