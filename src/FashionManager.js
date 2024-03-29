// src/components/FashionManager.js
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { BsPersonFill } from 'react-icons/bs';
import { collection, getDocs, deleteDoc, doc } from 'firebase/firestore';
import { db } from './firebaseConfig'; // Update the path accordingly

const FashionManager = () => {
  const [fashionItems, setFashionItems] = useState([]);

  useEffect(() => {
    const fetchFashionItems = async () => {
      try {
        const collectionRef = collection(db, 'fashionItems'); // Use db from firebaseConfig
        const data = await getDocs(collectionRef);
        const items = data.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
        setFashionItems(items);
      } catch (error) {
        console.error('Error fetching fashion items', error);
      }
    };

    fetchFashionItems();
  }, []);

  const handleDeleteItem = async (itemId) => {
    try {
      await deleteDoc(doc(db, 'fashionItems', itemId)); // Use db from firebaseConfig
      setFashionItems((prevItems) => prevItems.filter((item) => item.id !== itemId));
    } catch (error) {
      console.error('Error deleting fashion item', error);
    }
  };

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h2>Fashion List</h2>
        <Link to="/profile">
          <BsPersonFill size={30} />
        </Link>
        <Link to="/fashion/add">Add Item</Link>
      </div>
      <ul>
        {fashionItems.map((item) => (
          <li key={item.id}>
            <Link to={`/fashion/${item.id}`}>
              <img src={item.imageUrl} alt={item.name} style={{ width: '100px', height: '100px' }} />
              <p>{item.name}</p>
            </Link>
            <Link to={`/fashion/${item.id}/update`}>Update</Link>
            <button onClick={() => handleDeleteItem(item.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default FashionManager;

