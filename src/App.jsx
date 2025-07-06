import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Shield, Zap, TrendingUp, TrendingDown, Users, Globe, Lock, Star, Activity, BarChart3, Wallet, AlertCircle } from 'lucide-react';

const CryptoVaultPro = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [cryptoData, setCryptoData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [lastUpdated, setLastUpdated] = useState(null);

  // Fetch crypto data from CoinGecko API
  useEffect(() => {
    const fetchCryptoData = async () => {
      try {
        setLoading(true);
        const response = await fetch(
          'https://api.coingecko.com/api/v3/simple/price?ids=bitcoin,ethereum,solana,cardano,chainlink,avalanche-2&vs_currencies=usd&include_24hr_change=true&include_market_cap=true&include_24hr_vol=true'
        );
        
        if (!response.ok) {
          throw new Error('Failed to fetch crypto data');
        }
        
        const data = await response.json();
        
        const cryptoList = [
          {
            id: 'bitcoin',
            symbol: '₿',
            name: 'Bitcoin',
            code: 'BTC',
            color: 'from-orange-400 to-orange-600'
          },
          {
            id: 'ethereum',
            symbol: 'Ξ',
            name: 'Ethereum',
            code: 'ETH',
            color: 'from-blue-400 to-purple-600'
          },
          {
            id: 'solana',
            symbol: '◎',
            name: 'Solana',
            code: 'SOL',
            color: 'from-purple-400 to-pink-600'
          },
          {
            id: 'cardano',
            symbol: '₳',
            name: 'Cardano',
            code: 'ADA',
            color: 'from-blue-400 to-cyan-600'
          },
          {
            id: 'chainlink',
            symbol: '⬟',
            name: 'Chainlink',
            code: 'LINK',
            color: 'from-blue-500 to-blue-700'
          },
          {
            id: 'avalanche-2',
            symbol: '▲',
            name: 'Avalanche',
            code: 'AVAX',
            color: 'from-red-400 to-red-600'
          }
        ];

        const formattedData = cryptoList.map(crypto => ({
          ...crypto,
          price: data[crypto.id]?.usd || 0,
          change: data[crypto.id]?.usd_24h_change || 0,
          marketCap: data[crypto.id]?.usd_market_cap || 0,
          volume: data[crypto.id]?.usd_24h_vol || 0
        }));

        setCryptoData(formattedData);
        setLastUpdated(new Date());
        setError(null);
      } catch (err) {
        console.error('Error fetching crypto data:', err);
        setError(err.message);
        // Fallback to demo data
        setCryptoData([
          { symbol: '₿', name: 'Bitcoin', code: 'BTC', price: 67842, change: 2.47, color: 'from-orange-400 to-orange-600' },
          { symbol: 'Ξ', name: 'Ethereum', code: 'ETH', price: 3547, change: 1.83, color: 'from-blue-400 to-purple-600' },
          { symbol: '◎', name: 'Solana', code: 'SOL', price: 178, change: 4.21, color: 'from-purple-400 to-pink-600' },
          { symbol: '₳', name: 'Cardano', code: 'ADA', price: 0.47, change: 0.93, color: 'from-blue-400 to-cyan-600' },
          { symbol: '⬟', name: 'Chainlink', code: 'LINK', price: 14.82, change: 3.15, color: 'from-blue-500 to-blue-700' },
          { symbol: '▲', name: 'Avalanche', code: 'AVAX', price: 28.91, change: 2.67, color: 'from-red-400 to-red-600' }
        ]);
      } finally {
        setLoading(false);
      }
    };

    fetchCryptoData();
    
    // Update every 30 seconds
    const interval = setInterval(fetchCryptoData, 30000);
    return () => clearInterval(interval);
  }, []);

  const formatPrice = (price) => {
    if (price < 1) return `$${price.toFixed(4)}`;
    if (price < 100) return `$${price.toFixed(2)}`;
    return `$${price.toLocaleString()}`;
  };

  const formatChange = (change) => {
    const sign = change >= 0 ? '+' : '';
    return `${sign}${change.toFixed(2)}%`;
  };

  const formatMarketCap = (marketCap) => {
    if (marketCap >= 1e12) return `$${(marketCap / 1e12).toFixed(2)}T`;
    if (marketCap >= 1e9) return `$${(marketCap / 1e9).toFixed(2)}B`;
    if (marketCap >= 1e6) return `$${(marketCap / 1e6).toFixed(2)}M`;
    return `$${marketCap.toLocaleString()}`;
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: "easeOut" }
    }
  };

  return (
    <div className="min-h-screen bg-gray-950 text-white">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 bg-gray-950/80 backdrop-blur-xl border-b border-gray-800">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <motion.div
              className="flex items-center space-x-3"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
            >
              <div className="w-10 h-10 bg-gradient-to-r from-cyan-400 to-blue-600 rounded-xl flex items-center justify-center">
                <span className="text-white font-bold text-lg">₿</span>
              </div>
              <div>
                <span className="text-xl font-bold bg-gradient-to-r from-cyan-400 to-blue-600 bg-clip-text text-transparent">
                  CryptoVault Pro
                </span>
                <div className="text-xs text-gray-400">Professional Trading</div>
              </div>
            </motion.div>

            <div className="hidden md:flex items-center space-x-8">
              {['Trading', 'Analytics', 'Portfolio', 'Markets', 'Learn'].map((item, index) => (
                <motion.a
                  key={item}
                  href="#"
                  className="relative group text-gray-300 hover:text-white transition-colors duration-300"
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  {item}
                  <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-cyan-400 to-blue-600 group-hover:w-full transition-all duration-300"></div>
                </motion.a>
              ))}
            </div>

            <div className="flex items-center space-x-4">
              <motion.button
                className="hidden md:block px-6 py-2 rounded-lg bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-semibold hover:shadow-lg hover:shadow-cyan-500/25 transition-all duration-300"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Get Started
              </motion.button>
              <button
                className="md:hidden p-2"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
              >
                {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            className="fixed inset-0 bg-gray-950/95 backdrop-blur-xl z-50 md:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <div className="flex flex-col items-center justify-center h-full space-y-8">
              {['Trading', 'Analytics', 'Portfolio', 'Markets', 'Learn'].map((item, index) => (
                <motion.a
                  key={item}
                  href="#"
                  className="text-2xl text-white hover:text-cyan-400 transition-colors"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  {item}
                </motion.a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Hero Section */}
      <motion.section
        className="px-6 py-20 max-w-7xl mx-auto"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <div className="text-center space-y-8">
          <motion.div
            className="inline-flex items-center space-x-2 px-4 py-2 rounded-full bg-gray-900/50 backdrop-blur-sm border border-gray-800"
            variants={itemVariants}
          >
            <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
            <span className="text-sm text-gray-300">Live Markets • 99.99% Uptime</span>
          </motion.div>

          <motion.h1
            className="text-5xl md:text-7xl font-bold leading-tight"
            variants={itemVariants}
          >
            <span className="bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
              Professional
            </span>
            <br />
            <span className="bg-gradient-to-r from-cyan-400 to-blue-600 bg-clip-text text-transparent">
              Crypto Trading
            </span>
          </motion.h1>

          <motion.p
            className="text-xl text-gray-400 max-w-3xl mx-auto leading-relaxed"
            variants={itemVariants}
          >
            Trade with confidence using institutional-grade security, lightning-fast execution, and professional analytics trusted by millions worldwide.
          </motion.p>

          <motion.div
            className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-6"
            variants={itemVariants}
          >
            <motion.button
              className="px-8 py-4 rounded-lg bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-semibold text-lg hover:shadow-xl hover:shadow-cyan-500/25 transition-all duration-300"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Start Trading Now
            </motion.button>
            <motion.button
              className="px-8 py-4 rounded-lg border border-gray-700 text-white font-semibold text-lg hover:bg-gray-800 transition-all duration-300"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Watch Demo
            </motion.button>
          </motion.div>
        </div>
      </motion.section>

      {/* Live Crypto Prices */}
      <motion.section
        className="px-6 py-12 bg-gray-900/50"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
      >
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-white">Live Market Prices</h2>
            <div className="flex items-center space-x-2 text-sm text-gray-400">
              <Activity size={16} />
              <span>
                {loading ? 'Updating...' : lastUpdated ? `Last updated: ${lastUpdated.toLocaleTimeString()}` : 'Real-time data'}
              </span>
            </div>
          </div>

          {error && (
            <div className="mb-6 p-4 bg-red-900/20 border border-red-800 rounded-lg flex items-center space-x-2">
              <AlertCircle size={20} className="text-red-400" />
              <span className="text-red-400">API Error: {error}. Showing demo data.</span>
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {cryptoData.map((crypto, index) => (
              <motion.div
                key={crypto.code}
                className="p-6 bg-gray-800/50 rounded-xl border border-gray-700 hover:border-gray-600 transition-all duration-300"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ scale: 1.02 }}
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    <div className={`w-12 h-12 rounded-full bg-gradient-to-r ${crypto.color} flex items-center justify-center text-white font-bold text-lg`}>
                      {crypto.symbol}
                    </div>
                    <div>
                      <div className="font-semibold text-white">{crypto.name}</div>
                      <div className="text-sm text-gray-400">{crypto.code}</div>
                    </div>
                  </div>
                  <div className={`flex items-center space-x-1 ${crypto.change >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                    {crypto.change >= 0 ? <TrendingUp size={16} /> : <TrendingDown size={16} />}
                    <span className="text-sm font-medium">{formatChange(crypto.change)}</span>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <div className="text-2xl font-bold text-white">
                    {formatPrice(crypto.price)}
                  </div>
                  {crypto.marketCap && (
                    <div className="text-sm text-gray-400">
                      Market Cap: {formatMarketCap(crypto.marketCap)}
                    </div>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* Stats Section */}
      <motion.section
        className="px-6 py-16"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.7 }}
      >
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { value: '$2.4T', label: 'Daily Volume', icon: Globe },
              { value: '2.4M+', label: 'Active Traders', icon: Users },
              { value: '99.99%', label: 'Uptime', icon: Shield },
              { value: '<1ms', label: 'Execution Speed', icon: Zap }
            ].map((stat, index) => (
              <motion.div
                key={stat.label}
                className="text-center space-y-4"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8 + index * 0.1 }}
              >
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-xl bg-gray-800/50 border border-gray-700">
                  <stat.icon className="w-8 h-8 text-cyan-400" />
                </div>
                <div className="text-3xl font-bold text-white">{stat.value}</div>
                <div className="text-gray-400">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* Features Section */}
      <motion.section
        className="px-6 py-20 bg-gray-900/30"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
      >
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
              Professional Trading Features
            </h2>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
              Advanced tools and features designed for professional traders who demand excellence.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: Shield,
                title: 'Institutional Security',
                description: 'Bank-grade encryption with multi-signature cold storage and real-time threat monitoring.',
                color: 'from-green-400 to-emerald-600'
              },
              {
                icon: Zap,
                title: 'Ultra-Fast Execution',
                description: 'Sub-millisecond order matching with direct market access and guaranteed fills.',
                color: 'from-yellow-400 to-orange-600'
              },
              {
                icon: BarChart3,
                title: 'Advanced Analytics',
                description: 'Professional charting tools with 100+ indicators and algorithmic trading support.',
                color: 'from-cyan-400 to-blue-600'
              }
            ].map((feature, index) => (
              <motion.div
                key={feature.title}
                className="group"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.2 + index * 0.2 }}
                whileHover={{ y: -5 }}
              >
                <div className="p-8 rounded-xl bg-gray-800/50 border border-gray-700 hover:border-gray-600 transition-all duration-300">
                  <div className={`w-16 h-16 rounded-xl bg-gradient-to-r ${feature.color} flex items-center justify-center mb-6`}>
                    <feature.icon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-white mb-4">{feature.title}</h3>
                  <p className="text-gray-400 leading-relaxed">{feature.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* CTA Section */}
      <motion.section
        className="px-6 py-20"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.5 }}
      >
        <div className="max-w-4xl mx-auto text-center">
          <div className="p-12 rounded-2xl bg-gradient-to-r from-gray-900 to-gray-800 border border-gray-700">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
              Ready to Trade Professionally?
            </h2>
            <p className="text-xl text-gray-400 mb-8 max-w-2xl mx-auto">
              Join millions of traders who trust CryptoVault Pro for their professional trading needs.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-6">
              <motion.button
                className="px-8 py-4 rounded-lg bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-semibold text-lg hover:shadow-xl hover:shadow-cyan-500/25 transition-all duration-300"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Start Trading Free
              </motion.button>
              <div className="flex items-center space-x-3 text-gray-400">
                <div className="flex -space-x-2">
                  {[1, 2, 3, 4].map((i) => (
                    <div key={i} className="w-8 h-8 rounded-full bg-gradient-to-r from-cyan-400 to-blue-600 border-2 border-gray-800"></div>
                  ))}
                </div>
                <div className="flex items-center space-x-1">
                  <Star className="w-4 h-4 text-yellow-400 fill-current" />
                  <span className="text-sm">Trusted by 2.4M+ traders</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </motion.section>

      {/* Footer */}
      <footer className="px-6 py-12 bg-gray-900/50 border-t border-gray-800">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="flex items-center space-x-3 mb-4 md:mb-0">
              <div className="w-10 h-10 bg-gradient-to-r from-cyan-400 to-blue-600 rounded-xl flex items-center justify-center">
                <span className="text-white font-bold text-lg">₿</span>
              </div>
              <div>
                <span className="text-xl font-bold bg-gradient-to-r from-cyan-400 to-blue-600 bg-clip-text text-transparent">
                  CryptoVault Pro
                </span>
                <div className="text-xs text-gray-400">Professional Trading</div>
              </div>
            </div>
            <div className="flex items-center space-x-8 text-gray-400">
              <a href="#" className="hover:text-white transition-colors">Privacy</a>
              <a href="#" className="hover:text-white transition-colors">Terms</a>
              <a href="#" className="hover:text-white transition-colors">Support</a>
              <div className="flex items-center space-x-2">
                <Lock className="w-4 h-4" />
                <span className="text-sm">256-bit SSL</span>
              </div>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t border-gray-800 text-center text-gray-500">
            <p>&copy; 2025 CryptoVault Pro. All rights reserved. Licensed and regulated financial services.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default CryptoVaultPro;