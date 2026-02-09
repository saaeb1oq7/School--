import React from 'react';
import { Link } from 'react-router-dom';
import styles from './Header.module.css';

export const Header: React.FC = () => {
  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <Link to="/" className={styles.logo}>
          ✈️ Travel Manager
        </Link>
        <nav className={styles.nav}>
          <Link to="/" className={styles.navLink}>Dashboard</Link>
          <Link to="/visas" className={styles.navLink}>Visas</Link>
          <Link to="/flights" className={styles.navLink}>Flights</Link>
          <Link to="/airlines" className={styles.navLink}>Airlines</Link>
        </nav>
      </div>
    </header>
  );
};
