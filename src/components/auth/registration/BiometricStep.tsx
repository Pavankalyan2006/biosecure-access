
import React from 'react';
import { Button } from '@/components/ui/button';
import { Loader2, Check, X, AlertTriangle, Fingerprint, Info } from 'lucide-react';

interface BiometricStepProps {
  fingerprintStatus: 'idle' | 'scanning' | 'success' | 'error';
  heartbeatStatus: 'idle' | 'scanning' | 'success' | 'error';
  dnaStatus: 'idle' | 'scanning' | 'success' | 'error';
  registerUserFingerprint: () => Promise<void>;
  simulateBiometricScan: (type: 'fingerprint' | 'heartbeat' | 'dna') => void;
  webAuthnStatus: {
    isRestricted: boolean;
    restrictionReason: string | null;
    isAvailable: boolean;
  };
  isFingerprintSupported: boolean;
}

const BiometricStep: React.FC<BiometricStepProps> = ({
  fingerprintStatus,
  heartbeatStatus,
  dnaStatus,
  registerUserFingerprint,
  simulateBiometricScan,
  webAuthnStatus,
  isFingerprintSupported,
}) => {
  return (
    <div className="space-y-6 animate-fade-in">
      <h2 className="text-2xl font-bold text-biometric-dark mb-6">Biometric Registration</h2>
      
      {webAuthnStatus.isRestricted && (
        <div className="mb-4 p-4 bg-blue-50 border border-blue-200 rounded-md flex items-start gap-3">
          <Info className="text-blue-500 mt-0.5 flex-shrink-0" />
          <div>
            <p className="text-sm font-medium text-blue-800">
              Using simulation mode for fingerprint registration
            </p>
            <p className="text-sm text-blue-700">
              {webAuthnStatus.restrictionReason || "WebAuthn is not available in your current environment."}
              <br />
              Your registration will still work, but we're using a simulated fingerprint instead.
            </p>
          </div>
        </div>
      )}
      
      {!webAuthnStatus.isRestricted && !isFingerprintSupported && (
        <div className="mb-4 p-3 bg-amber-50 border border-amber-200 rounded-md flex items-start gap-3">
          <AlertTriangle className="text-amber-500 mt-0.5 flex-shrink-0" />
          <div>
            <p className="text-sm font-medium text-amber-800">
              Fingerprint authentication not available
            </p>
            <p className="text-sm text-amber-700">
              Your device doesn't support fingerprint authentication or it's not enabled. 
              We'll use simulation mode instead.
            </p>
          </div>
        </div>
      )}
      
      <div className="bg-gray-50 p-6 rounded-lg">
        <h3 className="text-lg font-medium mb-4">Fingerprint Registration</h3>
        <div className="flex items-center gap-4">
          <div className="w-24 h-24 bg-white rounded-lg flex items-center justify-center border border-gray-200 relative">
            {fingerprintStatus === 'idle' && (
              <Fingerprint className="w-12 h-12 text-gray-400" />
            )}
            {fingerprintStatus === 'scanning' && (
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="animate-ping absolute w-16 h-16 rounded-full bg-biometric-blue/30"></div>
                <Fingerprint className="w-12 h-12 text-biometric-blue animate-pulse" />
              </div>
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
              {webAuthnStatus.isRestricted 
                ? "Simulation mode: Click the button to register a simulated fingerprint." 
                : isFingerprintSupported 
                  ? "Place your finger on the scanner to register your fingerprint." 
                  : "Simulation mode: Click the button to simulate fingerprint registration."}
            </p>
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={registerUserFingerprint}
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
  );
};

export default BiometricStep;
