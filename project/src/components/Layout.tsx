import React from 'react';
import { Link } from 'react-router-dom';
import { Brain } from 'lucide-react';

export const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div className="min-h-screen bg-[#1a1a1a] text-white">
      <nav className="border-b border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link to="/" className="flex items-center space-x-2">
              <Brain className="h-8 w-8 text-[#c5ff00]" />
              <span className="text-xl font-semibold">Elevate AI</span>
            </Link>
            <div className="flex space-x-4">
              <Link to="/" className="px-3 py-2 rounded-md hover:text-[#c5ff00]">Home</Link>
              <Link to="/services" className="px-3 py-2 rounded-md hover:text-[#c5ff00]">Services</Link>
              <Link to="/contact" className="px-3 py-2 rounded-md hover:text-[#c5ff00]">Contact</Link>
              <Link to="/choose-plan" className="px-3 py-2 rounded-md hover:text-[#c5ff00]">Choose Plan</Link>
              <Link
                to="/contact"
                className="bg-[#c5ff00] text-black px-4 py-2 rounded-md hover:bg-[#b3e600] transition-colors"
              >
                Contact Us
              </Link>
            </div>
          </div>
        </div>
      </nav>
      <main>{children}</main>
      <footer className="border-t border-gray-800 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-2">
              <Brain className="h-6 w-6 text-[#c5ff00]" />
              <span>© Copyright Pebisnis Ulung. All rights reserved</span>
            </div>
            <div className="flex space-x-6">
              <Link to="/privacy" className="hover:text-[#c5ff00]">Privacy Policy</Link>
              <Link to="/terms" className="hover:text-[#c5ff00]">Terms</Link>
              <Link to="/contact" className="hover:text-[#c5ff00]">Get in Touch</Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};