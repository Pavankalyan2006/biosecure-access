
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { toast } from 'sonner';
import { Loader2, ArrowRight, Fingerprint, Heart, Dna } from 'lucide-react';
import BiometricScanner from '../ui/BiometricScanner';
import { Alert, AlertDescription } from '../ui/alert';

// Base URL for the Python backend
const BIOMETRIC_SERVER_URL = 'http://localhost:5000';

const AuthenticationFlow = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [currentStep, setCurrentStep] = useState<'credentials' | 'biometric'>('credentials');
  const [biometricStep, setBiometricStep] = useState<'fingerprint' | 'heartbeat' | 'dna'>('fingerprint');
  const [isLoading, setIsLoading] = useState(false);
  const [scanStatus, setScanStatus] = useState<'idle' | 'scanning' | 'success' | 'error'>('idle');
  const [apiStatus, setApiStatus] = useState<string | null>(null);
  const [serverConnected, setServerConnected] = useState<boolean | null>(null);

  // Check if the biometric server is accessible
  useEffect(() => {
    const checkServerConnection = async () => {
      try {
        const response = await fetch(`${BIOMETRIC_SERVER_URL}/api/health`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });
        
        if (response.ok) {
          setServerConnected(true);
          setApiStatus(null);
          console.log('Biometric server is connected and running');
        } else {
          throw new Error('Server returned an error response');
        }
      } catch (error) {
        console.error('Failed to connect to biometric server:', error);
        setServerConnected(false);
        setApiStatus('Could not connect to biometric server. Running in demo mode.');
      }
    };

    checkServerConnection();
  }, []);

  const handleCredentialSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email || !password) {
      toast.error('Please enter both email and password');
      return;
    }
    
    setIsLoading(true);
    
    // If server is not connected, use demo mode
    if (serverConnected === false) {
      setTimeout(() => {
        setIsLoading(false);
        setCurrentStep('biometric');
        toast.success('Credentials verified (Demo Mode)');
      }, 1000);
      return;
    }
    
    // API call to validate credentials
    fetch(`${BIOMETRIC_SERVER_URL}/api/validate-credentials`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    })
      .then(response => response.json())
      .then(data => {
        setIsLoading(false);
        if (data.success) {
          setCurrentStep('biometric');
          toast.success('Credentials verified');
        } else {
          toast.error(data.message || 'Invalid credentials');
        }
      })
      .catch(error => {
        console.error('Error:', error);
        setIsLoading(false);
        // Fallback to demo mode if API is not available
        setApiStatus('Could not connect to biometric server. Running in demo mode.');
        setTimeout(() => {
          setCurrentStep('biometric');
          toast.success('Credentials verified (Demo Mode)');
        }, 1000);
      });
  };

  const processBiometricScan = (type: 'fingerprint' | 'heartbeat' | 'dna') => {
    setScanStatus('scanning');
    
    // If API status shows we're in demo mode, use the mock data flow
    if (serverConnected === false) {
      setTimeout(() => {
        // 90% chance of success for demo purposes
        const success = Math.random() > 0.1;
        handleScanComplete(success);
      }, 3000);
      return;
    }
    
    // Real API call to Python backend
    const endpoint = `${BIOMETRIC_SERVER_URL}/api/biometric/${type}`;
    
    fetch(endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ 
        userId: email, // Using email as userId for demo
        // In a real app, you would send the actual biometric data here
      }),
    })
      .then(response => response.json())
      .then(data => {
        handleScanComplete(data.success);
      })
      .catch(error => {
        console.error('Error:', error);
        // Fallback to demo mode if API is not available
        setApiStatus('Could not connect to biometric server. Running in demo mode.');
        
        // Simulate scan process in demo mode
        setTimeout(() => {
          // 90% chance of success for demo purposes
          const success = Math.random() > 0.1;
          handleScanComplete(success);
        }, 3000);
      });
  };

  const handleScanComplete = (success: boolean) => {
    if (success) {
      setScanStatus('success');
      
      setTimeout(() => {
        if (biometricStep === 'fingerprint') {
          setBiometricStep('heartbeat');
          setScanStatus('idle');
        } else if (biometricStep === 'heartbeat') {
          setBiometricStep('dna');
          setScanStatus('idle');
        } else if (biometricStep === 'dna') {
          // All scans complete
          toast.success('Biometric authentication successful');
          navigate('/dashboard');
        }
      }, 1000);
    } else {
      setScanStatus('error');
      toast.error('Biometric verification failed. Please try again.');
      
      setTimeout(() => {
        setScanStatus('idle');
      }, 2000);
    }
  };

  const startScan = () => {
    processBiometricScan(biometricStep);
  };

  return (
    <div className="bg-white rounded-xl shadow-lg p-8 w-full max-w-md">
      {serverConnected === false && (
        <Alert className="mb-6 bg-yellow-50 border-yellow-200">
          <AlertDescription className="text-yellow-800">
            {apiStatus}
          </AlertDescription>
        </Alert>
      )}
      
      {currentStep === 'credentials' ? (
        <div className="animate-fade-in">
          <h2 className="text-2xl font-bold text-biometric-dark mb-6">Login to BioSecure</h2>
          
          <form onSubmit={handleCredentialSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="user@example.com"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
              />
            </div>
            
            <Button
              type="submit"
              className="w-full bg-biometric-blue hover:bg-biometric-blue/90"
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Verifying...
                </>
              ) : (
                <>
                  Continue to Biometric Verification
                  <ArrowRight className="ml-2 h-4 w-4" />
                </>
              )}
            </Button>
          </form>
        </div>
      ) : (
        <div className="animate-fade-in">
          <h2 className="text-2xl font-bold text-biometric-dark mb-6">Biometric Verification</h2>
          
          {apiStatus && (
            <Alert className="mb-4 bg-yellow-50 border-yellow-200">
              <AlertDescription className="text-yellow-800">
                {apiStatus}
              </AlertDescription>
            </Alert>
          )}
          
          <div className="text-center space-y-6">
            <div className="flex justify-center mb-2">
              <div className="flex space-x-2">
                <div className={`w-3 h-3 rounded-full ${biometricStep === 'fingerprint' ? 'bg-biometric-blue' : 'bg-gray-200'}`}></div>
                <div className={`w-3 h-3 rounded-full ${biometricStep === 'heartbeat' ? 'bg-biometric-blue' : 'bg-gray-200'}`}></div>
                <div className={`w-3 h-3 rounded-full ${biometricStep === 'dna' ? 'bg-biometric-blue' : 'bg-gray-200'}`}></div>
              </div>
            </div>
            
            <div className="bg-gray-50 py-8 px-4 rounded-lg">
              {biometricStep === 'fingerprint' && (
                <div className="text-center">
                  <Fingerprint className="w-16 h-16 mx-auto mb-4 text-biometric-blue" />
                  <h3 className="text-lg font-medium mb-2">Fingerprint Verification</h3>
                  <p className="text-sm text-gray-500 mb-6">
                    Place your finger on the scanner to verify your identity.
                  </p>
                </div>
              )}
              
              {biometricStep === 'heartbeat' && (
                <div className="text-center">
                  <Heart className="w-16 h-16 mx-auto mb-4 text-biometric-blue animate-pulse" />
                  <h3 className="text-lg font-medium mb-2">Heartbeat Verification</h3>
                  <p className="text-sm text-gray-500 mb-6">
                    Place your wrist on the sensor to verify your heartbeat pattern.
                  </p>
                </div>
              )}
              
              {biometricStep === 'dna' && (
                <div className="text-center">
                  <Dna className="w-16 h-16 mx-auto mb-4 text-biometric-blue" />
                  <h3 className="text-lg font-medium mb-2">DNA Verification</h3>
                  <p className="text-sm text-gray-500 mb-6">
                    Submit your DNA sample to complete the verification.
                  </p>
                </div>
              )}
              
              <BiometricScanner 
                type={biometricStep}
                status={scanStatus}
                className="mx-auto"
              />
            </div>
            
            <Button
              type="button"
              onClick={startScan}
              className="bg-biometric-blue hover:bg-biometric-blue/90"
              disabled={scanStatus !== 'idle'}
            >
              {scanStatus === 'idle' && 'Start Scan'}
              {scanStatus === 'scanning' && 'Scanning...'}
              {scanStatus === 'success' && 'Verified!'}
              {scanStatus === 'error' && 'Try Again'}
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default AuthenticationFlow;
