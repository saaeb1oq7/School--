import React, { useState, useEffect } from 'react';
import { Visa, FormErrors } from '../../types';
import styles from './VisaForm.module.css';

interface VisaFormProps {
  onSubmit: (visa: Omit<Visa, 'id'>) => void;
  initialData?: Visa;
  isEditing?: boolean;
}

export const VisaForm: React.FC<VisaFormProps> = ({
  onSubmit,
  initialData,
  isEditing = false,
}) => {
  const [formData, setFormData] = useState<Omit<Visa, 'id'>>({
    country: '',
    type: '',
    duration: '',
    price: 0,
    requirements: '',
    validFrom: '',
    validUntil: '',
  });
  const [errors, setErrors] = useState<FormErrors>({});

  useEffect(() => {
    if (initialData) {
      setFormData({
        country: initialData.country,
        type: initialData.type,
        duration: initialData.duration,
        price: initialData.price,
        requirements: initialData.requirements,
        validFrom: initialData.validFrom,
        validUntil: initialData.validUntil,
      });
    }
  }, [initialData]);

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    if (!formData.country.trim()) {
      newErrors.country = 'Country is required';
    }
    if (!formData.type.trim()) {
      newErrors.type = 'Type is required';
    }
    if (!formData.duration.trim()) {
      newErrors.duration = 'Duration is required';
    }
    if (formData.price < 0) {
      newErrors.price = 'Price must be non-negative';
    }
    if (!formData.requirements.trim()) {
      newErrors.requirements = 'Requirements are required';
    }
    if (!formData.validFrom) {
      newErrors.validFrom = 'Valid from date is required';
    }
    if (!formData.validUntil) {
      newErrors.validUntil = 'Valid until date is required';
    }
    if (formData.validFrom && formData.validUntil && formData.validFrom > formData.validUntil) {
      newErrors.validUntil = 'Valid until date must be after valid from date';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: name === 'price' ? parseFloat(value) || 0 : value,
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
        country: '',
        type: '',
        duration: '',
        price: 0,
        requirements: '',
        validFrom: '',
        validUntil: '',
      });
    }
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <h2>{isEditing ? 'Edit Visa' : 'Add New Visa'}</h2>

      <div className={styles.formGroup}>
        <label htmlFor="country">Country *</label>
        <input
          id="country"
          type="text"
          name="country"
          value={formData.country}
          onChange={handleChange}
          placeholder="e.g., United States"
          className={errors.country ? styles.inputError : ''}
        />
        {errors.country && <span className={styles.error}>{errors.country}</span>}
      </div>

      <div className={styles.formGroup}>
        <label htmlFor="type">Visa Type *</label>
        <input
          id="type"
          type="text"
          name="type"
          value={formData.type}
          onChange={handleChange}
          placeholder="e.g., Tourist, Business, Student"
          className={errors.type ? styles.inputError : ''}
        />
        {errors.type && <span className={styles.error}>{errors.type}</span>}
      </div>

      <div className={styles.formGroup}>
        <label htmlFor="duration">Duration *</label>
        <input
          id="duration"
          type="text"
          name="duration"
          value={formData.duration}
          onChange={handleChange}
          placeholder="e.g., 90 days"
          className={errors.duration ? styles.inputError : ''}
        />
        {errors.duration && <span className={styles.error}>{errors.duration}</span>}
      </div>

      <div className={styles.formGroup}>
        <label htmlFor="price">Price ($) *</label>
        <input
          id="price"
          type="number"
          name="price"
          value={formData.price}
          onChange={handleChange}
          min="0"
          step="0.01"
          className={errors.price ? styles.inputError : ''}
        />
        {errors.price && <span className={styles.error}>{errors.price}</span>}
      </div>

      <div className={styles.formGroup}>
        <label htmlFor="requirements">Requirements *</label>
        <textarea
          id="requirements"
          name="requirements"
          value={formData.requirements}
          onChange={handleChange}
          placeholder="e.g., Valid passport, photo, application form"
          rows={3}
          className={errors.requirements ? styles.inputError : ''}
        />
        {errors.requirements && <span className={styles.error}>{errors.requirements}</span>}
      </div>

      <div className={styles.formRow}>
        <div className={styles.formGroup}>
          <label htmlFor="validFrom">Valid From *</label>
          <input
            id="validFrom"
            type="date"
            name="validFrom"
            value={formData.validFrom}
            onChange={handleChange}
            className={errors.validFrom ? styles.inputError : ''}
          />
          {errors.validFrom && <span className={styles.error}>{errors.validFrom}</span>}
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="validUntil">Valid Until *</label>
          <input
            id="validUntil"
            type="date"
            name="validUntil"
            value={formData.validUntil}
            onChange={handleChange}
            className={errors.validUntil ? styles.inputError : ''}
          />
          {errors.validUntil && <span className={styles.error}>{errors.validUntil}</span>}
        </div>
      </div>

      <div className={styles.formActions}>
        <button type="submit" className={styles.submitButton}>
          {isEditing ? 'Update Visa' : 'Add Visa'}
        </button>
      </div>
    </form>
  );
};
