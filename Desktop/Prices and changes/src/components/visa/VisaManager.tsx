import React, { useState } from 'react';
import { Visa } from '../../types';
import { useApp } from '../../context/AppContext';
import { VisaForm } from './VisaForm';
import { VisaList } from './VisaList';
import { ConfirmDialog } from '../common/ConfirmDialog';
import styles from './VisaManager.module.css';

export const VisaManager: React.FC = () => {
  const store = useApp();
  const [editingId, setEditingId] = useState<string | null>(null);
  const [deleteConfirm, setDeleteConfirm] = useState<Visa | null>(null);
  const [notification, setNotification] = useState<{ message: string; type: string } | null>(null);

  const showNotification = (message: string, type: 'success' | 'error') => {
    setNotification({ message, type });
    setTimeout(() => setNotification(null), 3000);
  };

  const handleAddVisa = (visa: Omit<Visa, 'id'>) => {
    store.addVisa(visa);
    showNotification('Visa added successfully!', 'success');
  };

  const handleEditVisa = (visa: Visa) => {
    setEditingId(visa.id);
  };

  const handleUpdateVisa = (visa: Omit<Visa, 'id'>) => {
    if (editingId) {
      const success = store.updateVisa(editingId, visa);
      if (success) {
        setEditingId(null);
        showNotification('Visa updated successfully!', 'success');
      }
    }
  };

  const handleDeleteVisa = (visa: Visa) => {
    setDeleteConfirm(visa);
  };

  const confirmDelete = () => {
    if (deleteConfirm) {
      const success = store.deleteVisa(deleteConfirm.id);
      if (success) {
        setDeleteConfirm(null);
        showNotification('Visa deleted successfully!', 'success');
      }
    }
  };

  const editingVisa = editingId ? store.visas.find((v) => v.id === editingId) : undefined;

  return (
    <div className={styles.container}>
      <VisaForm
        onSubmit={editingId ? handleUpdateVisa : handleAddVisa}
        initialData={editingVisa}
        isEditing={!!editingId}
      />
      <VisaList
        visas={store.visas}
        onEdit={handleEditVisa}
        onDelete={handleDeleteVisa}
      />
      <ConfirmDialog
        isOpen={!!deleteConfirm}
        title="Delete Visa"
        message={`Are you sure you want to delete the ${deleteConfirm?.country} visa?`}
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
