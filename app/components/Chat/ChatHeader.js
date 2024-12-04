"use client";
import { FiArrowLeft, FiMenu } from "react-icons/fi";
import styles from "./ChatArea.module.css";

export function ChatHeader({
  chat,
  onBackClick,
  onMenuClick,
  isMobile,
  onProfileClick,
}) {
  const formatProfilePhoto = (base64String) => {
    if (!base64String) return null;
    return base64String.startsWith("data:")
      ? base64String
      : `data:image/jpeg;base64,${base64String}`;
  };

  return (
    <div className={styles.chatHeader}>
      {isMobile && (
        <button
          className={styles.backButton}
          onClick={onBackClick}
          aria-label="Back"
        >
          <FiArrowLeft size={24} />
        </button>
      )}

      <div
        className={styles.chatInfo}
        onClick={() => onProfileClick(chat)}
        style={{ cursor: "pointer" }}
      >
        {chat.profilePhoto ? (
          <img
            src={formatProfilePhoto(chat.profilePhoto)}
            alt={chat.username}
            className={styles.chatAvatar}
            onError={(e) => {
              e.target.onerror = null;
              e.target.style.display = "none";
              const placeholder = document.createElement("div");
              placeholder.className = styles.chatAvatarPlaceholder;
              placeholder.textContent = chat.initial || "?";
              e.target.parentNode.appendChild(placeholder);
            }}
          />
        ) : (
          <div className={styles.chatAvatarPlaceholder}>
            {chat.initial || "?"}
          </div>
        )}
        <div className={styles.chatDetails}>
          <h2>{chat.username || chat.title || "Unknown"}</h2>
          <p>{chat.type === "Channel" ? "Channel" : "User"}</p>
        </div>
      </div>

      <button
        className={styles.menuButton}
        onClick={onMenuClick}
        aria-label="Menu"
      >
        <FiMenu size={24} />
      </button>
    </div>
  );
}
