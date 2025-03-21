
import React from 'react';
import { Link } from 'react-router-dom';
import { Shield, Heart, Github, Twitter, Linkedin } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-biometric-dark text-white pt-16 pb-8">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <Link to="/" className="flex items-center gap-2 mb-4">
              <Shield className="w-6 h-6 text-biometric-teal" />
              <span className="font-bold text-lg text-white">BioSecure</span>
            </Link>
            <p className="text-sm text-gray-400 mb-6">
              Advanced biometric authentication system with inheritance-based access control.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-biometric-teal transition-colors">
                <Github className="w-5 h-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-biometric-teal transition-colors">
                <Twitter className="w-5 h-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-biometric-teal transition-colors">
                <Linkedin className="w-5 h-5" />
              </a>
            </div>
          </div>

          <div>
            <h3 className="font-semibold text-md mb-4">Product</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-sm text-gray-400 hover:text-biometric-teal transition-colors">
                  Features
                </Link>
              </li>
              <li>
                <Link to="/" className="text-sm text-gray-400 hover:text-biometric-teal transition-colors">
                  Security
                </Link>
              </li>
              <li>
                <Link to="/" className="text-sm text-gray-400 hover:text-biometric-teal transition-colors">
                  Enterprise
                </Link>
              </li>
              <li>
                <Link to="/" className="text-sm text-gray-400 hover:text-biometric-teal transition-colors">
                  Case Studies
                </Link>
              </li>
              <li>
                <Link to="/" className="text-sm text-gray-400 hover:text-biometric-teal transition-colors">
                  Pricing
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-md mb-4">Resources</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-sm text-gray-400 hover:text-biometric-teal transition-colors">
                  Documentation
                </Link>
              </li>
              <li>
                <Link to="/" className="text-sm text-gray-400 hover:text-biometric-teal transition-colors">
                  API Reference
                </Link>
              </li>
              <li>
                <Link to="/" className="text-sm text-gray-400 hover:text-biometric-teal transition-colors">
                  System Status
                </Link>
              </li>
              <li>
                <Link to="/" className="text-sm text-gray-400 hover:text-biometric-teal transition-colors">
                  Blog
                </Link>
              </li>
              <li>
                <Link to="/" className="text-sm text-gray-400 hover:text-biometric-teal transition-colors">
                  Support
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-md mb-4">Legal</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-sm text-gray-400 hover:text-biometric-teal transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link to="/" className="text-sm text-gray-400 hover:text-biometric-teal transition-colors">
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link to="/" className="text-sm text-gray-400 hover:text-biometric-teal transition-colors">
                  Cookie Policy
                </Link>
              </li>
              <li>
                <Link to="/" className="text-sm text-gray-400 hover:text-biometric-teal transition-colors">
                  GDPR Compliance
                </Link>
              </li>
              <li>
                <Link to="/" className="text-sm text-gray-400 hover:text-biometric-teal transition-colors">
                  Security Policy
                </Link>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-800 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-sm text-gray-500">
              &copy; {new Date().getFullYear()} BioSecure. All rights reserved.
            </p>
            <p className="text-sm text-gray-500 mt-2 md:mt-0 flex items-center">
              Made with <Heart className="w-4 h-4 mx-1 text-biometric-teal" /> for better security
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
