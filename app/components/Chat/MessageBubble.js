"use client";
import { useState } from 'react';
import { motion } from 'framer-motion';
import { FiSmile, FiShare } from 'react-icons/fi';
import styles from './MessageBubble.module.css';

export default function MessageBubble({ message, onReact }) {
  const [showOptions, setShowOptions] = useState(false);
  
  // Check if the message is from the current user (fromId is null)
  const isFromMe = !message.fromId;

  return (
    <motion.div
      className={`${styles.messageContainer} ${isFromMe ? styles.sent : styles.received}`}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      onMouseEnter={() => setShowOptions(true)}
      onMouseLeave={() => setShowOptions(false)}
    >
      <div className={styles.messageContent}>
        <div className={styles.messageText}>
          {message.message}
        </div>
        <div className={styles.messageInfo}>
          <span className={styles.messageTime}>
            {new Date(message.date * 1000).toLocaleTimeString([], { 
              hour: '2-digit', 
              minute: '2-digit' 
            })}
          </span>
        </div>
      </div>

      {showOptions && (
        <div className={styles.optionsMenu}>
          <button onClick={() => onReact(message.id, '')}>
            <FiSmile />
          </button>
          <button>
            <FiShare />
          </button>
        </div>
      )}
    </motion.div>
  );
} 