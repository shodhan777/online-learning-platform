import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../utils/api';

const CourseDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isEnrolled, setIsEnrolled] = useState(false);

  useEffect(() => {
    const fetchCourse = async () => {
      const res = await api.get(`/courses/${id}`);
      setCourse(res.data);
      setLoading(false);
      try {
        const profile = await api.get('/auth/profile', { headers: { Authorization: localStorage.getItem('token') } });
        setIsEnrolled(profile.data.enrolledCourses?.includes(id));
      } catch {}
    };
    fetchCourse();
  }, [id]);

  const enroll = async () => {
    await api.post(`/enroll/${id}/enroll`, {}, { headers: { Authorization: localStorage.getItem('token') }});
    setIsEnrolled(true);
  };

  if (loading) return <p>Loading...</p>;
  return (
    <div>
      <h1>{course.title}</h1>
      <p>{course.description}</p>
      <p>Price: ₹{course.price}</p>
      {isEnrolled ? (
        <button onClick={() => navigate(`/player/${id}`)}>Go to Course</button>
      ) : (
        <button onClick={enroll}>Enroll</button>
      )}
    </div>
  );
};

export default CourseDetailPage;
