import React, { createContext, useState } from 'react';

export const RecipeContext = createContext();

export function RecipeProvider({ children }) {
  const [recipes, setRecipes] = useState([]);
  const [selectedIngredients, setSelectedIngredients] = useState([]);

  return (
    <RecipeContext.Provider value={{ recipes, setRecipes, selectedIngredients, setSelectedIngredients }}>
      {children}
    </RecipeContext.Provider>
  );
}
