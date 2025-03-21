
import React from 'react';
import { Shield, Lock, Users, Building, Bank, FileDigit, CheckCircle2 } from 'lucide-react';
import GlassCard from '../ui/GlassCard';

const features = [
  {
    icon: <Shield className="w-6 h-6 text-biometric-blue" />,
    title: "Multi-layered Security",
    description: "Three biometric checks combine fingerprint, heartbeat, and DNA verification for the ultimate security solution."
  },
  {
    icon: <Lock className="w-6 h-6 text-biometric-blue" />,
    title: "Inheritance Access",
    description: "Authorized family members can gain access if the primary user is no longer able to authenticate."
  },
  {
    icon: <Users className="w-6 h-6 text-biometric-blue" />,
    title: "Family Verification",
    description: "Pre-register family members with genetic matching to ensure secure inheritance-based unlocking."
  },
  {
    icon: <Building className="w-6 h-6 text-biometric-blue" />,
    title: "Enterprise Security",
    description: "Ideal for high-security facilities requiring stringent biometric access control systems."
  },
  {
    icon: <Bank className="w-6 h-6 text-biometric-blue" />,
    title: "Financial Protection",
    description: "Secure financial transactions and sensitive data with multi-factor biometric authentication."
  },
  {
    icon: <FileDigit className="w-6 h-6 text-biometric-blue" />,
    title: "Forensic Identification",
    description: "Advanced biometric data analysis for reliable identity verification in critical situations."
  }
];

const Features = () => {
  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-6">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl font-bold text-biometric-dark mb-4">Advanced Security Features</h2>
          <p className="text-biometric-dark/70">
            BioSecure combines multiple biometric verification methods to create an uncompromising 
            authentication system with inheritance capabilities.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <GlassCard 
              key={index}
              hoverEffect={true}
              className="animate-fade-in-up"
              style={{ animationDelay: `${0.1 * index}s` }}
            >
              <div className="flex flex-col h-full">
                <div className="mb-4">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold mb-2 text-biometric-dark">{feature.title}</h3>
                <p className="text-biometric-dark/70 mb-4">{feature.description}</p>
                <div className="mt-auto">
                  <div className="flex items-center text-sm text-biometric-blue">
                    <CheckCircle2 className="w-4 h-4 mr-2" />
                    <span>Enterprise Ready</span>
                  </div>
                </div>
              </div>
            </GlassCard>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
