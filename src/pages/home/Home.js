import React, { useContext, useEffect, useState } from "react";
import AuthContext from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import styles from "./Home.module.css";
import axiosInstance from "../../axiosInstance";
import { SERVER_URL } from "../../config/constants";
import dayjs from "dayjs";
let relativeTime = require("dayjs/plugin/relativeTime");
dayjs.extend(relativeTime);

const Home = () => {
  const { user, setUser } = useContext(AuthContext);
  const [image, setImage] = useState();
  const [text, setText] = useState("");
  const [posts, setPosts] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    if (!user && !localStorage.getItem("user")) {
      navigate("/login");
    }
    getPosts();
  }, []);

  const getPosts = async () => {
    try {
      const { data } = await axiosInstance.get("/posts");
      console.log(data.posts);
      setPosts(data.posts);
    } catch (error) {
      console.log(error);
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
    navigate("/login");
  };

  const uploadFile = async () => {
    const formData = new FormData();
    formData.append("image", image);
    try {
      const { data } = await axiosInstance.post("/posts/upload-file", formData);
      return data.file;
    } catch (error) {
      return error;
    }
  };

  const addPost = async (event) => {
    event.preventDefault();
    try {
      const file = await uploadFile();
      await axiosInstance.post("/posts", {
        user_id: user.id,
        description: text,
        image: "uploads/" + file.filename,
      });
      window.location.reload();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1>Bonjour {user?.username}</h1>
        <div>
          <button onClick={logout}>Logout</button>
        </div>
      </div>
      <form className={styles.form}>
        <div>
          <textarea
            placeholder="New Post"
            rows={10}
            cols={70}
            onChange={(e) => setText(e.target.value)}
          />
        </div>
        <div>
          <input type="file" onChange={(e) => setImage(e.target.files[0])} />
          {image && (
            <img
              className={styles.postImage}
              src={URL.createObjectURL(image)}
            />
          )}
        </div>
        <div>
          <button onClick={addPost}>Submit</button>
        </div>
      </form>
      <div className="posts">
        {posts.map((post) => (
          <div>
            <div>
              <span>{post.username}</span>
              <p>{dayjs(post.created_at).fromNow()}</p>
            </div>
            <div>
              <img
                src={`${SERVER_URL}${post.image}`}
                className={styles.postImage}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
