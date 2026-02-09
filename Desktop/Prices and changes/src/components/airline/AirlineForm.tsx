import React, { useState, useEffect } from 'react';
import { Airline, FormErrors } from '../../types';
import styles from './AirlineForm.module.css';

interface AirlineFormProps {
  onSubmit: (airline: Omit<Airline, 'id'>) => void;
  initialData?: Airline;
  isEditing?: boolean;
}

export const AirlineForm: React.FC<AirlineFormProps> = ({
  onSubmit,
  initialData,
  isEditing = false,
}) => {
  const [formData, setFormData] = useState<Omit<Airline, 'id'>>({
    name: '',
    code: '',
    department: '',
    commission: 0,
  });
  const [errors, setErrors] = useState<FormErrors>({});

  useEffect(() => {
    if (initialData) {
      setFormData({
        name: initialData.name,
        code: initialData.code,
        department: initialData.department,
        commission: initialData.commission,
      });
    }
  }, [initialData]);

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Airline name is required';
    }
    if (!formData.code.trim()) {
      newErrors.code = 'Airline code is required';
    }
    if (!formData.department.trim()) {
      newErrors.department = 'Department is required';
    }
    if (formData.commission < 0) {
      newErrors.commission = 'Commission must be non-negative';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: name === 'commission' ? parseFloat(value) || 0 : value,
    });
    if (errors[name]) {
      setErrors({ ...errors, [name]: '' });
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      onSubmit(formData);
      setFormData({
        name: '',
        code: '',
        department: '',
        commission: 0,
      });
    }
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <h2>{isEditing ? 'Edit Airline' : 'Add New Airline'}</h2>

      <div className={styles.formRow}>
        <div className={styles.formGroup}>
          <label htmlFor="name">Airline Name *</label>
          <input
            id="name"
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="e.g., Turkish Airlines"
            className={errors.name ? styles.inputError : ''}
          />
          {errors.name && <span className={styles.error}>{errors.name}</span>}
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="code">Airline Code *</label>
          <input
            id="code"
            type="text"
            name="code"
            value={formData.code}
            onChange={handleChange}
            placeholder="e.g., TK"
            className={errors.code ? styles.inputError : ''}
          />
          {errors.code && <span className={styles.error}>{errors.code}</span>}
        </div>
      </div>

      <div className={styles.formRow}>
        <div className={styles.formGroup}>
          <label htmlFor="department">Department *</label>
          <input
            id="department"
            type="text"
            name="department"
            value={formData.department}
            onChange={handleChange}
            placeholder="e.g., Turkey"
            className={errors.department ? styles.inputError : ''}
          />
          {errors.department && <span className={styles.error}>{errors.department}</span>}
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="commission">Commission *</label>
          <input
            id="commission"
            type="number"
            name="commission"
            value={formData.commission}
            onChange={handleChange}
            min="0"
            step="0.01"
            className={errors.commission ? styles.inputError : ''}
          />
          {errors.commission && <span className={styles.error}>{errors.commission}</span>}
        </div>
      </div>

      <div className={styles.formActions}>
        <button type="submit" className={styles.submitButton}>
          {isEditing ? 'Update Airline' : 'Add Airline'}
        </button>
      </div>
    </form>
  );
};
