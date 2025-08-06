import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ProgressCircle } from '@/components/ui/progress-circle';
import { RadarChart } from '@/components/ui/radar-chart';
import { AssessmentResults } from '@/types/assessment';
import { 
  CheckCircle, 
  AlertTriangle, 
  XCircle, 
  TrendingUp, 
  BookOpen, 
  Users,
  Download,
  Share
} from 'lucide-react';

interface ResultsDisplayProps {
  results: AssessmentResults;
  onRetake: () => void;
  onDownload: () => void;
}

export const ResultsDisplay: React.FC<ResultsDisplayProps> = ({
  results,
  onRetake,
  onDownload
}) => {
  const getRecommendationIcon = () => {
    switch (results.recommendation) {
      case 'yes': return <CheckCircle className="h-8 w-8 text-success" />;
      case 'maybe': return <AlertTriangle className="h-8 w-8 text-warning" />;
      case 'no': return <XCircle className="h-8 w-8 text-destructive" />;
    }
  };

  const getRecommendationColor = () => {
    switch (results.recommendation) {
      case 'yes': return 'success';
      case 'maybe': return 'warning';
      case 'no': return 'destructive';
    }
  };

  const getRecommendationText = () => {
    switch (results.recommendation) {
      case 'yes': return 'Yes - You\'re Ready!';
      case 'maybe': return 'Maybe - With Development';
      case 'no': return 'Not Currently - Consider Alternatives';
    }
  };

  const wiscarData = [
    { label: 'Will', value: results.wiscar.will },
    { label: 'Interest', value: results.wiscar.interest },
    { label: 'Skill', value: results.wiscar.skill },
    { label: 'Cognitive', value: results.wiscar.cognitive },
    { label: 'Ability', value: results.wiscar.ability },
    { label: 'Real-World', value: results.wiscar.realWorld }
  ];

  return (
    <div className="space-y-6 max-w-6xl mx-auto">
      {/* Header */}
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-bold">Your MLT Assessment Results</h1>
        <p className="text-xl text-muted-foreground">
          Comprehensive evaluation of your Medical Laboratory Technician readiness
        </p>
      </div>

      {/* Main Recommendation */}
      <Card className="shadow-assessment">
        <CardHeader className="text-center pb-4">
          <div className="flex justify-center mb-4">
            {getRecommendationIcon()}
          </div>
          <CardTitle className="text-3xl mb-2">
            Should You Become a Medical Laboratory Technician?
          </CardTitle>
          <Badge 
            variant="secondary" 
            className={`text-lg px-4 py-2 bg-${getRecommendationColor()}/10 text-${getRecommendationColor()}`}
          >
            {getRecommendationText()}
          </Badge>
        </CardHeader>
        <CardContent className="text-center">
          <div className="flex justify-center mb-6">
            <ProgressCircle 
              value={results.confidenceScore} 
              size={150}
              color={getRecommendationColor() as any}
            />
          </div>
          <p className="text-lg text-muted-foreground mb-6">
            Confidence Score: {results.confidenceScore}% based on comprehensive assessment
          </p>
          <div className="flex gap-4 justify-center">
            <Button onClick={onDownload} variant="outline">
              <Download className="h-4 w-4 mr-2" />
              Download Report
            </Button>
            <Button onClick={onRetake} variant="outline">
              <Share className="h-4 w-4 mr-2" />
              Retake Assessment
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Score Breakdown */}
      <div className="grid md:grid-cols-3 gap-6">
        <Card>
          <CardHeader className="text-center">
            <CardTitle className="flex items-center justify-center gap-2">
              <div className="w-4 h-4 bg-psychometric rounded-full"></div>
              Psychometric Fit
            </CardTitle>
          </CardHeader>
          <CardContent className="text-center">
            <ProgressCircle 
              value={results.psychometric.overallFit} 
              color="psychometric"
              size={120}
            />
            <div className="mt-4 space-y-2 text-sm">
              <div className="flex justify-between">
                <span>Interest Scale:</span>
                <span>{results.psychometric.interestScale}%</span>
              </div>
              <div className="flex justify-between">
                <span>Personality Match:</span>
                <span>{results.psychometric.personalityCompatibility}%</span>
              </div>
              <div className="flex justify-between">
                <span>Work Preferences:</span>
                <span>{results.psychometric.workingPreferences}%</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="text-center">
            <CardTitle className="flex items-center justify-center gap-2">
              <div className="w-4 h-4 bg-technical rounded-full"></div>
              Technical Readiness
            </CardTitle>
          </CardHeader>
          <CardContent className="text-center">
            <ProgressCircle 
              value={results.technical.overallReadiness} 
              color="technical"
              size={120}
            />
            <div className="mt-4 space-y-2 text-sm">
              <div className="flex justify-between">
                <span>Logical Reasoning:</span>
                <span>{results.technical.logicalReasoning}%</span>
              </div>
              <div className="flex justify-between">
                <span>Numerical Ability:</span>
                <span>{results.technical.numericalAbility}%</span>
              </div>
              <div className="flex justify-between">
                <span>Science Knowledge:</span>
                <span>{results.technical.scienceKnowledge}%</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="text-center">
            <CardTitle className="flex items-center justify-center gap-2">
              <div className="w-4 h-4 bg-wiscar rounded-full"></div>
              WISCAR Analysis
            </CardTitle>
          </CardHeader>
          <CardContent className="text-center">
            <ProgressCircle 
              value={results.wiscar.overall} 
              color="wiscar"
              size={120}
            />
            <div className="mt-4 text-sm text-muted-foreground">
              Comprehensive readiness across Will, Interest, Skill, Cognitive abilities, Ability to learn, and Real-world alignment
            </div>
          </CardContent>
        </Card>
      </div>

      {/* WISCAR Radar Chart */}
      <Card>
        <CardHeader>
          <CardTitle className="text-center">WISCAR Framework Analysis</CardTitle>
        </CardHeader>
        <CardContent className="flex justify-center">
          <RadarChart data={wiscarData} size={400} />
        </CardContent>
      </Card>

      {/* Strengths and Improvements */}
      <div className="grid md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-success">
              <TrendingUp className="h-5 w-5" />
              Your Strengths
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2">
              {results.strengths.map((strength, index) => (
                <li key={index} className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-success mt-0.5 flex-shrink-0" />
                  <span className="text-sm">{strength}</span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-warning">
              <BookOpen className="h-5 w-5" />
              Areas for Improvement
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2">
              {results.improvements.map((improvement, index) => (
                <li key={index} className="flex items-start gap-2">
                  <AlertTriangle className="h-4 w-4 text-warning mt-0.5 flex-shrink-0" />
                  <span className="text-sm">{improvement}</span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      </div>

      {/* Next Steps */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Users className="h-5 w-5" />
            Recommended Next Steps
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {results.nextSteps.map((step, index) => (
              <div key={index} className="flex items-start gap-3 p-3 bg-muted/30 rounded-lg">
                <div className="w-6 h-6 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0">
                  {index + 1}
                </div>
                <span className="text-sm">{step}</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Alternative Careers (if applicable) */}
      {results.alternativeCareers && results.alternativeCareers.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Alternative Career Paths</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground mb-4">
              Based on your assessment, you might also consider these related healthcare careers:
            </p>
            <div className="flex flex-wrap gap-2">
              {results.alternativeCareers.map((career, index) => (
                <Badge key={index} variant="outline" className="text-sm">
                  {career}
                </Badge>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};