import React, { useState } from 'react';
import api from '../utils/api';

const AdminPage = () => {
  const [form, setForm] = useState({
    title: '',
    description: '',
    category: '',
    price: '',
    level: '',
    videoURL: '',
    materials: ''
  });

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      await api.post('/admin/courses', form, {
        headers: { Authorization: token }
      });
      alert('Course created!');
      setForm({
        title: '',
        description: '',
        category: '',
        price: '',
        level: '',
        videoURL: '',
        materials: ''
      });
    } catch (err) {
      console.error(err);
      alert('Error creating course');
    }
  };

  return (
    <div>
      <h2>Create Course</h2>
      <form onSubmit={handleSubmit}>
        <input name="title" placeholder="Title" value={form.title} onChange={handleChange} /><br/>
        <input name="description" placeholder="Description" value={form.description} onChange={handleChange} /><br/>
        <input name="category" placeholder="Category" value={form.category} onChange={handleChange} /><br/>
        <input name="price" placeholder="Price" value={form.price} onChange={handleChange} /><br/>
        <input name="level" placeholder="Level" value={form.level} onChange={handleChange} /><br/>
        <input name="videoURL" placeholder="Video URL" value={form.videoURL} onChange={handleChange} /><br/>
        <input name="materials" placeholder="Materials URL" value={form.materials} onChange={handleChange} /><br/>
        <button type="submit">Create Course</button>
      </form>
    </div>
  );
};

export default AdminPage;
