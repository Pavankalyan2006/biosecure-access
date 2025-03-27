
import { toast } from 'sonner';

/**
 * Convert an ArrayBuffer to a Base64 string
 */
export function bufferToBase64(buffer: ArrayBuffer): string {
  return btoa(String.fromCharCode(...new Uint8Array(buffer)));
}

/**
 * Convert a Base64 string to an ArrayBuffer
 */
export function base64ToBuffer(base64: string): Uint8Array {
  return Uint8Array.from(atob(base64), c => c.charCodeAt(0));
}

// Local storage functions for managing user credentials
export function getUserStorage(): Record<string, any> {
  return JSON.parse(localStorage.getItem("registeredUsers") || "{}");
}

export function saveUserStorage(users: Record<string, any>): void {
  localStorage.setItem("registeredUsers", JSON.stringify(users));
}

// Check if in a restricted environment (iframe, etc.)
export function isWebAuthnRestricted(): boolean {
  if (!window.PublicKeyCredential) return true;
  
  try {
    // Check for permissions policy restrictions
    const permissionStatus = (document as any).featurePolicy?.allowsFeature('publickey-credentials-create');
    if (permissionStatus === false) {
      console.log("WebAuthn restricted by permissions policy");
      return true;
    }
    
    // Check if we're in an iframe
    if (window !== window.top) {
      console.log("WebAuthn restricted due to iframe context");
      return true;
    }
    
    return false;
  } catch (e) {
    // If we can't access window.top or featurePolicy, we're definitely in a restricted context
    console.log("WebAuthn restricted due to security exception:", e);
    return true;
  }
}

// Get detailed reason why WebAuthn might be restricted
export function getWebAuthnRestrictionReason(): string | null {
  if (!window.PublicKeyCredential) {
    return "WebAuthn is not supported in this browser";
  }
  
  try {
    // Check for permissions policy restrictions
    const permissionStatus = (document as any).featurePolicy?.allowsFeature('publickey-credentials-create');
    if (permissionStatus === false) {
      return "WebAuthn is restricted by the site's permissions policy. This might be due to iframe embedding or cross-origin constraints.";
    }
    
    // Check if we're in an iframe
    if (window !== window.top) {
      return "WebAuthn is restricted because the page is running in an iframe. This is a security measure to prevent unauthorized credential access.";
    }
    
    return null; // No restriction detected
  } catch (e) {
    return "WebAuthn is restricted due to security constraints. Please check your browser settings and page configuration.";
  }
}

export function logWebAuthnRestriction(): void {
  const reason = getWebAuthnRestrictionReason();
  if (reason) {
    toast.warning('Biometric Authentication Restricted', {
      description: reason,
      duration: 6000
    });
    console.warn('WebAuthn Restriction:', reason);
  }
}

// Check if fingerprint authentication is available
export async function isFingerprintAvailable(): Promise<boolean> {
  if (!window.PublicKeyCredential) {
    return false;
  }
  
  // If we're in a restricted environment, we can still simulate fingerprint auth
  if (isWebAuthnRestricted()) {
    console.log("WebAuthn is restricted, using simulation mode");
    return true;
  }
  
  try {
    // @ts-ignore - isUserVerifyingPlatformAuthenticatorAvailable is not in TS definitions yet
    return await PublicKeyCredential.isUserVerifyingPlatformAuthenticatorAvailable();
  } catch (err) {
    console.error("Error checking fingerprint availability:", err);
    return false;
  }
}
