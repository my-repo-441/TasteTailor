import React, { useState } from 'react';
import { motion } from 'framer-motion';
import styles from './ChatBox.module.css';

const ChatBox = ({ onMessageSend }) => {
    const [messages, setMessages] = useState([]);
    const [userInput, setUserInput] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const sendMessage = async () => {
        if (!userInput.trim()) return;

        const newMessages = [...messages, { role: 'user', content: userInput }];
        setMessages(newMessages);
        setUserInput('');
        setLoading(true);
        setError(null); // エラーをリセット

        try {
            const response = await fetch('http://127.0.0.1:5001/api/chatbot', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ message: userInput }),
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const data = await response.json();
            setMessages([...newMessages, { role: 'assistant', content: data.reply }]);

            // アバターの動きなどを親コンポーネントに通知
            if (onMessageSend) {
                onMessageSend(userInput);
            }
        } catch (error) {
            setError('メッセージの送信中にエラーが発生しました。');
            console.error('Error:', error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className={styles.chatBox}>
            <div className={styles.messages}>
                {messages.map((msg, index) => (
                    <motion.div
                        key={index}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3 }}
                        className={
                            msg.role === 'user' ? styles.userMessage : styles.assistantMessage
                        }
                    >
                        {msg.content}
                    </motion.div>
                ))}
            </div>
            {error && <div className={styles.error}>{error}</div>}
            <div className={styles.inputArea}>
                <input
                    type="text"
                    value={userInput}
                    onChange={(e) => setUserInput(e.target.value)}
                    placeholder="質問を入力してください..."
                    disabled={loading}
                />
                <button onClick={sendMessage} disabled={loading}>
                    {loading ? '送信中...' : '送信'}
                </button>
            </div>
        </div>
    );
};

export default ChatBox;
