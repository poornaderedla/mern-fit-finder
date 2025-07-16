
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { 
  Trophy, 
  CheckCircle, 
  AlertTriangle, 
  X, 
  ArrowRight, 
  Download, 
  Share2,
  Brain,
  Code,
  Target,
  Zap,
  Heart,
  BookOpen
} from 'lucide-react';

interface AssessmentResultsProps {
  onComplete: (data: any) => void;
  allData: any;
}

const AssessmentResults = ({ onComplete, allData }: AssessmentResultsProps) => {
  // Calculate overall scores from all sections
  const psychometricScore = allData.psychometric?.scores?.overall || 75;
  const technicalScore = allData.technical?.scores?.overall || 68;
  const wiscarScore = allData.wiscar?.scores?.overall || 82;
  
  const overallScore = Math.round((psychometricScore + technicalScore + wiscarScore) / 3);
  
  // Determine recommendation
  const getRecommendation = (score: number) => {
    if (score >= 75) return { status: 'YES', color: 'green', icon: CheckCircle };
    if (score >= 55) return { status: 'MAYBE', color: 'yellow', icon: AlertTriangle };
    return { status: 'NO', color: 'red', icon: X };
  };

  const recommendation = getRecommendation(overallScore);

  const wiscarBreakdown = [
    { id: 'will', name: 'Will (Persistence)', icon: Zap, score: 85, color: 'red' },
    { id: 'interest', name: 'Interest (Engagement)', icon: Heart, score: 78, color: 'pink' },
    { id: 'skill', name: 'Skill (Technical Base)', icon: Code, score: 65, color: 'blue' },
    { id: 'cognitive', name: 'Cognitive Readiness', icon: Brain, score: 82, color: 'purple' },
    { id: 'ability', name: 'Ability to Learn', icon: BookOpen, score: 88, color: 'green' },
    { id: 'realworld', name: 'Real-World Fit', icon: Target, score: 74, color: 'orange' }
  ];

  const getPersonalizedFeedback = () => {
    const strengths = [];
    const improvements = [];
    
    if (psychometricScore >= 75) strengths.push("Strong psychological fit for development work");
    if (technicalScore >= 70) strengths.push("Solid technical foundation");
    if (wiscarScore >= 80) strengths.push("Excellent learning readiness");
    
    if (technicalScore < 60) improvements.push("Build stronger JavaScript fundamentals");
    if (psychometricScore < 65) improvements.push("Develop persistence and growth mindset");
    if (wiscarScore < 70) improvements.push("Clarify career goals and commitment level");
    
    return { strengths, improvements };
  };

  const feedback = getPersonalizedFeedback();

  const getLearningPath = () => {
    if (overallScore >= 75) {
      return [
        "1. Start with React.js fundamentals and JSX",
        "2. Learn Node.js and Express.js for backend",
        "3. Master MongoDB and database design",
        "4. Build 2-3 full-stack projects",
        "5. Deploy applications and create portfolio"
      ];
    } else if (overallScore >= 55) {
      return [
        "1. Strengthen JavaScript fundamentals first",
        "2. Practice with HTML/CSS projects",
        "3. Start with React basics when ready",
        "4. Consider structured bootcamp or course",
        "5. Build confidence with small projects"
      ];
    } else {
      return [
        "1. Explore no-code/low-code platforms first",
        "2. Consider UI/UX design pathway",
        "3. Try Python or other beginner-friendly languages",
        "4. Build general computer literacy",
        "5. Reassess technical interest in 6 months"
      ];
    }
  };

  return (
    <div className="space-y-8">
      {/* Overall Result Hero */}
      <Card className={`bg-gradient-to-r ${
        recommendation.color === 'green' ? 'from-green-500 to-emerald-600' :
        recommendation.color === 'yellow' ? 'from-yellow-500 to-orange-500' :
        'from-red-500 to-pink-600'
      } border-0 text-white`}>
        <CardContent className="p-8 text-center">
          <div className="flex justify-center mb-4">
            <recommendation.icon className="w-16 h-16" />
          </div>
          <h2 className="text-3xl font-bold mb-2">
            {recommendation.status === 'YES' ? 'You Should Learn MERN!' :
             recommendation.status === 'MAYBE' ? 'MERN Could Work for You' :
             'Consider Alternative Paths'}
          </h2>
          <p className="text-xl mb-4 opacity-90">
            Overall Readiness Score: <strong>{overallScore}%</strong>
          </p>
          <div className="max-w-md mx-auto bg-white/20 rounded-lg p-4">
            <Progress value={overallScore} className="h-3 bg-white/30" />
          </div>
        </CardContent>
      </Card>

      {/* Score Breakdown */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader className="pb-4">
            <div className="flex items-center space-x-3">
              <Brain className="w-6 h-6 text-purple-600" />
              <CardTitle>Psychometric Fit</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-purple-600 mb-2">{psychometricScore}%</div>
            <Progress value={psychometricScore} className="h-2 mb-2" />
            <p className="text-sm text-gray-600">Personality & motivation alignment</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-4">
            <div className="flex items-center space-x-3">
              <Code className="w-6 h-6 text-blue-600" />
              <CardTitle>Technical Readiness</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-blue-600 mb-2">{technicalScore}%</div>
            <Progress value={technicalScore} className="h-2 mb-2" />
            <p className="text-sm text-gray-600">Programming knowledge & aptitude</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-4">
            <div className="flex items-center space-x-3">
              <Target className="w-6 h-6 text-green-600" />
              <CardTitle>WISCAR Analysis</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-green-600 mb-2">{wiscarScore}%</div>
            <Progress value={wiscarScore} className="h-2 mb-2" />
            <p className="text-sm text-gray-600">Comprehensive readiness factors</p>
          </CardContent>
        </Card>
      </div>

      {/* WISCAR Breakdown */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-3">
            <Target className="w-6 h-6" />
            <span>WISCAR Dimensional Analysis</span>
          </CardTitle>
          <CardDescription>
            Your readiness across six key factors for MERN stack success
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {wiscarBreakdown.map((dimension) => (
              <div key={dimension.id} className="space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <dimension.icon className={`w-4 h-4 text-${dimension.color}-600`} />
                    <span className="font-medium">{dimension.name}</span>
                  </div>
                  <Badge variant={dimension.score >= 75 ? 'default' : dimension.score >= 60 ? 'secondary' : 'destructive'}>
                    {dimension.score}%
                  </Badge>
                </div>
                <Progress value={dimension.score} className="h-2" />
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Personalized Feedback */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-green-700 flex items-center space-x-2">
              <CheckCircle className="w-5 h-5" />
              <span>Your Strengths</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2">
              {feedback.strengths.length > 0 ? (
                feedback.strengths.map((strength, idx) => (
                  <li key={idx} className="flex items-start space-x-2">
                    <CheckCircle className="w-4 h-4 text-green-500 mt-0.5" />
                    <span className="text-sm">{strength}</span>
                  </li>
                ))
              ) : (
                <li className="text-sm text-gray-600">Building foundational strengths...</li>
              )}
            </ul>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-orange-700 flex items-center space-x-2">
              <AlertTriangle className="w-5 h-5" />
              <span>Areas for Growth</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2">
              {feedback.improvements.length > 0 ? (
                feedback.improvements.map((improvement, idx) => (
                  <li key={idx} className="flex items-start space-x-2">
                    <ArrowRight className="w-4 h-4 text-orange-500 mt-0.5" />
                    <span className="text-sm">{improvement}</span>
                  </li>
                ))
              ) : (
                <li className="text-sm text-gray-600">You're well-prepared across all areas!</li>
              )}
            </ul>
          </CardContent>
        </Card>
      </div>

      {/* Learning Path */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-3">
            <BookOpen className="w-6 h-6" />
            <span>Recommended Learning Path</span>
          </CardTitle>
          <CardDescription>
            Step-by-step roadmap based on your assessment results
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ol className="space-y-3">
            {getLearningPath().map((step, idx) => (
              <li key={idx} className="flex items-start space-x-3">
                <div className="w-6 h-6 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-sm font-medium">
                  {idx + 1}
                </div>
                <span className="text-sm">{step}</span>
              </li>
            ))}
          </ol>
        </CardContent>
      </Card>

      {/* Actions */}
      <div className="flex flex-col sm:flex-row gap-4 justify-center">
        <Button size="lg" className="flex items-center space-x-2">
          <Download className="w-5 h-5" />
          <span>Download Full Report</span>
        </Button>
        <Button variant="outline" size="lg" className="flex items-center space-x-2">
          <Share2 className="w-5 h-5" />
          <span>Share Results</span>
        </Button>
        <Button 
          variant="outline" 
          size="lg"
          onClick={() => window.location.reload()}
        >
          Take Assessment Again
        </Button>
      </div>
    </div>
  );
};

export default AssessmentResults;
