'use client';

import React, { useEffect, useState } from 'react';
import { GameGrid } from '@/components/Games';
import { motion } from 'framer-motion';

interface Game {
  id: string;
  title: string;
  coverArt?: string;
  currentPrice: number;
  basePrice: number;
  isOnSale: boolean;
  currentDiscount?: number;
  isGamePass?: boolean;
  averageRating?: number;
  genre?: string[];
  prediction?: {
    nextPredictedSaleDate: string;
    estimatedDiscount: number;
    predictionConfidence: number;
  };
}

export default function Home() {
  const [games, setGames] = useState<Game[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<'all' | 'on-sale' | 'game-pass'>('all');

  useEffect(() => {
    const fetchGames = async () => {
      try {
        const res = await fetch('/api/games');
        const data = await res.json();
        setGames(data);
      } catch (error) {
        console.error('Error fetching games:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchGames();
  }, []);

  const filteredGames = games.filter(game => {
    if (activeTab === 'on-sale') return game.isOnSale;
    if (activeTab === 'game-pass') return game.isGamePass;
    return true;
  });

  const stats = {
    onSale: games.filter(g => g.isOnSale).length,
    gamePass: games.filter(g => g.isGamePass).length,
    avgRating: games.length > 0 
      ? (games.reduce((sum, g) => sum + (g.averageRating || 0), 0) / games.length).toFixed(1)
      : 0,
  };

  return (
    <>
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-12">
        <div className="max-w-7xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-4">2026 Xbox Game Sales</h2>
            <p className="text-xl text-blue-100 mb-6">
              Discover upcoming sales and save big on your favorite games with AI-powered predictions
            </p>
            <div className="flex gap-6 text-sm md:text-base">
              <div className="bg-white bg-opacity-20 backdrop-blur-sm rounded-lg px-6 py-4">
                <p className="text-blue-100">Games on Sale</p>
                <p className="text-3xl font-bold">{stats.onSale}</p>
              </div>
              <div className="bg-white bg-opacity-20 backdrop-blur-sm rounded-lg px-6 py-4">
                <p className="text-blue-100">Game Pass Available</p>
                <p className="text-3xl font-bold">{stats.gamePass}</p>
              </div>
              <div className="bg-white bg-opacity-20 backdrop-blur-sm rounded-lg px-6 py-4">
                <p className="text-blue-100">Avg Rating</p>
                <p className="text-3xl font-bold">{stats.avgRating}★</p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 py-12">
        {/* Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="flex gap-4 mb-8 border-b border-gray-200"
        >
          {(['all', 'on-sale', 'game-pass'] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-3 font-semibold capitalize transition-colors ${
                activeTab === tab
                  ? 'text-blue-600 border-b-2 border-blue-600'
                  : 'text-gray-600 hover:text-gray-800'
              }`}
            >
              {tab === 'game-pass' ? 'Game Pass' : tab === 'on-sale' ? 'On Sale' : 'All Games'}
            </button>
          ))}
        </motion.div>

        {/* Games Grid */}
        <GameGrid games={filteredGames} loading={loading} />
      </div>

      {/* Features Section */}
      <section className="bg-gray-100 py-12 mt-12">
        <div className="max-w-7xl mx-auto px-4">
          <h3 className="text-3xl font-bold text-center mb-12 text-gray-800">How It Works</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: '📊',
                title: 'Analyze Patterns',
                description: 'We analyze years of Xbox game pricing data to identify sale patterns and trends',
              },
              {
                icon: '🤖',
                title: 'AI Predictions',
                description: 'Our machine learning model predicts when games will go on sale with high accuracy',
              },
              {
                icon: '💰',
                title: 'Save Money',
                description: 'Get notified about upcoming sales and plan your purchases to save the most',
              },
            ].map((feature, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1, duration: 0.5 }}
                className="bg-white rounded-lg shadow-md p-8 text-center hover:shadow-lg transition-shadow"
              >
                <div className="text-5xl mb-4">{feature.icon}</div>
                <h4 className="text-xl font-semibold mb-2 text-gray-800">{feature.title}</h4>
                <p className="text-gray-600">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
