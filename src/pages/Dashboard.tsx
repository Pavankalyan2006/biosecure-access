
import React from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import BiometricStats from '@/components/dashboard/BiometricStats';
import SecurityStatus from '@/components/dashboard/SecurityStatus';
import FamilyAccess from '@/components/dashboard/FamilyAccess';
import { Shield, Bell, Settings, User } from 'lucide-react';
import { Button } from '@/components/ui/button';

const Dashboard = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow bg-gray-50 pt-24 pb-16 px-6">
        <div className="container mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
            <div>
              <h1 className="text-3xl font-bold text-biometric-dark mb-1">Security Dashboard</h1>
              <p className="text-biometric-dark/70">
                Monitor your biometric status and manage family access
              </p>
            </div>
            <div className="flex items-center space-x-2 mt-4 md:mt-0">
              <Button variant="outline" size="icon" className="h-10 w-10 rounded-full">
                <Bell className="h-5 w-5 text-biometric-dark/70" />
              </Button>
              <Button variant="outline" size="icon" className="h-10 w-10 rounded-full">
                <Settings className="h-5 w-5 text-biometric-dark/70" />
              </Button>
              <div className="w-10 h-10 rounded-full bg-biometric-blue flex items-center justify-center text-white">
                <User className="h-5 w-5" />
              </div>
            </div>
          </div>
          
          <div className="mb-6">
            <div className="bg-white rounded-xl p-6 border border-gray-100 shadow-sm">
              <div className="flex items-start md:items-center gap-4 flex-col md:flex-row">
                <div className="w-12 h-12 rounded-full bg-biometric-blue/10 flex items-center justify-center">
                  <Shield className="w-6 h-6 text-biometric-blue" />
                </div>
                <div>
                  <h2 className="text-lg font-semibold text-biometric-dark">Security Status: Protected</h2>
                  <p className="text-sm text-biometric-dark/70">
                    All biometric factors are verified and up to date. Your system is secure.
                  </p>
                </div>
                <div className="md:ml-auto mt-4 md:mt-0">
                  <Button className="bg-biometric-blue hover:bg-biometric-blue/90">
                    Run Security Check
                  </Button>
                </div>
              </div>
            </div>
          </div>
          
          <div className="space-y-8">
            <BiometricStats />
            
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2">
                <FamilyAccess />
              </div>
              <div>
                <SecurityStatus />
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Dashboard;
