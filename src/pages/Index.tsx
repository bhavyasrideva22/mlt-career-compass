import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { AssessmentHeader } from '@/components/assessment/AssessmentHeader';
import { AssessmentProgress } from '@/components/assessment/AssessmentProgress';
import { QuestionCard } from '@/components/assessment/QuestionCard';
import { ResultsDisplay } from '@/components/assessment/ResultsDisplay';
import { CareerGuidance } from '@/components/assessment/CareerGuidance';
import { useAssessment } from '@/hooks/useAssessment';
import { psychometricQuestions, technicalQuestions, wiscarQuestions } from '@/data/assessmentQuestions';
import { ChevronRight, ChevronLeft, RotateCcw, BookOpen } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const Index = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [showCareerGuidance, setShowCareerGuidance] = useState(false);
  const { toast } = useToast();
  
  const {
    responses,
    currentQuestionIndex,
    setCurrentQuestionIndex,
    timeSpent,
    setTimeSpent,
    isComplete,
    setIsComplete,
    addResponse,
    calculateResults,
    reset
  } = useAssessment();

  // Combine all questions
  const allQuestions = [...psychometricQuestions, ...technicalQuestions, ...wiscarQuestions];
  const totalQuestions = allQuestions.length;
  const currentQuestion = allQuestions[currentQuestionIndex];
  const currentResponse = responses.find(r => r.questionId === currentQuestion?.id);

  // Timer effect
  useEffect(() => {
    if (currentStep > 0 && currentStep < 4) {
      const timer = setInterval(() => {
        setTimeSpent(prev => prev + 1);
      }, 1000);
      return () => clearInterval(timer);
    }
  }, [currentStep, setTimeSpent]);

  const handleStart = () => {
    setCurrentStep(1);
    toast({
      title: "Assessment Started",
      description: "Take your time and answer honestly for the best results.",
    });
  };

  const handleAnswer = (value: any) => {
    if (currentQuestion) {
      addResponse(currentQuestion.id, value);
    }
  };

  const handleNext = () => {
    if (!currentResponse) {
      toast({
        title: "Please answer the question",
        description: "You need to provide an answer before proceeding.",
        variant: "destructive"
      });
      return;
    }

    if (currentQuestionIndex < totalQuestions - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      // Assessment complete
      setIsComplete(true);
      setCurrentStep(4);
      toast({
        title: "Assessment Complete!",
        description: "Your results are ready. Let's see how you did!",
      });
    }
  };

  const handlePrevious = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };

  const handleRetake = () => {
    reset();
    setCurrentStep(0);
    setShowCareerGuidance(false);
    toast({
      title: "Assessment Reset",
      description: "You can now retake the assessment with fresh answers.",
    });
  };

  const handleDownload = () => {
    toast({
      title: "Download Started",
      description: "Your detailed report is being prepared...",
    });
  };

  const getCurrentStepFromQuestion = () => {
    if (currentQuestionIndex < psychometricQuestions.length) return 1;
    if (currentQuestionIndex < psychometricQuestions.length + technicalQuestions.length) return 2;
    return 3;
  };

  // Show career guidance
  if (showCareerGuidance) {
    return (
      <div className="min-h-screen bg-background">
        <div className="container mx-auto px-4 py-8">
          <div className="mb-6">
            <Button 
              variant="outline" 
              onClick={() => setShowCareerGuidance(false)}
              className="mb-4"
            >
              <ChevronLeft className="h-4 w-4 mr-2" />
              Back to Results
            </Button>
          </div>
          <CareerGuidance />
        </div>
      </div>
    );
  }

  // Show results
  if (isComplete) {
    const results = calculateResults();
    return (
      <div className="min-h-screen bg-background">
        <div className="container mx-auto px-4 py-8">
          <ResultsDisplay 
            results={results}
            onRetake={handleRetake}
            onDownload={handleDownload}
          />
          <div className="flex justify-center mt-8">
            <Button 
              onClick={() => setShowCareerGuidance(true)}
              className="bg-gradient-primary"
            >
              <BookOpen className="h-4 w-4 mr-2" />
              Explore Career Guidance
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        {/* Introduction */}
        {currentStep === 0 && (
          <div className="animate-fade-in">
            <AssessmentHeader />
            <div className="text-center">
              <div className="space-y-4 mb-8">
                <p className="text-lg text-muted-foreground">
                  This comprehensive assessment takes approximately <strong>20-30 minutes</strong> and evaluates:
                </p>
                <div className="grid md:grid-cols-3 gap-4 max-w-4xl mx-auto">
                  <div className="p-4 border rounded-lg">
                    <div className="w-8 h-8 bg-psychometric rounded-full mx-auto mb-2"></div>
                    <h3 className="font-semibold">Psychometric Fit</h3>
                    <p className="text-sm text-muted-foreground">Personality, interests, and work preferences</p>
                  </div>
                  <div className="p-4 border rounded-lg">
                    <div className="w-8 h-8 bg-technical rounded-full mx-auto mb-2"></div>
                    <h3 className="font-semibold">Technical Readiness</h3>
                    <p className="text-sm text-muted-foreground">Knowledge, reasoning, and domain skills</p>
                  </div>
                  <div className="p-4 border rounded-lg">
                    <div className="w-8 h-8 bg-wiscar rounded-full mx-auto mb-2"></div>
                    <h3 className="font-semibold">WISCAR Analysis</h3>
                    <p className="text-sm text-muted-foreground">Will, Interest, Skill, Cognitive abilities, and more</p>
                  </div>
                </div>
              </div>
              <Button 
                size="lg" 
                onClick={handleStart}
                className="bg-gradient-primary text-lg px-8 py-3"
              >
                Start Assessment
                <ChevronRight className="h-5 w-5 ml-2" />
              </Button>
            </div>
          </div>
        )}

        {/* Assessment Questions */}
        {currentStep > 0 && currentStep < 4 && currentQuestion && (
          <div className="animate-fade-in">
            <AssessmentProgress 
              currentStep={getCurrentStepFromQuestion()}
              totalSteps={4}
              currentQuestion={currentQuestionIndex + 1}
              totalQuestions={totalQuestions}
              timeSpent={timeSpent}
              estimatedTime={1800} // 30 minutes
            />

            <QuestionCard 
              question={currentQuestion}
              value={currentResponse?.value}
              onChange={handleAnswer}
              questionNumber={currentQuestionIndex + 1}
              totalQuestions={totalQuestions}
            />

            <div className="flex justify-between items-center mt-6 max-w-4xl mx-auto">
              <Button 
                variant="outline" 
                onClick={handlePrevious}
                disabled={currentQuestionIndex === 0}
              >
                <ChevronLeft className="h-4 w-4 mr-2" />
                Previous
              </Button>

              <div className="flex gap-2">
                <Button 
                  variant="outline" 
                  onClick={handleRetake}
                >
                  <RotateCcw className="h-4 w-4 mr-2" />
                  Restart
                </Button>

                <Button 
                  onClick={handleNext}
                  disabled={!currentResponse}
                  className="bg-gradient-primary"
                >
                  {currentQuestionIndex === totalQuestions - 1 ? 'Complete Assessment' : 'Next'}
                  <ChevronRight className="h-4 w-4 ml-2" />
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Index;