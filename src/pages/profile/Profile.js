import React, { useContext, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import axiosInstance from "../../axiosInstance";
import { SERVER_URL } from "../../config/constants";
import AuthContext from "../../context/AuthContext";

const Profile = () => {
  const { userId } = useParams();
  const [profileUser, setProfileUser] = useState();
  const { user, setUser } = useContext(AuthContext);
  const [city, setCity] = useState("");
  const [website, setWebsite] = useState("");
  const [profileImage, setProfileImage] = useState();
  const [coverImage, setCoverImage] = useState();

  useEffect(() => {
    getUserInfo();
  }, []);

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
        <button>Follow</button>
      )}
    </div>
  );
};

export default Profile;
