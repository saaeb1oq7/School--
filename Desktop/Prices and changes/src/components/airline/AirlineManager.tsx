import React, { useState } from 'react';
import { Airline } from '../../types';
import { useApp } from '../../context/AppContext';
import { AirlineForm } from './AirlineForm';
import { AirlineList } from './AirlineList';
import { ConfirmDialog } from '../common/ConfirmDialog';
import styles from './AirlineManager.module.css';

export const AirlineManager: React.FC = () => {
  const store = useApp();
  const [editingId, setEditingId] = useState<string | null>(null);
  const [deleteConfirm, setDeleteConfirm] = useState<Airline | null>(null);
  const [notification, setNotification] = useState<{ message: string; type: string } | null>(null);

  const showNotification = (message: string, type: 'success' | 'error') => {
    setNotification({ message, type });
    setTimeout(() => setNotification(null), 3000);
  };

  const handleAddAirline = (airline: Omit<Airline, 'id'>) => {
    store.addAirline(airline);
    showNotification('Airline added successfully!', 'success');
  };

  const handleEditAirline = (airline: Airline) => {
    setEditingId(airline.id);
  };

  const handleUpdateAirline = (airline: Omit<Airline, 'id'>) => {
    if (editingId) {
      const success = store.updateAirline(editingId, airline);
      if (success) {
        setEditingId(null);
        showNotification('Airline updated successfully!', 'success');
      }
    }
  };

  const handleDeleteAirline = (airline: Airline) => {
    setDeleteConfirm(airline);
  };

  const confirmDelete = () => {
    if (deleteConfirm) {
      const success = store.deleteAirline(deleteConfirm.id);
      if (success) {
        setDeleteConfirm(null);
        showNotification('Airline deleted successfully!', 'success');
      }
    }
  };

  const editingAirline = editingId ? store.airlines.find((a) => a.id === editingId) : undefined;

  return (
    <div className={styles.container}>
      <AirlineForm
        onSubmit={editingId ? handleUpdateAirline : handleAddAirline}
        initialData={editingAirline}
        isEditing={!!editingId}
      />
      <AirlineList
        airlines={store.airlines}
        onEdit={handleEditAirline}
        onDelete={handleDeleteAirline}
      />
      <ConfirmDialog
        isOpen={!!deleteConfirm}
        title="Delete Airline"
        message={`Are you sure you want to delete ${deleteConfirm?.name}?`}
        onConfirm={confirmDelete}
        onCancel={() => setDeleteConfirm(null)}
        confirmText="Delete"
        cancelText="Cancel"
        isDangerous
      />
      {notification && (
        <div className={`${styles.notification} ${styles[notification.type]}`}>
          {notification.message}
        </div>
      )}
    </div>
  );
};
