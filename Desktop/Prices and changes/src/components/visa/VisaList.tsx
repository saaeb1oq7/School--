import React, { useMemo } from 'react';
import { Visa } from '../../types';
import { DataTable } from '../common/DataTable';
import { SearchBar } from '../common/SearchBar';
import styles from './VisaList.module.css';

interface VisaListProps {
  visas: Visa[];
  onEdit: (visa: Visa) => void;
  onDelete: (visa: Visa) => void;
}

export const VisaList: React.FC<VisaListProps> = ({ visas, onEdit, onDelete }) => {
  const [searchQuery, setSearchQuery] = React.useState('');

  const filteredVisas = useMemo(() => {
    if (!searchQuery) return visas;
    const query = searchQuery.toLowerCase();
    return visas.filter(
      (visa) =>
        visa.country.toLowerCase().includes(query) ||
        visa.type.toLowerCase().includes(query)
    );
  }, [visas, searchQuery]);

  const columns = [
    {
      key: 'country' as const,
      header: 'Country',
    },
    {
      key: 'type' as const,
      header: 'Type',
    },
    {
      key: 'duration' as const,
      header: 'Duration',
    },
    {
      key: 'price' as const,
      header: 'Price',
      render: (value: unknown) => `$${Number(value).toFixed(2)}`,
    },
    {
      key: 'validFrom' as const,
      header: 'Valid From',
    },
    {
      key: 'validUntil' as const,
      header: 'Valid Until',
    },
  ];

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h2>Visa Listings</h2>
        <SearchBar onSearch={setSearchQuery} placeholder="Search by country or type..." />
      </div>
      <DataTable
        data={filteredVisas}
        columns={columns}
        onEdit={onEdit}
        onDelete={onDelete}
      />
    </div>
  );
};
