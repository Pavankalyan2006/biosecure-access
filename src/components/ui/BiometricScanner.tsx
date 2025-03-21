
import React, { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';
import { Fingerprint, Heart, Dna } from 'lucide-react';

type ScannerType = 'fingerprint' | 'heartbeat' | 'dna';
type ScannerStatus = 'idle' | 'scanning' | 'success' | 'error';

interface BiometricScannerProps {
  type: ScannerType;
  status?: ScannerStatus;
  className?: string;
  onScanComplete?: (success: boolean) => void;
  autoScan?: boolean;
  scanDuration?: number;
}

const BiometricScanner: React.FC<BiometricScannerProps> = ({
  type,
  status = 'idle',
  className,
  onScanComplete,
  autoScan = false,
  scanDuration = 3000,
}) => {
  const [internalStatus, setInternalStatus] = useState<ScannerStatus>(status);
  
  useEffect(() => {
    setInternalStatus(status);
  }, [status]);

  useEffect(() => {
    if (autoScan && internalStatus === 'idle') {
      setInternalStatus('scanning');
      
      const timer = setTimeout(() => {
        // 90% chance of success
        const success = Math.random() > 0.1;
        setInternalStatus(success ? 'success' : 'error');
        if (onScanComplete) {
          onScanComplete(success);
        }
      }, scanDuration);
      
      return () => clearTimeout(timer);
    }
  }, [autoScan, internalStatus, onScanComplete, scanDuration]);

  const renderIcon = () => {
    switch (type) {
      case 'fingerprint':
        return <Fingerprint className={cn(
          'w-12 h-12 transition-all duration-300',
          internalStatus === 'scanning' && 'animate-pulse text-biometric-blue',
          internalStatus === 'success' && 'text-biometric-success',
          internalStatus === 'error' && 'text-biometric-danger',
          internalStatus === 'idle' && 'text-biometric-dark/70'
        )} />;
      case 'heartbeat':
        return <Heart className={cn(
          'w-12 h-12 transition-all duration-300',
          internalStatus === 'scanning' && 'animate-heartbeat text-biometric-blue',
          internalStatus === 'success' && 'text-biometric-success',
          internalStatus === 'error' && 'text-biometric-danger',
          internalStatus === 'idle' && 'text-biometric-dark/70'
        )} />;
      case 'dna':
        return <Dna className={cn(
          'w-12 h-12 transition-all duration-300',
          internalStatus === 'scanning' && 'animate-dna-spin text-biometric-blue',
          internalStatus === 'success' && 'text-biometric-success',
          internalStatus === 'error' && 'text-biometric-danger',
          internalStatus === 'idle' && 'text-biometric-dark/70'
        )} />;
    }
  };

  const getStatusText = () => {
    switch (internalStatus) {
      case 'idle':
        return `Ready to scan ${type}`;
      case 'scanning':
        return `Scanning ${type}...`;
      case 'success':
        return `${type.charAt(0).toUpperCase() + type.slice(1)} verified`;
      case 'error':
        return `${type.charAt(0).toUpperCase() + type.slice(1)} verification failed`;
    }
  };

  return (
    <div className={cn(
      'biometric-scanner relative flex flex-col items-center justify-center p-8 rounded-xl',
      internalStatus === 'scanning' && 'bg-biometric-blue/5',
      internalStatus === 'success' && 'bg-biometric-success/5',
      internalStatus === 'error' && 'bg-biometric-danger/5',
      className
    )}>
      <div className="relative">
        {internalStatus === 'scanning' && (
          <>
            <div className="pulse-ring"></div>
            <div className="scanner-line"></div>
          </>
        )}
        {renderIcon()}
      </div>
      
      <p className={cn(
        'mt-4 text-sm font-medium transition-colors',
        internalStatus === 'scanning' && 'text-biometric-blue',
        internalStatus === 'success' && 'text-biometric-success',
        internalStatus === 'error' && 'text-biometric-danger',
        internalStatus === 'idle' && 'text-biometric-dark/70'
      )}>
        {getStatusText()}
      </p>
    </div>
  );
};

export default BiometricScanner;
