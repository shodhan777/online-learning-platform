import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import api from '../utils/api';

const PlayerPage = () => {
  const { id } = useParams();
  const [course, setCourse] = useState(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const fetchCourse = async () => {
      const res = await api.get(`/courses/${id}`);
      setCourse(res.data);
    };

    const fetchProgress = async () => {
      const res = await api.get(`/progress/${id}`, {
        headers: { Authorization: localStorage.getItem('token') }
      });
      setProgress(res.data.progress); // backend returns { progress: 0 or 100 }
    };

    fetchCourse();
    fetchProgress();
  }, [id]);

  const markWatched = async () => {
    console.log('Video ended, marking as watched...');
    try {
      await api.post(
        `/progress/${id}`,
        { progress: 100 }, // mark complete
        { headers: { Authorization: localStorage.getItem('token') } }
      );
      setProgress(100);
    } catch (err) {
      console.error('Failed to mark progress:', err);
    }
  };

  if (!course) return <p>Loading...</p>;

  return (
    <div>
      <h1>{course.title}</h1>
      <video width="600" controls onEnded={markWatched}>
        <source src={course.videoURL} type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      <p>Progress: {progress === 100 ? '✅ Watched' : '❌ Not Watched'}</p>
    </div>
  );
};

export default PlayerPage;
