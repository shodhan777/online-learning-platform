import React, { useEffect, useState } from 'react';
import api from '../utils/api';

const Profile = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    api.get('/auth/profile', {
      headers: { Authorization: localStorage.getItem('token') }
    }).then(res => setUser(res.data));
  }, []);

  if (!user) return <p>Loading...</p>;

  return (
    <div>
      <h2>{user.name}</h2>
      <p>{user.email}</p>
    </div>
  );
};

export default Profile;
