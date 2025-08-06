import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Microscope, Heart, Brain, Target } from 'lucide-react';

export const AssessmentHeader: React.FC = () => {
  return (
    <div className="text-center space-y-6 mb-8">
      <div className="flex justify-center mb-4">
        <div className="p-4 bg-gradient-primary rounded-full">
          <Microscope className="h-12 w-12 text-white" />
        </div>
      </div>
      
      <div>
        <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-assessment bg-clip-text text-transparent">
          Should You Become a Medical Laboratory Technician?
        </h1>
        <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
          Discover your readiness, personality fit, skill gaps, and career alignment for becoming a Medical Laboratory Technician through our comprehensive assessment.
        </p>
      </div>

      <Card className="max-w-4xl mx-auto">
        <CardContent className="p-6">
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
                <Target className="h-5 w-5 text-primary" />
                Purpose of Assessment
              </h3>
              <p className="text-muted-foreground">
                Evaluate your psychological fit, technical aptitude, and career alignment for MLT roles through scientifically-backed assessments.
              </p>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
                <Heart className="h-5 w-5 text-secondary" />
                What MLTs Do
              </h3>
              <p className="text-muted-foreground">
                Perform diagnostic testing, detect diseases, and support clinicians with accurate lab results for patient treatment.
              </p>
            </div>
          </div>
          
          <div className="mt-6 pt-6 border-t">
            <h4 className="font-semibold mb-3">Typical MLT Career Paths:</h4>
            <div className="flex flex-wrap gap-2">
              {[
                'Medical Laboratory Technician',
                'Clinical Laboratory Technologist', 
                'Pathology Lab Assistant',
                'Hematology Technician',
                'Microbiology Technician'
              ].map((career) => (
                <Badge key={career} variant="secondary" className="text-sm">
                  {career}
                </Badge>
              ))}
            </div>
          </div>
          
          <div className="mt-6 pt-6 border-t">
            <h4 className="font-semibold mb-3 flex items-center gap-2">
              <Brain className="h-5 w-5 text-accent" />
              Key Success Traits:
            </h4>
            <div className="grid sm:grid-cols-2 gap-2 text-sm text-muted-foreground">
              <div>• Detail-oriented thinking</div>
              <div>• Strong analytical mindset</div>
              <div>• Integrity & responsibility</div>
              <div>• Scientific curiosity</div>
              <div>• Procedural adherence</div>
              <div>• Steady hand coordination</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};