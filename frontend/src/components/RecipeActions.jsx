import React from 'react';
import styles from './RecipeActions.module.css';
import loadingGif from '../../assets/frying_egg_animation-2.gif';

const RecipeActions = ({ loading, generateRecipe, disabled }) => (
    <button onClick={generateRecipe} disabled={disabled}>
        {loading ? (
            <div className={styles.loadingContainer}>
                <span className={styles.loadingText}></span>
                <img src={loadingGif} alt="Loading..." className={styles.loadingGif} />
            </div>
        ) : (
            'レシピを生成'
        )}
    </button>
);

export default RecipeActions;
