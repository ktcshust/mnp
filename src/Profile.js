// Profile.js
import { useState } from "react";
import { db } from './firebaseConfig'; // Assuming db is the Firestore instance
import { doc, setDoc } from "firebase/firestore";
import { getAuth } from 'firebase/auth';
import { storage } from './firebaseConfig'; // Assuming storage is also part of your firebaseConfig

import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';

import 'react-datepicker/dist/react-datepicker.css';

const Profile = () => {
  const auth = getAuth();
  const userId = auth.currentUser.uid; // Lấy ID của người dùng đã đăng nhập

  const [name, setName] = useState('');
  const [dob, setDob] = useState("");
  const [gender, setGender] = useState("");
  const [location, setLocation] = useState("");
  const [job, setJob] = useState("");
  const [phone, setPhone] = useState("");
  const [image, setImage] = useState(null);

  const handleNameChange = (event) => {
    setName(event.target.value);
  };

  const handleDobChange = (date) => {
    setDob(date);
  };

  const handleGenderChange = (event) => {
    setGender(event.target.value);
  }; // 2 options male and female

  const handleLocationChange = (event) => {
    setLocation(event.target.value);
  }; //cuộn để chọn giữa nhiều thành phố lớn

  const handleJobChange = (event) => {
    setJob(event.target.value);
  }; // cuộn để chọn giữa nhiều nghề nghiệp

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
  
      // Upload hình ảnh và lấy URL
      let imageUrl = null;
        if (image) {
        const storageRef = ref(storage, `profile-images/${userId}`);
        const imageRef = ref(storageRef, image.name);

        await uploadBytes(imageRef, image);
        imageUrl = await getDownloadURL(imageRef);
        }
  
      // Lưu thông tin cá nhân vào Firestore
      await setDoc(userDocRef, {
        userId,
        name,
        dob,
        gender,
        location,
        job,
        phone,
        imageUrl, // URL hình ảnh
      });
  
      // Chuyển hướng hoặc thực hiện các công việc khác sau khi lưu thông tin
      console.log("Profile information saved successfully!");
    } catch (error) {
      console.error("Error saving profile information:", error);
    }
  };

  return (
    <div>
        <h2>Profile</h2>
        <form id="profileForm" onSubmit={handleSubmit}>
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
            <button type="submit">Save</button>
        </form>

    </div>
  );
};

export default Profile;
