// src/components/FashionDetail.js
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { doc, getDoc } from 'firebase/firestore';
import { db } from './firebaseConfig'; // Update the path accordingly

const FashionDetail = () => {
  const { itemId } = useParams();
  const [item, setItem] = useState(null);

  useEffect(() => {
    const fetchFashionItem = async () => {
      try {
        const docRef = doc(db, 'fashionItems', itemId); // Use db from firebaseConfig
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          setItem({ id: docSnap.id, ...docSnap.data() });
        } else {
          console.error('Fashion item not found');
        }
      } catch (error) {
        console.error('Error fetching fashion item', error);
      }
    };

    fetchFashionItem();
  }, [itemId]);

  if (!item) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h2>{item.name}</h2>
      <img src={item.imageUrl} alt={item.name} style={{ width: '200px', height: '200px' }} />
      <p>Description: {item.description}</p>
      {/* Add more details as needed */}
    </div>
  );
};

export default FashionDetail;

