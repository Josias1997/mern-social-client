import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { SERVER_URL } from "../config/constants";
import dayjs from "dayjs";
import styles from "../pages/home/Home.module.css";
import axiosInstance from "../axiosInstance";
import AuthContext from "../context/AuthContext";
let relativeTime = require("dayjs/plugin/relativeTime");
dayjs.extend(relativeTime);

const Post = ({ post }) => {
  const [showCommentForm, setShowCommentForm] = useState("");
  const [content, setContent] = useState("");
  const { user } = useContext(AuthContext);
  const [comments, setComments] = useState([]);

  useEffect(() => {
    getPostComments();
  }, []);

  const getPostComments = async () => {
    console.log(post.id);
    try {
      const { data } = await axiosInstance.get(
        `/comments/post-comments/${post.id}`
      );
      setComments(data.comments);
    } catch (error) {
      alert(error.response?.data.message);
    }
  };

  const postComment = async (event) => {
    event.preventDefault();
    try {
      await axiosInstance.post("/comments/", {
        content,
        userId: user.id,
        postId: post.id,
      });
      window.location.reload();
    } catch (error) {
      alert(error.response?.data.message);
    }
  };

  return (
    <div style={{ border: "1px solid blue" }}>
      <div>
        <Link to={`/profile/${post.user_id}`}>{post.username}</Link>
        <p>{dayjs(post.created_at).fromNow()}</p>
      </div>
      <div>
        <img src={`${SERVER_URL}${post.image}`} className={styles.postImage} />
      </div>
      <button
        onClick={() => setShowCommentForm((currentValue) => !currentValue)}
      >
        {showCommentForm ? "Hide Comment" : "Show Comment"}
      </button>
      {showCommentForm && (
        <div>
          <form>
            <input
              type="text"
              placeholder="Comment"
              onChange={(e) => setContent(e.target.value)}
            />
            <button onClick={postComment}>Comment</button>
          </form>
          {comments.map((comment) => (
            <div>
              <p>{dayjs(comment.created_at).fromNow()}</p>
              <p>{comment.username}</p>
              <img src={`${SERVER_URL}${comment.profile_image}`} />
              <p>{comment.content}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Post;
