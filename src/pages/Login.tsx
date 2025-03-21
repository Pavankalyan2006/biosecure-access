
import React from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import AuthenticationFlow from '@/components/auth/AuthenticationFlow';

const Login = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow flex items-center justify-center py-20 px-6 bg-gray-50">
        <AuthenticationFlow />
      </main>
      <Footer />
    </div>
  );
};

export default Login;
