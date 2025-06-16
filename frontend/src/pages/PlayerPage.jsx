import React from 'react';
import { useParams } from 'react-router-dom';

const PlayerPage = () => {
  const { id } = useParams();

  return (
    <div>
      <h2>Player Page</h2>
      <p>Playing Course ID: {id}</p>
      {/* Later we will embed video player here */}
    </div>
  );
};

export default PlayerPage;
