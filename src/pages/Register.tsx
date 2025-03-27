
import React, { useEffect } from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import RegisterForm from '@/components/auth/RegisterForm';
import { isWebAuthnRestricted, getWebAuthnRestrictionReason } from '@/lib/webauthn';
import { toast } from 'sonner';

const Register = () => {
  useEffect(() => {
    // Check for WebAuthn restrictions when the page loads
    const restricted = isWebAuthnRestricted();
    if (restricted) {
      const reason = getWebAuthnRestrictionReason();
      console.log("WebAuthn restriction detected:", reason);
    }
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow flex items-center justify-center py-20 px-6 bg-gray-50">
        <RegisterForm />
      </main>
      <Footer />
    </div>
  );
};

export default Register;
