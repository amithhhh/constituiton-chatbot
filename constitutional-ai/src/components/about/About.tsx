import React from 'react';
import { Target, Cpu, Search, Lock, Gavel, Users, Library, Terminal } from 'lucide-react';
import { motion } from 'motion/react';

export default function About() {
  return (
    <div className="pt-24 pb-12 max-w-7xl mx-auto px-6 overflow-hidden">
      {/* Hero */}
      <section className="mb-24 flex flex-col md:flex-row gap-16 items-center">
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="flex-1 space-y-6"
        >
          <span className="text-sm font-bold text-secondary tracking-[0.2em] uppercase">About Platform</span>
          <h1 className="text-5xl md:text-6xl font-bold text-primary leading-tight">Bridging the Gap Between Law and Intelligence.</h1>
          <p className="text-lg text-on-surface-variant leading-relaxed">
            Constitutional AI India is a non-partisan research project dedicated to making the Indian Constitution accessible, searchable, and understandable for every citizen through state-of-the-art transformer models.
          </p>
        </motion.div>
        <motion.div 
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="flex-1 w-full"
        >
          <div className="aspect-video rounded-3xl overflow-hidden shadow-2xl relative border border-outline-variant">
            <img 
              alt="Indian Constitution and AI visualization" 
              className="w-full h-full object-cover" 
              src="https://images.unsplash.com/photo-1505664194779-8beaceb93744?auto=format&fit=crop&q=80&w=1000"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-primary/60 to-transparent" />
          </div>
        </motion.div>
      </section>

      {/* How It Works (Bento Grid) */}
      <section className="py-24 border-t border-outline-variant">
        <h2 className="text-3xl font-bold text-primary mb-12">How it Works</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-8 bg-surface-container-low rounded-3xl border border-outline-variant md:col-span-2 group hover:border-primary transition-all">
            <div className="flex gap-6 items-start mb-4">
              <div className="p-4 bg-primary text-on-primary rounded-2xl group-hover:scale-110 transition-transform">
                <Library className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-primary">01. Statutory Data Ingestion</h3>
                <p className="text-on-surface-variant mt-4 leading-relaxed">
                  Our system maintains a structured repository of the Constitution of India, including all 448 Articles and 12 Schedules. Every amendment is cross-referenced in real-time with official gazettes.
                </p>
              </div>
            </div>
          </div>
          <div className="p-8 bg-surface-container-low rounded-3xl border border-outline-variant group hover:border-primary transition-all">
            <div className="flex flex-col h-full justify-between">
              <Cpu className="w-12 h-12 text-secondary mb-8 group-hover:-rotate-12 transition-transform" />
              <div>
                <h3 className="text-2xl font-bold text-primary">02. Semantic Parsing</h3>
                <p className="text-on-surface-variant mt-2">
                  We utilize LLMs specialized in Indian Jurisprudence to understand the legal nuances of each provision.
                </p>
              </div>
            </div>
          </div>
          <div className="p-8 bg-surface-container-low rounded-3xl border border-outline-variant group hover:border-primary transition-all">
            <div className="flex flex-col h-full justify-between">
              <Search className="w-12 h-12 text-primary mb-8 group-hover:scale-110 transition-transform" />
              <div>
                <h3 className="text-2xl font-bold text-primary">03. Neural Retrieval</h3>
                <p className="text-on-surface-variant mt-2">
                  Vector search algorithms find the exact constitutional basis for your queries, ensuring high fidelity.
                </p>
              </div>
            </div>
          </div>
          <div className="p-8 bg-surface-container-low rounded-3xl border border-outline-variant md:col-span-2 group hover:border-primary transition-all">
            <div className="flex gap-6 items-start">
              <div className="p-4 bg-secondary text-on-secondary rounded-2xl group-hover:rotate-12 transition-transform">
                <Lock className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-primary">04. Grounded Hallucination Check</h3>
                <p className="text-on-surface-variant mt-4 leading-relaxed">
                  To prevent AI hallucinations, every response is 'grounded' against the source text. If the AI cannot find a specific article, it will clearly state its limitations.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Disclaimer */}
      <motion.section 
        whileHover={{ scale: 1.01 }}
        className="my-24 bg-surface-container rounded-3xl p-12 border-l-8 border-error overflow-hidden flex flex-col md:flex-row gap-12 items-center"
      >
        <Gavel className="w-24 h-24 text-error shrink-0 opacity-20" />
        <div>
          <h2 className="text-3xl font-bold text-on-surface mb-4">Legal Disclaimer</h2>
          <p className="text-on-surface-variant mb-6 leading-relaxed">
            This platform is an AI-powered information retrieval tool. It is <strong>not a legal advice service</strong> and does not establish an attorney-client relationship. While we strive for accuracy, AI models can occasionally misinterpret complex legal contexts.
          </p>
          <p className="text-on-surface-variant italic border-t border-outline-variant pt-6">
            Constitutional AI India is for educational and research purposes only. Consult a qualified professional for official legal proceedings.
          </p>
        </div>
      </motion.section>

      {/* Team */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-12 py-12">
        <div>
          <h3 className="text-2xl font-bold text-primary mb-8">Data Sources</h3>
          <ul className="space-y-4">
            {['Legislative Department, MoL&J', 'Digital Library of Supreme Court', 'Parliamentary Gazettes of India'].map(source => (
              <li key={source} className="flex items-center gap-4 p-5 bg-white rounded-2xl border border-outline-variant shadow-sm">
                <div className="w-2 h-2 bg-primary rounded-full" />
                <span className="font-semibold text-on-surface">{source}</span>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h3 className="text-2xl font-bold text-primary mb-8 text-center md:text-left">Project Governance</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
             <div className="flex items-center gap-4 bg-white p-5 rounded-2xl border border-outline-variant shadow-sm">
               <div className="w-12 h-12 rounded-full bg-primary-container flex items-center justify-center text-primary font-bold">JD</div>
               <div>
                 <p className="font-bold text-sm">Dr. Jyoti Deshpande</p>
                 <p className="text-xs opacity-60">Lead AI Researcher</p>
               </div>
             </div>
             <div className="flex items-center gap-4 bg-white p-5 rounded-2xl border border-outline-variant shadow-sm">
               <div className="w-12 h-12 rounded-full bg-secondary-fixed flex items-center justify-center text-secondary font-bold">RS</div>
               <div>
                 <p className="font-bold text-sm">Rahul Sharma</p>
                 <p className="text-xs opacity-60">Legal Expert</p>
               </div>
             </div>
          </div>
          <p className="mt-8 text-sm text-on-surface-variant italic leading-relaxed text-center md:text-left">
            Supported by an interdisciplinary group of scholars and engineers committed to digital transparency.
          </p>
        </div>
      </section>
    </div>
  );
}
