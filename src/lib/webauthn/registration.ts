
import { bufferToBase64, getUserStorage, saveUserStorage, isWebAuthnRestricted } from './utils';

/**
 * Register a new fingerprint for the given user
 */
export async function registerFingerprint(username: string): Promise<boolean> {
  if (!username) {
    throw new Error("Username is required");
  }

  const users = getUserStorage();
  if (users[username]) {
    throw new Error("Username already registered");
  }

  // Check if WebAuthn is supported and not restricted
  const isRestricted = isWebAuthnRestricted();
  if (!window.PublicKeyCredential || isRestricted) {
    console.log("Using simulation mode for fingerprint registration");
    return simulateRegistration(username);
  }

  const challenge = new Uint8Array(32);
  window.crypto.getRandomValues(challenge);
  
  const createCredentialOptions: CredentialCreationOptions = {
    publicKey: {
      challenge,
      rp: { 
        name: "BioSecure Access",
        id: window.location.hostname
      },
      user: {
        id: new TextEncoder().encode(username),
        name: username,
        displayName: username
      },
      pubKeyCredParams: [{ type: "public-key", alg: -7 }],
      authenticatorSelection: {
        authenticatorAttachment: "platform",
        userVerification: "required"
      },
      timeout: 60000,
      attestation: "direct"
    }
  };

  try {
    const credential = await navigator.credentials.create(createCredentialOptions) as PublicKeyCredential;
    
    // Store the credential
    users[username] = {
      rawId: bufferToBase64(credential.rawId),
      id: credential.id,
      // @ts-ignore - TypeScript doesn't have these types properly defined
      publicKey: bufferToBase64(credential.response.attestationObject),
      registrationMethod: "webauthn"
    };
    
    saveUserStorage(users);
    return true;
  } catch (err) {
    console.error("Fingerprint registration error:", err);
    
    // Provide more specific error information
    if (err instanceof Error) {
      if (err.name === "NotAllowedError") {
        console.log("WebAuthn failed: User denied the request or the operation was canceled");
      } else if (err.name === "SecurityError") {
        console.log("WebAuthn failed: The operation is not allowed in this context due to security restrictions");
      } else if (err.name === "NotSupportedError") {
        console.log("WebAuthn failed: The request is not supported by this device or platform");
      }
    }
    
    // Always fall back to simulation mode in case of any error
    console.log("WebAuthn failed, falling back to simulation mode");
    return simulateRegistration(username);
  }
}

/**
 * Simulate fingerprint registration when WebAuthn is not available
 */
function simulateRegistration(username: string): boolean {
  const users = getUserStorage();
  
  // Generate a fake credential that we can verify later
  const fakeRawId = window.crypto.getRandomValues(new Uint8Array(32));
  const fakeCredentialId = bufferToBase64(fakeRawId);
  
  users[username] = {
    rawId: fakeCredentialId,
    id: fakeCredentialId,
    publicKey: bufferToBase64(fakeRawId),
    isSimulated: true,
    registrationMethod: "simulated"
  };
  
  saveUserStorage(users);
  return true;
}
