import React, { useContext, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import axiosInstance from "../../axiosInstance";
import { SERVER_URL } from "../../config/constants";
import AuthContext from "../../context/AuthContext";
import dayjs from "dayjs";
const relativeTime = require("dayjs/plugin/relativeTime");
dayjs.extend(relativeTime);

const Profile = () => {
  const { userId } = useParams();
  const [profileUser, setProfileUser] = useState();
  const { user, setUser } = useContext(AuthContext);
  const [city, setCity] = useState("");
  const [website, setWebsite] = useState("");
  const [profileImage, setProfileImage] = useState();
  const [coverImage, setCoverImage] = useState();
  const [posts, setPosts] = useState([]);
  const [followed, setFollowed] = useState();

  useEffect(() => {
    getUserInfo();
    getUserPosts();
  }, []);

  useEffect(() => {
    if (user) {
      testRelationship();
    }
  }, [user]);

  const testRelationship = async () => {
    try {
      const { data } = await axiosInstance.get(
        `/users/test-relationship/${user.id}/${userId}`
      );
      setFollowed(data.followed);
    } catch (error) {
      alert(error.response?.data.message);
    }
  };

  const getUserInfo = async () => {
    try {
      const { data } = await axiosInstance.get(`/users/${userId}`);
      console.log(data.user);
      setProfileUser(data.user);
    } catch (error) {
      alert(error.response.data.message);
    }
  };

  const editProfile = async (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append("city", city);
    formData.append("website", website);
    formData.append("profile_image", profileImage);
    formData.append("cover_image", coverImage);
    try {
      const { data } = await axiosInstance.post(
        `/users/edit-profile/${userId}`,
        formData
      );
      setUser({
        ...user,
        ...data.profile,
      });
      window.location.reload();
    } catch (error) {
      alert(error.response.data.message);
    }
  };

  const getUserPosts = async () => {
    try {
      const { data } = await axiosInstance.get(`/posts/user/${userId}`);
      setPosts(data.posts);
    } catch (error) {
      alert(error.response.data.message);
    }
  };

  const deletePost = async (postId) => {
    try {
      await axiosInstance.delete(`/posts/${postId}`);
      window.location.reload();
    } catch (error) {
      alert(error.response.data.message);
    }
  };

  const followOrUnfollow = async () => {
    try {
      const { data } = await axiosInstance.post(
        `/users/follow-unfollow/${user.id}/${userId}`
      );
      window.location.reload();
    } catch (error) {
      alert(error.response.data.message);
    }
  };

  return (
    <div>
      <Link to={"/"}>Home</Link>
      <h1>Profile</h1>
      {profileUser?.cover_image && (
        <img
          style={{
            width: "300px",
          }}
          src={`${SERVER_URL}${profileUser?.cover_image}`}
        />
      )}
      {profileUser?.profile_image && (
        <img
          style={{
            width: "300px",
          }}
          src={`${SERVER_URL}${profileUser?.profile_image}`}
        />
      )}
      <div>
        Username: <span>{profileUser?.username}</span>
      </div>
      <div>
        Email: <span>{profileUser?.email}</span>
      </div>
      <div>
        City: <span>{profileUser?.city}</span>
      </div>
      <div>
        Website: <span>{profileUser?.website}</span>
      </div>
      {user?.id == userId ? (
        <div>
          <form>
            <input
              type="text"
              placeholder="City"
              onChange={(e) => setCity(e.target.value)}
            />
            <input
              type="text"
              placeholder="Website"
              onChange={(e) => setWebsite(e.target.value)}
            />
            <h3>Cover Image</h3>
            <input
              type="file"
              onChange={(e) => setCoverImage(e.target.files[0])}
            />
            <h3>Profile Image</h3>
            <input
              type="file"
              onChange={(e) => setProfileImage(e.target.files[0])}
            />
            <button onClick={editProfile}>Editer Profile</button>
          </form>
        </div>
      ) : (
        <button onClick={followOrUnfollow}>
          {followed ? "Unfollow" : "Follow"}
        </button>
      )}
      <div className="posts">
        {posts.map((post) => (
          <div>
            <div>
              <Link to={`/profile/${post.user_id}`}>{post.username}</Link>
              <p>{dayjs(post.created_at).fromNow()}</p>
              <p>{post.description}</p>
            </div>
            <div>
              <img
                src={`${SERVER_URL}${post.image}`}
                style={{
                  width: "300px",
                }}
              />
            </div>
            {userId == user?.id ? (
              <button onClick={() => deletePost(post.id)}>Delete Post</button>
            ) : null}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Profile;
