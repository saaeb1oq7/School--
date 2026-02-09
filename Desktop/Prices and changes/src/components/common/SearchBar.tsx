import React, { useCallback, useState } from 'react';
import styles from './SearchBar.module.css';

interface SearchBarProps {
  onSearch: (query: string) => void;
  placeholder?: string;
  debounceMs?: number;
}

export const SearchBar: React.FC<SearchBarProps> = ({
  onSearch,
  placeholder = 'Search...',
  debounceMs = 300,
}) => {
  const [query, setQuery] = useState('');
  const [timeoutId, setTimeoutId] = useState<number | null>(null);

  const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setQuery(value);

    if (timeoutId) {
      clearTimeout(timeoutId);
    }

    const id = window.setTimeout(() => {
      onSearch(value);
    }, debounceMs);

    setTimeoutId(id);
  }, [debounceMs, onSearch, timeoutId]);

  return (
    <input
      type="text"
      value={query}
      onChange={handleChange}
      placeholder={placeholder}
      className={styles.input}
    />
  );
};
