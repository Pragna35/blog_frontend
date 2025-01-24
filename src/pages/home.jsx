import { Link, useLocation } from "react-router";
import "../styles/home.css";
import { useEffect, useState } from "react";
import axios from "axios";

const HomePage = () => {
  const [posts, setPosts] = useState([]);

  const cat = useLocation().search;

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await axios.get(
          `https://blog-backend-icsf.onrender.com/api/posts/${cat}`
        );

        // console.log(res);
        setPosts(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchPosts();
  }, [cat]);

  //converting html tag to text
  const getText = (html) => {
    const doc = new DOMParser().parseFromString(html, "text/html");
    return doc.body.textContent;
  };

  return (
    <div className="home_div">
      <div className="posts">
        {posts.map((post) => (
          <div key={post.id} className="post">
            <div className="img">
              <img src={`../uploads/${post.img}`} alt={post.title} />
              {/* <img src={post.img} alt={post.title} /> */}
            </div>
            <div className="content">
              <Link to={`/post/${post.id}`}>
                <h1>{post.title}</h1>
              </Link>
              <p>{getText(post.desc)}</p>
              <button>Read More</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HomePage;
