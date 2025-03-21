
import React from 'react';
import { Shield, Lock, Server, Database, AlertTriangle } from 'lucide-react';
import { cn } from '@/lib/utils';
import BiometricScanner from '../ui/BiometricScanner';

const SecuritySection = () => {
  return (
    <section className="py-20 bg-biometric-dark text-white relative overflow-hidden">
      {/* Abstract background pattern */}
      <div className="absolute inset-0 opacity-10 pointer-events-none">
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_30%_20%,rgba(4,150,255,0.4),transparent_40%)]"></div>
        <div className="absolute bottom-0 right-0 w-full h-full bg-[radial-gradient(circle_at_70%_80%,rgba(56,190,201,0.4),transparent_40%)]"></div>
      </div>
      
      <div className="container mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div className="animate-fade-in-right">
            <h2 className="text-3xl font-bold mb-6">Military-Grade Security Infrastructure</h2>
            <p className="text-gray-400 mb-8">
              Our comprehensive security approach combines cutting-edge biometric hardware with enterprise-level
              database encryption and real-time monitoring to ensure maximum protection for your identity.
            </p>
            
            <div className="space-y-4">
              <SecurityFeature 
                icon={<Lock />}
                title="AES-256 Encryption"
                description="All biometric data is encrypted using military-grade AES-256 encryption standard."
              />
              
              <SecurityFeature 
                icon={<Server />}
                title="Secure Processing"
                description="Biometric processing occurs on isolated, secure hardware modules."
              />
              
              <SecurityFeature 
                icon={<Database />}
                title="Protected Storage"
                description="User data is stored in fragmented, encrypted database shards."
              />
              
              <SecurityFeature 
                icon={<AlertTriangle />}
                title="Anomaly Detection"
                description="AI-based monitoring system detects and blocks unusual authentication attempts."
              />
            </div>
          </div>
          
          <div className="flex justify-center animate-fade-in-left order-first lg:order-last">
            <div className="grid grid-cols-2 gap-6 w-full max-w-md">
              <BiometricScanner 
                type="fingerprint"
                status="success"
                className="glass"
              />
              
              <BiometricScanner 
                type="heartbeat"
                status="scanning"
                className="glass"
              />
              
              <BiometricScanner 
                type="dna"
                status="idle"
                className="glass col-span-2"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const SecurityFeature = ({ 
  icon, 
  title, 
  description 
}: { 
  icon: React.ReactNode;
  title: string;
  description: string;
}) => {
  return (
    <div className="flex gap-4">
      <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-biometric-blue/20 flex items-center justify-center text-biometric-blue">
        {icon}
      </div>
      <div>
        <h3 className="font-semibold mb-1">{title}</h3>
        <p className="text-sm text-gray-400">{description}</p>
      </div>
    </div>
  );
};

export default SecuritySection;
