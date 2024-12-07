"use client";
import { motion } from "framer-motion";
import { SearchBar } from "./SearchBar";
import { SearchResults } from "./SearchResults";
import { useTheme } from "../../context/ThemeContext";
import styles from "./Sidebar.module.css";
import { FiMenu } from "react-icons/fi";
import { FiThumbtack } from "react-icons/fi";

export default function Sidebar({
  searchQuery,
  searchResults,
  onlineUsers,
  chatList,
  onSearchQueryChange,
  onSearch,
  onChatSelect,
  onRefreshChats,
  onMenuClick,
  loading,
}) {
  const { isDarkMode } = useTheme();

  const getInitials = (username) => {
    return username
      ? username
          .split(" ")
          .map((word) => word[0])
          .join("")
          .toUpperCase()
          .slice(0, 2)
      : "?";
  };

  const getImageMimeType = (base64String) => {
    // Implement logic to determine the image type based on the Base64 string
    // This might involve checking the starting characters or storing the type separately
    return "image/jpeg"; // or "image/png", etc.
  };

  const filteredChats = chatList.filter(
    (chat) =>
      // Remove chats with null usernames
      chat.username !== null &&
      // Remove forbidden chats
      chat.type !== "ChatForbidden"
  );

  // Sort chats to show pinned ones at the top
  const sortedChats = [...filteredChats].sort((a, b) => {
    // First sort by pinned status
    if (a.pinned !== b.pinned) {
      return b.pinned - a.pinned;
    }
    // Then sort by latest message date if available
    const aDate = a.latestMessage?.date || 0;
    const bDate = b.latestMessage?.date || 0;
    return bDate - aDate;
  });

  return (
    <div
      className={`${styles.sidebar} ${isDarkMode ? styles.dark : styles.light}`}
    >
      <div className={styles.sidebarHeader}>
        <div className={styles.headerTop}>
          <button className={styles.menuButton} onClick={onMenuClick}>
            <FiMenu size={24} />
          </button>
          <h2>Telegram</h2>
        </div>
        <SearchBar
          value={searchQuery}
          onChange={onSearchQueryChange}
          onSearch={onSearch}
          onSelectResult={onChatSelect}
          results={searchResults}
          loading={loading}
        />
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
          {sortedChats.map((chat) => {
            const photoSrc = chat.photo
              ? `data:${getImageMimeType(chat.photo)};base64,${chat.photo}`
              : null;

            return (
              <motion.div
                key={chat.chatRoomId}
                className={styles.chatItem}
                onClick={() => onChatSelect(chat)}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.2 }}
              >
                {photoSrc ? (
                  <img
                    src={photoSrc}
                    alt={chat.title}
                    className={styles.profileImage}
                    onError={(e) => {
                      e.target.style.display = "none";
                      e.target.nextSibling.style.display = "flex";
                    }}
                  />
                ) : (
                  <div className={styles.profileImagePlaceholder}>
                    {getInitials(chat.title)}
                  </div>
                )}
                <div className={styles.chatInfo}>
                  <div>
                    <div className={styles.username}>
                      {chat.title} {chat.pinned && <FiThumbtack size={14} />}
                    </div>
                    {chat.latestMessage && (
                      <div className={styles.lastMessage}>
                        {chat.latestMessage.text || "No messages yet"}
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
            );
          })}
          {sortedChats.length === 0 && (
            <div className={styles.noChats}>No chats available</div>
          )}
        </div>
      )}
    </div>
  );
}
