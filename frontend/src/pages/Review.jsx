import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../components/ui/button';
import { Card, CardContent } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { CheckCircle2, XCircle, ArrowLeft } from 'lucide-react';

const Review = () => {
  const navigate = useNavigate();
  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState({});

  useEffect(() => {
    const storedQuestions = localStorage.getItem('examQuestions');
    const storedAnswers = localStorage.getItem('examAnswers');

    if (!storedQuestions || !storedAnswers) {
      navigate('/');
      return;
    }

    setQuestions(JSON.parse(storedQuestions));
    setAnswers(JSON.parse(storedAnswers));
  }, [navigate]);

  if (questions.length === 0) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="container mx-auto px-4 py-8 max-w-5xl">
        <div className="mb-8">
          <Button
            variant="outline"
            onClick={() => navigate('/results')}
            className="mb-4"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Results
          </Button>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Answer Review</h1>
          <p className="text-gray-600">Review all questions with correct and incorrect answers</p>
        </div>

        <div className="space-y-6">
          {questions.map((question, idx) => {
            const userAnswer = answers[question.id];
            const isCorrect = userAnswer === question.correctAnswer;

            return (
              <Card key={question.id} className={`border-l-4 ${
                isCorrect ? 'border-l-green-500' : 'border-l-red-500'
              }`}>
                <CardContent className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center space-x-3">
                      <Badge variant="outline">Question {idx + 1}</Badge>
                      {isCorrect ? (
                        <Badge className="bg-green-100 text-green-800 hover:bg-green-100">
                          <CheckCircle2 className="mr-1 h-3 w-3" />
                          Correct
                        </Badge>
                      ) : (
                        <Badge variant="destructive">
                          <XCircle className="mr-1 h-3 w-3" />
                          Incorrect
                        </Badge>
                      )}
                    </div>
                  </div>

                  <h3 className="text-lg font-semibold text-gray-900 mb-4">
                    {question.question}
                  </h3>

                  <div className="space-y-2">
                    {question.options.map((option) => {
                      const isUserAnswer = userAnswer === option.id;
                      const isCorrectAnswer = question.correctAnswer === option.id;

                      return (
                        <div
                          key={option.id}
                          className={`p-4 rounded-lg border-2 ${
                            isCorrectAnswer
                              ? 'border-green-500 bg-green-50'
                              : isUserAnswer
                              ? 'border-red-500 bg-red-50'
                              : 'border-gray-200 bg-white'
                          }`}
                        >
                          <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-2">
                              {isCorrectAnswer && (
                                <CheckCircle2 className="h-5 w-5 text-green-600" />
                              )}
                              {isUserAnswer && !isCorrectAnswer && (
                                <XCircle className="h-5 w-5 text-red-600" />
                              )}
                              <span className="font-medium text-gray-700">{option.id}.</span>
                              <span className={isCorrectAnswer || isUserAnswer ? 'font-medium' : ''}>
                                {option.text}
                              </span>
                            </div>
                            <div className="flex gap-2">
                              {isUserAnswer && (
                                <Badge variant="outline" className="text-xs">
                                  Your Answer
                                </Badge>
                              )}
                              {isCorrectAnswer && (
                                <Badge className="bg-green-100 text-green-800 text-xs">
                                  Correct Answer
                                </Badge>
                              )}
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        <div className="mt-8 text-center">
          <Button
            onClick={() => navigate('/results')}
            size="lg"
          >
            Back to Results
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Review;