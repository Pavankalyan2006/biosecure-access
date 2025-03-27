
import React from 'react';
import { Check } from 'lucide-react';

export interface RegistrationStep {
  id: string;
  title: string;
}

interface StepProgressProps {
  steps: RegistrationStep[];
  currentStep: string;
}

const StepProgress: React.FC<StepProgressProps> = ({ steps, currentStep }) => {
  return (
    <div className="flex justify-between mb-8">
      {steps.map((step, index) => (
        <div key={step.id} className="flex flex-col items-center">
          <div 
            className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium transition-colors ${
              currentStep === step.id 
                ? 'bg-biometric-blue text-white' 
                : steps.findIndex(s => s.id === currentStep) > index 
                  ? 'bg-biometric-success text-white' 
                  : 'bg-gray-100 text-gray-400'
            }`}
          >
            {steps.findIndex(s => s.id === currentStep) > index ? <Check className="w-4 h-4" /> : index + 1}
          </div>
          <span className={`mt-2 text-xs ${
            currentStep === step.id 
              ? 'text-biometric-blue font-medium' 
              : steps.findIndex(s => s.id === currentStep) > index 
                ? 'text-biometric-success' 
                : 'text-gray-400'
          }`}>
            {step.title}
          </span>
        </div>
      ))}
    </div>
  );
};

export default StepProgress;
