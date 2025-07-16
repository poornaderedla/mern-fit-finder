
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Brain, Code, Target, Zap, BookOpen, Trophy, ArrowRight, CheckCircle, Circle } from 'lucide-react';
import AssessmentFlow from '@/components/AssessmentFlow';

const Index = () => {
  const [showAssessment, setShowAssessment] = useState(false);

  if (showAssessment) {
    return <AssessmentFlow onBack={() => setShowAssessment(false)} />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-sm border-b sticky top-0 z-10">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                <Brain className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900">MERN Stack Readiness</h1>
                <p className="text-sm text-gray-600">Assessment Platform</p>
              </div>
            </div>
            <Badge variant="secondary" className="bg-blue-100 text-blue-700">
              🧠 TECHNICAL FUTURES
            </Badge>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-6 py-12">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold text-gray-900 mb-6 leading-tight">
            Should You Learn the <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">MERN Stack</span>?
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            A Complete Readiness & Fit Assessment for Aspiring Full Stack Developers
          </p>
          <div className="flex items-center justify-center space-x-2 text-sm text-gray-500 mb-12">
            <Circle className="w-2 h-2 fill-current" />
            <span>20-30 minutes</span>
            <Circle className="w-2 h-2 fill-current" />
            <span>Comprehensive Analysis</span>
            <Circle className="w-2 h-2 fill-current" />
            <span>Personalized Recommendations</span>
          </div>
        </div>

        {/* Test Introduction */}
        <Card className="mb-12 bg-white/70 backdrop-blur-sm border-blue-200">
          <CardHeader>
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                <Target className="w-5 h-5 text-blue-600" />
              </div>
              <CardTitle className="text-2xl">🔷 1. Test Introduction</CardTitle>
            </div>
          </CardHeader>
          <CardContent className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-3">🎯 Purpose of This Assessment</h3>
              <p className="text-gray-700">
                To evaluate your psychological fit, technical readiness, cognitive learning potential, and career alignment for learning and working with the MERN Stack.
              </p>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-3">💡 What is the MERN Stack?</h3>
              <p className="text-gray-700 mb-4">
                MERN is a powerful JavaScript-based full stack framework combining:
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {[
                  { name: 'MongoDB', desc: 'NoSQL database', color: 'green' },
                  { name: 'Express.js', desc: 'Backend web framework', color: 'yellow' },
                  { name: 'React.js', desc: 'Frontend library', color: 'blue' },
                  { name: 'Node.js', desc: 'JavaScript runtime', color: 'green' }
                ].map((tech, idx) => (
                  <div key={idx} className="bg-white p-4 rounded-lg border border-gray-200">
                    <h4 className="font-semibold text-gray-900">{tech.name}</h4>
                    <p className="text-sm text-gray-600">{tech.desc}</p>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-3">💼 Typical Career Roles:</h3>
              <ul className="space-y-2 text-gray-700">
                {[
                  'Full Stack Web Developer',
                  'Frontend Developer (React)',
                  'Backend Developer (Node + Express)',
                  'JavaScript Engineer',
                  'Software Engineer or Web Architect'
                ].map((role, idx) => (
                  <li key={idx} className="flex items-center space-x-2">
                    <CheckCircle className="w-4 h-4 text-green-500" />
                    <span>{role}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-3">🧠 Traits & Skills That Thrive in MERN:</h3>
              <div className="flex flex-wrap gap-2">
                {[
                  'Systems thinking',
                  'Logical problem-solving',
                  'Asynchronous programming',
                  'UI/UX sensitivity',
                  'Performance optimization',
                  'Persistence & adaptability'
                ].map((trait, idx) => (
                  <Badge key={idx} variant="outline" className="bg-blue-50 border-blue-200 text-blue-700">
                    {trait}
                  </Badge>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Assessment Sections Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {[
            {
              icon: Brain,
              title: '🧪 Psychometric Section',
              description: 'Evaluate personality, motivation, interests, and cognitive style alignment',
              items: ['Interest Assessment (RIASEC)', 'Big Five Personality', 'Grit & Growth Mindset', 'Cognitive Style Analysis'],
              color: 'purple'
            },
            {
              icon: Code,
              title: '🧠 Technical & Aptitude',
              description: 'Assess programming logic, JavaScript fluency, and MERN concepts',
              items: ['Logic & Reasoning', 'JavaScript Foundations', 'MERN Domain Knowledge', 'Development Tools'],
              color: 'blue'
            },
            {
              icon: Zap,
              title: '🔍 WISCAR Framework',
              description: 'Comprehensive readiness mapping across six key dimensions',
              items: ['Will (Persistence)', 'Interest (Engagement)', 'Skill (Technical Base)', 'Cognitive Readiness'],
              color: 'green'
            }
          ].map((section, idx) => (
            <Card key={idx} className="bg-white/70 backdrop-blur-sm hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex items-center space-x-3">
                  <div className={`w-10 h-10 rounded-lg flex items-center justify-center bg-${section.color}-100`}>
                    <section.icon className={`w-6 h-6 text-${section.color}-600`} />
                  </div>
                  <CardTitle className="text-lg">{section.title}</CardTitle>
                </div>
                <CardDescription>{section.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {section.items.map((item, itemIdx) => (
                    <li key={itemIdx} className="flex items-center space-x-2 text-sm text-gray-600">
                      <CheckCircle className="w-3 h-3 text-green-500" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Results Preview */}
        <Card className="mb-12 bg-gradient-to-r from-indigo-50 to-purple-50 border-indigo-200">
          <CardHeader>
            <div className="flex items-center space-x-3">
              <Trophy className="w-8 h-8 text-indigo-600" />
              <CardTitle className="text-2xl">🤖 What You'll Receive</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">📊 Comprehensive Scoring</h3>
                <div className="space-y-3">
                  {[
                    { label: 'Psychological Fit Score', value: 85, color: 'purple' },
                    { label: 'Technical Readiness', value: 72, color: 'blue' },
                    { label: 'WISCAR Analysis', value: 78, color: 'green' }
                  ].map((score, idx) => (
                    <div key={idx} className="space-y-1">
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-700">{score.label}</span>
                        <span className="font-medium">{score.value}%</span>
                      </div>
                      <Progress value={score.value} className="h-2" />
                    </div>
                  ))}
                </div>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">🎯 Personalized Recommendations</h3>
                <ul className="space-y-2">
                  {[
                    'Should you learn MERN? (Yes/Maybe/No)',
                    'Confidence score & reasoning',
                    'Skill gap analysis',
                    'Learning pathway suggestions',
                    'Career guidance & role mapping',
                    'Alternative tech stack options'
                  ].map((item, idx) => (
                    <li key={idx} className="flex items-center space-x-2 text-sm text-gray-700">
                      <CheckCircle className="w-4 h-4 text-green-500" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* CTA Section */}
        <div className="text-center">
          <Card className="bg-gradient-to-r from-blue-600 to-purple-600 border-0 text-white">
            <CardContent className="p-12">
              <h2 className="text-3xl font-bold mb-4">Ready to Discover Your MERN Potential?</h2>
              <p className="text-xl mb-8 text-blue-100">
                Take the comprehensive assessment and get personalized insights for your development journey.
              </p>
              <Button
                size="lg"
                className="bg-white text-blue-600 hover:bg-blue-50 text-lg px-8 py-6 h-auto"
                onClick={() => setShowAssessment(true)}
              >
                <BookOpen className="w-6 h-6 mr-3" />
                Start Assessment
                <ArrowRight className="w-6 h-6 ml-3" />
              </Button>
              <p className="text-blue-200 text-sm mt-4">
                ⏱ 20-30 minutes • 📊 Instant results • 🔒 Completely confidential
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Index;
