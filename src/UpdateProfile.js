// UpdateProfile.js
import { useState, useEffect } from "react";
import { db } from './firebaseConfig';
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { getAuth } from 'firebase/auth';
import { storage } from './firebaseConfig';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';

import 'react-datepicker/dist/react-datepicker.css';

const UpdateProfile = () => {
  const auth = getAuth();
  const userId = auth.currentUser.uid;

  const [name, setName] = useState('');
  const [dob, setDob] = useState("");
  const [gender, setGender] = useState("");
  const [location, setLocation] = useState("");
  const [job, setJob] = useState("");
  const [phone, setPhone] = useState("");
  const [image, setImage] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const userDocRef = doc(db, "users", userId);
        const userDoc = await getDoc(userDocRef);

        if (userDoc.exists()) {
          const userData = userDoc.data();
          setName(userData.name || '');
          setDob(userData.dob || '');
          setGender(userData.gender || '');
          setLocation(userData.location || '');
          setJob(userData.job || '');
          setPhone(userData.phone || '');
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUserData();
  }, [userId]);

  const handleNameChange = (event) => {
    setName(event.target.value);
  };

  const handleDobChange = (date) => {
    setDob(date);
  };

  const handleGenderChange = (event) => {
    setGender(event.target.value);
  };

  const handleLocationChange = (event) => {
    setLocation(event.target.value);
  };

  const handleJobChange = (event) => {
    setJob(event.target.value);
  };

  const handlePhoneChange = (event) => {
    setPhone(event.target.value);
  };

  const handleImageChange = (e) => {
    const selectedImage = e.target.files[0];
    setImage(selectedImage);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const userDocRef = doc(db, "users", userId);

      // Upload image and get URL
      let imageUrl = null;
      if (image) {
        const storageRef = ref(storage, `profile-images/${userId}`);
        const imageRef = ref(storageRef, image.name);

        await uploadBytes(imageRef, image);
        imageUrl = await getDownloadURL(imageRef);
      }

      // Update user data in Firestore
      await updateDoc(userDocRef, {
        name,
        dob,
        gender,
        location,
        job,
        phone,
        imageUrl,
      });

      console.log("Profile information updated successfully!");
    } catch (error) {
      console.error("Error updating profile information:", error);
    }
  };

  return (
    <div>
      <h2>Update Profile</h2>
      <form id="updateProfileForm" onSubmit={handleSubmit}>
        <label>
          Name:
          <input type="text" id="name" value={name} onChange={handleNameChange} required />
        </label>
        <br />
        <label>
          Date of Birth:
          <input type="date" id="dob" value={dob} onChange={(e) => handleDobChange(e.target.value)} required />
        </label>
        <br />
        <label>
          Gender:
          <select id="gender" value={gender} onChange={handleGenderChange} required>
            <option value="male">Male</option>
            <option value="female">Female</option>
          </select>
        </label>
        <br />
        <label>
          Location:
          <input type="text" id="location" value={location} onChange={handleLocationChange} required />
        </label>
        <br />
        <label>
          Job:
          <input type="text" id="job" value={job} onChange={handleJobChange} required />
        </label>
        <br />
        <label>
          Phone:
          <input type="tel" id="phone" value={phone} onChange={handlePhoneChange} required />
        </label>
        <br />
        <label>
          Profile Image:
          <input type="file" accept="image/*" id="profileImage" onChange={handleImageChange} />
        </label>
        <br />
        <button type="submit">Update</button>
      </form>
    </div>
  );
};

export default UpdateProfile;
