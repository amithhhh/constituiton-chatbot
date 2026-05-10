import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Scale, Search, Menu, X } from 'lucide-react';
import { cn } from '../../lib/utils';

export default function Navbar() {
  const [isOpen, setIsOpen] = React.useState(false);
  const location = useLocation();

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Chat', path: '/chat' },
    { name: 'Articles', path: '/articles' },
    { name: 'About', path: '/about' },
  ];

  return (
    <header className="bg-surface border-b border-outline-variant fixed top-0 w-full z-50 h-16">
      <div className="flex justify-between items-center px-4 md:px-6 w-full max-w-7xl mx-auto h-full">
        <Link to="/" className="flex items-center gap-2 active:opacity-80 transition-opacity">
          <Scale className="text-primary w-6 h-6" />
          <h1 className="text-xl font-bold text-primary">Constitutional AI</h1>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-8 h-full">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className={cn(
                "font-medium transition-all px-1 py-1",
                location.pathname === link.path 
                  ? "text-primary border-b-2 border-primary" 
                  : "text-on-surface-variant hover:text-primary"
              )}
            >
              {link.name}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-4">
          <button className="text-on-surface-variant hover:bg-surface-container-low p-2 rounded-full transition-colors">
            <Search className="w-5 h-5" />
          </button>
          <button 
            className="md:hidden text-primary"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
          <button className="hidden md:block bg-primary text-white px-4 py-2 font-semibold rounded-lg hover:opacity-90 transition-all">
            Get Started
          </button>
        </div>
      </div>

      {/* Mobile Nav */}
      {isOpen && (
        <div className="md:hidden absolute top-16 left-0 w-full bg-surface border-b border-outline-variant p-4 flex flex-col gap-4 shadow-lg">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              onClick={() => setIsOpen(false)}
              className={cn(
                "p-2 rounded-lg font-medium",
                location.pathname === link.path ? "bg-primary-container text-primary" : "text-on-surface-variant"
              )}
            >
              {link.name}
            </Link>
          ))}
        </div>
      )}
    </header>
  );
}
