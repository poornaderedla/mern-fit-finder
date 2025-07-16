
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { ArrowRight, Code, Puzzle, Database, Server } from 'lucide-react';

interface TechnicalSectionProps {
  onComplete: (data: any) => void;
  data?: any;
}

const TechnicalSection = ({ onComplete, data }: TechnicalSectionProps) => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<Record<string, any>>(data?.answers || {});

  const questionSets = [
    {
      category: 'Logic & Reasoning',
      icon: Puzzle,
      color: 'purple',
      questions: [
        {
          id: 'logic_1',
          question: 'What would be the output of this JavaScript expression: `"5" + 3 + 2`?',
          options: ['10', '"532"', '"8"', 'Error'],
          correct: '"532"',
          explanation: 'JavaScript performs string concatenation from left to right when a string is involved.'
        },
        {
          id: 'logic_2',
          question: 'Which data structure would be most efficient for implementing an undo feature?',
          options: ['Array', 'Stack', 'Queue', 'Hash Table'],
          correct: 'Stack',
          explanation: 'Stack follows LIFO (Last In, First Out) principle, perfect for undo operations.'
        },
        {
          id: 'logic_3',
          question: 'What is the time complexity of finding an element in an unsorted array?',
          options: ['O(1)', 'O(log n)', 'O(n)', 'O(n²)'],
          correct: 'O(n)',
          explanation: 'In worst case, you might need to check every element, giving O(n) complexity.'
        }
      ]
    },
    {
      category: 'JavaScript Fundamentals',
      icon: Code,
      color: 'yellow',
      questions: [
        {
          id: 'js_1',
          question: 'What is the difference between `let` and `var` in JavaScript?',
          options: [
            'No difference, they are identical',
            'let has block scope, var has function scope',
            'var is newer than let',
            'let can be redeclared, var cannot'
          ],
          correct: 'let has block scope, var has function scope',
          explanation: 'let respects block boundaries, while var is function-scoped or globally-scoped.'
        },
        {
          id: 'js_2',
          question: 'What will `console.log(typeof null)` output in JavaScript?',
          options: ['"null"', '"undefined"', '"object"', '"boolean"'],
          correct: '"object"',
          explanation: 'This is a famous JavaScript quirk - typeof null returns "object".'
        },
        {
          id: 'js_3',
          question: 'How do you create a promise in JavaScript?',
          options: [
            'new Promise((resolve, reject) => {...})',
            'Promise.create((resolve, reject) => {...})',
            'createPromise((resolve, reject) => {...})',
            'Promise((resolve, reject) => {...})'
          ],
          correct: 'new Promise((resolve, reject) => {...})',
          explanation: 'Promises are created using the Promise constructor with resolve and reject callbacks.'
        }
      ]
    },
    {
      category: 'MERN Stack Knowledge',
      icon: Database,
      color: 'green',
      questions: [
        {
          id: 'mern_1',
          question: 'What is JSX in React?',
          options: [
            'A separate templating language',
            'JavaScript XML - a syntax extension',
            'A CSS framework',
            'A database query language'
          ],
          correct: 'JavaScript XML - a syntax extension',
          explanation: 'JSX allows you to write HTML-like syntax in JavaScript.'
        },
        {
          id: 'mern_2',
          question: 'What is Express.js primarily used for?',
          options: [
            'Frontend state management',
            'Database operations',
            'Building web servers and APIs',
            'CSS preprocessing'
          ],
          correct: 'Building web servers and APIs',
          explanation: 'Express.js is a web application framework for Node.js, used for building servers and APIs.'
        },
        {
          id: 'mern_3',
          question: 'Which type of database is MongoDB?',
          options: ['Relational', 'NoSQL Document', 'Graph', 'Key-Value'],
          correct: 'NoSQL Document',
          explanation: 'MongoDB is a document-oriented NoSQL database that stores data in flexible, JSON-like documents.'
        }
      ]
    }
  ];

  const allQuestions = questionSets.flatMap(set => 
    set.questions.map(q => ({ ...q, category: set.category, icon: set.icon, color: set.color }))
  );

  const handleAnswer = (questionId: string, value: string) => {
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
      const scores = calculateTechnicalScores(answers, allQuestions);
      onComplete(scores);
    }
  };

  const calculateTechnicalScores = (answers: Record<string, any>, questions: any[]) => {
    let correct = 0;
    const categoryScores: Record<string, {correct: number, total: number}> = {};

    questions.forEach(q => {
      const category = q.category;
      if (!categoryScores[category]) {
        categoryScores[category] = { correct: 0, total: 0 };
      }
      categoryScores[category].total++;

      if (answers[q.id] === q.correct) {
        correct++;
        categoryScores[category].correct++;
      }
    });

    const overallScore = Math.round((correct / questions.length) * 100);
    
    const scores: Record<string, number> = {};
    Object.entries(categoryScores).forEach(([category, data]) => {
      scores[category] = Math.round((data.correct / data.total) * 100);
    });

    return {
      answers,
      scores: {
        ...scores,
        overall: overallScore,
        details: categoryScores
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
              <CardDescription>Choose the correct answer</CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          <RadioGroup
            value={currentAnswer}
            onValueChange={(value) => handleAnswer(currentQ.id, value)}
          >
            {currentQ.options.map((option, idx) => (
              <div key={idx} className="flex items-center space-x-3 p-4 rounded-lg border hover:bg-gray-50 hover:border-blue-300">
                <RadioGroupItem value={option} id={`${currentQ.id}_${idx}`} />
                <Label htmlFor={`${currentQ.id}_${idx}`} className="flex-1 cursor-pointer font-mono text-sm">
                  {option}
                </Label>
              </div>
            ))}
          </RadioGroup>

          {/* Show explanation if answered */}
          {currentAnswer && (
            <div className={`p-4 rounded-lg ${currentAnswer === currentQ.correct ? 'bg-green-50 border border-green-200' : 'bg-red-50 border border-red-200'}`}>
              <div className="flex items-center space-x-2 mb-2">
                <Badge variant={currentAnswer === currentQ.correct ? 'default' : 'destructive'}>
                  {currentAnswer === currentQ.correct ? 'Correct!' : 'Incorrect'}
                </Badge>
                {currentAnswer !== currentQ.correct && (
                  <span className="text-sm text-gray-600">
                    Correct answer: <strong>{currentQ.correct}</strong>
                  </span>
                )}
              </div>
              <p className="text-sm text-gray-700">{currentQ.explanation}</p>
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

export default TechnicalSection;
