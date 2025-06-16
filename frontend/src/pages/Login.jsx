import React, { useState } from 'react';
import api from '../utils/api';

const Login = () => {
  const [form, setForm] = useState({ email: '', password: '' });

  const submit = async () => {
    const res = await api.post('/auth/login', form);
    localStorage.setItem('token', res.data.token);
    alert("Logged In");
  };

  return (
    <div>
      <input placeholder="Email" onChange={e => setForm({...form, email: e.target.value})} />
      <input placeholder="Password" type="password" onChange={e => setForm({...form, password: e.target.value})} />
      <button onClick={submit}>Login</button>
    </div>
  );
};

export default Login;
