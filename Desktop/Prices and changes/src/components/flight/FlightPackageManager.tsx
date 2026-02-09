import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { FlightPackageForm } from './FlightPackageForm';
import { FlightPackageList } from './FlightPackageList';
import { ConfirmDialog } from '../common/ConfirmDialog';
import styles from './FlightPackageManager.module.css';

export const FlightPackageManager: React.FC = () => {
  const store = useApp();
  const [editingId, setEditingId] = useState<string | null>(null);
  const [deleteConfirm, setDeleteConfirm] = useState<any>(null);
  const [notif, setNotif] = useState<{ message: string; type: string } | null>(null);

  const show = (message: string, type: 'success' | 'error') => {
    setNotif({ message, type });
    setTimeout(() => setNotif(null), 3000);
  };

  const handleAdd = (pkg: any) => { store.addFlightPackage(pkg); show('Package added', 'success'); };
  const handleEdit = (pkg: any) => setEditingId(pkg.id);
  const handleUpdate = (pkg: any) => { if (editingId) { store.updateFlightPackage(editingId, pkg); setEditingId(null); show('Package updated', 'success'); } };
  const handleDelete = (pkg: any) => setDeleteConfirm(pkg);
  const confirmDelete = () => { if (deleteConfirm) { store.deleteFlightPackage(deleteConfirm.id); setDeleteConfirm(null); show('Deleted', 'success'); } };

  const editingPkg = editingId ? store.flightPackages.find(p => p.id === editingId) : undefined;

  return (
    <div className={styles.container}>
      <FlightPackageForm onSubmit={editingId ? handleUpdate : handleAdd} initialData={editingPkg} isEditing={!!editingId} />
      <FlightPackageList packages={store.flightPackages} onEdit={handleEdit} onDelete={handleDelete} />
      <ConfirmDialog isOpen={!!deleteConfirm} title="Delete Flight Package" message={`Delete ${deleteConfirm?.origin} → ${deleteConfirm?.destination}?`} onConfirm={confirmDelete} onCancel={() => setDeleteConfirm(null)} isDangerous confirmText="Delete" />
      {notif && <div className={`${styles.notification} ${styles[notif.type]}`}>{notif.message}</div>}
    </div>
  );
};
