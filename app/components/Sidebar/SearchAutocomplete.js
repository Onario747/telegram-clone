"use client";
import { motion, AnimatePresence } from "framer-motion";
import { FiUser, FiHash, FiClock } from "react-icons/fi";
import styles from "./SearchAutocomplete.module.css";

export function SearchAutocomplete({
  searchQuery,
  recentSearches = [],
  results,
  loading,
  onSelectResult,
  onClearRecent,
}) {
  if (!searchQuery && recentSearches.length === 0) return null;

  return (
    <motion.div
      className={styles.autocompleteContainer}
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
    >
      {loading ? (
        <div className={styles.loadingState}>
          <div className={styles.loadingSpinner} />
          <span>Searching...</span>
        </div>
      ) : searchQuery ? (
        <>
          {results.users.length > 0 && (
            <div className={styles.section}>
              <div className={styles.sectionHeader}>
                <FiUser />
                <span>Users</span>
              </div>
              {results.users.map((user) => (
                <motion.div
                  key={user.id}
                  className={styles.resultItem}
                  onClick={() => onSelectResult({ ...user, type: "User" })}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  whileHover={{ backgroundColor: "var(--hover-background)" }}
                >
                  {user.profilePictures?.[0] ? (
                    <img
                      src={user.profilePictures[0].fileReference}
                      alt={user.username}
                      className={styles.avatar}
                    />
                  ) : (
                    <div className={styles.avatarPlaceholder}>
                      {user.firstName?.[0] || user.username?.[0]}
                    </div>
                  )}
                  <div className={styles.resultInfo}>
                    <div className={styles.name}>
                      {user.firstName} {user.lastName}
                    </div>
                    <div className={styles.username}>@{user.username}</div>
                  </div>
                </motion.div>
              ))}
            </div>
          )}

          {results.channels.length > 0 && (
            <div className={styles.section}>
              <div className={styles.sectionHeader}>
                <FiHash />
                <span>Channels</span>
              </div>
              {results.channels.map((channel) => (
                <motion.div
                  key={channel.id}
                  className={styles.resultItem}
                  onClick={() =>
                    onSelectResult({ ...channel, type: "Channel" })
                  }
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  whileHover={{ backgroundColor: "var(--hover-background)" }}
                >
                  {channel.channelPicture ? (
                    <img
                      src={channel.channelPicture.fileReference}
                      alt={channel.title}
                      className={styles.avatar}
                    />
                  ) : (
                    <div className={styles.avatarPlaceholder}>
                      {channel.title[0]}
                    </div>
                  )}
                  <div className={styles.resultInfo}>
                    <div className={styles.name}>{channel.title}</div>
                    <div className={styles.username}>
                      {channel.participants.toLocaleString()} members
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          )}

          {results.users.length === 0 && results.channels.length === 0 && (
            <div className={styles.noResults}>
              No results found for "{searchQuery}"
            </div>
          )}
        </>
      ) : (
        <div className={styles.section}>
          <div className={styles.sectionHeader}>
            <FiClock />
            <span>Recent Searches</span>
            {recentSearches.length > 0 && (
              <button className={styles.clearButton} onClick={onClearRecent}>
                Clear
              </button>
            )}
          </div>
          {recentSearches.map((item) => (
            <motion.div
              key={item.id}
              className={styles.resultItem}
              onClick={() => onSelectResult(item)}
              whileHover={{ backgroundColor: "var(--hover-background)" }}
            >
              {item.profilePicture ? (
                <img
                  src={item.profilePicture.fileReference}
                  alt={item.username || item.title}
                  className={styles.avatar}
                />
              ) : (
                <div className={styles.avatarPlaceholder}>
                  {(item.username || item.title)[0]}
                </div>
              )}
              <div className={styles.resultInfo}>
                <div className={styles.name}>
                  {item.type === "Channel"
                    ? item.title
                    : `${item.firstName} ${item.lastName}`}
                </div>
                <div className={styles.username}>
                  {item.type === "Channel"
                    ? `${item.participants.toLocaleString()} members`
                    : `@${item.username}`}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </motion.div>
  );
}
