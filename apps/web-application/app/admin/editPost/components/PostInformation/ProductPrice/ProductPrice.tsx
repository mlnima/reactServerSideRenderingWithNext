'use client';
import React from 'react';
import { useSelector } from 'react-redux';
import { DashboardStore } from '@repo/typescript-types';

interface PropTypes {
  onChangeHandler: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
  rendering: boolean;
}

const ProductPrice: React.FC<PropTypes> = ({ onChangeHandler, rendering }) => {
  const price = useSelector((state: DashboardStore) => state.posts.post?.price);
  const priceType = useSelector((state: DashboardStore) => state.posts.post?.priceType);

  const priceInputAcceptCharacterLimiter = (e: React.ChangeEvent<HTMLInputElement>) => {
    const supportedChar = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '.'];
    const lastTypedChar = e.target.value[e.target.value.length - 1];
    if (supportedChar.includes(lastTypedChar)) {
      onChangeHandler(e);
    }
  };

  if (!rendering) return null;

  return (
    <div className="post-information-section">
      <div>
        <p>Price:</p>
        <input
          name="price"
          type="text"
          placeholder="Price"
          onChange={priceInputAcceptCharacterLimiter}
          value={price || 0}
        />
      </div>
      <div>
        <p>Price Type:</p>
        <select name="priceType" onChange={onChangeHandler} value={priceType}>
          <option value="" disabled>Select</option>
          <option value="negotiable">Negotiable</option>
          <option value="last">Last Price</option>
          <option value="giveAway">Give Away</option>
        </select>
      </div>
    </div>
  );
};

export default ProductPrice;