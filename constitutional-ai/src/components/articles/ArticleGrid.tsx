import React, { useState, useEffect } from 'react';
import { Search, Filter, ArrowRight, ChevronLeft, ChevronRight, Gavel, Shield, ScrollText, Wallet, History, Info } from 'lucide-react';
import { motion } from 'motion/react';
import { cn } from '../../lib/utils';

interface Article {
  id: string;
  part: string;
  title: string;
  content: string;
  category: string;
}

export default function ArticleGrid() {
  const [articles, setArticles] = useState<Article[]>([]);
  const [filter, setFilter] = useState('All');
  const [search, setSearch] = useState('');

  useEffect(() => {
    fetch('/api/articles')
      .then(res => res.json())
      .then(data => setArticles(data));
  }, []);

  const filteredArticles = articles.filter(a => {
    const matchesSearch = a.title.toLowerCase().includes(search.toLowerCase()) || a.id.includes(search);
    const matchesFilter = filter === 'All' || a.category === filter;
    return matchesSearch && matchesFilter;
  });

  const categories = [
    { name: 'All', icon: <Filter className="w-4 h-4" /> },
    { name: 'Fundamental Right', icon: <Shield className="w-4 h-4" /> },
    { name: 'Directive Principle', icon: <ScrollText className="w-4 h-4" /> },
    { name: 'Citizenship', icon: <Info className="w-4 h-4" /> },
    { name: 'Constitutional Remedy', icon: <Gavel className="w-4 h-4" /> }
  ];

  return (
    <div className="pt-24 pb-12 max-w-7xl mx-auto px-6">
      <header className="mb-12">
        <h2 className="text-3xl font-bold text-primary mb-2">Digital Legal Codex</h2>
        <p className="text-on-surface-variant max-w-2xl mb-8">
          Explore every article of the Indian Constitution through our AI-enhanced reference guide.
        </p>
        <div className="relative max-w-2xl">
          <input 
            type="text" 
            className="w-full h-14 pl-14 pr-6 bg-white border border-outline-variant rounded-2xl focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all"
            placeholder="Search by Article number or Title..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-outline w-5 h-5" />
        </div>
      </header>

      <div className="flex flex-col md:flex-row gap-8">
        {/* Sidebar */}
        <aside className="w-full md:w-64 shrink-0">
          <div className="bg-surface-container-low rounded-2xl p-6 border border-outline-variant sticky top-24">
            <h3 className="text-xs font-bold text-primary uppercase tracking-widest mb-6">Filter by Part</h3>
            <div className="space-y-2">
              {categories.map((cat) => (
                <button
                  key={cat.name}
                  onClick={() => setFilter(cat.name)}
                  className={cn(
                    "w-full flex items-center gap-3 p-3 rounded-xl text-left transition-all",
                    filter === cat.name 
                      ? "bg-primary text-on-primary shadow-md" 
                      : "text-on-surface-variant hover:bg-surface-variant/30"
                  )}
                >
                  {cat.icon}
                  <span className="text-sm font-semibold">{cat.name}</span>
                </button>
              ))}
            </div>
            
            <div className="mt-12 pt-8 border-t border-outline-variant">
               <h3 className="text-xs font-bold text-primary uppercase tracking-widest mb-4">Article Range</h3>
               <div className="flex gap-2">
                 <input type="number" placeholder="From" className="w-full h-10 px-3 border border-outline-variant rounded-lg text-sm outline-none focus:border-primary" />
                 <input type="number" placeholder="To" className="w-full h-10 px-3 border border-outline-variant rounded-lg text-sm outline-none focus:border-primary" />
               </div>
            </div>
          </div>
        </aside>

        {/* Grid */}
        <div className="flex-1">
          <div className="flex justify-between items-center mb-6">
            <span className="text-sm text-on-surface-variant font-medium">Showing {filteredArticles.length} Articles</span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {filteredArticles.map((article, idx) => (
              <motion.div 
                key={article.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.05 }}
                className="bg-white border border-outline-variant rounded-2xl p-6 hover:border-primary transition-all group cursor-pointer flex flex-col shadow-sm"
              >
                <div className="flex justify-between items-start mb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-1.5 h-10 bg-primary rounded-full" />
                    <div className="flex flex-col">
                       <span className="text-xl font-bold text-primary">Article {article.id}</span>
                       <span className="text-xs font-bold text-on-surface-variant/60 uppercase">Part {article.part}</span>
                    </div>
                  </div>
                  <span className="px-3 py-1 bg-surface-container text-primary text-[10px] font-bold rounded-lg uppercase tracking-wider">
                    {article.category}
                  </span>
                </div>
                <h4 className="text-lg font-bold text-on-surface mb-3 group-hover:text-primary transition-colors">{article.title}</h4>
                <p className="text-on-surface-variant text-sm line-clamp-3 leading-relaxed">{article.content}</p>
                <div className="mt-8 pt-4 border-t border-outline-variant flex justify-end">
                   <ArrowRight className="text-primary w-5 h-5 opacity-0 group-hover:opacity-100 transition-all -translate-x-4 group-hover:translate-x-0" />
                </div>
              </motion.div>
            ))}
          </div>

          {/* Pagination */}
          <div className="mt-12 flex justify-center items-center gap-4">
             <button className="w-12 h-12 flex items-center justify-center rounded-2xl border border-outline-variant hover:bg-surface-container transition-colors">
               <ChevronLeft className="w-5 h-5" />
             </button>
             <div className="flex gap-2">
               <button className="w-12 h-12 bg-primary text-on-primary rounded-2xl font-bold shadow-lg">1</button>
               <button className="w-12 h-12 rounded-2xl border border-outline-variant hover:bg-surface-container font-semibold transition-colors">2</button>
               <button className="w-12 h-12 rounded-2xl border border-outline-variant hover:bg-surface-container font-semibold transition-colors">3</button>
             </div>
             <button className="w-12 h-12 flex items-center justify-center rounded-2xl border border-outline-variant hover:bg-surface-container transition-colors">
               <ChevronRight className="w-5 h-5" />
             </button>
          </div>
        </div>
      </div>
    </div>
  );
}
