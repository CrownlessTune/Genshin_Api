import React, { useState, useEffect, useRef } from 'react';
import { auth, db } from '../config/firebase';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import Paimon404 from '../assets/img/Paimon_Confuse.png';  // Asegúrate de que la ruta sea correcta
import Favourite from './Favourite'; // Importar el componente Favourite
import '../sass/components/_UserProfile.scss';

const UserProfile = () => {
  const [profileImage, setProfileImage] = useState(() => {
    const savedImage = localStorage.getItem('profileImage');
    return savedImage ? savedImage : Paimon404;  // Se asegura que use Paimon404 como valor predeterminado
  });
  const [bio, setBio] = useState('');
  const [slogan, setSlogan] = useState('');
  const [username, setUsername] = useState('');
  const [userId, setUserId] = useState('');
  const [isBioEditing, setIsBioEditing] = useState(false);
  const [isSloganEditing, setIsSloganEditing] = useState(false);
  const [loading, setLoading] = useState(true);
  const fileInputRef = useRef(null);

  useEffect(() => {
    const fetchUserData = async () => {
      setLoading(true);
      const user = auth.currentUser;

      if (!user) {
        console.warn('No authenticated user found');
        setLoading(false);
        return;
      }

      try {
        const userDocRef = doc(db, 'users', user.uid);
        const userDoc = await getDoc(userDocRef);

        if (!userDoc.exists()) {
          console.warn('User document does not exist in Firestore');
          setLoading(false);
          return;
        }

        const userData = userDoc.data();
        setUsername(userData.username || 'Anonymous');
        setBio(userData.bio || '');
        setSlogan(userData.slogan || '');
        setUserId(user.uid);
      } catch (error) {
        console.error('Error fetching user data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, []);

  const handleProfileImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) {
      console.error('No file selected');
      return;
    }

    const imageURL = URL.createObjectURL(file);
    localStorage.setItem('profileImage', imageURL);
    setProfileImage(imageURL);
  };

  const handleBioSubmit = () => {
    if (userId) {
      const userDocRef = doc(db, 'users', userId);
      updateDoc(userDocRef, { bio });
    }
    setIsBioEditing(false);
  };

  const handleSloganSubmit = () => {
    if (userId) {
      const userDocRef = doc(db, 'users', userId);
      updateDoc(userDocRef, { slogan });
    }
    setIsSloganEditing(false);
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="user-profile-container">
      <div className="profile-header">
        <img
          className="profile-image"
          src={profileImage}
          alt="Profile"
          onClick={() => fileInputRef.current.click()}
        />
        <input
          type="file"
          ref={fileInputRef}
          style={{ display: 'none' }}
          accept="image/*"
          onChange={handleProfileImageChange}
        />
      </div>

      <h2>{username}</h2>
      <p>ID: {userId}</p>

      <div onClick={() => setIsBioEditing(true)}>
        <div className="section-title">Bio:</div>
        {!isBioEditing ? (
          <p>{bio || 'Click here to add your bio'}</p>
        ) : (
          <div>
            <textarea
              className="editable-textarea"
              value={bio}
              onChange={(e) => setBio(e.target.value)}
              placeholder="Enter your bio"
              style={{ height: isBioEditing ? 'auto' : '30px' }} // Ajuste de tamaño
            />
            <button className="save-button" onClick={handleBioSubmit}>
              Save Bio
            </button>
          </div>
        )}
      </div>

      <div onClick={() => setIsSloganEditing(true)}>
        <div className="section-title">Slogan:</div>
        {!isSloganEditing ? (
          <p>{slogan || 'Click here to add your slogan'}</p>
        ) : (
          <div>
            <input
              className="editable-input"
              type="text"
              value={slogan}
              onChange={(e) => setSlogan(e.target.value)}
              placeholder="Enter your slogan"
              style={{ width: isSloganEditing ? 'auto' : '100%' }} // Ajuste de tamaño
            />
            <button className="save-button" onClick={handleSloganSubmit}>
              Save Slogan
            </button>
          </div>
        )}
      </div>

      {/* Eliminar la sección de Featured Content aquí */}

      {/* Integrar el componente Favourite */}
      <Favourite />
    </div>
  );
};

export default UserProfile;
