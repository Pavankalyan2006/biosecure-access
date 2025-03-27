
import React from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { X } from 'lucide-react';

interface FamilyStepProps {
  familyMembers: string[];
  handleFamilyMemberChange: (index: number, value: string) => void;
  addFamilyMember: () => void;
  removeFamilyMember: (index: number) => void;
}

const FamilyStep: React.FC<FamilyStepProps> = ({
  familyMembers,
  handleFamilyMemberChange,
  addFamilyMember,
  removeFamilyMember,
}) => {
  return (
    <div className="space-y-6 animate-fade-in">
      <h2 className="text-2xl font-bold text-biometric-dark mb-6">Family Registration</h2>
      <p className="text-gray-500 mb-4">
        Register family members who will have inheritance-based access in case of emergency. 
        They will need to provide DNA samples for verification.
      </p>
      
      {familyMembers.map((member, index) => (
        <div key={index} className="flex gap-2 items-start">
          <div className="flex-1">
            <Label htmlFor={`family-${index}`} className="sr-only">Family Member {index + 1}</Label>
            <Input
              id={`family-${index}`}
              value={member}
              onChange={(e) => handleFamilyMemberChange(index, e.target.value)}
              placeholder={`Family member ${index + 1} name`}
            />
          </div>
          {familyMembers.length > 1 && (
            <Button
              type="button"
              variant="ghost"
              size="icon"
              onClick={() => removeFamilyMember(index)}
              className="text-biometric-danger"
            >
              <X className="h-4 w-4" />
            </Button>
          )}
        </div>
      ))}
      
      <Button
        type="button"
        variant="outline"
        size="sm"
        onClick={addFamilyMember}
        className="mt-2"
      >
        Add Another Family Member
      </Button>
    </div>
  );
};

export default FamilyStep;
