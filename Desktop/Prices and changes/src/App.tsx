import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { MainLayout } from './components/layout/MainLayout';
import { Dashboard } from './components/Dashboard';
import { VisaManager } from './components/visa/VisaManager';
import { FlightPackageManager } from './components/flight/FlightPackageManager';
import { AirlineManager } from './components/airline/AirlineManager';
import { ImportExportButtons } from './components/common/ImportExportButtons';
import { useLocalStorage } from './hooks/useLocalStorage';
import './App.css';
import styles from './App.module.css';

const AppContent: React.FC = () => {
  const { clearStorage } = useLocalStorage();
  const [importMessage, setImportMessage] = React.useState<string | null>(null);

  return (
    <div className={styles.appContainer}>
      <Routes>
        <Route element={<MainLayout />}>
          <Route index element={<Dashboard />} />
          <Route path="visas" element={<VisaManager />} />
          <Route path="flights" element={<FlightPackageManager />} />
          <Route path="airlines" element={<AirlineManager />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Route>
      </Routes>

      <div className={styles.importExport}>
        <ImportExportButtons
          onImportSuccess={() => setImportMessage('Data imported successfully!')}
          onImportError={(msg) => setImportMessage(`Import failed: ${msg}`)}
        />
        <button
          onClick={() => {
            if (window.confirm('Clear all data? This cannot be undone.')) {
              clearStorage();
              setImportMessage('All data cleared');
            }
          }}
          className={styles.clearButton}
        >
          Clear All
        </button>
      </div>

      {importMessage && (
        <div className={styles.message}>
          {importMessage}
        </div>
      )}
    </div>
  );
};

export const App: React.FC = () => {
  return (
    <Router>
      <AppContent />
    </Router>
  );
};
