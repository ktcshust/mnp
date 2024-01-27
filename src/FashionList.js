// src/components/FashionList.js
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { BsPersonFill } from 'react-icons/bs';
import { collection, getDocs} from 'firebase/firestore';
import { db } from './firebaseConfig'; // Update the path accordingly

const FashionList = () => {
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

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h2>Fashion List</h2>
        <Link to="/profile">
          <BsPersonFill size={30} />
        </Link>
        <div style={{ display: 'flex', flexDirection: 'column', position: 'absolute', right: '60px' }}>
          <Link to="/updateprofile">Update Profile</Link>
          <Link to="/favoritelist">Favorite List</Link>
          <Link to="/ratinglist">Rating List</Link>
        </div>
      </div>
      <ul>
        {fashionItems.map((item) => (
          <li key={item.id}>
            <Link to={`/fashion/${item.id}`}>
              <img src={item.imageUrl} alt={item.name} style={{ width: '100px', height: '100px' }} />
              <p>{item.name}</p>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default FashionList;

