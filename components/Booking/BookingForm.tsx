'use client';

import React, { useState, useEffect } from 'react';
import { Calendar, Users, DollarSign, Check } from 'lucide-react';

interface BookingFormProps {
  villaName: string;
  pricePerNight: number;
  maxGuests: number;
}

export function BookingForm({ villaName, pricePerNight, maxGuests }: BookingFormProps) {
  const [step, setStep] = useState(1);
  const [totalNights, setTotalNights] = useState(1);
  const [totalPrice, setTotalPrice] = useState(pricePerNight);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    country: '',
    checkInDate: '',
    checkOutDate: '',
    guests: 2,
    specialRequests: '',
    agreeTerms: false,
  });

  useEffect(() => {
    if (formData.checkInDate && formData.checkOutDate) {
      const start = new Date(formData.checkInDate);
      const end = new Date(formData.checkOutDate);
      const nights = Math.ceil((end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24));
      setTotalNights(nights > 0 ? nights : 1);
      setTotalPrice(nights > 0 ? nights * pricePerNight : pricePerNight);
    }
  }, [formData.checkInDate, formData.checkOutDate, pricePerNight]);

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
      const response = await fetch('/api/bookings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          villaName,
          totalNights,
          totalPrice,
        }),
      });

      if (response.ok) {
        setMessage('✅ Booking submitted successfully! We will contact you soon.');
        setFormData({
          firstName: '',
          lastName: '',
          email: '',
          phone: '',
          country: '',
          checkInDate: '',
          checkOutDate: '',
          guests: 2,
          specialRequests: '',
          agreeTerms: false,
        });
        setStep(1);
        setTimeout(() => setMessage(''), 5000);
      }
    } catch (error) {
      setMessage('❌ Error submitting booking. Please try again.');
      console.error('Booking error:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto bg-slate-800 rounded-lg shadow-xl border border-slate-700 overflow-hidden">
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 px-6 py-4">
        <h2 className="text-white text-2xl font-bold">Reserve {villaName}</h2>
      </div>

      <div className="flex items-center justify-center space-x-4 px-6 py-4 border-b border-slate-700">
        {[1, 2, 3].map(s => (
          <React.Fragment key={s}>
            <div
              className={`w-8 h-8 rounded-full flex items-center justify-center font-bold ${
                s === step
                  ? 'bg-blue-600 text-white'
                  : s < step
                  ? 'bg-green-600 text-white'
                  : 'bg-slate-700 text-slate-400'
              }`}
            >
              {s < step ? '✓' : s}
            </div>
            {s < 3 && <div className="w-12 h-1 bg-slate-700" />}
          </React.Fragment>
        ))}
      </div>

      <form onSubmit={handleSubmit} className="p-6 space-y-6">
        {message && (
          <div className={`p-4 rounded ${
            message.includes('✅')
              ? 'bg-green-900 text-green-200'
              : 'bg-red-900 text-red-200'
          }`}>
            {message}
          </div>
        )}

        {step === 1 && (
          <div className="space-y-6">
            <h3 className="text-white font-semibold text-lg">Step 1: Select Dates & Guests</h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-white mb-2">
                  <Calendar className="w-4 h-4 inline mr-2" />
                  Check-in Date
                </label>
                <input
                  type="date"
                  name="checkInDate"
                  value={formData.checkInDate}
                  onChange={handleChange}
                  required
                  className="w-full bg-slate-700 text-white px-4 py-2 rounded border border-slate-600 focus:border-blue-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-white mb-2">
                  <Calendar className="w-4 h-4 inline mr-2" />
                  Check-out Date
                </label>
                <input
                  type="date"
                  name="checkOutDate"
                  value={formData.checkOutDate}
                  onChange={handleChange}
                  required
                  className="w-full bg-slate-700 text-white px-4 py-2 rounded border border-slate-600 focus:border-blue-500 focus:outline-none"
                />
              </div>
            </div>

            <div>
              <label className="block text-white mb-2">
                <Users className="w-4 h-4 inline mr-2" />
                Number of Guests
              </label>
              <input
                type="number"
                name="guests"
                value={formData.guests}
                onChange={handleChange}
                min="1"
                max={maxGuests}
                required
                className="w-full bg-slate-700 text-white px-4 py-2 rounded border border-slate-600 focus:border-blue-500 focus:outline-none"
              />
            </div>

            <div className="bg-slate-700 p-4 rounded-lg space-y-2 border border-slate-600">
              <div className="flex justify-between text-white">
                <span>Nights:</span>
                <span className="font-semibold">{totalNights}</span>
              </div>
              <div className="flex justify-between text-white">
                <span>Price per night:</span>
                <span className="font-semibold">${pricePerNight}</span>
              </div>
              <div className="border-t border-slate-600 pt-2 flex justify-between text-lg text-white font-bold">
                <span>Total:</span>
                <span className="text-green-400">
                  <DollarSign className="w-4 h-4 inline" />
                  {totalPrice}
                </span>
              </div>
            </div>

            <button
              type="button"
              onClick={() => setStep(2)}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded font-semibold transition"
            >
              Continue to Details
            </button>
          </div>
        )}

        {step === 2 && (
          <div className="space-y-6">
            <h3 className="text-white font-semibold text-lg">Step 2: Your Information</h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-white mb-2">First Name *</label>
                <input
                  type="text"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  required
                  className="w-full bg-slate-700 text-white px-4 py-2 rounded border border-slate-600 focus:border-blue-500 focus:outline-none"
                  placeholder="John"
                />
              </div>

              <div>
                <label className="block text-white mb-2">Last Name *</label>
                <input
                  type="text"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                  required
                  className="w-full bg-slate-700 text-white px-4 py-2 rounded border border-slate-600 focus:border-blue-500 focus:outline-none"
                  placeholder="Doe"
                />
              </div>
            </div>

            <div>
              <label className="block text-white mb-2">Email *</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full bg-slate-700 text-white px-4 py-2 rounded border border-slate-600 focus:border-blue-500 focus:outline-none"
                placeholder="john@example.com"
              />
            </div>

            <div>
              <label className="block text-white mb-2">Phone Number *</label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                required
                className="w-full bg-slate-700 text-white px-4 py-2 rounded border border-slate-600 focus:border-blue-500 focus:outline-none"
                placeholder="+1 (555) 000-0000"
              />
            </div>

            <div>
              <label className="block text-white mb-2">Country *</label>
              <input
                type="text"
                name="country"
                value={formData.country}
                onChange={handleChange}
                required
                className="w-full bg-slate-700 text-white px-4 py-2 rounded border border-slate-600 focus:border-blue-500 focus:outline-none"
                placeholder="United States"
              />
            </div>

            <div>
              <label className="block text-white mb-2">Special Requests (Optional)</label>
              <textarea
                name="specialRequests"
                value={formData.specialRequests}
                onChange={handleChange}
                rows={4}
                className="w-full bg-slate-700 text-white px-4 py-2 rounded border border-slate-600 focus:border-blue-500 focus:outline-none"
                placeholder="Let us know any special requests..."
              />
            </div>

            <div className="flex gap-4">
              <button
                type="button"
                onClick={() => setStep(1)}
                className="flex-1 bg-slate-700 hover:bg-slate-600 text-white py-2 rounded font-semibold transition"
              >
                Back
              </button>
              <button
                type="button"
                onClick={() => setStep(3)}
                className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-2 rounded font-semibold transition"
              >
                Review Booking
              </button>
            </div>
          </div>
        )}

        {step === 3 && (
          <div className="space-y-6">
            <h3 className="text-white font-semibold text-lg">Step 3: Review & Confirm</h3>

            <div className="bg-slate-700 p-6 rounded-lg space-y-3 border border-slate-600">
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <p className="text-slate-400">Villa</p>
                  <p className="font-semibold text-white">{villaName}</p>
                </div>
                <div>
                  <p className="text-slate-400">Guests</p>
                  <p className="font-semibold text-white">{formData.guests}</p>
                </div>
                <div>
                  <p className="text-slate-400">Check-in</p>
                  <p className="font-semibold text-white">{formData.checkInDate}</p>
                </div>
                <div>
                  <p className="text-slate-400">Check-out</p>
                  <p className="font-semibold text-white">{formData.checkOutDate}</p>
                </div>
                <div>
                  <p className="text-slate-400">Nights</p>
                  <p className="font-semibold text-white">{totalNights}</p>
                </div>
                <div>
                  <p className="text-slate-400">Name</p>
                  <p className="font-semibold text-white">{formData.firstName} {formData.lastName}</p>
                </div>
              </div>

              <div className="border-t border-slate-600 pt-3 flex justify-between text-lg">
                <span className="text-white font-semibold">Total Price:</span>
                <span className="font-bold text-green-400">${totalPrice}</span>
              </div>
            </div>

            <label className="flex items-start space-x-3 cursor-pointer">
              <input
                type="checkbox"
                name="agreeTerms"
                checked={formData.agreeTerms}
                onChange={handleChange}
                required
                className="w-4 h-4 mt-1"
              />
              <span className="text-white text-sm">I agree to the terms and conditions and privacy policy</span>
            </label>

            <div className="flex gap-4">
              <button
                type="button"
                onClick={() => setStep(2)}
                className="flex-1 bg-slate-700 hover:bg-slate-600 text-white py-3 rounded font-semibold transition"
              >
                Back
              </button>
              <button
                type="submit"
                disabled={!formData.agreeTerms || loading}
                className="flex-1 bg-green-600 hover:bg-green-700 disabled:bg-green-800 text-white py-3 rounded font-semibold transition"
              >
                <Check className="w-4 h-4 inline mr-2" />
                {loading ? 'Completing...' : 'Complete Booking'}
              </button>
            </div>
          </div>
        )}
      </form>
    </div>
  );
}
