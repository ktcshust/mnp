// src/components/FashionUpdate.js
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { db } from './firebaseConfig'; // Update the path accordingly
import { storage } from './firebaseConfig'; // Assuming storage is also part of your firebaseConfig
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { useNavigate } from 'react-router-dom';

const FashionUpdate = () => {
  const { id } = useParams();
  const [itemName, setItemName] = useState('');
  const [image, setItemImage] = useState(null);
  const [yearOfOrigin, setYearOfOrigin] = useState('');
  const [brand, setBrand] = useState('');
  const [price, setPrice] = useState('');
  const [color, setColor] = useState('');
  const [description, setDescription] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchFashionItem = async () => {
      try {
        const itemDoc = doc(db, 'fashionItems', id);
        const itemData = await getDoc(itemDoc);

        if (itemData.exists()) {
          const item = itemData.data();
          setItemName(item.name);
          setYearOfOrigin(item.yearOfOrigin);
          setBrand(item.brand);
          setPrice(item.price);
          setColor(item.color);
          setDescription(item.description);
    
        } else {
          console.error('Fashion item not found');
        }
      } catch (error) {
        console.error('Error fetching fashion item', error);
      }
    };

    fetchFashionItem();
  }, [id]);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setItemImage(file);
  };

  const handleUpdateItem = async () => {
    try {
      let imageUrl = null;
      if (image) {
        const storageRef = ref(storage, `fashion-images/${itemName}`);
        const imageRef = ref(storageRef, image.name);

        await uploadBytes(imageRef, image);
        imageUrl = await getDownloadURL(imageRef);
      }

      // Update fashion item in firestore
      const itemDoc = doc(db, 'fashionItems', id);
      await updateDoc(itemDoc, {
        name: itemName,
        imageUrl: imageUrl,
        yearOfOrigin: yearOfOrigin,
        brand: brand,
        price: price,
        color: color,
        description: description,
      });
      navigate("/fashionmanager")
    } catch (error) {
      console.error('Error updating fashion item', error);
    }
  };

  return (
    <div>
      <h2>Update Fashion Item</h2>
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
      <button onClick={handleUpdateItem}>Update Item</button>
    </div>
  );
};

export default FashionUpdate;


