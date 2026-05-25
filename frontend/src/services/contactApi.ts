import api from './api';
import { Contact } from '../types';

export const contactApi = {
  // Fetch all contacts
  getAll: async (): Promise<Contact[]> => {
    try {
      const response = await api.get('/contacts');
      return response.data;
    } catch (error) {
      console.error('Error fetching contacts:', error);
      throw error;
    }
  },

  // Fetch contact by ID
  getById: async (id: number): Promise<Contact> => {
    try {
      const response = await api.get(`/contacts/${id}`);
      return response.data;
    } catch (error) {
      console.error(`Error fetching contact ${id}:`, error);
      throw error;
    }
  },

  // Create new contact
  create: async (contact: Omit<Contact, 'id'>): Promise<Contact> => {
    try {
      const response = await api.post('/contacts', contact);
      return response.data;
    } catch (error) {
      console.error('Error creating contact:', error);
      throw error;
    }
  },

  // Update existing contact
  update: async (id: number, contact: Omit<Contact, 'id'>): Promise<Contact> => {
    try {
      const response = await api.put(`/contacts/${id}`, contact);
      return response.data;
    } catch (error) {
      console.error(`Error updating contact ${id}:`, error);
      throw error;
    }
  },

  // Delete contact
  delete: async (id: number): Promise<void> => {
    try {
      await api.delete(`/contacts/${id}`);
    } catch (error) {
      console.error(`Error deleting contact ${id}:`, error);
      throw error;
    }
  },
};

