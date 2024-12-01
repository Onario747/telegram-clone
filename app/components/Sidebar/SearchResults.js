"use client";
import { motion } from 'framer-motion';
import styles from './Sidebar.module.css';

export function SearchResults({ users, channels, onSelect, onlineUsers }) {
  const getInitials = (text) => {
    return text
      ? text
          .split(' ')
          .map(word => word[0])
          .join('')
          .toUpperCase()
          .slice(0, 2)
      : '?';
  };

  return (
    <div className={styles.searchResults}>
      {/* Users section */}
      {users.length > 0 && (
        <div className={styles.searchSection}>
          <h3 className={styles.searchSectionTitle}>Users</h3>
          {users.map((user) => (
            <motion.div
              key={user.id}
              className={styles.searchResultItem}
              onClick={() => onSelect(user)}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.2 }}
            >
              {user.profilePictures?.[0] ? (
                <img
                  src={user.profilePictures[0].fileReference}
                  alt={user.username}
                  className={styles.profileImage}
                  onError={(e) => {
                    e.target.style.display = 'none';
                    e.target.nextSibling.style.display = 'flex';
                  }}
                />
              ) : (
                <div className={styles.profileImagePlaceholder}>
                  {getInitials(`${user.firstName} ${user.lastName}`)}
                </div>
              )}
              <div className={styles.chatInfo}>
                <div>
                  <div className={styles.username}>
                    {user.firstName} {user.lastName}
                  </div>
                  <div className={styles.lastMessage}>
                    {user.username ? `@${user.username}` : user.phone}
                  </div>
                </div>
                {onlineUsers.has(user.id) && (
                  <div className={styles.onlineIndicator} />
                )}
              </div>
            </motion.div>
          ))}
        </div>
      )}

      {/* Channels section */}
      {channels.length > 0 && (
        <div className={styles.searchSection}>
          <h3 className={styles.searchSectionTitle}>Channels</h3>
          {channels.map((channel) => (
            <motion.div
              key={channel.id}
              className={styles.searchResultItem}
              onClick={() => onSelect({ ...channel, type: 'Channel' })}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.2 }}
            >
              {channel.channelPicture ? (
                <img
                  src={channel.channelPicture.fileReference}
                  alt={channel.title}
                  className={styles.profileImage}
                  onError={(e) => {
                    e.target.style.display = 'none';
                    e.target.nextSibling.style.display = 'flex';
                  }}
                />
              ) : (
                <div className={styles.profileImagePlaceholder}>
                  {getInitials(channel.title)}
                </div>
              )}
              <div className={styles.chatInfo}>
                <div>
                  <div className={styles.username}>{channel.title}</div>
                  <div className={styles.lastMessage}>
                    {channel.username ? `@${channel.username}` : ''} • {channel.participants.toLocaleString()} members
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      )}

      {users.length === 0 && channels.length === 0 && (
        <div className={styles.noResults}>
          No results found
        </div>
      )}
    </div>
  );
} 