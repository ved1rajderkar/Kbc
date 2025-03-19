
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Question as QuestionType, prizeLadder } from '@/data/questions';
import Question from './Question';
import PrizeTracker from './PrizeTracker';
import LifelineButton from './LifelineButton';
import ResultModal from './ResultModal';
import { toast } from 'sonner';

interface GameBoardProps {
  questions: QuestionType[];
}

const GameBoard = ({ questions }: GameBoardProps) => {
  const navigate = useNavigate();
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [gameState, setGameState] = useState<'playing' | 'won' | 'lost'>('playing');
  const [finalPrize, setFinalPrize] = useState(0);
  const [fiftyFiftyUsed, setFiftyFiftyUsed] = useState(false);
  const [audiencePollUsed, setAudiencePollUsed] = useState(false);
  const [phoneUsed, setPhoneUsed] = useState(false);
  const [audiencePollResults, setAudiencePollResults] = useState<number[] | null>(null);
  const [isAnswering, setIsAnswering] = useState(false);
  
  const currentQuestion = questions[currentQuestionIndex];
  
  // Function to calculate audience poll results
  const generateAudiencePoll = () => {
    const correctIndex = currentQuestion.correctAnswer;
    const results: number[] = [];
    let remaining = 100;
    
    // Assign a higher percentage to the correct answer based on difficulty
    let correctPercentage;
    switch (currentQuestion.difficulty) {
      case 'easy':
        correctPercentage = 45 + Math.floor(Math.random() * 30); // 45-75%
        break;
      case 'medium':
        correctPercentage = 35 + Math.floor(Math.random() * 25); // 35-60%
        break;
      case 'hard':
        correctPercentage = 25 + Math.floor(Math.random() * 20); // 25-45%
        break;
    }
    
    remaining -= correctPercentage;
    
    // Distribute the remaining percentage among the incorrect options
    for (let i = 0; i < 4; i++) {
      if (i === correctIndex) {
        results[i] = correctPercentage;
      } else {
        // For the last option, assign all remaining percentage
        if (i === 3 || (i === 2 && correctIndex === 3)) {
          results[i] = remaining;
          remaining = 0;
        } else {
          // Assign a random percentage of what's left
          const percentage = Math.floor(Math.random() * remaining / 2);
          results[i] = percentage;
          remaining -= percentage;
        }
      }
    }
    
    return results;
  };
  
  const use5050 = () => {
    setFiftyFiftyUsed(true);
    toast.success("50:50 lifeline used! Two incorrect answers removed.");
  };
  
  const useAudiencePoll = () => {
    setAudiencePollUsed(true);
    const results = generateAudiencePoll();
    setAudiencePollResults(results);
    toast.success("Audience poll results are in!");
  };
  
  const usePhoneAFriend = () => {
    setPhoneUsed(true);
    
    // Determine if the friend gives correct answer based on difficulty
    let isCorrect;
    switch (currentQuestion.difficulty) {
      case 'easy':
        isCorrect = Math.random() < 0.9; // 90% chance of correct answer
        break;
      case 'medium':
        isCorrect = Math.random() < 0.7; // 70% chance of correct answer
        break;
      case 'hard':
        isCorrect = Math.random() < 0.5; // 50% chance of correct answer
        break;
    }
    
    const answer = isCorrect 
      ? currentQuestion.options[currentQuestion.correctAnswer]
      : currentQuestion.options[
          [0, 1, 2, 3].filter(i => i !== currentQuestion.correctAnswer)[
            Math.floor(Math.random() * 3)
          ]
        ];
    
    toast.success("Your friend says: I'm pretty sure the answer is " + answer);
  };
  
  const handleAnswer = (isCorrect: boolean) => {
    setIsAnswering(true);
    
    setTimeout(() => {
      if (isCorrect) {
        // If this was the last question, player won the game
        if (currentQuestionIndex === questions.length - 1) {
          setGameState('won');
          setFinalPrize(questions[currentQuestionIndex].prize);
        } else {
          // Move to the next question
          setCurrentQuestionIndex(prev => prev + 1);
          
          // Reset audience poll results when moving to next question
          setAudiencePollResults(null);
          
          toast.success("Correct answer! Moving to the next question.");
        }
      } else {
        // Player lost
        setGameState('lost');
        
        // Determine the prize based on milestones
        let prize = 0;
        if (currentQuestionIndex >= 8) { // Passed the 2nd milestone (Q9)
          prize = questions[8].prize;
        } else if (currentQuestionIndex >= 4) { // Passed the 1st milestone (Q5)
          prize = questions[4].prize;
        }
        
        setFinalPrize(prize);
      }
      
      setIsAnswering(false);
    }, 500);
  };
  
  const restartGame = () => {
    setCurrentQuestionIndex(0);
    setGameState('playing');
    setFinalPrize(0);
    setFiftyFiftyUsed(false);
    setAudiencePollUsed(false);
    setPhoneUsed(false);
    setAudiencePollResults(null);
  };
  
  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="p-4 border-b">
        <div className="container mx-auto flex justify-between items-center">
          <Button variant="ghost" size="sm" onClick={() => navigate('/')}>
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Home
          </Button>
          
          <div className="flex gap-2">
            <LifelineButton 
              type="50-50" 
              onUse={use5050}
              disabled={isAnswering}
            />
            <LifelineButton 
              type="audience" 
              onUse={useAudiencePoll}
              disabled={isAnswering}
            />
            <LifelineButton 
              type="phone" 
              onUse={usePhoneAFriend}
              disabled={isAnswering}
            />
          </div>
        </div>
      </header>
      
      {/* Main game area */}
      <main className="flex-1 container mx-auto py-6 px-4">
        <div className="flex flex-col lg:flex-row gap-6 lg:gap-12 justify-center items-start">
          {/* Question area */}
          <div className="flex-1 w-full flex justify-center">
            <Question 
              question={currentQuestion}
              onAnswer={handleAnswer}
              fiftyFiftyActive={fiftyFiftyUsed && audiencePollResults === null}
              disabled={isAnswering}
              audiencePoll={audiencePollResults}
            />
          </div>
          
          {/* Prize ladder */}
          <div className="w-full lg:w-auto">
            <PrizeTracker 
              prizes={prizeLadder} 
              currentPrizeIndex={currentQuestionIndex}
            />
          </div>
        </div>
      </main>
      
      {/* Result modal */}
      {gameState !== 'playing' && (
        <ResultModal 
          won={gameState === 'won'} 
          finalPrize={finalPrize}
          questionNumber={currentQuestionIndex}
          totalQuestions={questions.length}
          onPlayAgain={restartGame}
        />
      )}
    </div>
  );
};

export default GameBoard;
