import React, { useState } from 'react';

const TryOn = () => {
  const [, setProfileImage] = useState(null);
  const [, setClothImage] = useState(null);

  const handleProfileImageChange = (e) => {
    setProfileImage(e.target.files[0]);
  };

  const handleClothImageChange = (e) => {
    setClothImage(e.target.files[0]);
  };


  return (
    <div>
      <h2>Upload Profile Image</h2>
      <input type="file" onChange={handleProfileImageChange} />

      <h2>Upload Cloth Image</h2>
      <input type="file" onChange={handleClothImageChange} />

    </div>
  );
};

export default TryOn;


