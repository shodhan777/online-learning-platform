import React, { useEffect, useState, useRef } from 'react';
import { useParams } from 'react-router-dom';
import api from '../utils/api';

const PlayerPage = () => {
  const { id } = useParams();
  const videoRef = useRef();
  const [progress, setProgress] = useState(0);
  const [course, setCourse] = useState(null);

  useEffect(() => {
    const fetchCourse = async () => {
      const res = await api.get(`/courses/${id}`);
      setCourse(res.data);
    };

    const fetchProgress = async () => {
      const res = await api.get(`/progress/${id}`);
      setProgress(res.data.progress);
    };

    fetchCourse();
    fetchProgress();
  }, [id]);

  const handleTimeUpdate = () => {
    const currentProgress = (videoRef.current.currentTime / videoRef.current.duration) * 100;
    setProgress(currentProgress);
  };

  const saveProgress = async () => {
    await api.post(`/progress/${id}`, { progress });
  };

  if (!course) return <p>Loading...</p>;

  return (
    <div>
      <h1>{course.title}</h1>
      <video
        src={course.videoURL}
        controls
        ref={videoRef}
        onTimeUpdate={handleTimeUpdate}
        onPause={saveProgress}
        style={{ width: '80%' }}
      />
      <p>Progress: {progress.toFixed(2)}%</p>
    </div>
  );
};

export default PlayerPage;
