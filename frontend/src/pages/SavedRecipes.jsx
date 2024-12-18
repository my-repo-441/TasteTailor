import React, { useState, useEffect } from 'react';
import {
  loadRecipesFromBackend,
  saveRecipesToBackend,
} from '../utils/storage2';
import RecipeModal from '../components/RecipeModal';
import styles from './SavedRecipes.module.css';

const SavedRecipes = () => {
  const [savedRecipes, setSavedRecipes] = useState([]);
  const [selectedRecipe, setSelectedRecipe] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // バックエンドからレシピを読み込む
  useEffect(() => {
    const fetchRecipes = async () => {
      const recipes = await loadRecipesFromBackend();
      setSavedRecipes(recipes);
    };
    fetchRecipes();
  }, []);

  // モーダルを開く
  const openModal = (recipe, index) => {
    setSelectedRecipe({ ...recipe, index });
    setIsModalOpen(true);
  };

  // レシピの保存処理
  const handleSaveRecipe = async (updatedRecipe) => {
    const updatedRecipes = [...savedRecipes];
    updatedRecipes[selectedRecipe.index] = updatedRecipe;

    setSavedRecipes(updatedRecipes);
    setIsModalOpen(false);

    // バックエンドに保存
    try {
      await saveRecipesToBackend(updatedRecipes);
    } catch (error) {
      console.error('Failed to save recipes:', error);
    }
  };

  const handleDeleteRecipe = async (index) => {
    // 削除対象をフィルタリング
    const updatedRecipes = savedRecipes.filter((_, i) => i !== index);

    setSavedRecipes(updatedRecipes);

    // バックエンドに反映
    try {
      // 空の recipes 配列でも正しい JSON を送信
      await saveRecipesToBackend({ recipes: updatedRecipes });
    } catch (error) {
      console.error('Failed to save recipes to backend:', error);
    }
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>保存済みレシピ</h1>
      {savedRecipes.length === 0 ? (
        <p>保存されたレシピはありません。</p>
      ) : (
        <ul className={styles.recipeList}>
          {savedRecipes.map((recipe, index) => (
            <li key={index} className={styles.recipeItem}>
              {recipe.imageUrl && (
                <img
                  src={recipe.imageUrl}
                  alt="Recipe"
                  className={styles.recipeImage}
                />
              )}
              <div className={styles.recipeContent}>
                <h2>{recipe.title || `レシピ ${index + 1}`}</h2>
                <p dangerouslySetInnerHTML={{ __html: recipe.recipe }}></p>
              </div>
              <div className={styles.buttonContainer}>
                <button
                  className={styles.recipeButton}
                  onClick={() => openModal(recipe, index)}
                >
                  編集
                </button>
                <button
                  className={styles.deleteButton}
                  onClick={() => handleDeleteRecipe(index)}
                >
                  削除
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}

      {/* モーダルを表示 */}
      {selectedRecipe && (
        <RecipeModal
          isOpen={isModalOpen}
          onRequestClose={() => setIsModalOpen(false)}
          recipe={selectedRecipe.recipe || ''}
          imageUrl={selectedRecipe.imageUrl || ''}
          onSave={handleSaveRecipe}
          onDelete={() => handleDeleteRecipe(selectedRecipe.index)}
        />
      )}
    </div>
  );
};

export default SavedRecipes;
