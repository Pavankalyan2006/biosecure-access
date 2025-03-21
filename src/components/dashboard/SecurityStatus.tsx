
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Shield, Check, AlertTriangle, Clock, Globe, Lock } from 'lucide-react';
import { Progress } from '@/components/ui/progress';

const SecurityStatus = () => {
  return (
    <Card className="border-none shadow-md bg-white">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Shield className="w-5 h-5 text-biometric-teal" />
          Security Status
        </CardTitle>
        <CardDescription>System security and authentication details</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          <div>
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <p className="font-medium">Overall Security Score</p>
                <div className="bg-biometric-success/10 text-biometric-success text-xs px-2 py-0.5 rounded-full">
                  Excellent
                </div>
              </div>
              <p className="font-semibold">92/100</p>
            </div>
            <Progress value={92} className="h-2 bg-gray-100" />
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <SecurityItem 
              icon={<Check className="w-5 h-5" />}
              status="success"
              title="Authentication Status"
              value="Multi-factor active"
            />
            
            <SecurityItem 
              icon={<Lock className="w-5 h-5" />}
              status="success"
              title="Encryption"
              value="AES-256"
            />
            
            <SecurityItem 
              icon={<Clock className="w-5 h-5" />}
              status="warning"
              title="Last DNA Update"
              value="30 days ago"
            />
            
            <SecurityItem 
              icon={<Globe className="w-5 h-5" />}
              status="success"
              title="Login Locations"
              value="1 active location"
            />
          </div>
          
          <div className="border-t pt-4">
            <h3 className="font-medium mb-3">Recent Activity</h3>
            <div className="space-y-3">
              <ActivityItem
                title="Biometric Authentication"
                time="2 hours ago"
                status="success"
                description="Fingerprint, heartbeat, and DNA all verified"
              />
              
              <ActivityItem
                title="Login Attempt"
                time="Yesterday, 4:32 PM"
                status="success"
                description="Successful login from San Francisco, CA"
              />
              
              <ActivityItem
                title="Security Check"
                time="3 days ago"
                status="success"
                description="Scheduled security audit completed"
              />
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

const SecurityItem = ({ 
  icon, 
  status, 
  title, 
  value 
}: { 
  icon: React.ReactNode;
  status: 'success' | 'warning' | 'error';
  title: string;
  value: string;
}) => {
  return (
    <div className="flex items-center gap-3">
      <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
        status === 'success' ? 'bg-biometric-success/10 text-biometric-success' :
        status === 'warning' ? 'bg-biometric-warning/10 text-biometric-warning' :
        'bg-biometric-danger/10 text-biometric-danger'
      }`}>
        {icon}
      </div>
      <div>
        <p className="text-sm font-medium">{title}</p>
        <p className="text-sm text-muted-foreground">{value}</p>
      </div>
    </div>
  );
};

const ActivityItem = ({ 
  title, 
  time, 
  status, 
  description 
}: { 
  title: string;
  time: string;
  status: 'success' | 'warning' | 'error';
  description: string;
}) => {
  return (
    <div className="flex gap-3">
      <div className={`mt-1 w-2 h-2 rounded-full flex-shrink-0 ${
        status === 'success' ? 'bg-biometric-success' :
        status === 'warning' ? 'bg-biometric-warning' :
        'bg-biometric-danger'
      }`}></div>
      <div>
        <div className="flex items-center gap-2">
          <p className="text-sm font-medium">{title}</p>
          <p className="text-xs text-muted-foreground">{time}</p>
        </div>
        <p className="text-xs text-muted-foreground">{description}</p>
      </div>
    </div>
  );
};

export default SecurityStatus;
