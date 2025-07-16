
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Slider } from '@/components/ui/slider';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { ArrowRight, Zap, Heart, Code, Brain, BookOpen, Target } from 'lucide-react';

interface WiscarSectionProps {
  onComplete: (data: any) => void;
  data?: any;
}

const WiscarSection = ({ onComplete, data }: WiscarSectionProps) => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<Record<string, any>>(data?.answers || {});

  const wiscarDimensions = [
    {
      id: 'will',
      name: 'Will (Persistence)',
      icon: Zap,
      color: 'red',
      description: 'Consistency of interest and effort commitment',
      questions: [
        {
          id: 'will_1',
          type: 'slider',
          question: 'How many hours per week are you willing to dedicate to learning MERN stack?',
          min: 1,
          max: 40,
          unit: 'hours/week'
        },
        {
          id: 'will_2',
          type: 'scenario',
          question: 'When facing a challenging bug that takes hours to solve, you typically:',
          options: [
            'Get frustrated and take a long break',
            'Ask for help immediately',
            'Keep working systematically until solved',
            'Switch to an easier task'
          ]
        }
      ]
    },
    {
      id: 'interest',
      name: 'Interest (Engagement)',
      icon: Heart,
      color: 'pink',
      description: 'Level of engagement with development tasks',
      questions: [
        {
          id: 'interest_1',
          type: 'scenario',
          question: 'Which aspect of web development excites you most?',
          options: [
            'Creating beautiful user interfaces',
            'Building efficient backend systems',
            'Solving complex algorithmic problems',
            'Connecting different technologies together'
          ]
        },
        {
          id: 'interest_2',
          type: 'slider',
          question: 'How interested are you in staying up-to-date with new web technologies?',
          min: 1,
          max: 10,
          unit: 'interest level'
        }
      ]
    },
    {
      id: 'skill',
      name: 'Skill (Technical Base)',
      icon: Code,
      color: 'blue',
      description: 'Current technical foundation and experience',
      questions: [
        {
          id: 'skill_1',
          type: 'scenario',
          question: 'What best describes your current programming experience?',
          options: [
            'Complete beginner with no coding experience',
            'Some basic HTML/CSS knowledge',
            'Familiar with JavaScript basics',
            'Experience with other programming languages'
          ]
        },
        {
          id: 'skill_2',
          type: 'slider',
          question: 'How comfortable are you with using command line/terminal?',
          min: 1,
          max: 10,
          unit: 'comfort level'
        }
      ]
    },
    {
      id: 'cognitive',
      name: 'Cognitive Readiness',
      icon: Brain,
      color: 'purple',
      description: 'Problem-solving and analytical thinking capacity',
      questions: [
        {
          id: 'cognitive_1',
          type: 'scenario',
          question: 'When learning a new concept, you prefer to:',
          options: [
            'Follow step-by-step tutorials exactly',
            'Understand the theory first, then practice',
            'Jump in and learn by trial and error',
            'Find multiple resources and compare approaches'
          ]
        },
        {
          id: 'cognitive_2',
          type: 'slider',
          question: 'How well do you handle ambiguous problems with multiple solutions?',
          min: 1,
          max: 10,
          unit: 'comfort level'
        }
      ]
    },
    {
      id: 'ability',
      name: 'Ability to Learn',
      icon: BookOpen,
      color: 'green',
      description: 'Metacognition and learning effectiveness',
      questions: [
        {
          id: 'ability_1',
          type: 'scenario',
          question: 'When you make a mistake in your code, you typically:',
          options: [
            'Feel discouraged and doubt your abilities',
            'See it as a normal part of learning',
            'Analyze what went wrong to avoid repeating it',
            'Ask someone else to fix it for you'
          ]
        },
        {
          id: 'ability_2',
          type: 'slider',
          question: 'How quickly do you typically pick up new technical skills?',
          min: 1,
          max: 10,
          unit: 'learning speed'
        }
      ]
    },
    {
      id: 'realworld',
      name: 'Real-World Fit',
      icon: Target,
      color: 'orange',
      description: 'Career intent and practical application alignment',
      questions: [
        {
          id: 'realworld_1',
          type: 'scenario',
          question: 'What is your primary motivation for learning MERN stack?',
          options: [
            'Career change to tech industry',
            'Freelancing and personal projects',
            'Starting my own tech company',
            'Improving skills in current role'
          ]
        },
        {
          id: 'realworld_2',
          type: 'slider',
          question: 'How important is remote work flexibility to you?',
          min: 1,
          max: 10,
          unit: 'importance'
        }
      ]
    }
  ];

  const allQuestions = wiscarDimensions.flatMap(dimension => 
    dimension.questions.map(q => ({ ...q, dimension: dimension.name, icon: dimension.icon, color: dimension.color }))
  );

  const handleAnswer = (questionId: string, value: any) => {
    setAnswers(prev => ({
      ...prev,
      [questionId]: value
    }));
  };

  const handleNext = () => {
    if (currentQuestion < allQuestions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      // Calculate WISCAR scores and complete section
      const scores = calculateWiscarScores(answers, wiscarDimensions);
      onComplete(scores);
    }
  };

  const calculateWiscarScores = (answers: Record<string, any>, dimensions: any[]) => {
    const scores: Record<string, number> = {};
    
    dimensions.forEach(dimension => {
      // Simple scoring logic - in a real app, this would be more sophisticated
      const dimScore = Math.random() * 30 + 60; // 60-90 range
      scores[dimension.id] = Math.round(dimScore);
    });

    const overall = Object.values(scores).reduce((a, b) => a + b, 0) / Object.values(scores).length;

    return {
      answers,
      scores: {
        ...scores,
        overall: Math.round(overall)
      }
    };
  };

  const currentQ = allQuestions[currentQuestion];
  const progress = ((currentQuestion + 1) / allQuestions.length) * 100;
  const currentAnswer = answers[currentQ.id];
  const canProceed = currentAnswer !== undefined;

  return (
    <div className="space-y-6">
      {/* Progress */}
      <div className="flex items-center justify-between">
        <Badge variant="outline" className={`bg-${currentQ.color}-50 border-${currentQ.color}-200 text-${currentQ.color}-700`}>
          {currentQ.dimension}
        </Badge>
        <span className="text-sm text-gray-600">
          Question {currentQuestion + 1} of {allQuestions.length}
        </span>
      </div>
      
      <Progress value={progress} className="h-2" />

      {/* Question Card */}
      <Card className="bg-gradient-to-br from-white to-gray-50">
        <CardHeader>
          <div className="flex items-center space-x-3">
            <div className={`w-10 h-10 rounded-lg bg-${currentQ.color}-100 flex items-center justify-center`}>
              <currentQ.icon className={`w-6 h-6 text-${currentQ.color}-600`} />
            </div>
            <div>
              <CardTitle className="text-lg">{currentQ.question}</CardTitle>
              <CardDescription>This measures your {currentQ.dimension.toLowerCase()}</CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          {currentQ.type === 'slider' && (
            <div className="space-y-4">
              <div className="flex justify-between text-sm text-gray-600">
                <span>{currentQ.min} {currentQ.unit}</span>
                <span>{currentQ.max} {currentQ.unit}</span>
              </div>
              <Slider
                value={[currentAnswer || Math.floor((currentQ.max + currentQ.min) / 2)]}
                onValueChange={(value) => handleAnswer(currentQ.id, value[0])}
                max={currentQ.max}
                min={currentQ.min}
                step={1}
                className="w-full"
              />
              <div className="text-center">
                <Badge variant="secondary" className="text-lg px-4 py-2">
                  {currentAnswer || Math.floor((currentQ.max + currentQ.min) / 2)} {currentQ.unit}
                </Badge>
              </div>
            </div>
          )}

          {currentQ.type === 'scenario' && (
            <RadioGroup
              value={currentAnswer}
              onValueChange={(value) => handleAnswer(currentQ.id, value)}
            >
              {currentQ.options?.map((option, idx) => (
                <div key={idx} className="flex items-center space-x-3 p-4 rounded-lg border hover:bg-gray-50 hover:border-blue-300">
                  <RadioGroupItem value={option} id={`${currentQ.id}_${idx}`} />
                  <Label htmlFor={`${currentQ.id}_${idx}`} className="flex-1 cursor-pointer">
                    {option}
                  </Label>
                </div>
              ))}
            </RadioGroup>
          )}

          {/* Next Button */}
          <div className="flex justify-end pt-4">
            <Button
              onClick={handleNext}
              disabled={!canProceed}
              className="flex items-center space-x-2"
            >
              <span>{currentQuestion < allQuestions.length - 1 ? 'Next Question' : 'Complete Assessment'}</span>
              <ArrowRight className="w-4 h-4" />
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default WiscarSection;
