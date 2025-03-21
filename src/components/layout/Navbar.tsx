
import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Shield, Lock, User } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  // Check if user is on a protected page
  const isProtectedPage = ['/dashboard', '/settings'].includes(location.pathname);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-300 px-6 py-4',
        isScrolled ? 'bg-white/80 backdrop-blur-lg shadow-sm' : 'bg-transparent'
      )}
    >
      <div className="container mx-auto">
        <div className="flex items-center justify-between">
          <Link
            to="/"
            className="flex items-center gap-2 text-biometric-dark"
          >
            <Shield className="w-8 h-8 text-biometric-teal" />
            <span className="font-bold text-xl tracking-tight">BioSecure</span>
          </Link>

          {/* Desktop navigation */}
          <nav className="hidden md:flex items-center gap-8">
            <Link
              to="/"
              className={cn(
                'text-sm font-medium transition-colors hover:text-biometric-teal',
                location.pathname === '/' ? 'text-biometric-teal' : 'text-biometric-dark/80'
              )}
            >
              Home
            </Link>
            {isProtectedPage ? (
              <>
                <Link
                  to="/dashboard"
                  className={cn(
                    'text-sm font-medium transition-colors hover:text-biometric-teal',
                    location.pathname === '/dashboard' ? 'text-biometric-teal' : 'text-biometric-dark/80'
                  )}
                >
                  Dashboard
                </Link>
                <Link
                  to="/settings"
                  className={cn(
                    'text-sm font-medium transition-colors hover:text-biometric-teal',
                    location.pathname === '/settings' ? 'text-biometric-teal' : 'text-biometric-dark/80'
                  )}
                >
                  Settings
                </Link>
                <Button 
                  variant="ghost"
                  size="sm"
                  className="text-biometric-dark/80 hover:text-biometric-danger hover:bg-biometric-danger/10"
                >
                  Logout
                </Button>
              </>
            ) : (
              <>
                <Link
                  to="/register"
                  className={cn(
                    'text-sm font-medium transition-colors hover:text-biometric-teal',
                    location.pathname === '/register' ? 'text-biometric-teal' : 'text-biometric-dark/80'
                  )}
                >
                  Register
                </Link>
                <Link to="/login">
                  <Button 
                    variant="outline"
                    size="sm"
                    className="border-biometric-teal text-biometric-teal hover:bg-biometric-teal/10"
                  >
                    <Lock className="h-3.5 w-3.5 mr-2" />
                    Login
                  </Button>
                </Link>
              </>
            )}
          </nav>

          {/* Mobile menu button */}
          <Button 
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? (
              <X className="h-5 w-5 text-biometric-dark" />
            ) : (
              <Menu className="h-5 w-5 text-biometric-dark" />
            )}
          </Button>
        </div>

        {/* Mobile navigation */}
        {isMobileMenuOpen && (
          <nav className="md:hidden pt-4 pb-2 animate-fade-in">
            <div className="flex flex-col gap-4">
              <Link
                to="/"
                className={cn(
                  'px-2 py-1.5 text-sm font-medium rounded-md transition-colors',
                  location.pathname === '/' 
                    ? 'bg-biometric-teal/10 text-biometric-teal' 
                    : 'text-biometric-dark/80 hover:bg-biometric-teal/5 hover:text-biometric-teal'
                )}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Home
              </Link>
              {isProtectedPage ? (
                <>
                  <Link
                    to="/dashboard"
                    className={cn(
                      'px-2 py-1.5 text-sm font-medium rounded-md transition-colors',
                      location.pathname === '/dashboard' 
                        ? 'bg-biometric-teal/10 text-biometric-teal' 
                        : 'text-biometric-dark/80 hover:bg-biometric-teal/5 hover:text-biometric-teal'
                    )}
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    Dashboard
                  </Link>
                  <Link
                    to="/settings"
                    className={cn(
                      'px-2 py-1.5 text-sm font-medium rounded-md transition-colors',
                      location.pathname === '/settings' 
                        ? 'bg-biometric-teal/10 text-biometric-teal' 
                        : 'text-biometric-dark/80 hover:bg-biometric-teal/5 hover:text-biometric-teal'
                    )}
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    Settings
                  </Link>
                  <Button 
                    variant="ghost"
                    size="sm"
                    className="justify-start text-biometric-dark/80 hover:text-biometric-danger hover:bg-biometric-danger/10"
                  >
                    Logout
                  </Button>
                </>
              ) : (
                <>
                  <Link
                    to="/register"
                    className={cn(
                      'px-2 py-1.5 text-sm font-medium rounded-md transition-colors',
                      location.pathname === '/register' 
                        ? 'bg-biometric-teal/10 text-biometric-teal' 
                        : 'text-biometric-dark/80 hover:bg-biometric-teal/5 hover:text-biometric-teal'
                    )}
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    Register
                  </Link>
                  <Link
                    to="/login"
                    className={cn(
                      'px-2 py-1.5 text-sm font-medium rounded-md transition-colors',
                      location.pathname === '/login' 
                        ? 'bg-biometric-teal/10 text-biometric-teal' 
                        : 'text-biometric-dark/80 hover:bg-biometric-teal/5 hover:text-biometric-teal'
                    )}
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    Login
                  </Link>
                </>
              )}
            </div>
          </nav>
        )}
      </div>
    </header>
  );
};

export default Navbar;
