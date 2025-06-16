import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../utils/api';

const CoursesPage = () => {
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    api.get('/courses').then(res => setCourses(res.data));
  }, []);

  return (
    <div>
      {courses.map(course => (
        <div key={course._id}>
          <h3>{course.title}</h3>
          <Link to={`/courses/${course._id}`}>View</Link>
        </div>
      ))}
    </div>
  );
};

export default CoursesPage;
