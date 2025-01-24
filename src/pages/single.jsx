import SideMenu from "../components/side-menu";
import { Link, useLocation, useNavigate } from "react-router-dom";
import "../styles/single.css";
import { useEffect, useState, useContext } from "react";
import axios from "axios";
import moment from "moment";
import { AuthContext } from "../../context/authContext";

const SinglePage = () => {
  const [post, setPost] = useState([]);

  // console.log(post, "posttt");

  const location = useLocation();
  const navigate = useNavigate();

  const postId = location.pathname.split("/")[2];

  const { currentUser } = useContext(AuthContext);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const res = await axios.get(
          `https://blog-backend-icsf.onrender.com/api/posts/${postId}`
        );
        // console.log(res);
        setPost(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchPost();
  }, [postId]);

  const token = localStorage.getItem("access-token");
  // console.log(token);
  const headers = token ? { Authorization: `Bearer ${token}` } : {};

  const handleDelete = async () => {
    try {
      await axios.delete(
        `https://blog-backend-icsf.onrender.com/api/posts/${postId}`,
        {
          headers,
        }
      );

      navigate("/");
    } catch (err) {
      console.log(err);
    }
  };

  const getText = (html) => {
    const doc = new DOMParser().parseFromString(html, "text/html");
    return doc.body.textContent;
  };

  return (
    <section className="single_page_div">
      <div className="content_div">
        <div className="single_post_img">
          <img
            //keeping ? because if image is loading then it wont show error
            src={`../uploads/${post?.img}`}
            alt="post"
          />
        </div>

        <div className="user_profile_div">
          {post.userImg && <img src={post.userImg} alt="" />}

          <div className="user_info">
            <span>{post.username}</span>
            <p>posted {moment(post.date).fromNow()}</p>
          </div>
          {currentUser.username === post.username && (
            <div className="btns-div">
              <Link to={`/write?edit=${postId}`} state={post}>
                <span className="edit-btn">
                  <i class="ri-edit-circle-fill"></i>
                </span>
              </Link>

              <span className="del-btn" onClick={handleDelete}>
                <i class="ri-delete-bin-6-fill"></i>
              </span>
            </div>
          )}
        </div>

        <h1 className="post_title">{post.title}</h1>
        {/* <p className="post_desc">
          Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quidem a
          doloribus expedita illum modi aliquid sequi, in impedit, temporibus
          magni minima commodi nulla. Nesciunt mollitia fuga dolore commodi,
          debitis quisquam?
          <br />
          <br />
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Ducimus
          laudantium exercitationem voluptate itaque, iure ipsum, doloribus
          cupiditate nisi fuga laboriosam obcaecati, animi quo! Laborum dolor
          pariatur distinctio sapiente eum in? Lorem ipsum dolor sit amet
          consectetur adipisicing elit. Quos, odit modi? Dolorem at debitis
          ipsum nisi, aut dolore, itaque, minima necessitatibus placeat ducimus
          quod sequi? Necessitatibus, excepturi eos! Reprehenderit, voluptatem.
          <br />
          <br />
          
        </p> */}
        <p>{getText(post.desc)}</p>
      </div>
      <div className="side-menu">
        <SideMenu cat={post.category} />
      </div>
    </section>
  );
};
export default SinglePage;
