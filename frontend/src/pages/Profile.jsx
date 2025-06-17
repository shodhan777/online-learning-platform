import React, { useEffect, useState } from 'react';
import api from '../utils/api';
import { useNavigate } from 'react-router-dom';

const Profile = () => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate(); 

  useEffect(() => {
    api.get('/auth/profile', {
      headers: { Authorization: localStorage.getItem('token') }
    }).then(res => setUser(res.data))
      .catch(err => {
        console.error(err);
       
        navigate('/login');
      });
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('token'); 
    navigate('/login'); 
  };

  if (!user) return <p>Loading...</p>;

  return (
    <div>
      <h2>{user.name}</h2>
      <p>{user.email}</p>
      
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
};

export default Profile;
