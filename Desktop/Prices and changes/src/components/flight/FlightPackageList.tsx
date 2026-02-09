import React, { useMemo, useState } from 'react';
import { FlightPackage } from '../../types';
import { DataTable } from '../common/DataTable';
import { SearchBar } from '../common/SearchBar';
import styles from './FlightPackageList.module.css';

interface FlightPackageListProps {
  packages: FlightPackage[];
  onEdit: (pkg: FlightPackage) => void;
  onDelete: (pkg: FlightPackage) => void;
}

export const FlightPackageList: React.FC<FlightPackageListProps> = ({ packages, onEdit, onDelete }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [sortKey, setSortKey] = useState<'destination' | 'origin' | 'departureDate' | 'airline' | 'priceSingle' | 'commission' | null>(null);
  const [sortDir, setSortDir] = useState<'asc' | 'desc'>('asc');

  const filtered = useMemo(() => {
    let list = packages;
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      list = list.filter(p => 
        p.destination.toLowerCase().includes(q) || 
        p.origin.toLowerCase().includes(q) ||
        p.airline.toLowerCase().includes(q)
      );
    }
    if (sortKey) {
      list = [...list].sort((a, b) => {
        const av = a[sortKey as keyof FlightPackage] as any;
        const bv = b[sortKey as keyof FlightPackage] as any;
        if (av < bv) return sortDir === 'asc' ? -1 : 1;
        if (av > bv) return sortDir === 'asc' ? 1 : -1;
        return 0;
      });
    }
    return list;
  }, [packages, searchQuery, sortKey, sortDir]);

  const columns = [
    { key: 'destination' as const, header: 'Destination' },
    { key: 'origin' as const, header: 'Origin' },
    { key: 'departureDate' as const, header: 'Departure', render: (v: unknown) => new Date(v as string).toLocaleDateString() },
    { key: 'returnDate' as const, header: 'Return', render: (v: unknown) => new Date(v as string).toLocaleDateString() },
    { key: 'airline' as const, header: 'Airline' },
    { key: 'class' as const, header: 'Class' },
    { key: 'priceSingle' as const, header: 'Single Price', render: (v: unknown) => `$${Number(v).toFixed(2)}` },
    { key: 'priceDouble' as const, header: 'Double Price', render: (v: unknown) => `$${Number(v).toFixed(2)}` },
    { key: 'priceChildWithBed' as const, header: 'Child+Bed', render: (v: unknown) => `$${Number(v).toFixed(2)}` },
    { key: 'priceChildWithoutBed' as const, header: 'Child-Bed', render: (v: unknown) => `$${Number(v).toFixed(2)}` },
    { key: 'priceInfant' as const, header: 'Infant', render: (v: unknown) => `$${Number(v).toFixed(2)}` },
    { key: 'commission' as const, header: 'Commission', render: (v: unknown) => `$${Number(v).toFixed(2)}` },
    { key: 'includedServices' as const, header: 'Services', render: (v: unknown) => Array.isArray(v) ? v.join(', ') || '-' : '-' },
  ];

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h2>Flight Packages</h2>
        <div style={{ display: 'flex', gap: '1rem' }}>
          <SearchBar onSearch={setSearchQuery} placeholder="Search by destination, origin, or airline" />
          <div>
            <label>Sort:</label>
            <select value={sortKey ?? ''} onChange={e => setSortKey(e.target.value as any || null)}>
              <option value="">None</option>
              <option value="destination">Destination</option>
              <option value="origin">Origin</option>
              <option value="departureDate">Departure Date</option>
              <option value="airline">Airline</option>
              <option value="priceSingle">Single Price</option>
              <option value="commission">Commission</option>
            </select>
            <button onClick={() => setSortDir(d => d === 'asc' ? 'desc' : 'asc')}>{sortDir}</button>
          </div>
        </div>
      </div>

      <DataTable data={filtered} columns={columns} onEdit={onEdit} onDelete={onDelete} />
    </div>
  );
};
