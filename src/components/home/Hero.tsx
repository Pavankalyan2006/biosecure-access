
import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Shield, Fingerprint, Heart, Dna } from 'lucide-react';
import { Button } from '@/components/ui/button';

const Hero = () => {
  return (
    <section className="relative bg-gradient-to-b from-white to-gray-50 pt-32 pb-20 overflow-hidden">
      {/* Background pattern */}
      <div className="absolute inset-0 bg-fingerprint-pattern opacity-[0.03] pointer-events-none"></div>
      
      <div className="container mx-auto px-6 relative z-10">
        <div className="flex flex-col items-center text-center max-w-4xl mx-auto">
          <div className="inline-flex items-center gap-2 bg-biometric-blue/10 text-biometric-blue px-4 py-1.5 rounded-full mb-6 animate-fade-in">
            <Shield className="w-4 h-4" />
            <span className="text-sm font-medium">Next-generation biometric security</span>
          </div>
          
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-biometric-dark leading-tight mb-6 animate-fade-in">
            Authenticate with Your 
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-biometric-blue to-biometric-teal"> Biological Signature</span>
          </h1>
          
          <p className="text-lg text-biometric-dark/70 mb-8 max-w-3xl animate-fade-in">
            BioSecure combines fingerprint recognition, heartbeat monitoring, and DNA matching to create
            the most secure authentication system available, with inheritance-based access control.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 mb-16 animate-fade-in">
            <Link to="/register">
              <Button className="bg-biometric-blue hover:bg-biometric-blue/90 text-white px-6 py-6 h-auto rounded-lg">
                Get Started
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
            <Link to="/login">
              <Button variant="outline" className="border-biometric-dark/20 text-biometric-dark hover:bg-biometric-dark/5 px-6 py-6 h-auto rounded-lg">
                Try Demo
              </Button>
            </Link>
          </div>
          
          {/* Biometric illustration */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 w-full max-w-3xl mx-auto">
            <div className="glass rounded-xl p-6 flex flex-col items-center text-center animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
              <div className="w-16 h-16 flex items-center justify-center rounded-full bg-biometric-blue/10 mb-4">
                <Fingerprint className="w-8 h-8 text-biometric-blue" />
              </div>
              <h3 className="font-semibold text-md mb-2">Fingerprint Recognition</h3>
              <p className="text-sm text-biometric-dark/70">Unique pattern identification with advanced matching algorithm.</p>
            </div>
            
            <div className="glass rounded-xl p-6 flex flex-col items-center text-center animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
              <div className="w-16 h-16 flex items-center justify-center rounded-full bg-biometric-blue/10 mb-4">
                <Heart className="w-8 h-8 text-biometric-blue" />
              </div>
              <h3 className="font-semibold text-md mb-2">Heartbeat Monitoring</h3>
              <p className="text-sm text-biometric-dark/70">Real-time cardiac signature verification ensures liveness.</p>
            </div>
            
            <div className="glass rounded-xl p-6 flex flex-col items-center text-center animate-fade-in-up" style={{ animationDelay: '0.3s' }}>
              <div className="w-16 h-16 flex items-center justify-center rounded-full bg-biometric-blue/10 mb-4">
                <Dna className="w-8 h-8 text-biometric-blue" />
              </div>
              <h3 className="font-semibold text-md mb-2">DNA Matching</h3>
              <p className="text-sm text-biometric-dark/70">Family-based inheritance access with genetic verification.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
