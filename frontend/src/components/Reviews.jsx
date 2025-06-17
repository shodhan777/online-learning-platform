import React, { useState, useEffect } from 'react';
import api from '../utils/api';

const Reviews = ({ courseId }) => {
  const [reviews, setReviews] = useState([]);
  const [form, setForm] = useState({ rating: '', comment: '' });

  const fetchReviews = async () => {
    const res = await api.get(`/reviews/${courseId}`);
    setReviews(res.data);
  };

  useEffect(() => {
    fetchReviews();
  }, [courseId]);

  const submitReview = async () => {
    const token = localStorage.getItem('token');
    if (!form.rating || !form.comment) return alert('Fill both fields');

    await api.post(`/reviews/${courseId}`, form, {
      headers: { Authorization: token }
    });
    fetchReviews();
    setForm({ rating: '', comment: '' });
  };


  const avgRating = reviews.length
    ? (reviews.reduce((acc, r) => acc + r.rating, 0) / reviews.length).toFixed(1)
    : 'No ratings yet';

  return (
    <div>
      <h3>Course Reviews</h3>

     
      <p><strong>Average Rating:</strong> {avgRating} ⭐</p>

     
      <input
        type="number"
        placeholder="Rating (1-5)"
        value={form.rating}
        min="1"
        max="5"
        onChange={e => setForm({ ...form, rating: parseInt(e.target.value) })}
      />
      <input
        type="text"
        placeholder="Comment"
        value={form.comment}
        onChange={e => setForm({ ...form, comment: e.target.value })}
      />
      <button onClick={submitReview}>Submit</button>

     
      {reviews.map((rev) => (
        <div key={rev._id}>
          <p><strong>{rev.user.name}</strong>: {rev.comment} ({rev.rating}⭐)</p>
        </div>
      ))}
    </div>
  );
};

export default Reviews;
