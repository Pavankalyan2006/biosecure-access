
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { toast } from 'sonner';
import { Loader2, Fingerprint, Lock, Mail, AlertTriangle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { authenticateWithFingerprint, isFingerprintAvailable } from '@/lib/webauthn';

const LoginForm = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isFingerprintSupported, setIsFingerprintSupported] = useState(false);
  const [useFingerprintAuth, setUseFingerprintAuth] = useState(false);

  useEffect(() => {
    // Check if fingerprint authentication is available
    const checkFingerprint = async () => {
      const available = await isFingerprintAvailable();
      setIsFingerprintSupported(available);
    };
    
    checkFingerprint();
  }, []);

  const handleStandardLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email || !password) {
      toast.error('Please enter both email and password');
      return;
    }
    
    setIsLoading(true);
    
    try {
      // Simulate API call to validate credentials
      const response = await fetch('/api/validate-credentials', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });
      
      const data = await response.json();
      
      if (data.success) {
        toast.success('Login successful');
        navigate('/dashboard');
      } else {
        toast.error('Invalid email or password');
      }
    } catch (error) {
      console.error('Login error:', error);
      toast.error('Login failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleFingerprintLogin = async () => {
    if (!email) {
      toast.error('Please enter your email address');
      return;
    }

    setIsLoading(true);
    
    try {
      const success = await authenticateWithFingerprint(email);
      
      if (success) {
        toast.success('Fingerprint authentication successful');
        navigate('/dashboard');
      } else {
        toast.error('Fingerprint authentication failed');
      }
    } catch (error) {
      console.error('Fingerprint authentication error:', error);
      toast.error(`Authentication failed: ${(error as Error).message}`);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full max-w-md mx-auto bg-white rounded-xl shadow-lg p-8">
      <div className="text-center mb-8">
        <h1 className="text-2xl font-bold text-biometric-dark">Log In</h1>
        <p className="text-gray-500 mt-2">Access your secure portal</p>
      </div>
      
      {!isFingerprintSupported && useFingerprintAuth && (
        <div className="mb-6 p-3 bg-amber-50 border border-amber-200 rounded-md flex items-start gap-3">
          <AlertTriangle className="text-amber-500 mt-0.5 flex-shrink-0" />
          <div>
            <p className="text-sm font-medium text-amber-800">
              Fingerprint authentication not available
            </p>
            <p className="text-sm text-amber-700">
              Your device doesn't support fingerprint authentication or it's not enabled.
              Please use password authentication instead.
            </p>
          </div>
        </div>
      )}
      
      <div className="space-y-6">
        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <div className="relative">
            <Mail className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
            <Input
              id="email"
              type="email"
              placeholder="Enter your email"
              className="pl-10"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
        </div>
        
        {!useFingerprintAuth && (
          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <div className="relative">
              <Lock className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
              <Input
                id="password"
                type="password"
                placeholder="••••••••"
                className="pl-10"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </div>
        )}
        
        <div className="flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <input
              type="checkbox"
              id="remember"
              className="h-4 w-4 rounded border-gray-300 text-biometric-blue focus:ring-biometric-blue"
            />
            <Label htmlFor="remember" className="text-sm text-gray-600">
              Remember me
            </Label>
          </div>
          
          <a
            href="#"
            className="text-sm font-medium text-biometric-blue hover:text-biometric-blue/80"
          >
            Forgot password?
          </a>
        </div>
        
        {useFingerprintAuth ? (
          <Button
            type="button"
            className="w-full bg-biometric-blue hover:bg-biometric-blue/90 flex items-center justify-center"
            disabled={isLoading || !email}
            onClick={handleFingerprintLogin}
          >
            {isLoading ? (
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            ) : (
              <Fingerprint className="mr-2 h-5 w-5" />
            )}
            {isLoading ? 'Authenticating...' : 'Login with Fingerprint'}
          </Button>
        ) : (
          <Button
            type="submit"
            className="w-full bg-biometric-blue hover:bg-biometric-blue/90"
            disabled={isLoading}
            onClick={handleStandardLogin}
          >
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Logging in...
              </>
            ) : (
              'Log In'
            )}
          </Button>
        )}
        
        {isFingerprintSupported && (
          <Button
            type="button"
            variant="outline"
            className="w-full border-biometric-blue text-biometric-blue hover:bg-biometric-blue/10"
            onClick={() => setUseFingerprintAuth(!useFingerprintAuth)}
          >
            {useFingerprintAuth ? (
              <>Use Password Instead</>
            ) : (
              <>
                <Fingerprint className="mr-2 h-5 w-5" />
                Use Fingerprint Instead
              </>
            )}
          </Button>
        )}
        
        <div className="text-center">
          <p className="text-sm text-gray-600">
            Don't have an account?{' '}
            <a
              href="/register"
              className="font-medium text-biometric-blue hover:text-biometric-blue/80"
            >
              Register
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
