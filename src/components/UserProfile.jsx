import React, { useState, useEffect } from 'react';
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { auth, db } from '../config/firebase'; 
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import Paimon404 from '../assets/img/Paimon_Confuse.png'; 

const UserProfile = () => {
  const [profileImage, setProfileImage] = useState(Paimon404);
  const [bio, setBio] = useState('');
  const [slogan, setSlogan] = useState('');
  const [featured, setFeatured] = useState([]);
  const [username, setUsername] = useState('');
  const [userId, setUserId] = useState('');
  const [isBioEditing, setIsBioEditing] = useState(false);
  const [isSloganEditing, setIsSloganEditing] = useState(false);

  useEffect(() => {
    const user = auth.currentUser;
    
    if (user) {
      const fetchUserData = async () => {
        const userDocRef = doc(db, 'users', user.uid);
        const userDoc = await getDoc(userDocRef);
        
        if (userDoc.exists()) {
          const userData = userDoc.data();
          setUsername(userData.username);
          setBio(userData.bio || ''); 
          setSlogan(userData.slogan || ''); 
          setFeatured(userData.featured || []);
          setUserId(user.uid);
          setProfileImage(userData.profileImage || Paimon404); 
        }
      };

      fetchUserData();
    }
  }, []);


  const handleProfileImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const storage = getStorage();
      const imageRef = ref(storage, 'profileImages/' + userId); 
      uploadBytes(imageRef, file).then(() => {
        getDownloadURL(imageRef).then((downloadURL) => {

          updateProfileImageInDB(downloadURL);
        });
      });
    }
  };
  
  // Función para actualizar la URL de la imagen en Firestore
  const updateProfileImageInDB = async (imageURL) => {
    const userDocRef = doc(db, 'users', userId);
    await updateDoc(userDocRef, { profileImage: imageURL });
    setProfileImage(imageURL); // Actualiza el estado local de la imagen
  };

  // Función para actualizar la biografía en Firestore
  const handleBioSubmit = async () => {
    const userDocRef = doc(db, 'users', userId);
    await updateDoc(userDocRef, { bio: bio });
    setIsBioEditing(false); // Cierra el editor de la biografía
  };

  // Función para actualizar el slogan en Firestore
  const handleSloganSubmit = async () => {
    const userDocRef = doc(db, 'users', userId);
    await updateDoc(userDocRef, { slogan: slogan });
    setIsSloganEditing(false); // Cierra el editor del slogan
  };

  // Agregar contenido destacado
  const handleFeaturedAdd = (content) => {
    if (featured.length < 2 && !featured.includes(content)) {
      setFeatured([...featured, content]);
    }
  };

  // Eliminar contenido destacado
  const handleFeaturedRemove = (content) => {
    setFeatured(featured.filter(item => item !== content));
  };

  return (
    <div>
      {/* Imagen de perfil */}
      <div>
        <img
          src={profileImage}
          alt="Profile"
          style={{ width: '60px', height: '60px', borderRadius: '50%' }}
          onClick={() => document.getElementById('profileImageInput').click()} // Trigger file input on click
        />
        <input
          type="file"
          id="profileImageInput"
          style={{ display: 'none' }}
          accept="image/*"
          onChange={handleProfileImageChange}
        />
      </div>

      {/* Información del usuario */}
      <div>
        <h2>{username}</h2>
        <p>ID: {userId}</p>

        {/* Biografía */}
        <div onClick={() => setIsBioEditing(true)}>
          <strong>Bio:</strong>
          {!isBioEditing ? (
            <p>{bio || 'Click here to add your bio'}</p>
          ) : (
            <div>
              <textarea
                value={bio}
                onChange={(e) => setBio(e.target.value)}
                placeholder="Enter your bio"
              />
              <button onClick={handleBioSubmit}>Save Bio</button>
            </div>
          )}
        </div>

        {/* Slogan */}
        <div onClick={() => setIsSloganEditing(true)}>
          <strong>Slogan:</strong>
          {!isSloganEditing ? (
            <p>{slogan || 'Click here to add your slogan'}</p>
          ) : (
            <div>
              <input
                type="text"
                value={slogan}
                onChange={(e) => setSlogan(e.target.value)}
                placeholder="Enter your slogan"
              />
              <button onClick={handleSloganSubmit}>Save Slogan</button>
            </div>
          )}
        </div>
      </div>

      {/* Contenido destacado */}
      <div>
        <h3>Featured Content</h3>
        <ul>
          {featured.map((item, index) => (
            <li key={index}>
              {item}
              <button onClick={() => handleFeaturedRemove(item)}>Remove</button>
            </li>
          ))}
        </ul>
        <button onClick={() => handleFeaturedAdd('New Wiki Content')}>Add Content</button>
      </div>
    </div>
  );
};

export default UserProfile;
