import React from 'react';
import Ingredient from './Ingredient';
import DropArea from './DropArea';
import styles from '../styles/SharedStyles.module.css';

const SelectedIngredientsList = ({ ingredients = [], onDrop }) => {
    const validIngredients = Array.isArray(ingredients) ? ingredients : []; // 配列であることを保証
    console.log(ingredients);
    return (
        <div className={styles.section}>
            <h2>選択された食材</h2>
            <DropArea onDrop={onDrop}>
                {validIngredients.length > 0 ? (
                    validIngredients.map((ingredient) => (
                        <Ingredient key={ingredient.id} ingredient={ingredient} />
                    ))
                ) : (
                    <p>選択された食材はありません。</p>
                )}
            </DropArea>
        </div>
    );
};


export default SelectedIngredientsList;
