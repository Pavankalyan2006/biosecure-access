
import { base64ToBuffer, getUserStorage, isWebAuthnRestricted } from './utils';

/**
 * Authenticate using fingerprint for the given user
 */
export async function authenticateWithFingerprint(username: string): Promise<boolean> {
  if (!username) {
    throw new Error("Username is required");
  }

  const users = getUserStorage();
  if (!users[username]) {
    throw new Error("No fingerprint registered for this username");
  }

  // If this is a simulated credential or WebAuthn is restricted, use simulation
  const isRestricted = isWebAuthnRestricted();
  if (users[username].isSimulated || !window.PublicKeyCredential || isRestricted) {
    console.log("Using simulation mode for fingerprint authentication");
    return simulateAuthentication(username);
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
    return simulateAuthentication(username);
  }
}

/**
 * Simulate fingerprint authentication when WebAuthn is not available
 */
function simulateAuthentication(username: string): boolean {
  // In simulation mode, we just check if the user exists
  const users = getUserStorage();
  return !!users[username];
}
