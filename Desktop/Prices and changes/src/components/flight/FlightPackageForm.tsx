import React, { useEffect, useState } from 'react';
import { FlightPackage, FormErrors } from '../../types';
import styles from './FlightPackageForm.module.css';

interface FlightPackageFormProps {
  onSubmit: (pkg: Omit<FlightPackage, 'id'>) => void;
  initialData?: FlightPackage;
  isEditing?: boolean;
}

export const FlightPackageForm: React.FC<FlightPackageFormProps> = ({
  onSubmit,
  initialData,
  isEditing = false,
}) => {
  const [formData, setFormData] = useState<Omit<FlightPackage, 'id'>>({
    destination: '',
    origin: '',
    departureDate: '',
    returnDate: '',
    airline: '',
    priceSingle: 0,
    priceDouble: 0,
    priceChildWithBed: 0,
    priceChildWithoutBed: 0,
    priceInfant: 0,
    class: 'Economy',
    commission: 0,
    includedServices: [],
    notes: '',
  });
  const [serviceInput, setServiceInput] = useState('');
  const [errors, setErrors] = useState<FormErrors>({});

  useEffect(() => {
    if (initialData) {
      setFormData({
        destination: initialData.destination,
        origin: initialData.origin,
        departureDate: initialData.departureDate,
        returnDate: initialData.returnDate,
        airline: initialData.airline,
        priceSingle: initialData.priceSingle,
        priceDouble: initialData.priceDouble,
        priceChildWithBed: initialData.priceChildWithBed,
        priceChildWithoutBed: initialData.priceChildWithoutBed,
        priceInfant: initialData.priceInfant,
        class: initialData.class,
        commission: initialData.commission,
        includedServices: initialData.includedServices,
        notes: initialData.notes,
      });
    }
  }, [initialData]);

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};
    if (!formData.destination.trim()) newErrors.destination = 'Destination is required';
    if (!formData.origin.trim()) newErrors.origin = 'Origin is required';
    if (!formData.departureDate) newErrors.departureDate = 'Departure date is required';
    if (!formData.returnDate) newErrors.returnDate = 'Return date is required';
    if (formData.departureDate && formData.returnDate && new Date(formData.returnDate) <= new Date(formData.departureDate)) {
      newErrors.returnDate = 'Return date must be after departure date';
    }
    if (!formData.airline.trim()) newErrors.airline = 'Airline is required';
    if (!['Economy', 'Business', 'First'].includes(formData.class)) newErrors.class = 'Valid class is required';
    if (formData.priceSingle < 0) newErrors.priceSingle = 'Price must be non-negative';
    if (formData.priceDouble < 0) newErrors.priceDouble = 'Price must be non-negative';
    if (formData.priceChildWithBed < 0) newErrors.priceChildWithBed = 'Price must be non-negative';
    if (formData.priceChildWithoutBed < 0) newErrors.priceChildWithoutBed = 'Price must be non-negative';
    if (formData.priceInfant < 0) newErrors.priceInfant = 'Price must be non-negative';
    if (formData.commission < 0) newErrors.commission = 'Commission must be non-negative';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    const numericFields = ['priceSingle', 'priceDouble', 'priceChildWithBed', 'priceChildWithoutBed', 'priceInfant', 'commission'];
    setFormData({
      ...formData,
      [name]: numericFields.includes(name) ? parseFloat(value) || 0 : value,
    });
    if (errors[name]) setErrors({ ...errors, [name]: '' });
  };

  const handleAddService = () => {
    if (serviceInput.trim()) {
      setFormData({
        ...formData,
        includedServices: [...formData.includedServices, serviceInput.trim()],
      });
      setServiceInput('');
    }
  };

  const handleRemoveService = (index: number) => {
    setFormData({
      ...formData,
      includedServices: formData.includedServices.filter((_, i) => i !== index),
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      onSubmit(formData);
      setFormData({
        destination: '',
        origin: '',
        departureDate: '',
        returnDate: '',
        airline: '',
        priceSingle: 0,
        priceDouble: 0,
        priceChildWithBed: 0,
        priceChildWithoutBed: 0,
        priceInfant: 0,
        class: 'Economy',
        commission: 0,
        includedServices: [],
        notes: '',
      });
      setServiceInput('');
    }
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <h2>{isEditing ? 'Edit Flight Package' : 'Add Flight Package'}</h2>

      <h3 className={styles.sectionTitle}>Travel Details</h3>
      <div className={styles.group}>
        <label htmlFor="destination">Destination *</label>
        <input id="destination" name="destination" value={formData.destination} onChange={handleChange} />
        {errors.destination && <div className={styles.error}>{errors.destination}</div>}
      </div>

      <div className={styles.group}>
        <label htmlFor="origin">Origin *</label>
        <input id="origin" name="origin" value={formData.origin} onChange={handleChange} />
        {errors.origin && <div className={styles.error}>{errors.origin}</div>}
      </div>

      <div className={styles.group}>
        <label htmlFor="departureDate">Departure Date *</label>
        <input id="departureDate" name="departureDate" type="date" value={formData.departureDate} onChange={handleChange} />
        {errors.departureDate && <div className={styles.error}>{errors.departureDate}</div>}
      </div>

      <div className={styles.group}>
        <label htmlFor="returnDate">Return Date *</label>
        <input id="returnDate" name="returnDate" type="date" value={formData.returnDate} onChange={handleChange} />
        {errors.returnDate && <div className={styles.error}>{errors.returnDate}</div>}
      </div>

      <div className={styles.group}>
        <label htmlFor="airline">Airline *</label>
        <input id="airline" name="airline" value={formData.airline} onChange={handleChange} />
        {errors.airline && <div className={styles.error}>{errors.airline}</div>}
      </div>

      <div className={styles.group}>
        <label htmlFor="class">Class *</label>
        <select id="class" name="class" value={formData.class} onChange={handleChange}>
          <option value="Economy">Economy</option>
          <option value="Business">Business</option>
          <option value="First">First</option>
        </select>
        {errors.class && <div className={styles.error}>{errors.class}</div>}
      </div>

      <h3 className={styles.sectionTitle}>Pricing Tiers</h3>
      <div className={styles.pricingGrid}>
        <div className={styles.group}>
          <label htmlFor="priceSingle">Single Price *</label>
          <input id="priceSingle" name="priceSingle" type="number" value={formData.priceSingle} min="0" step="0.01" onChange={handleChange} />
          {errors.priceSingle && <div className={styles.error}>{errors.priceSingle}</div>}
        </div>
        <div className={styles.group}>
          <label htmlFor="priceDouble">Double Price *</label>
          <input id="priceDouble" name="priceDouble" type="number" value={formData.priceDouble} min="0" step="0.01" onChange={handleChange} />
          {errors.priceDouble && <div className={styles.error}>{errors.priceDouble}</div>}
        </div>
        <div className={styles.group}>
          <label htmlFor="priceChildWithBed">Child with Bed *</label>
          <input id="priceChildWithBed" name="priceChildWithBed" type="number" value={formData.priceChildWithBed} min="0" step="0.01" onChange={handleChange} />
          {errors.priceChildWithBed && <div className={styles.error}>{errors.priceChildWithBed}</div>}
        </div>
        <div className={styles.group}>
          <label htmlFor="priceChildWithoutBed">Child without Bed *</label>
          <input id="priceChildWithoutBed" name="priceChildWithoutBed" type="number" value={formData.priceChildWithoutBed} min="0" step="0.01" onChange={handleChange} />
          {errors.priceChildWithoutBed && <div className={styles.error}>{errors.priceChildWithoutBed}</div>}
        </div>
        <div className={styles.group}>
          <label htmlFor="priceInfant">Infant Price *</label>
          <input id="priceInfant" name="priceInfant" type="number" value={formData.priceInfant} min="0" step="0.01" onChange={handleChange} />
          {errors.priceInfant && <div className={styles.error}>{errors.priceInfant}</div>}
        </div>
        <div className={styles.group}>
          <label htmlFor="commission">Commission *</label>
          <input id="commission" name="commission" type="number" value={formData.commission} min="0" step="0.01" onChange={handleChange} />
          {errors.commission && <div className={styles.error}>{errors.commission}</div>}
        </div>
      </div>

      <h3 className={styles.sectionTitle}>Services & Notes</h3>
      <div className={styles.group}>
        <label htmlFor="includedServices">Included Services</label>
        <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '0.5rem' }}>
          <input
            id="includedServices"
            type="text"
            value={serviceInput}
            onChange={(e) => setServiceInput(e.target.value)}
            placeholder="Enter service name..."
          />
          <button type="button" onClick={handleAddService}>Add</button>
        </div>
        {formData.includedServices.length > 0 && (
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
            {formData.includedServices.map((service, idx) => (
              <div key={idx} style={{ backgroundColor: '#f0f0f0', padding: '0.25rem 0.5rem', borderRadius: '4px', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <span>{service}</span>
                <button type="button" onClick={() => handleRemoveService(idx)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#d32f2f' }}>×</button>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className={styles.group}>
        <label htmlFor="notes">Notes</label>
        <textarea id="notes" name="notes" value={formData.notes} onChange={handleChange} rows={3} placeholder="Additional notes..." />
      </div>

      <div className={styles.actions}>
        <button type="submit" className={styles.submit}>Save</button>
      </div>
    </form>
  );
};
