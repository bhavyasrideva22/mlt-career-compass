import { AssessmentQuestion } from '@/types/assessment';

export const psychometricQuestions: AssessmentQuestion[] = [
  // Interest Scale
  {
    id: 'psych_1',
    type: 'likert',
    category: 'psychometric',
    subcategory: 'interest',
    question: 'I find laboratory work and scientific testing fascinating',
    scale: { min: 1, max: 5, labels: ['Strongly Disagree', 'Disagree', 'Neutral', 'Agree', 'Strongly Agree'] }
  },
  {
    id: 'psych_2',
    type: 'likert',
    category: 'psychometric',
    subcategory: 'interest',
    question: 'I am genuinely interested in understanding diseases and health conditions',
    scale: { min: 1, max: 5, labels: ['Strongly Disagree', 'Disagree', 'Neutral', 'Agree', 'Strongly Agree'] }
  },
  {
    id: 'psych_3',
    type: 'likert',
    category: 'psychometric',
    subcategory: 'interest',
    question: 'Working with medical equipment and technology excites me',
    scale: { min: 1, max: 5, labels: ['Strongly Disagree', 'Disagree', 'Neutral', 'Agree', 'Strongly Agree'] }
  },
  
  // Personality Compatibility
  {
    id: 'psych_4',
    type: 'likert',
    category: 'psychometric',
    subcategory: 'personality',
    question: 'I pay close attention to small details and rarely miss important information',
    scale: { min: 1, max: 5, labels: ['Never', 'Rarely', 'Sometimes', 'Often', 'Always'] }
  },
  {
    id: 'psych_5',
    type: 'likert',
    category: 'psychometric',
    subcategory: 'personality',
    question: 'I prefer following established procedures rather than improvising',
    scale: { min: 1, max: 5, labels: ['Strongly Disagree', 'Disagree', 'Neutral', 'Agree', 'Strongly Agree'] }
  },
  {
    id: 'psych_6',
    type: 'likert',
    category: 'psychometric',
    subcategory: 'personality',
    question: 'I remain calm and focused under pressure',
    scale: { min: 1, max: 5, labels: ['Never', 'Rarely', 'Sometimes', 'Often', 'Always'] }
  },
  
  // Working Preferences
  {
    id: 'psych_7',
    type: 'forced-choice',
    category: 'psychometric',
    subcategory: 'preferences',
    question: 'When working, I prefer:',
    options: ['Individual work with minimal interruptions', 'Collaborative teamwork with frequent interaction']
  },
  {
    id: 'psych_8',
    type: 'scenario',
    category: 'psychometric',
    subcategory: 'preferences',
    question: 'You notice a potential error in a lab result. What do you do?',
    options: [
      'Immediately double-check the result and report to supervisor',
      'Note it down and mention it during the next team meeting',
      'Assume it\'s correct since the equipment was calibrated',
      'Ask a colleague to verify before taking action'
    ]
  }
];

export const technicalQuestions: AssessmentQuestion[] = [
  // Logical Reasoning
  {
    id: 'tech_1',
    type: 'mcq',
    category: 'technical',
    subcategory: 'logical',
    question: 'If Test A shows positive and Test B shows negative for the same sample, what is the most likely explanation?',
    options: [
      'Test A is more sensitive than Test B',
      'The sample is contaminated',
      'There was an error in one of the tests',
      'All of the above are possible'
    ]
  },
  {
    id: 'tech_2',
    type: 'mcq',
    category: 'technical',
    subcategory: 'logical',
    question: 'In a series of measurements: 5.2, 5.1, 5.3, 15.2, 5.0. Which value appears to be an outlier?',
    options: ['5.2', '5.1', '15.2', '5.0']
  },
  
  // Numerical Ability
  {
    id: 'tech_3',
    type: 'mcq',
    category: 'technical',
    subcategory: 'numerical',
    question: 'A solution needs to be diluted 1:10. If you have 2mL of sample, how much diluent do you need?',
    options: ['2mL', '10mL', '18mL', '20mL']
  },
  {
    id: 'tech_4',
    type: 'mcq',
    category: 'technical',
    subcategory: 'numerical',
    question: 'If a normal range for glucose is 70-99 mg/dL, is a value of 105 mg/dL considered:',
    options: ['Normal', 'Slightly elevated', 'Critically high', 'Critically low']
  },
  
  // Science Knowledge
  {
    id: 'tech_5',
    type: 'mcq',
    category: 'technical',
    subcategory: 'science',
    question: 'Which blood component is primarily responsible for clotting?',
    options: ['Red blood cells', 'White blood cells', 'Platelets', 'Plasma']
  },
  {
    id: 'tech_6',
    type: 'mcq',
    category: 'technical',
    subcategory: 'science',
    question: 'What is the primary purpose of a control sample in laboratory testing?',
    options: [
      'To practice testing procedures',
      'To verify test accuracy and reliability',
      'To save reagents',
      'To speed up the testing process'
    ]
  }
];

export const wiscarQuestions: AssessmentQuestion[] = [
  // Will (Grit & Persistence)
  {
    id: 'wiscar_1',
    type: 'likert',
    category: 'wiscar',
    subcategory: 'will',
    question: 'I have overcome setbacks to conquer an important challenge',
    scale: { min: 1, max: 5, labels: ['Not at all like me', 'Not much like me', 'Somewhat like me', 'Mostly like me', 'Very much like me'] }
  },
  {
    id: 'wiscar_2',
    type: 'likert',
    category: 'wiscar',
    subcategory: 'will',
    question: 'I finish whatever I begin',
    scale: { min: 1, max: 5, labels: ['Not at all like me', 'Not much like me', 'Somewhat like me', 'Mostly like me', 'Very much like me'] }
  },
  
  // Interest
  {
    id: 'wiscar_3',
    type: 'ranking',
    category: 'wiscar',
    subcategory: 'interest',
    question: 'Rank these laboratory activities by your interest level (1 = most interested):',
    options: [
      'Analyzing blood samples for disease markers',
      'Operating and maintaining lab equipment',
      'Recording and interpreting test results',
      'Following safety protocols and procedures'
    ]
  },
  
  // Skill
  {
    id: 'wiscar_4',
    type: 'likert',
    category: 'wiscar',
    subcategory: 'skill',
    question: 'I am skilled at working with precision instruments',
    scale: { min: 1, max: 5, labels: ['Not at all', 'Slightly', 'Moderately', 'Very', 'Extremely'] }
  },
  {
    id: 'wiscar_5',
    type: 'likert',
    category: 'wiscar',
    subcategory: 'skill',
    question: 'I can identify patterns and anomalies in data',
    scale: { min: 1, max: 5, labels: ['Not at all', 'Slightly', 'Moderately', 'Very', 'Extremely'] }
  },
  
  // Cognitive Readiness
  {
    id: 'wiscar_6',
    type: 'scenario',
    category: 'wiscar',
    subcategory: 'cognitive',
    question: 'A lab report shows unexpected results. Your approach would be to:',
    options: [
      'Repeat the test immediately to verify',
      'Check calibration and controls first',
      'Review the patient history for clues',
      'Consult with senior technician'
    ]
  },
  
  // Ability to Learn
  {
    id: 'wiscar_7',
    type: 'likert',
    category: 'wiscar',
    subcategory: 'ability',
    question: 'When I receive feedback on my work, I actively use it to improve',
    scale: { min: 1, max: 5, labels: ['Never', 'Rarely', 'Sometimes', 'Often', 'Always'] }
  }
];