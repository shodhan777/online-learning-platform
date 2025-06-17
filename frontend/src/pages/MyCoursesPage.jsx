import React, { useEffect, useState } from 'react';
import api from '../utils/api';
import { useNavigate } from 'react-router-dom';

const MyCoursesPage = () => {
  const [courses, setCourses] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchEnrolledCourses = async () => {
      try {
        const token = localStorage.getItem('token');
        const res = await api.get('/enroll/mycourses', {
          headers: { Authorization: token }
        });
        setCourses(res.data);
      } catch (err) {
        console.error('Error fetching enrolled courses:', err);
      }
    };

    fetchEnrolledCourses();
  }, []);

  return (
    <div>
      <h2>My Enrolled Courses</h2>

      {courses.length === 0 ? (
        <p>No courses enrolled yet.</p>
      ) : (
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '16px' }}>
          {courses.map(({ _id, course, progress }) => (
            <div key={_id} style={{ border: '1px solid #ccc', padding: '16px', width: '300px' }}>
              <h3>{course.title}</h3>
              <p>{course.description}</p>
              <p>Progress: {progress}%</p>
              {progress === 100 && (
                <p style={{ color: 'green', fontWeight: 'bold' }}>🎉 Completed</p>
              )}
              <button onClick={() => navigate(`/player/${course._id}`)}>Go to Course</button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyCoursesPage;
