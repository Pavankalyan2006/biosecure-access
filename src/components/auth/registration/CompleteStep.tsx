
import React from 'react';
import { Button } from '@/components/ui/button';
import { Check } from 'lucide-react';
import { Link } from 'react-router-dom';

const CompleteStep: React.FC = () => {
  return (
    <div className="text-center py-8 space-y-6 animate-fade-in">
      <div className="mx-auto w-16 h-16 bg-biometric-success/10 rounded-full flex items-center justify-center">
        <Check className="w-8 h-8 text-biometric-success" />
      </div>
      <h2 className="text-2xl font-bold text-biometric-dark">Registration Complete!</h2>
      <p className="text-gray-500 max-w-md mx-auto">
        Your biometric data and family access have been registered successfully.
        You can now log in to access your secure portal.
      </p>
      <Link to="/login">
        <Button className="mt-4 bg-biometric-blue hover:bg-biometric-blue/90">
          Proceed to Login
        </Button>
      </Link>
    </div>
  );
};

export default CompleteStep;
