import React, { useState, useEffect } from 'react';
import axios from 'axios';

const MyPoints = () => {
  const [points, setPoints] = useState(0);
  const [discount, setDiscount] = useState(0);
  const [discountOptions, setDiscountOptions] = useState([
    { points: 100, discount: 10 },
    { points: 250, discount: 20 },
    { points: 350, discount: 30 },
    { points: 400, discount: 40 },
    { points: 500, discount: 100 },
  ]);

  const addPoints = () => {
    const newPoints = points + 100; 
    setPoints(newPoints);
  }
  const redeemDiscount = (discountOption) => {
    if (points >= discountOption.points) {
      const newPoints = points - discountOption.points;
      setPoints(newPoints);
      setDiscount(discountOption.discount);
    } else {
      alert("You don't have enough points to redeem this discount.");
    }
  }

  return (
    <div>
      <h2>My Points: {points}</h2>
      <h2>My Discount: {discount}%</h2>
      <button onClick={addPoints}>Add Points</button>
      <h3>Recommended Discounts</h3>
      {discountOptions.map((option, index) => (
        <div key={index}>
          <p>{option.points} points for {option.discount}% off</p>
          <button onClick={() => redeemDiscount(option)}>Claim</button>
        </div>
      ))}
    </div>
  );
}

export default MyPoints;