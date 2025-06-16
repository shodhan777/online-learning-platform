import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../utils/api';
import Reviews from '../components/Reviews';

const CourseDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isEnrolled, setIsEnrolled] = useState(false);

  useEffect(() => {
    const fetchCourse = async () => {
      try {
        const res = await api.get(`/courses/${id}`);
        setCourse(res.data);
        setLoading(false);

        // Fetch profile to check enrollment
        const token = localStorage.getItem('token');
        if (token) {
          const profileRes = await api.get('/auth/profile', {
            headers: { Authorization: token }
          });

          const enrolledCourses = profileRes.data.enrolledCourses || [];
          setIsEnrolled(enrolledCourses.includes(id));
        }
      } catch (err) {
        console.error(err);
      }
    };

    fetchCourse();
  }, [id]);

  const enroll = async () => {
    try {
      const token = localStorage.getItem('token');
      await api.post(`/enroll/${id}/enroll`, {}, {
        headers: { Authorization: token }
      });
      setIsEnrolled(true);
    } catch (err) {
      console.error(err);
    }
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

      {/* Reviews Section */}
      <Reviews courseId={id} />
    </div>
  );
};

export default CourseDetailPage;
