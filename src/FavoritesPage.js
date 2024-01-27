// src/components/FavoritesPage.js
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getDocs, collection } from 'firebase/firestore';
import { db } from './firebaseConfig';
import { auth } from './firebaseConfig';

const FavoritesPage = () => {
  const [favorites, setFavorites] = useState([]);
  const userId = auth.currentUser ? auth.currentUser.uid : null;

  useEffect(() => {
    const fetchFavorites = async () => {
      try {
        if (!userId) {
          return;
        }

        const favoritesCollectionRef = collection(db, `users/${userId}/favorites`);
        const querySnapshot = await getDocs(favoritesCollectionRef);

        const favoriteItems = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        setFavorites(favoriteItems);
      } catch (error) {
        console.error('Error fetching favorites', error);
      }
    };

    fetchFavorites();
  }, [userId]);

  return (
    <div>
      <h2>Favorite Items</h2>
      {favorites.map((item) => (
        <div key={item.id}>
          <Link to={`/fashion-detail/${item.id}`}>{item.name}</Link>
        </div>
      ))}
    </div>
  );
};

export default FavoritesPage;


