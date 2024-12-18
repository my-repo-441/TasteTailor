import React, { useState } from 'react';
import ChatBox from '../components/ChatBox';
import Avatar from '../components/Avatar';
import styles from './Chat.module.css';

const Chat = () => {
  const [loading, setLoading] = useState(false);

  const handleChatUpdate = (message) => {
    setLoading(true); // ローディング開始
    setTimeout(() => setLoading(false), 2000); // 2秒後にローディング終了（ダミー）
  };

  return (
    <div className={styles.container}>
      <h1>AIチャットボット</h1>
      <div className={styles.chatBoxContainer}>
        <ChatBox onMessageSend={handleChatUpdate} />
        <Avatar position={{ x: 20, y: 20 }} isLoading={loading} />
      </div>
    </div>
  );
};

export default Chat;
