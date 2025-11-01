import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../components/ui/button';
import { Card, CardContent } from '../components/ui/card';
import { RadioGroup, RadioGroupItem } from '../components/ui/radio-group';
import { Label } from '../components/ui/label';
import { Badge } from '../components/ui/badge';
import { CheckCircle2, Circle, AlertCircle } from 'lucide-react';
import { Alert, AlertDescription } from '../components/ui/alert';

const Exam = () => {
  const navigate = useNavigate();
  const [questions, setQuestions] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState({});
  const [showWarning, setShowWarning] = useState(false);

  useEffect(() => {
    const storedQuestions = localStorage.getItem('examQuestions');
    if (!storedQuestions) {
      navigate('/');
      return;
    }
    setQuestions(JSON.parse(storedQuestions));
  }, [navigate]);

  const handleAnswerSelect = (questionId, answerId) => {
    setAnswers(prev => ({
      ...prev,
      [questionId]: answerId
    }));
    setShowWarning(false);
  };

  const handleSubmit = () => {
    const unanswered = questions.filter(q => !answers[q.id]);
    
    if (unanswered.length > 0) {
      setShowWarning(true);
      return;
    }

    localStorage.setItem('examAnswers', JSON.stringify(answers));
    navigate('/results');
  };

  const allAnswered = questions.length > 0 && questions.every(q => answers[q.id]);

  if (questions.length === 0) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">MCQ Exam</h1>
          <p className="text-gray-600">Answer all questions and submit when ready</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Question Grid Sidebar */}
          <div className="lg:col-span-1">
            <Card className="sticky top-8">
              <CardContent className="p-4">
                <h3 className="font-semibold text-sm mb-3 text-gray-700">Question Navigator</h3>
                <div className="grid grid-cols-5 gap-2">
                  {questions.map((q, idx) => (
                    <button
                      key={q.id}
                      onClick={() => setCurrentQuestion(idx)}
                      className={`aspect-square rounded-md text-sm font-medium transition-all ${
                        currentQuestion === idx
                          ? 'bg-gray-900 text-white'
                          : answers[q.id]
                          ? 'bg-gray-200 text-gray-900 hover:bg-gray-300'
                          : 'bg-white border border-gray-300 text-gray-700 hover:border-gray-400'
                      }`}
                    >
                      {idx + 1}
                    </button>
                  ))}
                </div>
                <div className="mt-4 pt-4 border-t space-y-2 text-xs">
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">Answered:</span>
                    <Badge variant="secondary">{Object.keys(answers).length}/{questions.length}</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Question Display */}
          <div className="lg:col-span-3 space-y-6">
            {showWarning && (
              <Alert variant="destructive">
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>
                  Please answer all questions before submitting the exam.
                </AlertDescription>
              </Alert>
            )}

            <Card>
              <CardContent className="p-8">
                <div className="mb-6">
                  <Badge variant="outline" className="mb-4">
                    Question {currentQuestion + 1} of {questions.length}
                  </Badge>
                  <h2 className="text-xl font-semibold text-gray-900">
                    {questions[currentQuestion].question}
                  </h2>
                </div>

                <RadioGroup
                  value={answers[questions[currentQuestion].id] || ''}
                  onValueChange={(value) => handleAnswerSelect(questions[currentQuestion].id, value)}
                  className="space-y-3"
                >
                  {questions[currentQuestion].options.map((option) => (
                    <div
                      key={option.id}
                      className={`flex items-start space-x-3 p-4 rounded-lg border-2 transition-all cursor-pointer ${
                        answers[questions[currentQuestion].id] === option.id
                          ? 'border-gray-900 bg-gray-50'
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      <RadioGroupItem value={option.id} id={option.id} className="mt-0.5" />
                      <Label htmlFor={option.id} className="flex-1 cursor-pointer text-base">
                        <span className="font-medium text-gray-700">{option.id}.</span> {option.text}
                      </Label>
                    </div>
                  ))}
                </RadioGroup>

                <div className="flex justify-between items-center mt-8 pt-6 border-t">
                  <Button
                    variant="outline"
                    onClick={() => setCurrentQuestion(prev => Math.max(0, prev - 1))}
                    disabled={currentQuestion === 0}
                  >
                    Previous
                  </Button>
                  
                  {currentQuestion === questions.length - 1 ? (
                    <Button
                      onClick={handleSubmit}
                      className="min-w-32"
                    >
                      Submit Exam
                    </Button>
                  ) : (
                    <Button
                      onClick={() => setCurrentQuestion(prev => Math.min(questions.length - 1, prev + 1))}
                    >
                      Next
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>

            {allAnswered && (
              <Card className="bg-green-50 border-green-200">
                <CardContent className="p-4 flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <CheckCircle2 className="text-green-600" />
                    <span className="text-green-800 font-medium">All questions answered!</span>
                  </div>
                  <Button onClick={handleSubmit}>Submit Exam</Button>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Exam;