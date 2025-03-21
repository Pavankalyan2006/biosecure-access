
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { toast } from 'sonner';
import { Loader2, Check, X } from 'lucide-react';
import { Link } from 'react-router-dom';

const steps = [
  { id: 'personal', title: 'Personal Information' },
  { id: 'biometric', title: 'Biometric Registration' },
  { id: 'family', title: 'Family Registration' },
  { id: 'complete', title: 'Complete' }
];

const RegisterForm = () => {
  const [currentStep, setCurrentStep] = useState('personal');
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

  return (
    <div className="bg-white rounded-xl shadow-lg p-8 w-full max-w-2xl">
      {/* Progress steps */}
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
            {index < steps.length - 1 && (
              <div className="hidden sm:block absolute h-[2px] w-16 bg-gray-100 top-4 left-0" 
                style={{ left: `calc(${(index * 100) / (steps.length - 1)}% + 2rem)` }}
              />
            )}
          </div>
        ))}
      </div>
      
      <form onSubmit={handleSubmit}>
        {currentStep === 'personal' && (
          <div className="space-y-4 animate-fade-in">
            <h2 className="text-2xl font-bold text-biometric-dark mb-6">Personal Information</h2>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="firstName">First Name</Label>
                <Input
                  id="firstName"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleInputChange}
                  placeholder="John"
                  required
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="lastName">Last Name</Label>
                <Input
                  id="lastName"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleInputChange}
                  placeholder="Doe"
                  required
                />
              </div>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleInputChange}
                placeholder="johndoe@example.com"
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                name="password"
                type="password"
                value={formData.password}
                onChange={handleInputChange}
                placeholder="••••••••"
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="confirmPassword">Confirm Password</Label>
              <Input
                id="confirmPassword"
                name="confirmPassword"
                type="password"
                value={formData.confirmPassword}
                onChange={handleInputChange}
                placeholder="••••••••"
                required
              />
            </div>
          </div>
        )}
        
        {currentStep === 'biometric' && (
          <div className="space-y-6 animate-fade-in">
            <h2 className="text-2xl font-bold text-biometric-dark mb-6">Biometric Registration</h2>
            
            <div className="bg-gray-50 p-6 rounded-lg">
              <h3 className="text-lg font-medium mb-4">Fingerprint Scan</h3>
              <div className="flex items-center gap-4">
                <div className="w-24 h-24 bg-white rounded-lg flex items-center justify-center border border-gray-200">
                  {fingerprintStatus === 'idle' && (
                    <div className="text-gray-400 text-sm text-center">
                      Ready to scan
                    </div>
                  )}
                  {fingerprintStatus === 'scanning' && (
                    <Loader2 className="w-8 h-8 text-biometric-blue animate-spin" />
                  )}
                  {fingerprintStatus === 'success' && (
                    <Check className="w-12 h-12 text-biometric-success" />
                  )}
                  {fingerprintStatus === 'error' && (
                    <X className="w-12 h-12 text-biometric-danger" />
                  )}
                </div>
                <div>
                  <p className="text-sm text-gray-500 mb-3">
                    Place your finger on the scanner to register your fingerprint.
                  </p>
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => simulateBiometricScan('fingerprint')}
                    disabled={fingerprintStatus === 'scanning' || fingerprintStatus === 'success'}
                    className="border-biometric-blue text-biometric-blue hover:bg-biometric-blue/10"
                  >
                    {fingerprintStatus === 'success' ? 'Registered' : 'Register Fingerprint'}
                  </Button>
                </div>
              </div>
            </div>
            
            <div className="bg-gray-50 p-6 rounded-lg">
              <h3 className="text-lg font-medium mb-4">Heartbeat Registration</h3>
              <div className="flex items-center gap-4">
                <div className="w-24 h-24 bg-white rounded-lg flex items-center justify-center border border-gray-200">
                  {heartbeatStatus === 'idle' && (
                    <div className="text-gray-400 text-sm text-center">
                      Ready to scan
                    </div>
                  )}
                  {heartbeatStatus === 'scanning' && (
                    <Loader2 className="w-8 h-8 text-biometric-blue animate-spin" />
                  )}
                  {heartbeatStatus === 'success' && (
                    <Check className="w-12 h-12 text-biometric-success" />
                  )}
                  {heartbeatStatus === 'error' && (
                    <X className="w-12 h-12 text-biometric-danger" />
                  )}
                </div>
                <div>
                  <p className="text-sm text-gray-500 mb-3">
                    Place your wrist on the scanner to register your unique heartbeat pattern.
                  </p>
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => simulateBiometricScan('heartbeat')}
                    disabled={heartbeatStatus === 'scanning' || heartbeatStatus === 'success'}
                    className="border-biometric-blue text-biometric-blue hover:bg-biometric-blue/10"
                  >
                    {heartbeatStatus === 'success' ? 'Registered' : 'Register Heartbeat'}
                  </Button>
                </div>
              </div>
            </div>
            
            <div className="bg-gray-50 p-6 rounded-lg">
              <h3 className="text-lg font-medium mb-4">DNA Sample Registration</h3>
              <div className="flex items-center gap-4">
                <div className="w-24 h-24 bg-white rounded-lg flex items-center justify-center border border-gray-200">
                  {dnaStatus === 'idle' && (
                    <div className="text-gray-400 text-sm text-center">
                      Ready to scan
                    </div>
                  )}
                  {dnaStatus === 'scanning' && (
                    <Loader2 className="w-8 h-8 text-biometric-blue animate-spin" />
                  )}
                  {dnaStatus === 'success' && (
                    <Check className="w-12 h-12 text-biometric-success" />
                  )}
                  {dnaStatus === 'error' && (
                    <X className="w-12 h-12 text-biometric-danger" />
                  )}
                </div>
                <div>
                  <p className="text-sm text-gray-500 mb-3">
                    Process your DNA sample to register your genetic profile.
                  </p>
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => simulateBiometricScan('dna')}
                    disabled={dnaStatus === 'scanning' || dnaStatus === 'success'}
                    className="border-biometric-blue text-biometric-blue hover:bg-biometric-blue/10"
                  >
                    {dnaStatus === 'success' ? 'Registered' : 'Register DNA Sample'}
                  </Button>
                </div>
              </div>
            </div>
          </div>
        )}
        
        {currentStep === 'family' && (
          <div className="space-y-6 animate-fade-in">
            <h2 className="text-2xl font-bold text-biometric-dark mb-6">Family Registration</h2>
            <p className="text-gray-500 mb-4">
              Register family members who will have inheritance-based access in case of emergency. 
              They will need to provide DNA samples for verification.
            </p>
            
            {familyMembers.map((member, index) => (
              <div key={index} className="flex gap-2 items-start">
                <div className="flex-1">
                  <Label htmlFor={`family-${index}`} className="sr-only">Family Member {index + 1}</Label>
                  <Input
                    id={`family-${index}`}
                    value={member}
                    onChange={(e) => handleFamilyMemberChange(index, e.target.value)}
                    placeholder={`Family member ${index + 1} name`}
                  />
                </div>
                {familyMembers.length > 1 && (
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    onClick={() => removeFamilyMember(index)}
                    className="text-biometric-danger"
                  >
                    <X className="h-4 w-4" />
                  </Button>
                )}
              </div>
            ))}
            
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={addFamilyMember}
              className="mt-2"
            >
              Add Another Family Member
            </Button>
          </div>
        )}
        
        {currentStep === 'complete' && (
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
        )}
        
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
