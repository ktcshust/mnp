// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import FashionList from './FashionList';
import FashionAdd from './FashionAdd';
import FashionUpdate from './FashionUpdate';
import FashionManager from './FashionManager';
import FashionDetails from './FashionDetails'; 
import SignIn from './SignIn';
import SignUp from './SignUp';
import Profile from './Profile';
import FavoritesPage from './FavoritesPage';
import RatingsPage from './RatingsPage';
import UpdateProfile from './UpdateProfile';
import TryOn from './TryOn';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/fashion/add" element={<FashionAdd />} />
        <Route path="/fashion/:id/update" element={<FashionUpdate />} />
        <Route path="/fashionmanager" element={<FashionManager />} />
        <Route path="/fashion" element={<FashionList />} />
        <Route path="/fashion/:itemId" element={<FashionDetails />} />
        <Route path="/" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/favoritelist" element={<FavoritesPage />} />
        <Route path="/ratinglist" element={<RatingsPage />} />
        <Route path="/updateprofile" element={<UpdateProfile />} />
        <Route path="/try-on" element={<TryOn />} />
      </Routes>
    </Router>
  );
};

export default App;

