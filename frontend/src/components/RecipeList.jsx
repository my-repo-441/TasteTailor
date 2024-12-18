import React from 'react';
import sanitizeHtml from 'sanitize-html';
import styles from '../styles/SharedStyles.module.css';

const RecipeList = ({ generatedRecipes, openModal, onSave, onDelete }) => {
  console.log(`生成されたレシピ：${generatedRecipes}`);
  return (
    <div className={styles.recipeSection}>
      <h2>生成されたレシピ</h2>
      
      {generatedRecipes.length > 0 ? (
        <ul className={styles.recipeList}>
          {generatedRecipes.map((item, index) => (
            <li key={index} className={styles.recipeItem}>
              <div className={styles.recipeContent}>
                {item.imageUrl && (
                  <img
                    src={item.imageUrl}
                    alt="Generated Recipe"
                    className={styles.recipeImage}
                  />
                )}
                <p
                  dangerouslySetInnerHTML={{
                    __html: sanitizeHtml(item.recipe.replace(/\n/g, '<br />')),
                  }}
                ></p>

                {/* ボタン: 編集・削除 */}
                <div className={styles.buttonContainer}>
                  <button onClick={() => openModal(item)}>編集</button>
                  <button onClick={() => onSave(item)}>保存</button>
                  <button onClick={() => onDelete(index)}>削除</button>
                </div>
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <p>まだレシピが生成されていません。</p>
      )}
    </div>
  );
};

export default RecipeList;
