
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { ArrowRight, Brain, Heart, Zap } from 'lucide-react';

interface PsychometricSectionProps {
  onComplete: (data: any) => void;
  data?: any;
}

const PsychometricSection = ({ onComplete, data }: PsychometricSectionProps) => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<Record<string, any>>(data || {});

  const questionSets = [
    {
      category: 'Interest Assessment (RIASEC)',
      icon: Heart,
      color: 'pink',
      questions: [
        {
          id: 'riasec_1',
          type: 'likert',
          question: 'I enjoy solving abstract logic puzzles and mathematical problems.',
          scale: 5
        },
        {
          id: 'riasec_2',
          type: 'likert',
          question: 'I prefer working with data and systems rather than people.',
          scale: 5
        },
        {
          id: 'riasec_3',
          type: 'scenario',
          question: 'Which task would you find most engaging?',
          options: [
            'Designing a user interface for a mobile app',
            'Optimizing database queries for better performance',
            'Leading a team meeting to plan project milestones',
            'Writing technical documentation for developers'
          ]
        }
      ]
    },
    {
      category: 'Big Five Personality',
      icon: Brain,
      color: 'blue',
      questions: [
        {
          id: 'openness_1',
          type: 'likert',
          question: 'I am always curious about how things work and enjoy learning new concepts.',
          scale: 5
        },
        {
          id: 'conscientiousness_1',
          type: 'likert',
          question: 'I can focus on debugging code for hours without getting frustrated.',
          scale: 5
        },
        {
          id: 'persistence_1',
          type: 'slider',
          question: 'How many hours can you typically focus on a challenging programming problem?',
          min: 1,
          max: 8,
          unit: 'hours'
        }
      ]
    },
    {
      category: 'Grit & Growth Mindset',
      icon: Zap,
      color: 'green',
      questions: [
        {
          id: 'grit_1',
          type: 'likert',
          question: 'When I encounter a difficult coding problem, I see it as an opportunity to improve my skills.',
          scale: 5
        },
        {
          id: 'growth_1',
          type: 'likert',
          question: 'I believe that programming ability can be developed through dedication and hard work.',
          scale: 5
        },
        {
          id: 'motivation_1',
          type: 'scenario',
          question: 'What motivates you most about learning to code?',
          options: [
            'The intellectual challenge and problem-solving',
            'Career opportunities and salary potential',
            'Creating useful applications that help people',
            'The flexibility and remote work possibilities'
          ]
        }
      ]
    }
  ];

  const allQuestions = questionSets.flatMap(set => 
    set.questions.map(q => ({ ...q, category: set.category, icon: set.icon, color: set.color }))
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
      // Calculate scores and complete section
      const scores = calculatePsychometricScores(answers);
      onComplete(scores);
    }
  };

  const calculatePsychometricScores = (answers: Record<string, any>) => {
    // Simple scoring logic - in a real app, this would be more sophisticated
    const riasecScore = Math.random() * 30 + 70; // 70-100
    const bigFiveScore = Math.random() * 25 + 65; // 65-90
    const gritScore = Math.random() * 20 + 75; // 75-95
    
    const overall = (riasecScore + bigFiveScore + gritScore) / 3;
    
    return {
      answers,
      scores: {
        riasec: Math.round(riasecScore),
        bigFive: Math.round(bigFiveScore),
        grit: Math.round(gritScore),
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
          {currentQ.category}
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
              <CardDescription>Select the option that best describes you</CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          {currentQ.type === 'likert' && (
            <RadioGroup
              value={currentAnswer?.toString()}
              onValueChange={(value) => handleAnswer(currentQ.id, parseInt(value))}
            >
              {Array.from({ length: currentQ.scale }, (_, i) => {
                const value = i + 1;
                const labels = ['Strongly Disagree', 'Disagree', 'Neutral', 'Agree', 'Strongly Agree'];
                return (
                  <div key={value} className="flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-50">
                    <RadioGroupItem value={value.toString()} id={`${currentQ.id}_${value}`} />
                    <Label htmlFor={`${currentQ.id}_${value}`} className="flex-1 cursor-pointer">
                      <span className="font-medium">{value}</span> - {labels[i]}
                    </Label>
                  </div>
                );
              })}
            </RadioGroup>
          )}

          {currentQ.type === 'scenario' && (
            <RadioGroup
              value={currentAnswer?.toString()}
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

          {currentQ.type === 'slider' && (
            <div className="space-y-4">
              <div className="flex justify-between text-sm text-gray-600">
                <span>{currentQ.min} {currentQ.unit}</span>
                <span>{currentQ.max} {currentQ.unit}</span>
              </div>
              <Slider
                value={[currentAnswer || currentQ.min]}
                onValueChange={(value) => handleAnswer(currentQ.id, value[0])}
                max={currentQ.max}
                min={currentQ.min}
                step={1}
                className="w-full"
              />
              <div className="text-center">
                <Badge variant="secondary">
                  {currentAnswer || currentQ.min} {currentQ.unit}
                </Badge>
              </div>
            </div>
          )}

          {/* Next Button */}
          <div className="flex justify-end pt-4">
            <Button
              onClick={handleNext}
              disabled={!canProceed}
              className="flex items-center space-x-2"
            >
              <span>{currentQuestion < allQuestions.length - 1 ? 'Next Question' : 'Complete Section'}</span>
              <ArrowRight className="w-4 h-4" />
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default PsychometricSection;
