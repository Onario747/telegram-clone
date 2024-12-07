"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import { FiSmile, FiShare } from "react-icons/fi";
import styles from "./MessageBubble.module.css";

export default function MessageBubble({ message, onReact }) {
  const [showOptions, setShowOptions] = useState(false);

  // Check if the message is from the current user (fromId is null)
  // const isFromMe = !message.fromId;

  const getRandomColor = () => {
    const letters = "0123456789ABCDEF";
    let color = "#";
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  };

  return (
    <motion.div
      className={`${styles.messageContainer} ${
        message.fromId != null ? styles.sent : styles.received
      }`}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      onMouseEnter={() => setShowOptions(true)}
      onMouseLeave={() => setShowOptions(false)}
    >
      <img src={message.photo} alt="Chat Photo" />
      <div className={styles.messageContent}>
        <div>
          <span style={{ color: getRandomColor(), fontWeight: 700 }}>
            {message.firstName ? message.firstName : message.userName}
          </span>
          <div className={styles.messageText}>{message.message}</div>
          <div className={styles.messageInfo}>
            <span className={styles.messageTime}>
              {new Date(message.date * 1000).toLocaleTimeString([], {
                hour: "2-digit",
                minute: "2-digit",
              })}
            </span>
          </div>
        </div>
      </div>

      {showOptions && (
        <div className={styles.optionsMenu}>
          <button onClick={() => onReact(message.id, "")}>
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
