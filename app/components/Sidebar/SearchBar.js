"use client";
import { useState } from 'react';
import { FiSearch } from 'react-icons/fi';
import styles from './Sidebar.module.css';

export function SearchBar({ value, onChange, onSearch }) {
  const [isTyping, setIsTyping] = useState(false);

  const handleChange = (e) => {
    onChange(e.target.value);
    if (!isTyping) {
      setIsTyping(true);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      onSearch();
      setIsTyping(false);
    }
  };

  const handleBlur = () => {
    if (isTyping) {
      onSearch();
      setIsTyping(false);
    }
  };

  return (
    <div className={styles.searchBar}>
      <div className={styles.searchInput}>
        <FiSearch className={styles.searchIcon} />
        <input
          type="text"
          value={value}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
          onBlur={handleBlur}
          placeholder="Search chats and users..."
        />
      </div>
    </div>
  );
} 