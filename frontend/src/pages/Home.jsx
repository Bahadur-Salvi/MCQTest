import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Upload, FileText, AlertCircle } from 'lucide-react';
import { Alert, AlertDescription } from '../components/ui/alert';

const Home = () => {
  const navigate = useNavigate();
  const [file, setFile] = useState(null);
  const [error, setError] = useState('');
  const [dragActive, setDragActive] = useState(false);

  const parseCSV = (text) => {
    const lines = text.split('\n').filter(line => line.trim());
    if (lines.length < 2) {
      throw new Error('CSV file must contain at least a header and one question');
    }

    const questions = [];
    for (let i = 1; i < lines.length; i++) {
      const line = lines[i].trim();
      if (!line) continue;

      const values = line.split(',').map(v => v.trim());
      
      if (values.length < 6) {
        throw new Error(`Line ${i + 1}: Expected 6 columns (question, option_a, option_b, option_c, option_d, correct_answer)`);
      }

      const correctAnswerValue = values[5].toUpperCase();
      const correctAnswers = correctAnswerValue.split(',').map(ans => ans.trim()).filter(ans => ans);
      
      const isMSQ = correctAnswers.length > 1;

      questions.push({
        id: i,
        question: values[0],
        options: [
          { id: 'A', text: values[1] },
          { id: 'B', text: values[2] },
          { id: 'C', text: values[3] },
          { id: 'D', text: values[4] }
        ],
        correctAnswer: isMSQ ? correctAnswers : correctAnswers[0],
        type: isMSQ ? 'MSQ' : 'MCQ'
      });
    }

    return questions;
  };

  const handleFileChange = (selectedFile) => {
    setError('');
    
    if (!selectedFile) {
      setFile(null);
      return;
    }

    if (!selectedFile.name.endsWith('.csv')) {
      setError('Please upload a CSV file');
      return;
    }

    setFile(selectedFile);
  };

  const handleStartExam = () => {
    if (!file) {
      setError('Please upload a CSV file first');
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const questions = parseCSV(e.target.result);
        if (questions.length === 0) {
          setError('No valid questions found in the CSV file');
          return;
        }
        localStorage.setItem('examQuestions', JSON.stringify(questions));
        navigate('/exam');
      } catch (err) {
        setError(err.message);
      }
    };
    reader.readAsText(file);
  };

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFileChange(e.dataTransfer.files[0]);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="container mx-auto px-4 py-12 max-w-4xl">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-3">MCQ/MSQ Testing Platform</h1>
          <p className="text-gray-600 text-lg">Upload your CSV file and start your exam</p>
        </div>

        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle className="text-2xl">Upload Question File</CardTitle>
            <CardDescription>
              CSV format: question, option_a, option_b, option_c, option_d, correct_answer(s)<br/>
              For MSQ: Use comma-separated correct answers (e.g., A,C). For MCQ: Use single answer (e.g., B)
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div
              className={`border-2 border-dashed rounded-lg p-12 text-center transition-colors ${
                dragActive ? 'border-gray-900 bg-gray-50' : 'border-gray-300 hover:border-gray-400'
              }`}
              onDragEnter={handleDrag}
              onDragLeave={handleDrag}
              onDragOver={handleDrag}
              onDrop={handleDrop}
            >
              <input
                type="file"
                accept=".csv"
                onChange={(e) => handleFileChange(e.target.files[0])}
                className="hidden"
                id="file-upload"
              />
              <label htmlFor="file-upload" className="cursor-pointer">
                <div className="flex flex-col items-center space-y-4">
                  {file ? (
                    <>
                      <FileText className="w-16 h-16 text-gray-900" />
                      <div>
                        <p className="text-lg font-medium text-gray-900">{file.name}</p>
                        <p className="text-sm text-gray-500">Click to change file</p>
                      </div>
                    </>
                  ) : (
                    <>
                      <Upload className="w-16 h-16 text-gray-400" />
                      <div>
                        <p className="text-lg font-medium text-gray-700">Drop your CSV file here</p>
                        <p className="text-sm text-gray-500">or click to browse</p>
                      </div>
                    </>
                  )}
                </div>
              </label>
            </div>

            {error && (
              <Alert variant="destructive">
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}

            <div className="bg-gray-50 rounded-lg p-4 space-y-2">
              <p className="text-sm font-medium text-gray-700">CSV Format Example:</p>
              <pre className="text-xs text-gray-600 bg-white p-3 rounded border overflow-x-auto">
question,option_a,option_b,option_c,option_d,correct_answer
What is 2+2?,3,4,5,6,B
Capital of France?,London,Berlin,Paris,Madrid,C
Select prime numbers,1,2,3,4,"B,C"
              </pre>
            </div>

            <Button
              onClick={handleStartExam}
              disabled={!file}
              className="w-full h-12 text-lg"
              size="lg"
            >
              Start Exam
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Home;