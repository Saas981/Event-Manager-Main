import React, { useState, useEffect } from 'react';

const ProfileStyle = {
  padding: '20px',
  border: '1px solid #ddd',
  borderRadius: '8px',
  backgroundColor: '#f5f5f5',
  maxWidth: '400px',
  margin: 'auto',
  boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
};

const ProfileHeader = {
  fontSize: '24px',
  marginBottom: '10px',
};

const ProfileSubheader = {
  fontSize: '18px',
  fontWeight: 'bold',
  marginBottom: '5px',
};

const ProfileContent = {
  fontSize: '16px',
  marginBottom: '15px',
};

const EditButton = {
  backgroundColor: '#4CAF50',
  color: 'white',
  padding: '10px 15px',
  border: 'none',
  borderRadius: '4px',
  cursor: 'pointer',
  marginRight: '10px',
};

const SaveButton = {
  backgroundColor: '#2196F3',
  color: 'white',
  padding: '10px 15px',
  border: 'none',
  borderRadius: '4px',
  cursor: 'pointer',
};

const Profile = ({ theme, userData }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [photo, setPhoto] = useState(null);
  const [username, setUsername] = useState('Mike Oxlong');
  const [name, setName] = useState('John Doe');
  const [email, setEmail] = useState('example@gmail.com');
  const [bio, setBio] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const storedData = userData;

        if (storedData) {
          setPhoto(storedData.photo);
          setUsername(storedData.username);
          setName(storedData.name);
          setEmail(storedData.email);
          setBio(storedData.bio || '');
        } else {
          const response = await fetch('https://api.example.com/user/123');
          const data = await response.json();

          setPhoto(data.photo);
          setUsername(data.username);
          setName(data.name);
          setEmail(data.email);
          setBio(data.bio || '');

          localStorage.setItem(
            'userData',
            JSON.stringify({
              photo: data.photo,
              username: data.username,
              name: data.name,
              email: data.email,
              bio: data.bio || '',
            })
          );
        }
      } catch (error) {
        console.error('Error fetching or loading user data:', error);
      }
    };

    fetchData();
  }, [userData]);

  const handleEditProfile = () => {
    setIsEditing(true);
  };

  const handleSaveProfile = () => {
    setIsEditing(false);
    console.log('Profile Saved!');

    localStorage.setItem(
      'userData',
      JSON.stringify({
        photo,
        username,
        name,
        email,
        bio,
      })
    );
  };

  return (
    <div style={ProfileStyle}>
      <h2 style={ProfileHeader}>User Profile</h2>
      <div style={{ marginBottom: '15px' }}>
        <img
          src={photo || 'https://via.placeholder.com/150'}
          alt="Profile"
          style={{ width: '150px', borderRadius: '50%', marginBottom: '10px' }}
        />
      </div>
      <div style={ProfileSubheader}>Username:</div>
      {isEditing ? (
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          style={{ width: '100%', marginBottom: '10px' }}
        />
      ) : (
        <p style={ProfileContent}>{username}</p>
      )}
      <div style={ProfileSubheader}>Id:</div>
      {isEditing ? (
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          style={{ width: '100%', marginBottom: '10px' }}
        />
      ) : (
        <p style={ProfileContent}>{name}</p>
      )}
      <div style={ProfileSubheader}>Email:</div>
      {isEditing ? (
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          style={{ width: '100%', marginBottom: '15px' }}
        />
      ) : (
        <p style={ProfileContent}>{email}</p>
      )}
      <div style={ProfileSubheader}>Bio:</div>
      {isEditing ? (
        <textarea
          value={bio}
          onChange={(e) => setBio(e.target.value)}
          style={{ width: '100%', marginBottom: '15px', minHeight: '80px' }}
          maxLength={45} // Set maximum character limit for the bio
        />
      ) : (
        <p style={ProfileContent}>{bio}</p>
      )}
      {isEditing ? (
        <button style={SaveButton} onClick={handleSaveProfile}>
          Save Profile
        </button>
      ) : (
        <button style={EditButton} onClick={handleEditProfile}>
          Edit Profile
        </button>
      )}
    </div>
  );
};

export default Profile;
