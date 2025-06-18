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
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchCourseAndProfile = async () => {
      try {
        const res = await api.get(`/courses/${id}`);
        setCourse(res.data);

        const token = localStorage.getItem('token');
        if (token) {
          const profileRes = await api.get('/auth/profile', {
            headers: { Authorization: token },
          });

          const enrolledCourses = profileRes.data.enrolledCourses || [];

const courseIds = enrolledCourses.map(course => course.toString());
setIsEnrolled(courseIds.includes(id));

        }

        setLoading(false);
      } catch (err) {
        console.error(err);
        setError('Failed to load course details');
        setLoading(false);
      }
    };

    fetchCourseAndProfile();
  }, [id]);

const enroll = async () => {
  try {
    const token = localStorage.getItem('token');
    if (!token) {
      alert('Please login to enroll');
      return;
    }

   
    const courseRes = await api.get(`/courses/${id}`);
    const amount = courseRes.data.price;

   
    const orderRes = await api.post('/payment/create-order', { amount }, {
      headers: { Authorization: token }
    });

    
    const options = {
      key: 'rzp_test_nfqETDk7Jq5c5y', 
      amount: orderRes.data.amount,
      currency: orderRes.data.currency,
      name: 'Online Learning Platform',
      description: `Enroll in ${courseRes.data.title}`,
      order_id: orderRes.data.id,
      handler: async function (response) {
      
        await api.post(`/enroll/${id}/enroll`, {}, {
          headers: { Authorization: token }
        });
        setIsEnrolled(true);
        alert('✅ Payment successful! You are enrolled.');
      },
      prefill: {
        name: 'Shodhan',
        email: 'shodhan700@example.com'
      },
      theme: {
        color: '#3399cc'
      }
    };

    const rzp = new window.Razorpay(options);
    rzp.open();
  } catch (err) {
    console.error('❌ Payment failed:', err);
    alert('Payment or Enrollment failed.');
  }
};



  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div style={{ padding: '20px' }}>
      <h1>{course.title}</h1>
      <p>{course.description}</p>
      <p><strong>Price:</strong> ₹{course.price}</p>

      {isEnrolled ? (
        <button onClick={() => navigate(`/player/${id}`)}>📺 Go to Course</button>
      ) : (
        <button onClick={enroll}>✅ Enroll</button>
      )}

      <hr />
      <Reviews courseId={id} />
    </div>
  );
};

export default CourseDetailPage;
