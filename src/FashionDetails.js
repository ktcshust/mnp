// src/components/FashionDetail.js
import React from 'react';

const FashionDetail = ({ match, fashionItems }) => {
  const itemId = match.params.id;
  const item = fashionItems.find((item) => item.id === parseInt(itemId));

  if (!item) {
    return <div>Item not found</div>;
  }

  return (
    <div>
      <h2>{item.name}</h2>
      <p>{item.description}</p>
    </div>
  );
};

export default FashionDetail;
