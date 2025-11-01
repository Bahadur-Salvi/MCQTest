import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { Download, Home, Eye } from 'lucide-react';

const Results = () => {
  const navigate = useNavigate();
  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState({});
  const [score, setScore] = useState(0);
  const [percentage, setPercentage] = useState(0);

  useEffect(() => {
    const storedQuestions = localStorage.getItem('examQuestions');
    const storedAnswers = localStorage.getItem('examAnswers');

    if (!storedQuestions || !storedAnswers) {
      navigate('/');
      return;
    }

    const questionsData = JSON.parse(storedQuestions);
    const answersData = JSON.parse(storedAnswers);

    setQuestions(questionsData);
    setAnswers(answersData);

    let correctCount = 0;
    questionsData.forEach(q => {
      if (q.type === 'MSQ') {
        const userAnswers = answersData[q.id] || [];
        const correctAnswers = q.correctAnswer;
        
        const isCorrect = correctAnswers.length === userAnswers.length &&
          correctAnswers.every(ans => userAnswers.includes(ans));
        
        if (isCorrect) {
          correctCount++;
        }
      } else {
        if (answersData[q.id] === q.correctAnswer) {
          correctCount++;
        }
      }
    });

    setScore(correctCount);
    setPercentage(Math.round((correctCount / questionsData.length) * 100));
  }, [navigate]);

  const downloadResults = () => {
    const results = {
      score: score,
      total: questions.length,
      percentage: percentage,
      date: new Date().toISOString(),
      questions: questions.map(q => {
        if (q.type === 'MSQ') {
          const userAnswers = answers[q.id] || [];
          const correctAnswers = q.correctAnswer;
          const isCorrect = correctAnswers.length === userAnswers.length &&
            correctAnswers.every(ans => userAnswers.includes(ans));
          return {
            question: q.question,
            type: q.type,
            yourAnswers: userAnswers,
            correctAnswers: correctAnswers,
            isCorrect: isCorrect
          };
        } else {
          return {
            question: q.question,
            type: q.type,
            yourAnswer: answers[q.id],
            correctAnswer: q.correctAnswer,
            isCorrect: answers[q.id] === q.correctAnswer
          };
        }
      })
    };

    const blob = new Blob([JSON.stringify(results, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `exam-results-${Date.now()}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const getScoreColor = () => {
    if (percentage >= 80) return 'text-green-600';
    if (percentage >= 60) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getScoreBadge = () => {
    if (percentage >= 80) return 'Excellent';
    if (percentage >= 60) return 'Good';
    if (percentage >= 40) return 'Fair';
    return 'Needs Improvement';
  };

  if (questions.length === 0) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="container mx-auto px-4 py-12 max-w-4xl">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Exam Results</h1>
          <p className="text-gray-600">Here's how you performed</p>
        </div>

        <Card className="shadow-lg mb-6">
          <CardHeader className="text-center pb-4">
            <CardTitle className="text-6xl font-bold mb-4">
              <span className={getScoreColor()}>{percentage}%</span>
            </CardTitle>
            <div className="space-y-2">
              <Badge className="text-base px-4 py-1">{getScoreBadge()}</Badge>
              <p className="text-2xl font-semibold text-gray-700">
                {score} out of {questions.length} correct
              </p>
            </div>
          </CardHeader>
          <CardContent>
            <div className="w-full bg-gray-200 rounded-full h-4 mb-6">
              <div
                className="bg-gray-900 h-4 rounded-full transition-all duration-1000"
                style={{ width: `${percentage}%` }}
              />
            </div>

            <div className="grid grid-cols-3 gap-4 text-center">
              <div className="p-4 bg-green-50 rounded-lg">
                <p className="text-2xl font-bold text-green-600">{score}</p>
                <p className="text-sm text-gray-600">Correct</p>
              </div>
              <div className="p-4 bg-red-50 rounded-lg">
                <p className="text-2xl font-bold text-red-600">{questions.length - score}</p>
                <p className="text-sm text-gray-600">Incorrect</p>
              </div>
              <div className="p-4 bg-gray-50 rounded-lg">
                <p className="text-2xl font-bold text-gray-900">{questions.length}</p>
                <p className="text-sm text-gray-600">Total</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="flex flex-col sm:flex-row gap-4">
          <Button
            onClick={() => navigate('/review')}
            className="flex-1 h-12"
            variant="outline"
          >
            <Eye className="mr-2 h-4 w-4" />
            Review Answers
          </Button>
          <Button
            onClick={downloadResults}
            className="flex-1 h-12"
            variant="outline"
          >
            <Download className="mr-2 h-4 w-4" />
            Download Results
          </Button>
          <Button
            onClick={() => {
              localStorage.removeItem('examQuestions');
              localStorage.removeItem('examAnswers');
              navigate('/');
            }}
            className="flex-1 h-12"
          >
            <Home className="mr-2 h-4 w-4" />
            New Exam
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Results;