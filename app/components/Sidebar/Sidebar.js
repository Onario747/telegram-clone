"use client";
import { motion } from "framer-motion";
import { SearchBar } from "./SearchBar";
import { SearchResults } from "./SearchResults";
import { useTheme } from "../../context/ThemeContext";
import styles from "./Sidebar.module.css";
import { FiMenu } from 'react-icons/fi';

export default function Sidebar({
  searchQuery,
  searchResults,
  onlineUsers,
  chatList,
  onSearchQueryChange,
  onSearch,
  onChatSelect,
  onRefreshChats,
  onLogout,
  onMenuClick
}) {
  const { isDarkMode } = useTheme();

  const getInitials = (username) => {
    return username
      ? username
          .split(' ')
          .map(word => word[0])
          .join('')
          .toUpperCase()
          .slice(0, 2)
      : '?';
  };

  return (
    <div className={`${styles.sidebar} ${isDarkMode ? styles.dark : styles.light}`}>
      <div className={styles.sidebarHeader}>
        <div className={styles.headerTop}>
          <button 
            className={styles.menuButton}
            onClick={onMenuClick}
          >
            <FiMenu size={24} />
          </button>
          <h2>Telegram</h2>
        </div>
        <SearchBar 
          value={searchQuery}
          onChange={onSearchQueryChange}
          onSearch={onSearch}
        />
        <button 
          className={styles.logoutButton}
          onClick={onLogout}
        >
          Logout
        </button>
      </div>
      {searchQuery ? (
        <SearchResults 
          users={searchResults.users}
          channels={searchResults.channels}
          onSelect={onChatSelect}
          onlineUsers={onlineUsers}
        />
      ) : (
        <div className={styles.chatList}>
          {chatList.map((chat) => (
            <motion.div
              key={chat.chatRoomId}
              className={styles.chatItem}
              onClick={() => onChatSelect(chat)}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.2 }}
            >
              {chat.profileImage ? (
                <img
                  src={chat.profileImage}
                  alt={chat.username}
                  className={styles.profileImage}
                  onError={(e) => {
                    e.target.style.display = 'none';
                    e.target.nextSibling.style.display = 'flex';
                  }}
                />
              ) : (
                <div className={styles.profileImagePlaceholder}>
                  {getInitials(chat.username)}
                </div>
              )}
              <div className={styles.chatInfo}>
                <div>
                  <div className={styles.username}>{chat.username}</div>
                  {chat.latestMessage && (
                    <div className={styles.lastMessage}>
                      {chat.latestMessage.text || 'No messages yet'}
                    </div>
                  )}
                </div>
                {chat.unreadMessagesCount > 0 && (
                  <span className={styles.unreadBadge}>
                    {chat.unreadMessagesCount}
                  </span>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
} 