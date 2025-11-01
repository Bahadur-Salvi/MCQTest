# MCQ Testing Platform

A clean and simple Multiple Choice Question (MCQ) testing web application built with React. Upload a CSV file with questions and take an exam with instant results and review capabilities.

## Features

- ✅ **CSV File Upload**: Upload questions in CSV format with drag-and-drop support
- ✅ **Grid Navigation**: Jump to any question using the question navigator
- ✅ **Real-time Progress**: Track answered vs unanswered questions
- ✅ **Instant Results**: Get immediate feedback with percentage score
- ✅ **Review Mode**: Review all answers with correct/incorrect marking
- ✅ **Download Results**: Export results as JSON file
- ✅ **Clean Design**: Minimal and focused user interface
- ✅ **Fully Client-Side**: No backend required, works entirely in browser

## CSV Format

Your CSV file should follow this format:

```csv
question,option_a,option_b,option_c,option_d,correct_answer
What is 2+2?,3,4,5,6,B
What is the capital of France?,London,Berlin,Paris,Madrid,C
```

**Fields:**
- `question`: The question text
- `option_a`: First option
- `option_b`: Second option
- `option_c`: Third option
- `option_d`: Fourth option
- `correct_answer`: The correct answer (A, B, C, or D)

## Getting Started

### Prerequisites
- Node.js 14+ and Yarn

### Installation

```bash
# Install dependencies
cd frontend
yarn install

# Start development server
yarn start
```

The app will open at `http://localhost:3000`

### Testing

1. Use the included `sample_questions.csv` file
2. Upload it on the home page
3. Click "Start Exam"
4. Answer questions using the grid navigator
5. Submit and view results
6. Review answers to see correct/incorrect

## Technology Stack

- **React 19** - UI framework
- **React Router** - Navigation
- **Tailwind CSS** - Styling
- **shadcn/ui** - UI components
- **Lucide React** - Icons

## Project Structure

```
frontend/
├── src/
│   ├── pages/
│   │   ├── Home.jsx        # File upload page
│   │   ├── Exam.jsx        # Exam taking page
│   │   ├── Results.jsx     # Results display
│   │   └── Review.jsx      # Answer review page
│   ├── components/ui/      # shadcn UI components
│   ├── App.js              # Main app component
│   └── index.css           # Global styles
└── package.json
```

## Deployment

This app is designed to be easily deployed to Netlify. See [DEPLOYMENT.md](./DEPLOYMENT.md) for detailed instructions.

**Quick Deploy:**
1. Build: `cd frontend && yarn build`
2. Deploy the `frontend/build` folder to Netlify

## Features in Detail

### Home Page
- Drag and drop or click to upload CSV files
- CSV format validation
- Clear error messages
- Format example display

### Exam Page
- Question navigator grid with visual status
- Current question display
- Radio button options
- Next/Previous navigation
- Submit validation (ensures all questions answered)
- Progress indicator

### Results Page
- Large percentage score display
- Score categorization (Excellent/Good/Fair/Needs Improvement)
- Correct vs Incorrect breakdown
- Visual progress bar
- Three action buttons: Review Answers, Download Results, New Exam

### Review Page
- All questions displayed with full context
- Green border for correct answers
- Red border for incorrect answers
- Clear visual indicators for your answer vs correct answer
- Easy navigation back to results

## Browser Support

- Chrome (recommended)
- Firefox
- Safari
- Edge

## License

MIT License - feel free to use this project for any purpose.

## Sample Data

A `sample_questions.csv` file with 10 sample questions is included for testing.
