import React, { useState } from 'react';
import { processImage } from '../utils/api';
import styles from './ImageUpload.module.css';

const ImageUpload = ({ onProcessImage }) => {
  const [image, setImage] = useState(null);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setImage(file);
  };

  const handleUpload = async () => {
    if (image) {
      try {
        const ingredients = await processImage(image);
        onProcessImage(ingredients); // 認識された食材を親コンポーネントに渡す
      } catch (error) {
        console.error('画像処理中にエラーが発生しました:', error);
      }
    }
  };

  return (
    <div className={styles.container}>
      <h3 className={styles.title}>冷蔵庫の写真をアップロード</h3>
      <input
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        className={styles.inputFile}
      />
      <button
        onClick={handleUpload}
        className={styles.uploadButton}
        disabled={!image}
      >
        アップロードして解析
      </button>
    </div>
  );
};

export default ImageUpload;
