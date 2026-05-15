import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, ExternalLink, Search, Filter } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { certificates, categoryNotes } from '../data/certificates';

export default function Certifications() {
  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCert, setSelectedCert] = useState<any | null>(null);

  const categories = useMemo(() => {
    const cats = Array.from(new Set(certificates.map(c => c.category)))
      .filter(cat => cat !== 'Other')
      .sort();
    return ['All', ...cats, 'Other'];
  }, []);

  const filteredCertificates = useMemo(() => {
    return certificates.filter(cert => {
      const matchesCategory = selectedCategory === 'All' || cert.category === selectedCategory;
      const matchesSearch = cert.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                           cert.category.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [selectedCategory, searchQuery]);

  return (
    <div className="min-h-screen bg-[#0A0A0F] text-white selection:bg-[var(--primary)] selection:text-white pb-32">
      {/* Background Decorative Elements */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-[var(--primary)] opacity-[0.05] blur-[120px] rounded-full" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-[#6366f1] opacity-[0.05] blur-[120px] rounded-full" />
      </div>

      <div className="max-w-[1440px] mx-auto px-8 relative z-10">
        {/* Navigation */}
        <nav className="py-12">
          <button 
            onClick={() => navigate('/')}
            className="group flex items-center gap-2 text-[var(--text-secondary)] hover:text-white transition-colors font-mono text-[11px] uppercase tracking-widest"
          >
            <ArrowLeft size={14} className="transition-transform group-hover:-translate-x-1" />
            Back to Portfolio
          </button>
        </nav>

        {/* Header */}
        <header className="mb-16">
          <div className="text-[10px] mb-4 tracking-[0.3em] font-mono text-[var(--primary)] uppercase animate-in fade-in slide-in-from-bottom-2">
            // Technical Validation
          </div>
          <h1 className="text-6xl sm:text-7xl font-display font-medium leading-tight mb-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
            Professional <span className="text-[var(--primary)]">Certifications & Badges</span>
          </h1>
          <p className="text-[var(--text-muted)] font-body max-w-2xl text-lg leading-relaxed animate-in fade-in slide-in-from-bottom-6 duration-700">
            A comprehensive gallery of my professional credentials, technical training, and industry-standard validations across various domains of engineering.
          </p>
        </header>

        {/* Filters & Search */}
        <div className="flex flex-col lg:flex-row gap-8 items-start lg:items-center justify-between mb-12 animate-in fade-in slide-in-from-bottom-8 duration-700">
          <div className="flex flex-wrap gap-2">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-5 py-2.5 rounded-full text-[11px] font-mono font-bold tracking-widest uppercase transition-all border ${
                  selectedCategory === cat 
                    ? 'bg-white text-black border-white shadow-[0_0_20px_rgba(255,255,255,0.2)]' 
                    : 'bg-white/5 text-[var(--text-secondary)] border-white/10 hover:border-white/30'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          <div className="relative w-full lg:w-80 group">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-[var(--text-muted)] transition-colors group-focus-within:text-[var(--primary)]" size={16} />
            <input 
              type="text" 
              placeholder="Search certificates..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-white/5 border border-white/10 rounded-full py-3 pl-12 pr-6 text-sm font-body outline-none focus:border-[var(--primary)] transition-all"
            />
          </div>
        </div>

        {/* Gallery Grid */}
        <motion.div 
          layout
          className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6"
        >
          <AnimatePresence mode="popLayout">
            {filteredCertificates.map((cert) => (
              <motion.div
                layout
                key={cert.id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                whileHover={{ y: -8 }}
                onClick={() => setSelectedCert(cert)}
                className="group relative bg-white/[0.02] border border-white/5 rounded-3xl overflow-hidden cursor-pointer backdrop-blur-sm hover:border-[var(--primary)]/50 transition-colors"
                style={{ aspectRatio: '16/11' }}
              >
                <img 
                  src={cert.src} 
                  alt={cert.title}
                  className="absolute inset-0 w-full h-full object-cover opacity-40 group-hover:opacity-70 transition-opacity duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0F] via-[#0A0A0F]/60 to-transparent" />
                
                <div className="absolute inset-0 p-8 flex flex-col justify-end">
                  <div 
                    className="w-fit px-3 py-1 rounded-full text-[9px] font-mono font-bold tracking-widest mb-3 uppercase"
                    style={{ 
                      background: `${cert.accent}22`,
                      border: `1px solid ${cert.accent}44`,
                      color: cert.accent 
                    }}
                  >
                    {cert.category}
                  </div>
                  <h3 className="text-2xl font-display font-medium text-white group-hover:text-[var(--primary)] transition-colors">
                    {cert.title}
                  </h3>
                </div>

                {/* Decorative Accent */}
                <div 
                  className="absolute top-6 right-6 w-8 h-8 rounded-full border border-white/10 flex items-center justify-center bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  <ExternalLink size={12} />
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {filteredCertificates.length === 0 && (
          <div className="py-32 text-center">
            <p className="text-[var(--text-muted)] font-mono tracking-widest uppercase">No certificates found matching your selection.</p>
          </div>
        )}
      </div>

      {/* Modal / Preview */}
      <AnimatePresence>
        {selectedCert && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedCert(null)}
            className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-8 bg-black/90 backdrop-blur-xl"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-5xl max-h-[90vh] overflow-hidden rounded-[40px] bg-[#090C12] border border-white/10 shadow-2xl flex flex-col lg:flex-row"
            >
              <div className="lg:w-3/5 h-full min-h-[300px] lg:min-h-[600px] relative bg-black/20">
                <img
                  src={selectedCert.src}
                  alt={selectedCert.title}
                  className="absolute inset-0 w-full h-full object-contain p-4 lg:p-12"
                />
              </div>

              <div className="lg:w-2/5 p-8 lg:p-16 flex flex-col justify-center border-t lg:border-t-0 lg:border-l border-white/10">
                <div 
                  className="w-fit px-4 py-1.5 rounded-full text-[11px] font-mono font-bold tracking-widest mb-6 uppercase"
                  style={{ 
                    background: `${selectedCert.accent}15`,
                    border: `1px solid ${selectedCert.accent}30`,
                    color: selectedCert.accent 
                  }}
                >
                  {selectedCert.category}
                </div>

                <h3 className="text-4xl lg:text-5xl font-display font-medium text-white mb-6 leading-tight">
                  {selectedCert.title}
                </h3>

                <p className="text-[var(--text-muted)] font-body text-lg leading-relaxed mb-10">
                  {categoryNotes[selectedCert.category] || 'Professional certification validating specialized technical knowledge and engineering proficiency.'}
                </p>

                <div className="flex flex-col sm:flex-row gap-4 mt-auto">
                  <button 
                    onClick={() => setSelectedCert(null)}
                    className="flex-1 px-8 py-4 rounded-2xl bg-white text-black font-bold hover:bg-white/90 transition-all text-sm"
                  >
                    Close Preview
                  </button>
                  <button className="flex items-center justify-center gap-2 px-8 py-4 rounded-2xl bg-white/5 border border-white/10 text-white font-medium hover:bg-white/10 transition-all text-sm">
                    Verify Link <ExternalLink size={14} />
                  </button>
                </div>
              </div>

              <button 
                onClick={() => setSelectedCert(null)}
                className="absolute top-8 right-8 w-12 h-12 rounded-full bg-black/40 border border-white/10 flex items-center justify-center text-white hover:bg-black/60 transition-all text-2xl"
              >
                ×
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
