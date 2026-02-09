import React from 'react';
import styles from './DataTable.module.css';

interface Column<T> {
  key: keyof T;
  header: string;
  render?: (value: unknown, item: T) => React.ReactNode;
  sortable?: boolean;
}

interface DataTableProps<T extends { id: string }> {
  data: T[];
  columns: Column<T>[];
  onEdit?: (item: T) => void;
  onDelete?: (item: T) => void;
  loading?: boolean;
}

export const DataTable = React.forwardRef<HTMLDivElement, DataTableProps<any>>(
  ({ data, columns, onEdit, onDelete, loading = false }, ref) => {
    if (loading) {
      return <div className={styles.loading}>Loading...</div>;
    }

    if (data.length === 0) {
      return <div className={styles.empty}>No data available</div>;
    }

    return (
      <div ref={ref} className={styles.container}>
        <table className={styles.table}>
          <thead>
            <tr>
              {columns.map((col) => (
                <th key={String(col.key)} className={styles.header}>
                  {col.header}
                </th>
              ))}
              {(onEdit || onDelete) && <th className={styles.header}>Actions</th>}
            </tr>
          </thead>
          <tbody>
            {data.map((item) => (
              <tr key={item.id} className={styles.row}>
                {columns.map((col) => (
                  <td key={String(col.key)} className={styles.cell}>
                    {col.render
                      ? col.render(item[col.key], item)
                      : String(item[col.key])}
                  </td>
                ))}
                {(onEdit || onDelete) && (
                  <td className={`${styles.cell} ${styles.actions}`}>
                    {onEdit && (
                      <button
                        className={styles.buttonEdit}
                        onClick={() => onEdit(item)}
                      >
                        Edit
                      </button>
                    )}
                    {onDelete && (
                      <button
                        className={styles.buttonDelete}
                        onClick={() => onDelete(item)}
                      >
                        Delete
                      </button>
                    )}
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }
);

DataTable.displayName = 'DataTable';
