import React, { useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

import "../styles/write.css";

import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import moment from "moment";

const WritePage = () => {
  const state = useLocation().state;
  console.log(state, "ssss");
  const [value, setValue] = useState(state?.desc || "");
  // console.log(value);
  const [title, setTitle] = useState(state?.title || "");
  const [file, setFile] = useState(null);
  const [cat, setCat] = useState(state?.category || "");

  const navigate = useNavigate();
  // console.log(file);
  const upload = async () => {
    try {
      const formData = new FormData();

      //the file(with in the quotations ) would be same as name in the backend upload.single('file');
      //if we take a <form> then this is the value of the name attribute of <input type="file"name="file" >
      formData.append("file", file);

      const res = await axios.post(
        "http://localhost:3000/api/upload",
        formData
      );
      return res.data; //img url
      //console.log(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  const handlePublish = async (e) => {
    e.preventDefault();
    let imgUrl = state?.img || ""; //previous img url
    // If a new  file is selected, upload the image
    if (file) {
      imgUrl = await upload(); //new imgurl
    }

    try {
      state
        ? await axios.patch(
            `http://localhost:3000/api/posts/${state.id}`,
            {
              title,
              desc: value,
              cat,
              img: imgUrl,
            },
            {
              headers: {
                Authorization: `Bearer ${localStorage.getItem("access-token")}`,
              },
            }
          )
        : await axios.post(
            `http://localhost:3000/api/posts`,
            {
              title,
              desc: value,
              cat,
              img: imgUrl,
              date: moment(Date.now()).format("YYYY-MM-DD hh:mm:ss"),
            },
            {
              headers: {
                Authorization: `Bearer ${localStorage.getItem("access-token")}`,
              },
            }
          );
    } catch (err) {
      console.log(err);
    }
    navigate("/");
  };

  return (
    <div className="write_div">
      <div className="write_content">
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => {
            setTitle(e.target.value);
          }}
        />
        <div className="editor_Container">
          <ReactQuill
            className="editor"
            theme="snow"
            value={value}
            onChange={setValue}
          />
        </div>
      </div>
      <div className="write_menu">
        <div className="w_item">
          <h1>Publish</h1>
          <span>
            <b>Status: </b> Draft
          </span>
          <span>
            <b>Visibility: </b> Public
          </span>
          <input
            type="file"
            id="file"
            style={{ display: "none" }}
            onChange={(e) => {
              setFile(e.target.files[0]);
            }}
          />
          <label htmlFor="file" className="img_label">
            Upload image
          </label>

          <div className="btns">
            <button>Save as a draft</button>
            <button onClick={handlePublish}>Publish</button>
          </div>
        </div>
        <div className="w_item">
          <h1>Category</h1>
          <div className="cate">
            <input
              type="radio"
              checked={cat === "art"}
              name="cate"
              value="art"
              id="art"
              onChange={(e) => {
                setCat(e.target.value);
              }}
            />
            <label htmlFor="art">Art</label>
          </div>
          <div className="cate">
            <input
              type="radio"
              checked={cat === "food"}
              name="cate"
              value="food"
              id="food"
              onChange={(e) => {
                setCat(e.target.value);
              }}
            />
            <label htmlFor="food">Food</label>
          </div>
          <div className="cate">
            <input
              type="radio"
              checked={cat === "pets"}
              name="cate"
              value="pets"
              id="pets"
              onChange={(e) => {
                setCat(e.target.value);
              }}
            />
            <label htmlFor="pets">Pets</label>
          </div>
          <div className="cate">
            <input
              type="radio"
              checked={cat === "technology"}
              name="cate"
              value="technology"
              id="technology"
              onChange={(e) => {
                setCat(e.target.value);
              }}
            />
            <label htmlFor="technology">Technology</label>
          </div>
          <div className="cate">
            <input
              type="radio"
              checked={cat === "cinema"}
              name="cate"
              value="cinema"
              id="cinema"
              onChange={(e) => {
                setCat(e.target.value);
              }}
            />
            <label htmlFor="cinema">Cinema</label>
          </div>
          <div className="cate">
            <input
              type="radio"
              checked={cat === "design"}
              name="cate"
              value="design"
              id="design"
              onChange={(e) => {
                setCat(e.target.value);
              }}
            />
            <label htmlFor="design">Designs</label>
          </div>
        </div>
      </div>
    </div>
  );
};
export default WritePage;
