import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // ✅ add this
import authAxios from '../utils/axios';

const AuthForm = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({ name: '', email: '', password: '' });
  const navigate = useNavigate(); // ✅ initialize navigate

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const endpoint = isLogin ? '/login' : '/signup';
    try {
      const res = await authAxios.post(endpoint, formData);

      // ✅ store token (if using localStorage) — optional if you're using cookies
      localStorage.setItem('token', res.data.token);

      alert('Success');

      // ✅ redirect to home/dashboard
      navigate('/profile'); // 👈 update this as per your route
    } catch (err) {
      alert(err.response?.data?.message || 'Error');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      {!isLogin && (
        <input name="name" placeholder="Name" onChange={handleChange} required />
      )}
      <input name="email" placeholder="Email" onChange={handleChange} required />
      <input type="password" name="password" placeholder="Password" onChange={handleChange} required />
      <button type="submit">{isLogin ? 'Login' : 'Signup'}</button>
      <p onClick={() => setIsLogin(!isLogin)}>
        {isLogin ? 'New user? Signup' : 'Already have an account? Login'}
      </p>
    </form>
  );
};

export default AuthForm;
