
// WebAuthn utility functions

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

/**
 * Register a new fingerprint for the given user
 */
export async function registerFingerprint(username: string): Promise<boolean> {
  if (!username) {
    throw new Error("Username is required");
  }

  // Check if WebAuthn is supported
  if (!window.PublicKeyCredential) {
    throw new Error("WebAuthn is not supported in this browser");
  }

  const users = getUserStorage();
  if (users[username]) {
    throw new Error("Username already registered");
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
      publicKey: bufferToBase64(credential.response.attestationObject)
    };
    
    saveUserStorage(users);
    return true;
  } catch (err) {
    console.error("Fingerprint registration error:", err);
    throw err;
  }
}

/**
 * Authenticate using fingerprint for the given user
 */
export async function authenticateWithFingerprint(username: string): Promise<boolean> {
  if (!username) {
    throw new Error("Username is required");
  }

  // Check if WebAuthn is supported
  if (!window.PublicKeyCredential) {
    throw new Error("WebAuthn is not supported in this browser");
  }

  const users = getUserStorage();
  if (!users[username]) {
    throw new Error("No fingerprint registered for this username");
  }

  const { rawId } = users[username];
  const challenge = new Uint8Array(32);
  window.crypto.getRandomValues(challenge);

  const getCredentialOptions: CredentialRequestOptions = {
    publicKey: {
      challenge,
      allowCredentials: [{
        id: base64ToBuffer(rawId),
        type: "public-key",
        transports: ["internal"]
      }],
      userVerification: "required",
      timeout: 60000
    }
  };

  try {
    const credential = await navigator.credentials.get(getCredentialOptions);
    return !!credential;
  } catch (err) {
    console.error("Fingerprint authentication error:", err);
    throw err;
  }
}

// Check if fingerprint authentication is available
export async function isFingerprintAvailable(): Promise<boolean> {
  if (!window.PublicKeyCredential) {
    return false;
  }
  
  try {
    // @ts-ignore - isUserVerifyingPlatformAuthenticatorAvailable is not in TS definitions yet
    return await PublicKeyCredential.isUserVerifyingPlatformAuthenticatorAvailable();
  } catch (err) {
    console.error("Error checking fingerprint availability:", err);
    return false;
  }
}
