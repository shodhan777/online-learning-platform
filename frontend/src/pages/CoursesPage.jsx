import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import api from '../utils/api';

const CoursesPage = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');

    if (!token) {
      navigate('/login'); // redirect if not logged in
      return;
    }

    api.get('/courses', {
      headers: { Authorization: token }
    })
      .then(res => {
        setCourses(res.data);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        navigate('/login'); // redirect if token is invalid
      });
  }, [navigate]);

  if (loading) return <p>Loading...</p>;

  return (
    <div>
      {courses.length === 0 ? (
        <p>No courses available.</p>
      ) : (
        courses.map(course => (
          <div key={course._id}>
            <h3>{course.title}</h3>
            <Link to={`/courses/${course._id}`}>View</Link>
          </div>
        ))
      )}
    </div>
  );
};

export default CoursesPage;
