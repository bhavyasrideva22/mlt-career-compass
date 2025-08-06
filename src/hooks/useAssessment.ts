import { useState, useCallback } from 'react';
import { AssessmentResponse, AssessmentResults } from '@/types/assessment';

export const useAssessment = () => {
  const [responses, setResponses] = useState<AssessmentResponse[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [timeSpent, setTimeSpent] = useState(0);
  const [isComplete, setIsComplete] = useState(false);

  const addResponse = useCallback((questionId: string, value: any) => {
    setResponses(prev => {
      const existing = prev.find(r => r.questionId === questionId);
      if (existing) {
        return prev.map(r => r.questionId === questionId ? { ...r, value } : r);
      }
      return [...prev, { questionId, value }];
    });
  }, []);

  const calculateResults = useCallback((): AssessmentResults => {
    // Mock calculation - in real implementation, this would be more sophisticated
    const psychometricResponses = responses.filter(r => r.questionId.startsWith('psych_'));
    const technicalResponses = responses.filter(r => r.questionId.startsWith('tech_'));
    const wiscarResponses = responses.filter(r => r.questionId.startsWith('wiscar_'));

    // Calculate averages (simplified)
    const avgPsychometric = psychometricResponses.reduce((sum, r) => {
      const numValue = typeof r.value === 'number' ? r.value : 3;
      return sum + numValue;
    }, 0) / Math.max(psychometricResponses.length, 1);

    const avgTechnical = technicalResponses.length > 0 ? 
      (technicalResponses.filter(r => {
        // Mock correct answers check
        return Math.random() > 0.3; // 70% correct rate for demo
      }).length / technicalResponses.length) * 100 : 60;

    const avgWiscar = wiscarResponses.reduce((sum, r) => {
      const numValue = typeof r.value === 'number' ? r.value : 3;
      return sum + numValue;
    }, 0) / Math.max(wiscarResponses.length, 1);

    const psychometricScore = (avgPsychometric / 5) * 100;
    const technicalScore = avgTechnical;
    const wiscarScore = (avgWiscar / 5) * 100;

    const overallScore = (psychometricScore + technicalScore + wiscarScore) / 3;

    const recommendation: 'yes' | 'maybe' | 'no' = 
      overallScore >= 80 ? 'yes' : 
      overallScore >= 60 ? 'maybe' : 'no';

    return {
      psychometric: {
        interestScale: Math.round(psychometricScore + Math.random() * 10 - 5),
        personalityCompatibility: Math.round(psychometricScore + Math.random() * 10 - 5),
        cognitiveStyle: Math.round(psychometricScore + Math.random() * 10 - 5),
        motivationDrivers: Math.round(psychometricScore + Math.random() * 10 - 5),
        workingPreferences: Math.round(psychometricScore + Math.random() * 10 - 5),
        overallFit: Math.round(psychometricScore)
      },
      technical: {
        logicalReasoning: Math.round(technicalScore + Math.random() * 10 - 5),
        numericalAbility: Math.round(technicalScore + Math.random() * 10 - 5),
        scienceKnowledge: Math.round(technicalScore + Math.random() * 10 - 5),
        domainSpecific: Math.round(technicalScore + Math.random() * 10 - 5),
        overallReadiness: Math.round(technicalScore)
      },
      wiscar: {
        will: Math.round(wiscarScore + Math.random() * 10 - 5),
        interest: Math.round(wiscarScore + Math.random() * 10 - 5),
        skill: Math.round(wiscarScore + Math.random() * 10 - 5),
        cognitive: Math.round(wiscarScore + Math.random() * 10 - 5),
        ability: Math.round(wiscarScore + Math.random() * 10 - 5),
        realWorld: Math.round(wiscarScore + Math.random() * 10 - 5),
        overall: Math.round(wiscarScore)
      },
      recommendation,
      confidenceScore: Math.round(overallScore),
      strengths: [
        'Strong attention to detail and analytical thinking',
        'Good procedural adherence and safety awareness',
        'Solid foundation in scientific principles'
      ],
      improvements: [
        'Enhance numerical calculation speed',
        'Develop familiarity with lab equipment',
        'Strengthen time management under pressure'
      ],
      nextSteps: recommendation === 'yes' ? [
        'Enroll in MLT Foundation Course',
        'Choose specialty area (hematology, microbiology, etc.)',
        'Begin hands-on lab experience',
        'Prepare for certification exam'
      ] : recommendation === 'maybe' ? [
        'Complete bridging coursework in Chemistry and Biology',
        'Gain exposure to lab environments through job shadowing',
        'Practice precision and attention to detail exercises',
        'Retake assessment after skill development'
      ] : [
        'Consider alternative healthcare careers',
        'Explore Health Informatics or Medical Administration',
        'Develop foundational science knowledge',
        'Reassess career goals and interests'
      ],
      alternativeCareers: recommendation === 'no' ? [
        'Health Informatics Specialist',
        'Medical Billing & Coding',
        'Public Health Associate',
        'Radiology Assistant',
        'Pharmacy Technician'
      ] : undefined
    };
  }, [responses]);

  const reset = useCallback(() => {
    setResponses([]);
    setCurrentQuestionIndex(0);
    setTimeSpent(0);
    setIsComplete(false);
  }, []);

  return {
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
  };
};