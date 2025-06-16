import React, { useState } from 'react';
import api from '../utils/api';

const Register = () => {
  const [form, setForm] = useState({ name: '', email: '', password: '' });

  const submit = async () => {
    await api.post('/auth/register', form);
    alert("Registered");
  };

  return (
    <div>
      <input placeholder="Name" onChange={e => setForm({...form, name: e.target.value})} />
      <input placeholder="Email" onChange={e => setForm({...form, email: e.target.value})} />
      <input placeholder="Password" type="password" onChange={e => setForm({...form, password: e.target.value})} />
      <button onClick={submit}>Register</button>
    </div>
  );
};

export default Register;
