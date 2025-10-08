import React, { useContext } from 'react';
import './FoodDisplay.css';
import FoodItem from '../FoodItem/FoodItem';
import { StoreContext } from '../../context/StoreContext';

const FoodDisplay = ({ category }) => {
  const { food_list } = useContext(StoreContext);

  return (
    <div className='food-display' id='food-display'>
      <h2>Top Delicious Dishes Are Here</h2>
      <div className="food-display-list">
        {food_list.map((item) => {
          if (category === "All" || category === item.category) {
            return (
              <FoodItem
                key={item._id}
                id={item._id}
                name={item.name}
                description={item.description}
                image={item.image}
                category={item.category}  
                sizes={item.sizes ? item.sizes : null}  // if pizza
                price={item.price !== undefined ? item.price : 0}  // for normal item
              />

            );
          }
          return null;
        })}
      </div>
    </div>
  );
};

export default FoodDisplay;
