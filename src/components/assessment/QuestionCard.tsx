import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { AssessmentQuestion } from '@/types/assessment';
import { cn } from '@/lib/utils';

interface QuestionCardProps {
  question: AssessmentQuestion;
  value: any;
  onChange: (value: any) => void;
  questionNumber: number;
  totalQuestions: number;
}

export const QuestionCard: React.FC<QuestionCardProps> = ({
  question,
  value,
  onChange,
  questionNumber,
  totalQuestions
}) => {
  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'psychometric': return 'bg-psychometric';
      case 'technical': return 'bg-technical';
      case 'wiscar': return 'bg-wiscar';
      default: return 'bg-primary';
    }
  };

  const renderQuestionInput = () => {
    switch (question.type) {
      case 'likert':
        return (
          <div className="space-y-4">
            <div className="flex justify-between text-sm text-muted-foreground mb-2">
              <span>{question.scale?.labels[0]}</span>
              <span>{question.scale?.labels[question.scale.labels.length - 1]}</span>
            </div>
            <div className="flex justify-between gap-2">
              {Array.from({ length: question.scale?.max || 5 }, (_, i) => i + 1).map((num) => (
                <div key={num} className="flex flex-col items-center gap-2">
                  <Button
                    variant={value === num ? "default" : "outline"}
                    size="sm"
                    className={cn(
                      "w-12 h-12 rounded-full",
                      value === num && getCategoryColor(question.category)
                    )}
                    onClick={() => onChange(num)}
                  >
                    {num}
                  </Button>
                  <span className="text-xs text-muted-foreground">
                    {question.scale?.labels[num - 1]}
                  </span>
                </div>
              ))}
            </div>
          </div>
        );

      case 'mcq':
      case 'forced-choice':
      case 'scenario':
        return (
          <div className="space-y-3">
            {question.options?.map((option, index) => (
              <Button
                key={index}
                variant={value === option ? "default" : "outline"}
                className={cn(
                  "w-full justify-start text-left h-auto p-4 whitespace-normal",
                  value === option && getCategoryColor(question.category)
                )}
                onClick={() => onChange(option)}
              >
                <span className="text-sm font-medium mr-3 text-muted-foreground">
                  {String.fromCharCode(65 + index)}.
                </span>
                {option}
              </Button>
            ))}
          </div>
        );

      case 'ranking':
        return (
          <div className="space-y-3">
            <p className="text-sm text-muted-foreground mb-4">
              Drag to reorder or click to select ranking:
            </p>
            {question.options?.map((option, index) => (
              <div
                key={index}
                className="flex items-center gap-3 p-3 border rounded-lg cursor-pointer hover:bg-muted/50"
                onClick={() => {
                  const newRanking = [...(value || [])];
                  const currentRank = newRanking.indexOf(option);
                  if (currentRank > -1) {
                    newRanking.splice(currentRank, 1);
                  }
                  newRanking.unshift(option);
                  onChange(newRanking.slice(0, question.options?.length));
                }}
              >
                <div className={cn(
                  "w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold",
                  value?.includes(option) ? `${getCategoryColor(question.category)} text-white` : "bg-muted"
                )}>
                  {value?.indexOf(option) + 1 || '-'}
                </div>
                <span className="flex-1">{option}</span>
              </div>
            ))}
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <Card className="w-full max-w-4xl mx-auto shadow-assessment">
      <CardHeader>
        <div className="flex items-center justify-between mb-2">
          <Badge 
            variant="secondary" 
            className={cn("text-white", getCategoryColor(question.category))}
          >
            {question.category.charAt(0).toUpperCase() + question.category.slice(1)} • {question.subcategory}
          </Badge>
          <span className="text-sm text-muted-foreground">
            Question {questionNumber} of {totalQuestions}
          </span>
        </div>
        <CardTitle className="text-xl leading-relaxed">
          {question.question}
        </CardTitle>
      </CardHeader>
      <CardContent>
        {renderQuestionInput()}
      </CardContent>
    </Card>
  );
};