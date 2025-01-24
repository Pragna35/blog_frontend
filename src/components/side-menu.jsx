import { useEffect, useState } from "react";
import "../styles/side-menu.css";
import axios from "axios";
const SideMenu = ({ cat }) => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await axios.get(
          `https://blog-backend-icsf.onrender.com/api/posts/?cat=${cat}`
        );

        // console.log(res);
        setPosts(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchPosts();
  }, [cat]);

  return (
    <div className="menuList">
      <h1>Other posts you may like</h1>

      {/* {console.log(posts, "pppp")} */}
      {posts.map((post) => {
        return (
          <div className="rel_post" key={post.id}>
            <img src={`../uploads/${post?.img}`} alt={post.title} />
            <h2>{post.title}</h2>
            <button>Read More</button>
          </div>
        );
      })}
    </div>
  );
};
export default SideMenu;
