import React from 'react';
import { motion } from 'framer-motion';
import styles from './Avatar.module.css';

const Avatar = ({ isLoading }) => {
  // アニメーションの設定
  const variants = {
    idle: { y: 0 }, // 静止状態
    loading: {
      y: [0, -10, 0], // 上下に動く
      transition: { repeat: Infinity, duration: 0.6 }, // 無限に繰り返す
    },
  };

  return (
    <motion.div
      className={styles.avatar}
      animate={isLoading ? 'loading' : 'idle'} // ローディング中かどうかでアニメーションを切り替え
      variants={variants}
    >
      <img
        src="/811435_615.jpg"
        alt="Chatbot Avatar"
        className={styles.avatarImage}
      />
    </motion.div>
  );
};

export default Avatar;
