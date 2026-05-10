import React from 'react';
import { ArrowRight, Verified, Sparkles, BookOpen, History, Network, Check, Gavel } from 'lucide-react';
import { motion } from 'motion/react';
import { Link } from 'react-router-dom';

export default function Home() {
  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative overflow-hidden pt-32 pb-24 px-6 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-7 flex flex-col gap-6"
          >
            <div className="inline-flex items-center gap-2 bg-secondary-fixed text-on-secondary-fixed px-3 py-1 rounded-full w-fit">
              <Verified className="w-4 h-4 text-secondary fill-secondary/20" />
              <span className="text-xs font-bold uppercase tracking-wider">Official Legal Assistant for Bharat</span>
            </div>
            <h1 className="text-5xl md:text-6xl font-bold text-primary leading-tight">
              Navigate the Indian Constitution with <span className="text-secondary">AI Precision</span>.
            </h1>
            <p className="text-lg text-on-surface-variant max-w-2xl">
              Bridging historic legal wisdom with modern intelligence. Constitutional AI provides definitive, cited, and real-time answers to your complex legal queries about the Supreme Law of India.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 mt-4">
              <Link to="/chat" className="bg-primary text-white px-8 py-4 rounded-xl font-bold text-lg flex items-center justify-center gap-2 hover:opacity-95 shadow-sm transition-all active:scale-95">
                Start Asking Questions
                <ArrowRight className="w-5 h-5" />
              </Link>
              <Link to="/articles" className="border border-outline text-primary px-8 py-4 rounded-xl font-bold text-lg flex items-center justify-center gap-2 hover:bg-surface-container-low transition-all">
                View AI Codex
              </Link>
            </div>
          </motion.div>
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="lg:col-span-5 relative"
          >
            <div className="bg-surface-container-high rounded-3xl aspect-[4/5] relative overflow-hidden shadow-2xl border border-outline-variant">
              <img 
                className="w-full h-full object-cover" 
                src="https://images.unsplash.com/photo-1589829545856-d10d557cf95f?auto=format&fit=crop&q=80&w=1000" 
                alt="Law books representing the Constitution"
              />
              <div className="absolute bottom-6 left-6 right-6 bg-white/90 backdrop-blur-md p-6 rounded-2xl border border-outline-variant shadow-xl">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-full bg-primary-container flex items-center justify-center text-on-primary-container">
                    <Sparkles className="w-5 h-5" />
                  </div>
                  <div className="h-3 w-32 bg-outline-variant rounded-full"></div>
                </div>
                <div className="space-y-3">
                  <div className="h-2 w-full bg-outline-variant/30 rounded-full"></div>
                  <div className="h-2 w-4/5 bg-outline-variant/30 rounded-full"></div>
                  <div className="h-2 w-2/3 bg-secondary-fixed rounded-full"></div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Features Bento Grid */}
      <section className="bg-surface-container-low py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col items-center text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-primary mb-4">Precision Engineered for Law</h2>
            <p className="text-on-surface-variant max-w-xl">Our specialized AI engine is trained exclusively on Indian statutory texts and precedents to ensure unwavering accuracy.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
            <div className="md:col-span-8 bg-surface rounded-3xl p-8 border border-outline-variant flex flex-col justify-between min-h-[320px] group hover:border-primary transition-all">
              <div>
                <div className="w-12 h-12 bg-primary text-on-primary rounded-xl flex items-center justify-center mb-6">
                  <Sparkles className="w-6 h-6" />
                </div>
                <h3 className="text-2xl font-bold text-primary mb-2">AI-Powered Semantic Search</h3>
                <p className="text-on-surface-variant max-w-lg">Go beyond keywords. Ask complex situational questions and receive context-aware interpretations of constitutional clauses in natural language.</p>
              </div>
              <div className="mt-8 flex gap-2">
                <span className="bg-surface-variant text-on-surface-variant px-3 py-1 rounded-lg text-sm font-medium">Natural Language</span>
                <span className="bg-surface-variant text-on-surface-variant px-3 py-1 rounded-lg text-sm font-medium">Context Mapping</span>
              </div>
            </div>
            <div className="md:col-span-4 bg-primary text-on-primary rounded-3xl p-8 flex flex-col justify-between group hover:opacity-95 transition-all">
              <div className="w-12 h-12 bg-white/10 text-white rounded-xl flex items-center justify-center mb-6">
                <BookOpen className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-2xl font-bold mb-2">Original Citations</h3>
                <p className="text-white/70">Every AI response includes direct links and vertical deep-dives into the original constitutional articles and schedules.</p>
              </div>
            </div>
            <div className="md:col-span-4 bg-secondary-container text-on-secondary-container rounded-3xl p-8 flex flex-col justify-between group hover:scale-[1.02] transition-all">
              <div className="w-12 h-12 bg-on-secondary-container text-secondary-container rounded-xl flex items-center justify-center mb-6">
                <History className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-2xl font-bold mb-2">Verified Amendments</h3>
                <p className="opacity-80">Real-time tracking of constitutional amendments ensuring you are reading the law as it stands today.</p>
              </div>
            </div>
            <div className="md:col-span-8 bg-surface rounded-3xl p-8 border border-outline-variant flex flex-col sm:flex-row items-start sm:items-center gap-8 group hover:border-primary transition-all">
              <div className="w-full sm:w-1/3">
                <img className="rounded-2xl w-full h-40 object-cover" src="https://images.unsplash.com/photo-1450101499163-c8848c66ca85?auto=format&fit=crop&q=80&w=500" alt="Legal research" />
              </div>
              <div className="flex-1">
                <div className="w-12 h-12 bg-surface-container rounded-xl flex items-center justify-center mb-4">
                  <Network className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-2xl font-bold text-primary mb-2">Cross-Reference Engine</h3>
                <p className="text-on-surface-variant">Automatically maps relationships between Fundamental Rights and Directive Principles to show the holistic legal picture.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Trust Section */}
      <section className="py-24 px-6 max-w-7xl mx-auto w-full">
        <div className="flex flex-col md:flex-row gap-12 items-center bg-surface-container rounded-[40px] p-8 md:p-16 border border-outline-variant">
          <div className="md:w-1/2">
            <h2 className="text-4xl font-bold text-primary mb-8 leading-tight">The Vertical Anchor Policy</h2>
            <div className="space-y-8">
              {[
                { title: "No Hallucinations", text: "Our AI is strictly constrained to the text of the Constitution and official judicial interpretations." },
                { title: "Official Sources", text: "Data synced daily with legislative records to capture every single amendment and notification." },
                { title: "Privacy First", text: "Secure, anonymous querying designed for legal professionals and privacy-conscious citizens." }
              ].map((item, idx) => (
                <div key={idx} className="flex gap-4">
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary flex items-center justify-center text-on-primary">
                    <Check className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="text-lg font-bold text-primary mb-1">{item.title}</h4>
                    <p className="text-on-surface-variant leading-relaxed">{item.text}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="md:w-1/2 w-full">
            <div className="aspect-video bg-white rounded-3xl border border-outline-variant p-8 flex flex-col justify-center items-center text-center relative overflow-hidden">
               <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full -translate-y-1/2 translate-x-1/2" />
               <Gavel className="w-16 h-16 text-primary mb-6" />
               <p className="text-lg font-semibold text-on-surface-variant italic leading-relaxed">
                 "The law is not a dead letter, it is a living document. We help you read its heartbeat."
               </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 text-center px-6">
        <div className="max-w-3xl mx-auto flex flex-col items-center">
          <h2 className="text-4xl md:text-5xl font-bold text-primary mb-6">Empower Your Understanding.</h2>
          <p className="text-lg text-on-surface-variant mb-10">Join thousands of legal researchers and citizens navigating the complexity of Indian law with unmatched clarity.</p>
          <Link to="/chat" className="bg-primary text-on-primary px-10 py-5 rounded-full font-bold text-xl hover:scale-105 transition-all shadow-xl active:scale-95">
            Get Started for Free
          </Link>
        </div>
      </section>
    </div>
  );
}
