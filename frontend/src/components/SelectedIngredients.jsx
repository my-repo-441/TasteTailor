import React from 'react';
import SelectedIngredientsList from './SelectedIngredientsList';

const SelectedIngredients = ({ ingredients, onDrop }) => (
    <SelectedIngredientsList ingredients={ingredients} onDrop={onDrop} />
);

export default SelectedIngredients;
