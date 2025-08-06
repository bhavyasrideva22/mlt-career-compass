import React from 'react';
import { Progress } from '@/components/ui/progress';
import { Card, CardContent } from '@/components/ui/card';
import { CheckCircle, Circle, Clock } from 'lucide-react';

interface AssessmentProgressProps {
  currentStep: number;
  totalSteps: number;
  currentQuestion: number;
  totalQuestions: number;
  timeSpent: number;
  estimatedTime: number;
}

export const AssessmentProgress: React.FC<AssessmentProgressProps> = ({
  currentStep,
  totalSteps,
  currentQuestion,
  totalQuestions,
  timeSpent,
  estimatedTime
}) => {
  const progressPercentage = (currentQuestion / totalQuestions) * 100;
  
  const steps = [
    'Introduction',
    'Psychometric',
    'Technical',
    'WISCAR',
    'Results'
  ];

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <Card className="w-full max-w-4xl mx-auto mb-6">
      <CardContent className="p-6">
        <div className="space-y-4">
          {/* Step indicators */}
          <div className="flex items-center justify-between">
            {steps.map((step, index) => (
              <div key={step} className="flex items-center">
                <div className="flex items-center">
                  {index < currentStep ? (
                    <CheckCircle className="h-6 w-6 text-success" />
                  ) : index === currentStep ? (
                    <Circle className="h-6 w-6 text-primary fill-primary" />
                  ) : (
                    <Circle className="h-6 w-6 text-muted-foreground" />
                  )}
                  <span className={`ml-2 text-sm font-medium ${
                    index <= currentStep ? 'text-foreground' : 'text-muted-foreground'
                  }`}>
                    {step}
                  </span>
                </div>
                {index < steps.length - 1 && (
                  <div className={`w-8 h-px mx-4 ${
                    index < currentStep ? 'bg-success' : 'bg-muted'
                  }`} />
                )}
              </div>
            ))}
          </div>

          {/* Progress bar */}
          <div className="space-y-2">
            <div className="flex justify-between text-sm text-muted-foreground">
              <span>Progress: {currentQuestion} of {totalQuestions} questions</span>
              <span>{Math.round(progressPercentage)}% complete</span>
            </div>
            <Progress value={progressPercentage} className="h-2" />
          </div>

          {/* Time tracking */}
          <div className="flex items-center justify-between text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <Clock className="h-4 w-4" />
              <span>Time spent: {formatTime(timeSpent)}</span>
            </div>
            <span>Estimated time: {formatTime(estimatedTime)}</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};