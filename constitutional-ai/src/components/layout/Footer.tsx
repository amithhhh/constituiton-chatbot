import React from 'react';
import { Link } from 'react-router-dom';
import { Scale } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-surface-container-high border-t border-outline-variant w-full py-12 mt-auto">
      <div className="flex flex-col md:flex-row justify-between items-center px-6 max-w-7xl mx-auto gap-8">
        <div className="flex flex-col gap-2">
          <div className="flex items-center gap-2">
            <Scale className="text-primary w-5 h-5" />
            <span className="text-lg font-bold text-primary">Constitutional AI</span>
          </div>
          <p className="text-sm text-on-surface-variant">© 2024 Constitutional AI India. Legal AI Assistant.</p>
        </div>
        <div className="flex gap-8">
          <Link to="#" className="text-sm text-on-surface-variant hover:text-primary underline transition-all">Disclaimer</Link>
          <Link to="#" className="text-sm text-on-surface-variant hover:text-primary underline transition-all">Privacy Policy</Link>
          <Link to="#" className="text-sm text-on-surface-variant hover:text-primary underline transition-all">Terms of Service</Link>
        </div>
      </div>
    </footer>
  );
}
