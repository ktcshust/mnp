// src/components/RatingsPage.js
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { doc, getDocs } from 'firebase/firestore';
import { db } from './firebaseConfig';
import { auth } from './firebaseConfig';

const RatingsPage = () => {
  const [ratings, setRatings] = useState([]);
  const userId = auth.currentUser ? auth.currentUser.uid : null;

  useEffect(() => {
    const fetchRatings = async () => {
      try {
        if (!userId) {
          return;
        }

        const ratingsCollection = doc(db, `users/${userId}/ratings`);
        const querySnapshot = await getDocs(ratingsCollection);

        const ratedItems = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        setRatings(ratedItems);
      } catch (error) {
        console.error('Error fetching ratings', error);
      }
    };

    fetchRatings();
  }, [userId]);

  return (
    <div>
      <h2>Rated Items</h2>
      {ratings.map((item) => (
        <div key={item.id}>
          <Link to={`/fashion-detail/${item.id}`}>{item.name}</Link>
          <p>Rating: {item.rating}</p>
        </div>
      ))}
    </div>
  );
};

export default RatingsPage;

