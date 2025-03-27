
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { Loader2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { 
  registerFingerprint, 
  isFingerprintAvailable, 
  isWebAuthnRestricted,
  getWebAuthnRestrictionReason,
  logWebAuthnRestriction
} from '@/lib/webauthn';

// Import registration step components
import StepProgress, { RegistrationStep } from './registration/StepProgress';
import PersonalInfoStep from './registration/PersonalInfoStep';
import BiometricStep from './registration/BiometricStep';
import FamilyStep from './registration/FamilyStep';
import CompleteStep from './registration/CompleteStep';

const steps: RegistrationStep[] = [
  { id: 'personal', title: 'Personal Information' },
  { id: 'biometric', title: 'Biometric Registration' },
  { id: 'family', title: 'Family Registration' },
  { id: 'complete', title: 'Complete' }
];

const RegisterForm = () => {
  const [currentStep, setCurrentStep] = useState('personal');
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [fingerprintStatus, setFingerprintStatus] = useState<'idle' | 'scanning' | 'success' | 'error'>('idle');
  const [heartbeatStatus, setHeartbeatStatus] = useState<'idle' | 'scanning' | 'success' | 'error'>('idle');
  const [dnaStatus, setDnaStatus] = useState<'idle' | 'scanning' | 'success' | 'error'>('idle');
  const [familyMembers, setFamilyMembers] = useState<string[]>(['']);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isFingerprintSupported, setIsFingerprintSupported] = useState(false);
  const [webAuthnStatus, setWebAuthnStatus] = useState<{
    isRestricted: boolean;
    restrictionReason: string | null;
    isAvailable: boolean;
  }>({
    isRestricted: false,
    restrictionReason: null,
    isAvailable: false
  });

  useEffect(() => {
    const checkFingerprint = async () => {
      const available = await isFingerprintAvailable();
      const restricted = isWebAuthnRestricted();
      
      if (restricted) {
        logWebAuthnRestriction();
      }
      
      setWebAuthnStatus({
        isRestricted: restricted,
        restrictionReason: restricted ? getWebAuthnRestrictionReason() : null,
        isAvailable: available
      });
      
      setIsFingerprintSupported(available);
    };
    
    checkFingerprint();
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleFamilyMemberChange = (index: number, value: string) => {
    const updatedMembers = [...familyMembers];
    updatedMembers[index] = value;
    setFamilyMembers(updatedMembers);
  };

  const addFamilyMember = () => {
    setFamilyMembers([...familyMembers, '']);
  };

  const removeFamilyMember = (index: number) => {
    const updatedMembers = [...familyMembers];
    updatedMembers.splice(index, 1);
    setFamilyMembers(updatedMembers);
  };

  const registerUserFingerprint = async () => {
    setFingerprintStatus('scanning');
    
    try {
      const success = await registerFingerprint(formData.email);
      if (success) {
        setFingerprintStatus('success');
        
        if (webAuthnStatus.isRestricted) {
          toast.success('Simulated fingerprint registered successfully', {
            description: 'Using simulation mode due to WebAuthn restrictions'
          });
        } else {
          toast.success('Fingerprint registered successfully');
        }
      } else {
        setFingerprintStatus('error');
        toast.error('Failed to register fingerprint');
      }
    } catch (error) {
      console.error('Fingerprint registration error:', error);
      setFingerprintStatus('error');
      toast.error(`Registration failed: ${(error as Error).message}`);
    }
  };

  const simulateBiometricScan = (type: 'fingerprint' | 'heartbeat' | 'dna') => {
    const setStatus = type === 'fingerprint' 
      ? setFingerprintStatus 
      : type === 'heartbeat' 
        ? setHeartbeatStatus 
        : setDnaStatus;
    
    setStatus('scanning');
    
    setTimeout(() => {
      setStatus('success');
      toast.success(`${type.charAt(0).toUpperCase() + type.slice(1)} registered successfully`);
    }, 2000);
  };

  const goToNextStep = () => {
    const currentIndex = steps.findIndex(step => step.id === currentStep);
    if (currentIndex < steps.length - 1) {
      setCurrentStep(steps[currentIndex + 1].id);
    }
  };

  const goToPreviousStep = () => {
    const currentIndex = steps.findIndex(step => step.id === currentStep);
    if (currentIndex > 0) {
      setCurrentStep(steps[currentIndex - 1].id);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (currentStep === 'personal') {
      // Validate personal information
      if (!formData.firstName || !formData.lastName || !formData.email || !formData.password) {
        toast.error('Please fill in all required fields');
        return;
      }
      
      if (formData.password !== formData.confirmPassword) {
        toast.error('Passwords do not match');
        return;
      }
      
      goToNextStep();
    } else if (currentStep === 'biometric') {
      // Validate biometric information
      if (fingerprintStatus !== 'success' || heartbeatStatus !== 'success' || dnaStatus !== 'success') {
        toast.error('Please complete all biometric scans');
        return;
      }
      
      goToNextStep();
    } else if (currentStep === 'family') {
      // Validate family information
      const validFamilyMembers = familyMembers.filter(member => member.trim() !== '');
      if (validFamilyMembers.length === 0) {
        toast.error('Please add at least one family member');
        return;
      }
      
      setIsSubmitting(true);
      
      // Simulate API call
      setTimeout(() => {
        setIsSubmitting(false);
        goToNextStep();
        toast.success('Registration completed successfully!');
      }, 2000);
    }
  };

  // Render the appropriate step component based on currentStep
  const renderStep = () => {
    switch (currentStep) {
      case 'personal':
        return <PersonalInfoStep formData={formData} handleInputChange={handleInputChange} />;
      case 'biometric':
        return (
          <BiometricStep 
            fingerprintStatus={fingerprintStatus}
            heartbeatStatus={heartbeatStatus}
            dnaStatus={dnaStatus}
            registerUserFingerprint={registerUserFingerprint}
            simulateBiometricScan={simulateBiometricScan}
            webAuthnStatus={webAuthnStatus}
            isFingerprintSupported={isFingerprintSupported}
          />
        );
      case 'family':
        return (
          <FamilyStep 
            familyMembers={familyMembers}
            handleFamilyMemberChange={handleFamilyMemberChange}
            addFamilyMember={addFamilyMember}
            removeFamilyMember={removeFamilyMember}
          />
        );
      case 'complete':
        return <CompleteStep />;
      default:
        return <PersonalInfoStep formData={formData} handleInputChange={handleInputChange} />;
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-lg p-8 w-full max-w-2xl">
      {/* Progress steps */}
      <StepProgress steps={steps} currentStep={currentStep} />
      
      <form onSubmit={handleSubmit}>
        {renderStep()}
        
        {currentStep !== 'complete' && (
          <div className="flex justify-between mt-8">
            {currentStep !== 'personal' ? (
              <Button
                type="button"
                variant="outline"
                onClick={goToPreviousStep}
              >
                Back
              </Button>
            ) : (
              <div></div>
            )}
            
            <Button
              type="submit"
              className="bg-biometric-blue hover:bg-biometric-blue/90"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Processing...
                </>
              ) : currentStep === 'family' ? (
                'Complete Registration'
              ) : (
                'Continue'
              )}
            </Button>
          </div>
        )}
      </form>
    </div>
  );
};

export default RegisterForm;
