"use client";
import { FiArrowLeft, FiMenu } from 'react-icons/fi';
import styles from './ChatArea.module.css';

export function ChatHeader({ 
  chat, 
  onBackClick, 
  onMenuClick, 
  isMobile 
}) {
  return (
    <div className={styles.chatHeader}>
      {isMobile && (
        <button 
          className={styles.backButton}
          onClick={onBackClick}
        >
          <FiArrowLeft size={24} />
        </button>
      )}
      
      <div className={styles.chatInfo}>
        {chat.profileImage ? (
          <img
            src={chat.profileImage}
            alt={chat.username}
            className={styles.chatAvatar}
          />
        ) : (
          <div className={styles.chatAvatarPlaceholder}>
            {chat.username[0].toUpperCase()}
          </div>
        )}
        <div className={styles.chatDetails}>
          <h2>{chat.username}</h2>
          <p>{chat.type === 'Channel' ? 'Channel' : 'User'}</p>
        </div>
      </div>

      <button 
        className={styles.menuButton}
        onClick={onMenuClick}
      >
        <FiMenu size={24} />
      </button>
    </div>
  );
} 