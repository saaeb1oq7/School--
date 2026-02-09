import React, { useRef } from 'react';
import { useApp } from '../../context/AppContext';
import { exportToJSON, exportVisasOnly, exportFlightsOnly, importFromJSON } from '../../utils/jsonHandler';
import styles from './ImportExportButtons.module.css';

interface ImportExportButtonsProps {
  onImportSuccess?: () => void;
  onImportError?: (message: string) => void;
}

export const ImportExportButtons: React.FC<ImportExportButtonsProps> = ({
  onImportSuccess,
  onImportError,
}) => {
  const store = useApp();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleExportAll = () => {
    const data = store.getAllData();
    exportToJSON(data, 'travel-data.json');
  };

  const handleExportVisas = () => {
    exportVisasOnly(store.visas);
  };

  const handleExportFlights = () => {
    exportFlightsOnly(store.flightPackages);
  };

  const handleImportClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const result = await importFromJSON(file);
    if (result.success && result.data) {
      store.setAllData(result.data);
      onImportSuccess?.();
    } else {
      onImportError?.(result.message || 'Import failed');
    }

    // Reset input
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.group}>
        <button onClick={handleExportAll} className={styles.button}>
          Export All
        </button>
        <button onClick={handleExportVisas} className={styles.button}>
          Export Visas
        </button>
        <button onClick={handleExportFlights} className={styles.button}>
          Export Flights
        </button>
      </div>
      <input
        ref={fileInputRef}
        type="file"
        accept=".json"
        onChange={handleFileChange}
        style={{ display: 'none' }}
      />
      <button onClick={handleImportClick} className={styles.buttonImport}>
        Import
      </button>
    </div>
  );
};
