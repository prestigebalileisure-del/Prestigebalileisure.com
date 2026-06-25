'use client';

import React, { useState } from 'react';
import { villasAPI } from '@/lib/strapi-client';

export function SimpleVillaForm() {
  const [formData, setFormData] = useState({
    villaName: '',
    slug: '',
    location: '',
    region: 'Seminyak',
    bedrooms: 1,
    bathrooms: 1,
    maxGuests: 2,
    pricePerNightUSD: 0,
    description: '',
    published: false,
    featured: false,
  });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await villasAPI.create(formData);
      setMessage('✅ Villa added successfully!');
      setFormData({
        villaName: '',
        slug: '',
        location: '',
        region: 'Seminyak',
        bedrooms: 1,
        bathrooms: 1,
        maxGuests: 2,
        pricePerNightUSD: 0,
        description: '',
        published: false,
        featured: false,
      });
      setTimeout(() => setMessage(''), 3000);
    } catch (error) {
      setMessage('❌ Error adding villa. Check console.');
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-2xl mx-auto p-6 bg-slate-800 rounded-lg space-y-4 shadow-xl">
      <h2 className="text-2xl font-bold text-white mb-6">Add New Luxury Villa</h2>

      {message && (
        <div className="p-4 bg-slate-700 text-white rounded">
          {message}
        </div>
      )}

      <div>
        <label className="block text-white mb-2 font-semibold">Villa Name *</label>
        <input
          type="text"
          name="villaName"
          value={formData.villaName}
          onChange={handleChange}
          required
          className="w-full bg-slate-700 text-white px-4 py-2 rounded border border-slate-600 focus:border-blue-500 focus:outline-none"
          placeholder="e.g., Ocean Breeze Luxury Villa"
        />
      </div>

      <div>
        <label className="block text-white mb-2 font-semibold">URL Slug *</label>
        <input
          type="text"
          name="slug"
          value={formData.slug}
          onChange={handleChange}
          required
          className="w-full bg-slate-700 text-white px-4 py-2 rounded border border-slate-600 focus:border-blue-500 focus:outline-none"
          placeholder="ocean-breeze-villa"
        />
      </div>

      <div>
        <label className="block text-white mb-2 font-semibold">Description *</label>
        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
          required
          rows={4}
          className="w-full bg-slate-700 text-white px-4 py-2 rounded border border-slate-600 focus:border-blue-500 focus:outline-none"
          placeholder="Describe the villa in detail..."
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-white mb-2 font-semibold">Location *</label>
          <input
            type="text"
            name="location"
            value={formData.location}
            onChange={handleChange}
            required
            className="w-full bg-slate-700 text-white px-4 py-2 rounded border border-slate-600 focus:border-blue-500 focus:outline-none"
            placeholder="e.g., Seminyak Beach Road"
          />
        </div>

        <div>
          <label className="block text-white mb-2 font-semibold">Region *</label>
          <select
            name="region"
            value={formData.region}
            onChange={handleChange}
            className="w-full bg-slate-700 text-white px-4 py-2 rounded border border-slate-600 focus:border-blue-500 focus:outline-none"
          >
            <option>Seminyak</option>
            <option>Ubud</option>
            <option>Nusa Dua</option>
            <option>Sanur</option>
            <option>Uluwatu</option>
            <option>Canggu</option>
            <option>Jimbaran</option>
          </select>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-4">
        <div>
          <label className="block text-white mb-2 font-semibold">Bedrooms *</label>
          <input
            type="number"
            name="bedrooms"
            value={formData.bedrooms}
            onChange={handleChange}
            min="1"
            required
            className="w-full bg-slate-700 text-white px-4 py-2 rounded border border-slate-600 focus:border-blue-500 focus:outline-none"
          />
        </div>

        <div>
          <label className="block text-white mb-2 font-semibold">Bathrooms *</label>
          <input
            type="number"
            name="bathrooms"
            value={formData.bathrooms}
            onChange={handleChange}
            min="1"
            required
            className="w-full bg-slate-700 text-white px-4 py-2 rounded border border-slate-600 focus:border-blue-500 focus:outline-none"
          />
        </div>

        <div>
          <label className="block text-white mb-2 font-semibold">Max Guests *</label>
          <input
            type="number"
            name="maxGuests"
            value={formData.maxGuests}
            onChange={handleChange}
            min="1"
            required
            className="w-full bg-slate-700 text-white px-4 py-2 rounded border border-slate-600 focus:border-blue-500 focus:outline-none"
          />
        </div>
      </div>

      <div>
        <label className="block text-white mb-2 font-semibold">Price per Night (USD) *</label>
        <input
          type="number"
          name="pricePerNightUSD"
          value={formData.pricePerNightUSD}
          onChange={handleChange}
          min="1"
          required
          className="w-full bg-slate-700 text-white px-4 py-2 rounded border border-slate-600 focus:border-blue-500 focus:outline-none"
          placeholder="450"
        />
      </div>

      <div className="space-y-3 pt-4 border-t border-slate-600">
        <label className="flex items-center space-x-3 cursor-pointer">
          <input
            type="checkbox"
            name="published"
            checked={formData.published}
            onChange={handleChange}
            className="w-4 h-4"
          />
          <span className="text-white">Publish this villa</span>
        </label>

        <label className="flex items-center space-x-3 cursor-pointer">
          <input
            type="checkbox"
            name="featured"
            checked={formData.featured}
            onChange={handleChange}
            className="w-4 h-4"
          />
          <span className="text-white">Featured (show on homepage)</span>
        </label>
      </div>

      <button
        type="submit"
        disabled={loading}
        className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-blue-800 text-white py-3 rounded font-semibold transition mt-6"
      >
        {loading ? 'Saving...' : '✅ Add Villa'}
      </button>
    </form>
  );
}
