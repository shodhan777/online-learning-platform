import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import api from '../utils/api';

const PlayerPage = () => {
  const { id } = useParams();
  const [course, setCourse] = useState(null);
  const [progress, setProgress] = useState(null);

  useEffect(() => {
    const fetchCourse = async () => {
      const res = await api.get(`/courses/${id}`);
      setCourse(res.data);
    };

    const fetchProgress = async () => {
      const res = await api.get(`/progress/${id}`, {
        headers: { Authorization: localStorage.getItem('token') }
      });
      setProgress(res.data);
    };

    fetchCourse();
    fetchProgress();
  }, [id]);

  const markWatched = async () => {
    await api.post(`/progress/${id}/watched`, {}, {
      headers: { Authorization: localStorage.getItem('token') }
    });
    setProgress({ watched: true });
  };

  if (!course) return <p>Loading...</p>;

  return (
    <div>
      <h1>{course.title}</h1>
      <video width="600" controls onEnded={markWatched}>
        <source src={course.videoUrl} type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      {progress?.watched ? <p>✅ Watched</p> : <p>❌ Not Watched</p>}
    </div>
  );
};

export default PlayerPage;
