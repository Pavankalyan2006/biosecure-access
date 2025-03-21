
import React from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Fingerprint, Heart, Dna, Bell, Shield, Lock, UserCircle, Globe } from 'lucide-react';

const Settings = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow bg-gray-50 pt-24 pb-16 px-6">
        <div className="container mx-auto max-w-5xl">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-biometric-dark mb-1">Settings</h1>
            <p className="text-biometric-dark/70">
              Manage your account, security preferences, and biometric data
            </p>
          </div>
          
          <Tabs defaultValue="account" className="w-full">
            <TabsList className="grid grid-cols-5 bg-white rounded-lg mb-6">
              <TabsTrigger value="account" className="data-[state=active]:bg-biometric-blue data-[state=active]:text-white">
                <UserCircle className="w-4 h-4 mr-2" />
                Account
              </TabsTrigger>
              <TabsTrigger value="security" className="data-[state=active]:bg-biometric-blue data-[state=active]:text-white">
                <Shield className="w-4 h-4 mr-2" />
                Security
              </TabsTrigger>
              <TabsTrigger value="biometrics" className="data-[state=active]:bg-biometric-blue data-[state=active]:text-white">
                <Fingerprint className="w-4 h-4 mr-2" />
                Biometrics
              </TabsTrigger>
              <TabsTrigger value="family" className="data-[state=active]:bg-biometric-blue data-[state=active]:text-white">
                <Dna className="w-4 h-4 mr-2" />
                Family
              </TabsTrigger>
              <TabsTrigger value="notifications" className="data-[state=active]:bg-biometric-blue data-[state=active]:text-white">
                <Bell className="w-4 h-4 mr-2" />
                Notifications
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="account">
              <Card className="border-none shadow-md">
                <CardHeader>
                  <CardTitle>Account Information</CardTitle>
                  <CardDescription>
                    Manage your personal account details
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="firstName">First Name</Label>
                      <Input id="firstName" defaultValue="John" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="lastName">Last Name</Label>
                      <Input id="lastName" defaultValue="Doe" />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="email">Email Address</Label>
                    <Input id="email" type="email" defaultValue="john.doe@example.com" />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone Number</Label>
                    <Input id="phone" type="tel" defaultValue="+1 (555) 123-4567" />
                  </div>
                  
                  <div className="pt-4 border-t">
                    <Button className="bg-biometric-blue hover:bg-biometric-blue/90">
                      Save Changes
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="security">
              <Card className="border-none shadow-md">
                <CardHeader>
                  <CardTitle>Security Settings</CardTitle>
                  <CardDescription>
                    Manage your security preferences and password
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="currentPassword">Current Password</Label>
                    <Input id="currentPassword" type="password" />
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="newPassword">New Password</Label>
                      <Input id="newPassword" type="password" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="confirmPassword">Confirm New Password</Label>
                      <Input id="confirmPassword" type="password" />
                    </div>
                  </div>
                  
                  <div className="pt-6 border-t space-y-4">
                    <h3 className="text-lg font-medium">Additional Security</h3>
                    
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <div className="flex items-center">
                          <Lock className="w-4 h-4 mr-2 text-biometric-dark/70" />
                          <Label htmlFor="twoFactor">Two-factor Authentication</Label>
                        </div>
                        <p className="text-sm text-muted-foreground">
                          Require an additional verification step when logging in
                        </p>
                      </div>
                      <Switch id="twoFactor" defaultChecked />
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <div className="flex items-center">
                          <Globe className="w-4 h-4 mr-2 text-biometric-dark/70" />
                          <Label htmlFor="locationVerification">Location Verification</Label>
                        </div>
                        <p className="text-sm text-muted-foreground">
                          Get notified about login attempts from new locations
                        </p>
                      </div>
                      <Switch id="locationVerification" defaultChecked />
                    </div>
                  </div>
                  
                  <div className="pt-4 border-t">
                    <Button className="bg-biometric-blue hover:bg-biometric-blue/90">
                      Update Security Settings
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="biometrics">
              <Card className="border-none shadow-md">
                <CardHeader>
                  <CardTitle>Biometric Settings</CardTitle>
                  <CardDescription>
                    Manage your biometric data and authentication preferences
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                    <div className="bg-white border border-gray-100 rounded-lg p-4 text-center">
                      <div className="w-12 h-12 bg-biometric-blue/10 rounded-full flex items-center justify-center mx-auto mb-3">
                        <Fingerprint className="w-6 h-6 text-biometric-blue" />
                      </div>
                      <h3 className="font-medium mb-1">Fingerprint</h3>
                      <p className="text-xs text-gray-500 mb-3">Last updated: 2 months ago</p>
                      <Button 
                        variant="outline" 
                        size="sm" 
                        className="w-full border-biometric-blue text-biometric-blue hover:bg-biometric-blue/10"
                      >
                        Update
                      </Button>
                    </div>
                    
                    <div className="bg-white border border-gray-100 rounded-lg p-4 text-center">
                      <div className="w-12 h-12 bg-biometric-blue/10 rounded-full flex items-center justify-center mx-auto mb-3">
                        <Heart className="w-6 h-6 text-biometric-blue" />
                      </div>
                      <h3 className="font-medium mb-1">Heartbeat</h3>
                      <p className="text-xs text-gray-500 mb-3">Last updated: 2 months ago</p>
                      <Button 
                        variant="outline" 
                        size="sm" 
                        className="w-full border-biometric-blue text-biometric-blue hover:bg-biometric-blue/10"
                      >
                        Update
                      </Button>
                    </div>
                    
                    <div className="bg-white border border-gray-100 rounded-lg p-4 text-center">
                      <div className="w-12 h-12 bg-biometric-blue/10 rounded-full flex items-center justify-center mx-auto mb-3">
                        <Dna className="w-6 h-6 text-biometric-blue" />
                      </div>
                      <h3 className="font-medium mb-1">DNA Sample</h3>
                      <p className="text-xs text-gray-500 mb-3">Last updated: 2 months ago</p>
                      <Button 
                        variant="outline" 
                        size="sm" 
                        className="w-full border-biometric-blue text-biometric-blue hover:bg-biometric-blue/10"
                      >
                        Update
                      </Button>
                    </div>
                  </div>
                  
                  <div className="pt-6 border-t">
                    <h3 className="text-lg font-medium mb-4">Authentication Preferences</h3>
                    
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <Label htmlFor="requiredBiometrics">Required Biometrics</Label>
                          <p className="text-sm text-muted-foreground">
                            Set the minimum number of biometric factors required for authentication
                          </p>
                        </div>
                        <select 
                          id="requiredBiometrics" 
                          className="rounded-md border border-input bg-transparent px-3 py-1 text-sm"
                          defaultValue="3"
                        >
                          <option value="1">1 (Minimum)</option>
                          <option value="2">2 (Standard)</option>
                          <option value="3">3 (Maximum)</option>
                        </select>
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <Label htmlFor="inheritanceMode">Inheritance Mode</Label>
                          <p className="text-sm text-muted-foreground">
                            Allow family members to access your account in case of emergency
                          </p>
                        </div>
                        <Switch id="inheritanceMode" defaultChecked />
                      </div>
                    </div>
                  </div>
                  
                  <div className="pt-4 border-t">
                    <Button className="bg-biometric-blue hover:bg-biometric-blue/90">
                      Save Preferences
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="family">
              <Card className="border-none shadow-md">
                <CardHeader>
                  <CardTitle>Family Access Management</CardTitle>
                  <CardDescription>
                    Manage family members who can access your account in case of emergency
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-4">
                    <div className="bg-white border border-gray-100 rounded-lg p-4">
                      <div className="flex flex-col sm:flex-row sm:items-center gap-4">
                        <div className="w-12 h-12 rounded-full bg-biometric-blue/10 flex items-center justify-center flex-shrink-0">
                          <span className="font-medium text-biometric-blue">SJ</span>
                        </div>
                        <div className="flex-1">
                          <h3 className="font-medium">Sarah Johnson</h3>
                          <p className="text-sm text-gray-500">Spouse</p>
                        </div>
                        <div className="flex items-center gap-2 sm:ml-auto">
                          <Button variant="outline" size="sm">Edit</Button>
                          <Button variant="outline" size="sm" className="text-biometric-danger border-biometric-danger hover:bg-biometric-danger/10">
                            Remove
                          </Button>
                        </div>
                      </div>
                    </div>
                    
                    <div className="bg-white border border-gray-100 rounded-lg p-4">
                      <div className="flex flex-col sm:flex-row sm:items-center gap-4">
                        <div className="w-12 h-12 rounded-full bg-biometric-blue/10 flex items-center justify-center flex-shrink-0">
                          <span className="font-medium text-biometric-blue">MJ</span>
                        </div>
                        <div className="flex-1">
                          <h3 className="font-medium">Michael Johnson</h3>
                          <p className="text-sm text-gray-500">Son</p>
                        </div>
                        <div className="flex items-center gap-2 sm:ml-auto">
                          <Button variant="outline" size="sm">Edit</Button>
                          <Button variant="outline" size="sm" className="text-biometric-danger border-biometric-danger hover:bg-biometric-danger/10">
                            Remove
                          </Button>
                        </div>
                      </div>
                    </div>
                    
                    <div className="bg-white border border-gray-100 rounded-lg p-4">
                      <div className="flex flex-col sm:flex-row sm:items-center gap-4">
                        <div className="w-12 h-12 rounded-full bg-biometric-blue/10 flex items-center justify-center flex-shrink-0">
                          <span className="font-medium text-biometric-blue">EJ</span>
                        </div>
                        <div className="flex-1">
                          <h3 className="font-medium">Emily Johnson</h3>
                          <p className="text-sm text-gray-500">Daughter</p>
                        </div>
                        <div className="flex items-center gap-2 sm:ml-auto">
                          <Button variant="outline" size="sm">Edit</Button>
                          <Button variant="outline" size="sm" className="text-biometric-danger border-biometric-danger hover:bg-biometric-danger/10">
                            Remove
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="pt-4">
                    <Button className="bg-biometric-blue hover:bg-biometric-blue/90">
                      Add Family Member
                    </Button>
                  </div>
                  
                  <div className="pt-6 border-t">
                    <h3 className="text-lg font-medium mb-4">Inheritance Settings</h3>
                    
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <Label htmlFor="inheritanceDelay">Access Delay Period</Label>
                          <p className="text-sm text-muted-foreground">
                            Time before family members can request emergency access
                          </p>
                        </div>
                        <select 
                          id="inheritanceDelay" 
                          className="rounded-md border border-input bg-transparent px-3 py-1 text-sm"
                          defaultValue="30"
                        >
                          <option value="7">7 Days</option>
                          <option value="14">14 Days</option>
                          <option value="30">30 Days</option>
                          <option value="90">90 Days</option>
                        </select>
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <Label htmlFor="verificationRequired">DNA Verification Required</Label>
                          <p className="text-sm text-muted-foreground">
                            Require DNA verification for emergency access
                          </p>
                        </div>
                        <Switch id="verificationRequired" defaultChecked />
                      </div>
                    </div>
                  </div>
                  
                  <div className="pt-4 border-t">
                    <Button className="bg-biometric-blue hover:bg-biometric-blue/90">
                      Save Inheritance Settings
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="notifications">
              <Card className="border-none shadow-md">
                <CardHeader>
                  <CardTitle>Notification Preferences</CardTitle>
                  <CardDescription>
                    Manage how and when you receive notifications
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-4">
                    <h3 className="text-lg font-medium">Security Alerts</h3>
                    
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label htmlFor="loginAttempts">Unauthorized Login Attempts</Label>
                        <p className="text-sm text-muted-foreground">
                          Get notified about unauthorized attempts to access your account
                        </p>
                      </div>
                      <Switch id="loginAttempts" defaultChecked />
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label htmlFor="biometricChanges">Biometric Data Changes</Label>
                        <p className="text-sm text-muted-foreground">
                          Get notified when your biometric data is updated
                        </p>
                      </div>
                      <Switch id="biometricChanges" defaultChecked />
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label htmlFor="familyAccess">Family Access Requests</Label>
                        <p className="text-sm text-muted-foreground">
                          Get notified when a family member requests emergency access
                        </p>
                      </div>
                      <Switch id="familyAccess" defaultChecked />
                    </div>
                  </div>
                  
                  <div className="pt-6 border-t space-y-4">
                    <h3 className="text-lg font-medium">System Notifications</h3>
                    
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label htmlFor="maintenanceUpdates">Maintenance Updates</Label>
                        <p className="text-sm text-muted-foreground">
                          Get notified about scheduled maintenance and system updates
                        </p>
                      </div>
                      <Switch id="maintenanceUpdates" />
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label htmlFor="newFeatures">New Features</Label>
                        <p className="text-sm text-muted-foreground">
                          Get notified about new features and improvements
                        </p>
                      </div>
                      <Switch id="newFeatures" defaultChecked />
                    </div>
                  </div>
                  
                  <div className="pt-6 border-t space-y-4">
                    <h3 className="text-lg font-medium">Notification Delivery</h3>
                    
                    <div className="space-y-2">
                      <Label>Notification Methods</Label>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                        <div className="flex items-center space-x-2">
                          <input type="checkbox" id="emailNotify" className="rounded" defaultChecked />
                          <Label htmlFor="emailNotify">Email</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <input type="checkbox" id="smsNotify" className="rounded" defaultChecked />
                          <Label htmlFor="smsNotify">SMS</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <input type="checkbox" id="pushNotify" className="rounded" defaultChecked />
                          <Label htmlFor="pushNotify">Push Notifications</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <input type="checkbox" id="inAppNotify" className="rounded" defaultChecked />
                          <Label htmlFor="inAppNotify">In-App Notifications</Label>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="pt-4 border-t">
                    <Button className="bg-biometric-blue hover:bg-biometric-blue/90">
                      Save Notification Preferences
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Settings;
