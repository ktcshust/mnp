// src/components/FashionDetail.js
import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { deleteDoc } from 'firebase/firestore';
import { db } from './firebaseConfig';
import { auth } from './firebaseConfig';

const FashionDetail = () => {
  const { itemId } = useParams();
  const [item, setItem] = useState(null);
  const [isFavorite, setIsFavorite] = useState(false);
  const [rating, setRating] = useState(0);
  const [loadingUserData, setLoadingUserData] = useState(true);

  useEffect(() => {
    const fetchFashionItem = async () => {
      try {
        const docRef = doc(db, 'fashionItems', itemId);
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

  const userId = auth.currentUser ? auth.currentUser.uid : null;

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        if (!userId) {
          setLoadingUserData(false);
          return;
        }

        const favoritesRef = doc(db, 'users', userId, 'favorites', itemId);
        const favoritesSnapshot = await getDoc(favoritesRef);
        const isFavorite = favoritesSnapshot.exists();

        const ratingsRef = doc(db, 'users', userId, 'ratings', itemId);
        const ratingsSnapshot = await getDoc(ratingsRef);
        const userRating = ratingsSnapshot.exists() ? ratingsSnapshot.data().rating : 0;

        setIsFavorite(isFavorite);
        setRating(userRating);
        setLoadingUserData(false);
      } catch (error) {
        console.error('Error fetching user data', error);
        setLoadingUserData(false);
      }
    };

    fetchUserData();
  }, [itemId, userId]);

  // Toggle favorite status
  const handleToggleFavorite = async () => {
    try {
      if (!userId) {
        // Handle the case where the user is not authenticated
        console.error('User not authenticated');
        return;
      }

      const favoritesRef = doc(db, 'users', userId, 'favorites', itemId);
      const isFavoriteSnapshot = await getDoc(favoritesRef);
      const isFavorite = isFavoriteSnapshot.exists();

      if (isFavorite) {
        // Item is already in favorites, remove it
        await deleteDoc(favoritesRef);
      } else {
        // Item is not in favorites, add it
        await setDoc(favoritesRef, { isFavorite: true });
      }

      setIsFavorite(!isFavorite);
    } catch (error) {
      console.error('Error toggling favorite status', error);
    }
  };

  // Handle rating change
  const handleRatingChange = async (newRating) => {
    try {
      if (!userId) {
        // Handle the case where the user is not authenticated
        console.error('User not authenticated');
        return;
      }

      const ratingsRef = doc(db, 'users', userId, 'ratings', itemId);
      await setDoc(ratingsRef, { rating: newRating });
      setRating(newRating);
    } catch (error) {
      console.error('Error updating rating', error);
    }
  };

  if (!item || loadingUserData) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h2>{item.name}</h2>
      <img src={item.imageUrl} alt={item.name} style={{ width: '200px', height: '200px' }} />
      <p>Description: {item.description}</p>
      <p>Year of Origin: {item.yearOfOrigin}</p>
      <p>Brand: {item.brand}</p>
      <p>Price: {item.price}</p>
      <p>Color: {item.color}</p>

      {/* Favorite button */}
      <button onClick={handleToggleFavorite}>
        {isFavorite ? 'Remove from Favorites' : 'Add to Favorites'}
      </button>

      {/* Star rating */}
      <div>
        <p>Rating:</p>
        {[1, 2, 3, 4, 5].map((star) => (
          <span
            key={star}
            style={{ cursor: 'pointer', color: star <= rating ? 'gold' : 'gray' }}
            onClick={() => handleRatingChange(star)}
          >
            &#9733;
          </span>
        ))}
      </div>

      {/* Try with personal image */}
      <Link to="/try-on">
        <button>Try with Personal Image</button>
      </Link>
    </div>
  );
};

export default FashionDetail;




