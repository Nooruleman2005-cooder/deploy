import React, { useEffect, useState } from 'react';
import authAxios from '../utils/axios';
import { useAuth } from '../context/AuthContext';

const Profile = () => {
  const { user } = useAuth();
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    if (user) {
      authAxios.get('/auth/profile')
        .then(res => setProfile(res.data))
        .catch(err => console.error('Profile fetch error', err));
    }
  }, [user]);

  if (!user) {
    return <p>Please log in to see your profile.</p>;
  }

  if (!profile) {
    return <p>Loading profile...</p>;
  }

  return (
    <div className="container mt-5">
      <h2>Welcome, {profile.name}</h2>
      <p><strong>Email:</strong> {profile.email}</p>
      <p><strong>ID:</strong> {profile._id}</p>
    </div>
  );
};

export default Profile;
