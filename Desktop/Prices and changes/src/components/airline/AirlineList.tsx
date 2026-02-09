import React, { useMemo, useState } from 'react';
import { Airline } from '../../types';
import { DataTable } from '../common/DataTable';
import { SearchBar } from '../common/SearchBar';
import styles from './AirlineList.module.css';

interface AirlineListProps {
  airlines: Airline[];
  onEdit: (airline: Airline) => void;
  onDelete: (airline: Airline) => void;
}

export const AirlineList: React.FC<AirlineListProps> = ({ airlines, onEdit, onDelete }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [sortKey, setSortKey] = useState<'name' | 'code' | 'department' | null>(null);
  const [sortDir, setSortDir] = useState<'asc' | 'desc'>('asc');

  const filtered = useMemo(() => {
    let list = airlines;
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      list = list.filter(
        (a) =>
          a.name.toLowerCase().includes(q) || a.code.toLowerCase().includes(q)
      );
    }
    if (sortKey) {
      list = [...list].sort((a, b) => {
        const av = a[sortKey as keyof Airline] as any;
        const bv = b[sortKey as keyof Airline] as any;
        if (av < bv) return sortDir === 'asc' ? -1 : 1;
        if (av > bv) return sortDir === 'asc' ? 1 : -1;
        return 0;
      });
    }
    return list;
  }, [airlines, searchQuery, sortKey, sortDir]);

  const columns = [
    { key: 'name' as const, header: 'Airline Name' },
    { key: 'code' as const, header: 'Code' },
    { key: 'department' as const, header: 'Department' },
    {
      key: 'commission' as const,
      header: 'Commission',
      render: (v: unknown) => `${Number(v).toFixed(2)}%`,
    },
  ];

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h2>Airlines</h2>
        <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
          <SearchBar onSearch={setSearchQuery} placeholder="Search by name or code..." />
          <div>
            <label>Sort:</label>
            <select value={sortKey ?? ''} onChange={(e) => setSortKey((e.target.value as any) || null)}>
              <option value="">None</option>
              <option value="name">Name</option>
              <option value="code">Code</option>
              <option value="department">Department</option>
            </select>
            <button onClick={() => setSortDir((d) => (d === 'asc' ? 'desc' : 'asc'))}>
              {sortDir}
            </button>
          </div>
        </div>
      </div>

      <DataTable
        data={filtered}
        columns={columns}
        onEdit={onEdit}
        onDelete={onDelete}
      />
    </div>
  );
};
