"use client";
import { useState } from 'react';
import { motion } from 'framer-motion';
import { format } from 'date-fns';
import { FiMoreHorizontal } from 'react-icons/fi';
import styles from './MessageBubble.module.css';

export default function MessageBubble({ message, onReact }) {
  const [showOptions, setShowOptions] = useState(false);
  // Determine if message is outgoing based on peerId and fromId
  const isMyMessage = !message.fromId;

  // Convert Unix timestamp to Date
  const formatMessageDate = (unixTimestamp) => {
    const date = new Date(unixTimestamp * 1000); // Convert to milliseconds
    return format(date, 'HH:mm');
  };

  // Check if the message is a URL
  const isUrl = (text) => {
    try {
      new URL(text);
      return true;
    } catch {
      return false;
    }
  };

  return (
    <motion.div
      className={`${styles.messageContainer} ${isMyMessage ? styles.sent : styles.received}`}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
    >
      <div className={styles.messageContent}>
        <div className={styles.messageText}>
          {isUrl(message.message) ? (
            <a 
              href={message.message} 
              target="_blank" 
              rel="noopener noreferrer"
              className={styles.messageLink}
            >
              {message.message}
            </a>
          ) : (
            message.message
          )}
        </div>
        <div className={styles.messageInfo}>
          <span className={styles.messageTime}>
            {message.date && formatMessageDate(message.date)}
          </span>
        </div>
      </div>
      
      <button
        className={styles.optionsButton}
        onClick={() => setShowOptions(!showOptions)}
      >
        <FiMoreHorizontal />
      </button>

      {showOptions && (
        <motion.div
          className={styles.optionsMenu}
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
        >
          <button onClick={() => onReact(message.id, '👍')}>👍</button>
          <button onClick={() => onReact(message.id, '❤️')}>❤️</button>
          <button onClick={() => onReact(message.id, '😂')}>😂</button>
          <button onClick={() => onReact(message.id, '😮')}>😮</button>
          <button onClick={() => onReact(message.id, '😢')}>😢</button>
          <button onClick={() => onReact(message.id, '👎')}>👎</button>
        </motion.div>
      )}
    </motion.div>
  );
} 