import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import api from '../utils/api';

const lessons = [
  { id: 'lesson1', title: 'Introduction', videoURL: '/videos/intro.mp4' },
  { id: 'lesson2', title: 'Basics', videoURL: '/videos/basics.mp4' }
];

const PlayerPage = () => {
  const { id } = useParams(); 
  const [progress, setProgress] = useState([]);
  const [current, setCurrent] = useState(lessons[0]);

  useEffect(() => {
    const fetchProgress = async () => {
      const res = await api.get(`/progress/${id}`, { headers: { Authorization: localStorage.getItem('token') }});
      setProgress(res.data.completedLessons);
    };
    fetchProgress();
  }, [id]);

  const complete = async () => {
    await api.post(`/progress/${id}/complete`, { lessonId: current.id }, { headers: { Authorization: localStorage.getItem('token') }});
    setProgress([...progress, current.id]);
  };

  const completedCount = progress.length;
  const percent = Math.round((completedCount / lessons.length) * 100);

  return (
    <div>
      <h1>Player - {current.title}</h1>
      <video controls src={current.videoURL} width="600" />
      <button disabled={progress.includes(current.id)} onClick={complete}>
        {progress.includes(current.id) ? 'Completed' : 'Mark as Complete'}
      </button>
      <div>
        {lessons.map(l => (
          <button onClick={() => setCurrent(l)} key={l.id}>
            {l.title} {progress.includes(l.id) && '✅'}
          </button>
        ))}
      </div>
      <p>Progress: {percent}%</p>
    </div>
  );
};

export default PlayerPage;
