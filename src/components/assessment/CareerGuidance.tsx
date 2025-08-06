import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { 
  Briefcase, 
  TrendingUp, 
  GraduationCap, 
  CheckCircle, 
  AlertTriangle,
  MapPin,
  DollarSign
} from 'lucide-react';

interface Skill {
  name: string;
  required: boolean;
  userScore: number;
}

interface CareerRole {
  title: string;
  description: string;
  salary: string;
  growth: string;
  requirements: string[];
}

interface LearningPhase {
  phase: string;
  title: string;
  description: string;
  duration: string;
  modules: string[];
}

export const CareerGuidance: React.FC = () => {
  const careerRoles: CareerRole[] = [
    {
      title: 'Medical Laboratory Technician',
      description: 'Executes lab tests, processes samples, maintains equipment',
      salary: '$35,000 - $50,000',
      growth: '7% (Faster than average)',
      requirements: ['MLT Certification', '2-year degree', 'Lab experience']
    },
    {
      title: 'Clinical Laboratory Technologist',
      description: 'Specialized diagnostics, supervises technicians',
      salary: '$50,000 - $70,000',
      growth: '11% (Much faster than average)',
      requirements: ['Bachelor\'s degree', 'CLS certification', '3+ years experience']
    },
    {
      title: 'Pathology Lab Assistant',
      description: 'Supports pathologists in preparing samples and slides',
      salary: '$30,000 - $45,000',
      growth: '5% (Average)',
      requirements: ['High school diploma', 'On-job training', 'Attention to detail']
    },
    {
      title: 'Hematology Technician',
      description: 'Specializes in blood disorders and blood bank operations',
      salary: '$40,000 - $55,000',
      growth: '8% (Faster than average)',
      requirements: ['MLT certification', 'Hematology specialty', 'Blood bank training']
    },
    {
      title: 'Microbiology Technician',
      description: 'Works with bacterial/viral cultures and infectious diseases',
      salary: '$38,000 - $52,000',
      growth: '9% (Faster than average)',
      requirements: ['MLT certification', 'Microbiology focus', 'Sterile technique']
    }
  ];

  const skills: Skill[] = [
    { name: 'Lab Safety', required: true, userScore: 85 },
    { name: 'Specimen Handling', required: true, userScore: 70 },
    { name: 'Analytical Precision', required: true, userScore: 88 },
    { name: 'Chemistry/Biology Basics', required: true, userScore: 65 },
    { name: 'Equipment Operation', required: true, userScore: 72 },
    { name: 'Quality Control', required: true, userScore: 80 },
    { name: 'Data Recording', required: true, userScore: 90 },
    { name: 'Sterile Technique', required: true, userScore: 78 }
  ];

  const learningPath: LearningPhase[] = [
    {
      phase: 'Phase 1',
      title: 'Foundation Knowledge',
      description: 'Build essential science background and laboratory fundamentals',
      duration: '3-6 months',
      modules: ['General Biology', 'Basic Chemistry', 'Medical Terminology', 'Lab Safety']
    },
    {
      phase: 'Phase 2',
      title: 'Technical Skills',
      description: 'Learn laboratory procedures and equipment operation',
      duration: '6-12 months',
      modules: ['Lab Procedures', 'Equipment Handling', 'Quality Control', 'Specimen Processing']
    },
    {
      phase: 'Phase 3',
      title: 'Applied Practice',
      description: 'Hands-on experience in clinical laboratory settings',
      duration: '6-9 months',
      modules: ['Clinical Practicum', 'Specialty Areas', 'Case Studies', 'Professional Ethics']
    },
    {
      phase: 'Phase 4',
      title: 'Certification & Career',
      description: 'Certification preparation and entry-level employment',
      duration: '3-6 months',
      modules: ['Certification Prep', 'Job Search', 'Interview Skills', 'Continuing Education']
    }
  ];

  return (
    <div className="space-y-8 max-w-6xl mx-auto">
      {/* Header */}
      <div className="text-center space-y-4">
        <h2 className="text-3xl font-bold">Career & Learning Guidance</h2>
        <p className="text-xl text-muted-foreground">
          Explore MLT career paths, skill requirements, and learning roadmap
        </p>
      </div>

      {/* Career Roles */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Briefcase className="h-5 w-5" />
            Top MLT Career Roles
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4">
            {careerRoles.map((role, index) => (
              <div key={index} className="border rounded-lg p-4 hover:shadow-md transition-shadow">
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <h3 className="font-semibold text-lg">{role.title}</h3>
                    <p className="text-muted-foreground">{role.description}</p>
                  </div>
                  <Badge variant="outline" className="ml-4">
                    <TrendingUp className="h-3 w-3 mr-1" />
                    {role.growth}
                  </Badge>
                </div>
                
                <div className="flex flex-wrap gap-4 text-sm text-muted-foreground mb-3">
                  <div className="flex items-center gap-1">
                    <DollarSign className="h-4 w-4" />
                    {role.salary}
                  </div>
                </div>
                
                <div className="flex flex-wrap gap-2">
                  {role.requirements.map((req, reqIndex) => (
                    <Badge key={reqIndex} variant="secondary" className="text-xs">
                      {req}
                    </Badge>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Skills Matching */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <CheckCircle className="h-5 w-5" />
            Required Skills vs Your Profile
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 gap-4">
            {skills.map((skill, index) => (
              <div key={index} className="space-y-2">
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-2">
                    <span className="font-medium">{skill.name}</span>
                    {skill.required && (
                      <Badge variant="destructive" className="text-xs">Required</Badge>
                    )}
                  </div>
                  <div className="flex items-center gap-2">
                    {skill.userScore >= 80 ? (
                      <CheckCircle className="h-4 w-4 text-success" />
                    ) : (
                      <AlertTriangle className="h-4 w-4 text-warning" />
                    )}
                    <span className="text-sm font-medium">{skill.userScore}%</span>
                  </div>
                </div>
                <Progress value={skill.userScore} className="h-2" />
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Learning Path */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <GraduationCap className="h-5 w-5" />
            Ideal Learning Path
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {learningPath.map((phase, index) => (
              <div key={index} className="relative">
                {index < learningPath.length - 1 && (
                  <div className="absolute left-6 top-12 w-px h-16 bg-border"></div>
                )}
                <div className="flex gap-4">
                  <div className="w-12 h-12 bg-primary text-primary-foreground rounded-full flex items-center justify-center font-bold flex-shrink-0">
                    {index + 1}
                  </div>
                  <div className="flex-1 space-y-3">
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="font-semibold text-lg">{phase.title}</h3>
                        <Badge variant="outline">{phase.duration}</Badge>
                      </div>
                      <p className="text-muted-foreground">{phase.description}</p>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {phase.modules.map((module, moduleIndex) => (
                        <Badge key={moduleIndex} variant="secondary" className="text-xs">
                          {module}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Alternative Pathways */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <MapPin className="h-5 w-5" />
            Alternative Healthcare Pathways
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground mb-4">
            If MLT isn't the perfect fit, consider these related healthcare careers:
          </p>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {[
              { title: 'Health Informatics', description: 'Healthcare data and technology' },
              { title: 'Radiology Assistant', description: 'Medical imaging support' },
              { title: 'Public Health Associate', description: 'Community health programs' },
              { title: 'Medical Billing & Coding', description: 'Healthcare administration' },
              { title: 'Pharmacy Technician', description: 'Pharmaceutical support' },
              { title: 'Physical Therapy Assistant', description: 'Rehabilitation support' }
            ].map((career, index) => (
              <div key={index} className="p-4 border rounded-lg hover:shadow-md transition-shadow">
                <h4 className="font-semibold mb-2">{career.title}</h4>
                <p className="text-sm text-muted-foreground">{career.description}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};