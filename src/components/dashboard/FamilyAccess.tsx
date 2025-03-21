
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Users, UserCheck, PlusCircle, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';

const familyMembers = [
  {
    id: 1,
    name: 'Sarah Johnson',
    relation: 'Spouse',
    dnaMatch: 'Not Applicable',
    status: 'Verified',
    lastVerified: '2 days ago',
    matching: 100
  },
  {
    id: 2,
    name: 'Michael Johnson',
    relation: 'Son',
    dnaMatch: '98.7% Match',
    status: 'Verified',
    lastVerified: '5 days ago',
    matching: 98.7
  },
  {
    id: 3,
    name: 'Emily Johnson',
    relation: 'Daughter',
    dnaMatch: '99.2% Match',
    status: 'Verified',
    lastVerified: '5 days ago',
    matching: 99.2
  }
];

const FamilyAccess = () => {
  return (
    <Card className="border-none shadow-md bg-white">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="flex items-center gap-2">
              <Users className="w-5 h-5 text-biometric-blue" />
              Family Access
            </CardTitle>
            <CardDescription>Inheritance-based access control</CardDescription>
          </div>
          <Button size="sm" className="bg-biometric-blue hover:bg-biometric-blue/90">
            <PlusCircle className="w-4 h-4 mr-2" />
            Add Member
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {familyMembers.map((member) => (
            <div key={member.id} className="flex items-center gap-4">
              <Avatar className="w-12 h-12 border-2 border-biometric-blue/20">
                <AvatarFallback className="bg-biometric-blue/10 text-biometric-blue">
                  {member.name.split(' ').map(n => n[0]).join('')}
                </AvatarFallback>
              </Avatar>
              
              <div className="flex-1">
                <div className="flex items-center">
                  <h3 className="font-medium">{member.name}</h3>
                  <Badge variant="outline" className="ml-2 text-xs border-biometric-blue/30 text-biometric-blue">
                    {member.relation}
                  </Badge>
                </div>
                
                <div className="flex items-center justify-between mt-1">
                  <div className="flex gap-8">
                    <div>
                      <p className="text-xs text-gray-500">DNA Match</p>
                      <p className="text-sm">{member.dnaMatch}</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500">Status</p>
                      <div className="flex items-center gap-1">
                        <span className="w-1.5 h-1.5 rounded-full bg-biometric-success"></span>
                        <p className="text-sm">{member.status}</p>
                      </div>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500">Last Verified</p>
                      <p className="text-sm">{member.lastVerified}</p>
                    </div>
                  </div>
                  
                  <Button variant="ghost" size="icon" className="h-8 w-8 text-gray-400 hover:text-biometric-danger">
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
                
                {member.relation !== 'Spouse' && (
                  <div className="mt-2">
                    <div className="flex items-center justify-between text-xs mb-1">
                      <span>Genetic Matching</span>
                      <span className="font-medium">{member.matching}%</span>
                    </div>
                    <Progress value={member.matching} className="h-1.5 bg-gray-100" />
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default FamilyAccess;
