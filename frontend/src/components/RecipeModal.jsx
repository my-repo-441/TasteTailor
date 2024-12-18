import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';
import styles from './RecipeModal.module.css';

Modal.setAppElement('#root');

const RecipeModal = ({ isOpen, onRequestClose, recipe, imageUrl, onSave, onDelete }) => {
  const [updatedRecipe, setUpdatedRecipe] = useState(recipe || '');
  const [updatedImageUrl, setUpdatedImageUrl] = useState(imageUrl || '');

  useEffect(() => {
    setUpdatedRecipe(recipe || '');
    setUpdatedImageUrl(imageUrl || '');
  }, [recipe, imageUrl]);

  const handleSave = () => {
    onSave({ recipe: updatedRecipe, imageUrl: updatedImageUrl });
    onRequestClose();
  };

  const handleDelete = () => {
    onDelete();
    onRequestClose();
  };

  return (
    <Modal isOpen={isOpen} onRequestClose={onRequestClose} contentLabel="Recipe Modal">
      <div className={styles.modalContainer}>
        <h2 className={styles.modalTitle}>レシピの詳細</h2>

        {/* 画像部分 */}
        {updatedImageUrl && (
          <img
            className={styles.modalImage}
            src={updatedImageUrl}
            alt="Recipe"
          />
        )}

        {/* テキストエリア */}
        <textarea
          className={styles.modalTextarea}
          value={updatedRecipe}
          onChange={(e) => setUpdatedRecipe(e.target.value)}
          placeholder="レシピの詳細を入力"
        />

        {/* 画像URL入力 */}
        <input
          className={styles.modalInput}
          type="text"
          value={updatedImageUrl}
          onChange={(e) => setUpdatedImageUrl(e.target.value)}
          placeholder="画像URLを入力"
        />

        {/* ボタン */}
        <div className={styles.modalButtonContainer}>
          <button className={styles.modalButton} onClick={handleSave}>
            保存
          </button>
          <button
            className={`${styles.modalButton} ${styles.modalDeleteButton}`}
            onClick={handleDelete}
          >
            削除
          </button>          
          <button
            className={`${styles.modalButton} ${styles.modalCloseButton}`}
            onClick={onRequestClose}
          >
            閉じる
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default RecipeModal;
