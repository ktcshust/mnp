// src/components/FashionAdd.js
import React, { useState } from 'react';
import { collection, addDoc } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';
import { db } from './firebaseConfig'; // Update the path accordingly
import { storage } from './firebaseConfig'; // Assuming storage is also part of your firebaseConfig
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';


  const FashionAdd = () => {
    const [itemName, setItemName] = useState('');
    const [image, setItemImage] = useState(null); // Updated state to store the image file
    const [yearOfOrigin, setYearOfOrigin] = useState('');
    const [brand, setBrand] = useState('');
    const [price, setPrice] = useState('');
    const [color, setColor] = useState('');
    const [description, setDescription] = useState('');
    const navigate = useNavigate();
  
    const handleImageChange = (e) => {
      const file = e.target.files[0];
      setItemImage(file);
    };
  
    const handleAddItem = async () => {
      try {
        let imageUrl = null
        if (image) {
            const storageRef = ref(storage, `fashion-images/${itemName}`);
            const imageRef = ref(storageRef, image.name);

            await uploadBytes(imageRef, image);
            imageUrl = await getDownloadURL(imageRef);
        }
  
        // Add fashion item to firestore
        const itemsCollection = collection(db, 'fashionItems');
        const newItemRef = await addDoc(itemsCollection, {
          name: itemName,
          imageUrl: imageUrl,
          yearOfOrigin: yearOfOrigin,
          brand: brand,
          price: price,
          color: color,
          description: description,
        });
  
        navigate(`/fashionmanager`);
      } catch (error) {
        console.error('Error adding fashion item', error);
      }
    };
  return (
    <div>
      <h2>Add Fashion Item</h2>
      <label>
        Name:
        <input type="text" value={itemName} onChange={(e) => setItemName(e.target.value)} />
      </label>
      <br />
      <label>
        Image URL:
        <input type="file" onChange={handleImageChange} />
      </label>
      <br />
      <label>
        Year of Origin:
        <input type="text" value={yearOfOrigin} onChange={(e) => setYearOfOrigin(e.target.value)} />
      </label>
      <br />
      <label>
        Brand:
        <input type="text" value={brand} onChange={(e) => setBrand(e.target.value)} />
      </label>
      <br />
      <label>
        Price:
        <input type="text" value={price} onChange={(e) => setPrice(e.target.value)} />
      </label>
      <br />
      <label>
        Color:
        <input type="text" value={color} onChange={(e) => setColor(e.target.value)} />
      </label>
      <br />
      <label>
        Description:
        <textarea value={description} onChange={(e) => setDescription(e.target.value)} />
      </label>
      <br />
      <button onClick={handleAddItem}>Add Item</button>
    </div>
  );
};

export default FashionAdd;
