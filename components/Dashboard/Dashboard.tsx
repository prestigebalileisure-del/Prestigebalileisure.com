'use client';

import React, { useState, useEffect } from 'react';
import { villasAPI, toursAPI } from '@/lib/strapi-client';
import { Home, Compass, Users, Gift } from 'lucide-react';

export function Dashboard() {
  const [stats, setStats] = useState({
    villas: 0,
    tours: 0,
    packages: 0,
    bookings: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadStats();
  }, []);

  const loadStats = async () => {
    try {
      const [villasRes, toursRes] = await Promise.all([
        villasAPI.getAll(),
        toursAPI.getAll(),
      ]);
      setStats({
        villas: villasRes.data.data.length,
        tours: toursRes.data.data.length,
        packages: 0,
        bookings: 0,
      });
    } catch (error) {
      console.error('Error loading stats:', error);
    } finally {
      setLoading(false);
    }
  };

  const StatCard = ({ title, value, icon: Icon, color }) => (
    <div className="bg-slate-800 rounded-lg p-6 border border-slate-700 shadow-lg">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-slate-400 text-sm">{title}</p>
          <p className="text-3xl font-bold text-white mt-2">{value}</p>
        </div>
        <div className={`${color} p-4 rounded-lg`}>
          <Icon className="text-white w-6 h-6" />
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 p-8">
      <div className="mb-12">
        <h1 className="text-4xl font-bold text-white mb-2">
          Prestige Bali Leisure - Dashboard
        </h1>
        <p className="text-purple-200">Manage your luxury leisure content</p>
      </div>

      {loading ? (
        <div className="text-center text-white">Loading...</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <StatCard
            title="Total Villas"
            value={stats.villas}
            icon={Home}
            color="bg-blue-500"
          />
          <StatCard
            title="Available Tours"
            value={stats.tours}
            icon={Compass}
            color="bg-green-500"
          />
          <StatCard
            title="Packages"
            value={stats.packages}
            icon={Gift}
            color="bg-purple-500"
          />
          <StatCard
            title="Bookings"
            value={stats.bookings}
            icon={Users}
            color="bg-orange-500"
          />
        </div>
      )}

      <div className="mt-12">
        <h2 className="text-2xl font-bold text-white mb-6">Quick Actions</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <a
            href="/admin/villas/new"
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold transition text-center"
          >
            + Add Villa
          </a>
          <a
            href="/admin/tours/new"
            className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg font-semibold transition text-center"
          >
            + Add Tour
          </a>
          <a
            href="/admin/packages/new"
            className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-lg font-semibold transition text-center"
          >
            + Add Package
          </a>
          <a
            href="/admin/promotions/new"
            className="bg-orange-600 hover:bg-orange-700 text-white px-6 py-3 rounded-lg font-semibold transition text-center"
          >
            + Add Promotion
          </a>
        </div>
      </div>
    </div>
  );
}
