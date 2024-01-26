// src/components/FashionUpdate.js
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { db } from './firebaseConfig'; // Update the path accordingly

const FashionUpdate = () => {
  const { id } = useParams();
  const [itemName, setItemName] = useState('');
  const [itemImageUrl, setItemImageUrl] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchFashionItem = async () => {
      try {
        const itemRef = doc(db, 'fashionItems', id); // Use db from firebaseConfig
        const itemSnapshot = await getDoc(itemRef);
        if (itemSnapshot.exists()) {
          const itemData = itemSnapshot.data();
          setItemName(itemData.name);
          setItemImageUrl(itemData.imageUrl);
        }
      } catch (error) {
        console.error('Error fetching fashion item', error);
      }
    };

    fetchFashionItem();
  }, [id]);

  const handleUpdateItem = async () => {
    try {
      const itemRef = doc(db, 'fashionItems', id); // Use db from firebaseConfig
      await updateDoc(itemRef, { name: itemName, imageUrl: itemImageUrl });
      navigate(`/fashion/${id}`);
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
        <input type="text" value={itemImageUrl} onChange={(e) => setItemImageUrl(e.target.value)} />
      </label>
      <br />
      <button onClick={handleUpdateItem}>Update Item</button>
    </div>
  );
};

export default FashionUpdate;

