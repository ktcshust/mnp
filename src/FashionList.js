// src/components/FashionList.js
import React from 'react';
import { Link } from 'react-router-dom';

const FashionList = ({ fashionItems }) => {
  return (
    <div>
      <h2>Fashion List</h2>
      <ul>
        {fashionItems.map((item) => (
          <li key={item.id}>
            <Link to={`/fashion/${item.id}`}>{item.name}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default FashionList;

