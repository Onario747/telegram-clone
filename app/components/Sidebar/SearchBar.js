"use client";
import { useState, useRef, useEffect, useCallback } from 'react';
import { FiSearch } from 'react-icons/fi';
import { SearchAutocomplete } from './SearchAutocomplete';
import styles from './Sidebar.module.css';

export function SearchBar({ 
  value, 
  onChange, 
  onSearch,
  onSelectResult,
  results,
  loading
}) {
  const [showAutocomplete, setShowAutocomplete] = useState(false);
  const containerRef = useRef(null);
  const searchTimeoutRef = useRef(null);

  // Debounce search function
  const debouncedSearch = useCallback((searchValue) => {
    if (searchTimeoutRef.current) {
      clearTimeout(searchTimeoutRef.current);
    }

    searchTimeoutRef.current = setTimeout(() => {
      if (searchValue.trim()) {
        onSearch();
      }
    }, 300); // Wait 300ms after user stops typing
  }, [onSearch]);

  // Handle input change
  const handleInputChange = (e) => {
    const newValue = e.target.value;
    onChange(newValue);
    debouncedSearch(newValue);
    setShowAutocomplete(true);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (containerRef.current && !containerRef.current.contains(event.target)) {
        setShowAutocomplete(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      if (searchTimeoutRef.current) {
        clearTimeout(searchTimeoutRef.current);
      }
    };
  }, []);

  const [recentSearches, setRecentSearches] = useState(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('recentSearches');
      return saved ? JSON.parse(saved) : [];
    }
    return [];
  });

  const handleResultSelect = (result) => {
    // Add to recent searches
    const updatedRecent = [
      result,
      ...recentSearches.filter(item => item.id !== result.id).slice(0, 4)
    ];
    setRecentSearches(updatedRecent);
    localStorage.setItem('recentSearches', JSON.stringify(updatedRecent));

    onSelectResult(result);
    setShowAutocomplete(false);
  };

  return (
    <div className={styles.searchBar} ref={containerRef}>
      <div className={styles.searchInput}>
        <FiSearch className={styles.searchIcon} />
        <input
          type="text"
          value={value}
          onChange={handleInputChange}
          onFocus={() => setShowAutocomplete(true)}
          placeholder="Search"
        />
      </div>

      {showAutocomplete && (
        <SearchAutocomplete
          searchQuery={value}
          recentSearches={recentSearches}
          results={results}
          loading={loading}
          onSelectResult={handleResultSelect}
          onClearRecent={() => {
            setRecentSearches([]);
            localStorage.removeItem('recentSearches');
          }}
        />
      )}
    </div>
  );
} 