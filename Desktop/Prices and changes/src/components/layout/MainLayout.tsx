import React from 'react';
import { Outlet } from 'react-router-dom';
import { Header } from './Header';
import styles from './MainLayout.module.css';

export const MainLayout: React.FC = () => {
  return (
    <div className={styles.layout}>
      <Header />
      <main className={styles.main}>
        <Outlet />
      </main>
      <footer className={styles.footer}>
        <p>&copy; 2024 Travel Manager. All rights reserved.</p>
      </footer>
    </div>
  );
};
