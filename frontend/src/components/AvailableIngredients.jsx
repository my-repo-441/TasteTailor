import React from 'react';
import Ingredient from './Ingredient';
import DropArea from './DropArea';
import styles from '../styles/SharedStyles.module.css';

const AvailableIngredients = ({ ingredients, onDrop }) => {
    return (
        <div className={styles.section}>
        <h2>冷蔵庫ビュー</h2>
        <DropArea onDrop={onDrop}>
          <div className={styles.ingredientsContainer}>
            {ingredients.map((ingredient) => (
              <Ingredient key={ingredient.id} ingredient={ingredient} />
            ))}
          </div>
        </DropArea>
      </div>
    );
};

export default AvailableIngredients;

