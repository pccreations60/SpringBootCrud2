import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { AxiosError } from 'axios';
import { Contact } from '../../types';
import { contactApi } from '../../services/contactApi';
import { formatPhoneNumber, isValidPhoneNumber } from '../../utils/phone';
import './ContactForm.css';

export const ContactForm = () => {
  const { id } = useParams<{ id?: string }>();
  const navigate = useNavigate();
  const [formData, setFormData] = useState<Omit<Contact, 'id'>>({
    name: '',
    email: '',
    phone: '',
  });
  const [loading, setLoading] = useState(!!id);
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [phoneError, setPhoneError] = useState<string | null>(null);

  useEffect(() => {
    if (id) {
      loadContact();
    }
  }, [id]);

  const loadContact = async () => {
    try {
      setLoading(true);
      const contact = await contactApi.getById(Number(id));
      const formattedPhone = formatPhoneNumber(contact.phone || '');
      setFormData({
        name: contact.name,
        email: contact.email,
        phone: formattedPhone
      });
      setPhoneError(isValidPhoneNumber(formattedPhone) ? null : 'Use format: (123) 456-7890');
      setError(null);
    } catch {
      setError('Failed to load contact');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    if (name === 'phone') {
      const formatted = formatPhoneNumber(value);
      setFormData(prev => ({ ...prev, phone: formatted }));
      setPhoneError(isValidPhoneNumber(formatted) ? null : 'Use format: (123) 456-7890');
      return;
    }

    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const getApiErrorMessage = (err: unknown): string => {
    const axiosErr = err as AxiosError<{ message?: string }>;
    return axiosErr.response?.data?.message || axiosErr.message || 'Failed to save contact';
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setSubmitting(true);
      setError(null);

      if (!isValidPhoneNumber(formData.phone || '')) {
        setPhoneError('Use format: (123) 456-7890');
        return;
      }

      setPhoneError(null);

      if (id) {
        await contactApi.update(Number(id), formData);
      } else {
        await contactApi.create(formData);
      }
      navigate('/contacts');
    } catch (err) {
      setError(getApiErrorMessage(err));
    } finally {
      setSubmitting(false);
    }
  };

  if (loading && id) return <div className="loading">Loading...</div>;

  return (
    <div className="contact-form">
      <h2>{id ? 'Edit Contact' : 'New Contact'}</h2>
      {error && <div className="error">{error}</div>}
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="name">Name *</label>
          <input
            id="name"
            name="name"
            type="text"
            value={formData.name}
            onChange={handleChange}
            required
            placeholder="Enter contact name"
          />
        </div>
        <div className="form-group">
          <label htmlFor="email">Email *</label>
          <input
            id="email"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            required
            placeholder="Enter contact email"
          />
        </div>
        <div className="form-group">
          <label htmlFor="phone">Phone</label>
          <input
            id="phone"
            name="phone"
            type="tel"
            value={formData.phone}
            onChange={handleChange}
            placeholder="(123) 456-7890"
            pattern="^\(\d{3}\) \d{3}-\d{4}$"
            title="Phone must be in format (123) 456-7890"
          />
          {phoneError && <div className="error">{phoneError}</div>}
        </div>
        <div className="form-actions">
          <button type="submit" disabled={submitting} className="btn-submit">
            {submitting ? 'Saving...' : id ? 'Update Contact' : 'Create Contact'}
          </button>
          <button
            type="button"
            onClick={() => navigate('/contacts')}
            className="btn-cancel"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};
