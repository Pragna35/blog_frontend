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
        const res = await axios.get(`http://localhost:3000/api/posts/${cat}`);

        // console.log(res);
        setPosts(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchPosts();
  }, [cat]);


  // const posts = [
  //   {
  //     id: "1",
  //     title: "Fjallraven - Foldsack No. 1 Backpack, Fits 15 Laptops",
  //     description:
  //       "Your perfect pack for everyday use and walks in the forest. Stash your laptop (up to 15 inches) in padded sleeve, your everyday",
  //     image:
  //       "https://cdn.theatlantic.com/thumbor/k3sgQ9D2TZ59EgY2HnlO9NQ_L0c=/0x0:4800x2700/1600x900/media/img/mt/2023/11/watermelon/original.jpg",
  //   },
  //   {
  //     id: "2",
  //     title:
  //       "John Hardy Women's Legends Naga Gold & Silver Dragon Station Chain Bracelet",
  //     description:
  //       "From our Legends Collection, the Naga was inspired by the mythical water dragon that protects the ocean's pearl. Wear facing inward to be bestowed with love and abundance, or outward for protection.",
  //     image:
  //       "https://www.health.com/thmb/vgf00eSWWkQUXQfMuxflR_OsP7E=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/Fruits-Mangoes-abef925bfb1a48ff9af5acd3877ea107.jpg",
  //   },
  //   {
  //     id: "3",
  //     title:
  //       "Lock and Love Women's Removable Hooded Faux Leather Moto Biker Jacket",
  //     description:
  //       "Expand your PS4 gaming experience, Play anywhere Fast and easy, setup Sleek design with high capacity, 3-year manufacturer's limited warranty",
  //     image:
  //       "https://cdnimg.webstaurantstore.com/uploads/blog/2021/5/fresh-dragon-fruit-sliced-in-half-on-wooden-board-min.jpg",
  //   },
  //   {
  //     id: "4",
  //     title: "White Gold Plated Princess",
  //     description:
  //       "Classic Created Wedding Engagement Solitaire Diamond Promise Ring for Her. Gifts to spoil your love more for Engagement, Wedding, Anniversary, Valentine's Day...",
  //     image: "https://vietnamtour.in/wp-content/uploads/Durian.jpg.jpg",
  //   },
  // ];

  
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
