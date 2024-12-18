import React from 'react';
import { saveRecipe } from '../utils/storage';

const Recipe = ({ recipe }) => {
  const handleSave = () => {
    saveRecipe(recipe);
    alert('レシピを保存しました！');
  };

  return (
    <div style={{ border: '1px solid #ddd', padding: '10px', margin: '10px 0', borderRadius: '5px' }}>
      <h3>レシピ</h3>
      <p>{recipe || 'レシピがありません。'}</p>
      <button
        onClick={handleSave}
        style={{
          marginTop: '10px',
          padding: '5px 10px',
          backgroundColor: '#007bff',
          color: 'white',
          border: 'none',
          borderRadius: '3px',
          cursor: 'pointer',
        }}
      >
        保存する
      </button>
    </div>
  );
};

export default Recipe;
