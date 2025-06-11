import React, { useEffect, useState } from "react";
import api from "../utils/api";

const Profile = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await api.get("/auth/profile", {
          headers: { Authorization: token }
        });
        setUser(res.data);
      } catch (err) {
        alert("Please login");
      }
    };

    fetchProfile();
  }, []);

  return (
    <div>
      <h2>Profile</h2>
      {user ? (
        <div>
          <p>Name: {user.name}</p>
          <p>Email: {user.email}</p>
          <p>Role: {user.role}</p>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default Profile;
