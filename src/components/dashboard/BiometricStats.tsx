
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Fingerprint, Heart, Dna, Activity, BarChart3, Clock } from 'lucide-react';
import { cn } from '@/lib/utils';

const BiometricStats = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
      <Card className="border-none shadow-md bg-white">
        <CardHeader className="pb-2">
          <CardTitle className="text-lg flex items-center gap-2">
            <Fingerprint className="w-5 h-5 text-biometric-blue" />
            Fingerprint Status
          </CardTitle>
          <CardDescription>Last verified 2 hours ago</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-2xl font-bold text-biometric-dark">98%</p>
              <p className="text-sm text-muted-foreground">Match accuracy</p>
            </div>
            <div className="w-16 h-16 rounded-full bg-biometric-blue/10 flex items-center justify-center">
              <Fingerprint className="w-8 h-8 text-biometric-blue" />
            </div>
          </div>
          <div className="mt-4 pt-4 border-t">
            <div className="flex justify-between text-sm">
              <div>
                <p className="font-medium">Pattern Type</p>
                <p className="text-muted-foreground">Whorl</p>
              </div>
              <div>
                <p className="font-medium">Ridge Count</p>
                <p className="text-muted-foreground">42</p>
              </div>
              <div>
                <p className="font-medium">Minutiae</p>
                <p className="text-muted-foreground">78</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
      
      <Card className="border-none shadow-md bg-white">
        <CardHeader className="pb-2">
          <CardTitle className="text-lg flex items-center gap-2">
            <Heart className="w-5 h-5 text-biometric-blue" />
            Heartbeat Status
          </CardTitle>
          <CardDescription>Last verified 2 hours ago</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-2xl font-bold text-biometric-dark">72</p>
              <p className="text-sm text-muted-foreground">BPM (Current)</p>
            </div>
            <div className="w-16 h-16 rounded-full bg-biometric-blue/10 flex items-center justify-center">
              <Activity className="w-8 h-8 text-biometric-blue" />
            </div>
          </div>
          <div className="mt-4">
            <div className="h-12 bg-gray-100 rounded-md overflow-hidden relative">
              {Array.from({ length: 24 }).map((_, i) => (
                <div 
                  key={i}
                  className={cn(
                    "absolute w-1 bg-biometric-blue",
                    i % 3 === 0 ? "h-6" : i % 2 === 0 ? "h-8" : "h-4"
                  )}
                  style={{ 
                    left: `${(i * 100) / 24}%`, 
                    bottom: '0',
                    opacity: i > 18 ? 0.4 : 1 
                  }}
                ></div>
              ))}
            </div>
          </div>
          <div className="mt-4 pt-4 border-t">
            <div className="flex justify-between text-sm">
              <div>
                <p className="font-medium">Resting Rate</p>
                <p className="text-muted-foreground">68 BPM</p>
              </div>
              <div>
                <p className="font-medium">Pattern Match</p>
                <p className="text-muted-foreground">99.1%</p>
              </div>
              <div>
                <p className="font-medium">HRV</p>
                <p className="text-muted-foreground">Normal</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
      
      <Card className="border-none shadow-md bg-white">
        <CardHeader className="pb-2">
          <CardTitle className="text-lg flex items-center gap-2">
            <Dna className="w-5 h-5 text-biometric-blue" />
            DNA Status
          </CardTitle>
          <CardDescription>Last verified 2 hours ago</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-2xl font-bold text-biometric-dark">100%</p>
              <p className="text-sm text-muted-foreground">Match accuracy</p>
            </div>
            <div className="w-16 h-16 rounded-full bg-biometric-blue/10 flex items-center justify-center">
              <BarChart3 className="w-8 h-8 text-biometric-blue" />
            </div>
          </div>
          <div className="mt-4 pt-4 border-t">
            <div className="flex justify-between text-sm">
              <div>
                <p className="font-medium">Sample Age</p>
                <p className="text-muted-foreground">30 days</p>
              </div>
              <div>
                <p className="font-medium">Sequence</p>
                <p className="text-muted-foreground">Verified</p>
              </div>
              <div>
                <p className="font-medium">Renewal</p>
                <p className="text-muted-foreground">60 days</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default BiometricStats;
