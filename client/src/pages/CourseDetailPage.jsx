import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import api from '../utils/api';

const CourseDetailPage = () => {
  const { id } = useParams();
  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCourse = async () => {
      try {
        const res = await api.get(`/courses/${id}`);
        setCourse(res.data);
      } catch (err) {
        console.error('Failed to fetch course:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchCourse();
  }, [id]);

  if (loading) return <p>Loading course...</p>;
  if (!course) return <p>Course not found.</p>;

  return (
    <div style={{ padding: '20px' }}>
      <h1>{course.title}</h1>
      <p>{course.description}</p>
      <p>Category: {course.category}</p>
      <p>Level: {course.level}</p>
      <p>Price: ₹{course.price}</p>

      <h3>Materials</h3>
      <ul>
        {course.materials.map((material, idx) => (
          <li key={idx}><a href={material} target="_blank" rel="noopener noreferrer">Download Material</a></li>
        ))}
      </ul>

      <h3>Video</h3>
      <a href={course.videoURL} target="_blank" rel="noopener noreferrer">Watch Video</a>
    </div>
  );
};

export default CourseDetailPage;
