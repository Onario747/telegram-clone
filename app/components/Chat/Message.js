"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import styles from "./Message.module.css";

export function Message({ message, onReact }) {
  const [showReactions, setShowReactions] = useState(false);

  const reactions = ["❤️", "👍", "😊"];

  return (
    <motion.div
      className={`${styles.message} ${message.isMine ? styles.mine : ""}`}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      onDoubleClick={() => setShowReactions(!showReactions)}
    >
      {!message.isMine && (
        <img
          src={
            message.sender.userPicture?.fileReference || "/default-avatar.png"
          }
          alt={message.sender.username}
          className={styles.avatar}
        />
      )}
      <div className={styles.messageContent}>
        {!message.isMine && (
          <div className={styles.senderName}>
            {message.sender.firstName} {message.sender.lastName}
          </div>
        )}
        <div className={styles.messageText}>
          {message.messageText}
          {message.file && (
            <div className={styles.attachment}>
              {message.file.type.startsWith("image/") ? (
                <img src={URL.createObjectURL(message.file)} alt="attachment" />
              ) : message.file.type.startsWith("audio/") ? (
                <audio controls src={URL.createObjectURL(message.file)} />
              ) : (
                <a
                  href={URL.createObjectURL(message.file)}
                  download={message.file.name}
                >
                  {message.file.name}
                </a>
              )}
            </div>
          )}
        </div>
        <div className={styles.messageTime}>
          {new Date(message.timestamp).toLocaleTimeString()}
        </div>
      </div>
      {showReactions && (
        <motion.div
          className={styles.reactions}
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
        >
          {reactions.map((reaction) => (
            <button
              key={reaction}
              onClick={() => onReact(message.id, reaction)}
              className={styles.reactionButton}
            >
              {reaction}
            </button>
          ))}
        </motion.div>
      )}
    </motion.div>
  );
}
