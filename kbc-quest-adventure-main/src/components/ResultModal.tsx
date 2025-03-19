
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Trophy, Home, RotateCcw } from 'lucide-react';

interface ResultModalProps {
  won: boolean;
  finalPrize: number;
  questionNumber: number;
  totalQuestions: number;
  onPlayAgain: () => void;
}

const ResultModal = ({ won, finalPrize, questionNumber, totalQuestions, onPlayAgain }: ResultModalProps) => {
  const navigate = useNavigate();
  
  useEffect(() => {
    // Disable scrolling when modal is shown
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, []);
  
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
      <Card className="max-w-md w-full p-6 animate-scale-in">
        <div className="text-center">
          {won ? (
            <div className="inline-block p-4 rounded-full bg-green-100 text-green-700 mb-4">
              <Trophy size={40} />
            </div>
          ) : (
            <div className="inline-block p-4 rounded-full bg-amber-100 text-amber-700 mb-4">
              <Trophy size={40} />
            </div>
          )}

          <h2 className="text-2xl font-bold mb-2">
            {won ? "Congratulations!" : "Game Over!"}
          </h2>
          
          <p className="text-muted-foreground mb-6">
            {won 
              ? "You've won the grand prize! You're a millionaire!" 
              : `You've won ₹${finalPrize.toLocaleString()}`
            }
          </p>
          
          <div className="bg-muted/40 rounded-lg p-4 mb-6">
            <div className="flex justify-between mb-2">
              <span className="text-muted-foreground">Questions Answered</span>
              <span className="font-medium">{questionNumber} of {totalQuestions}</span>
            </div>
            
            <div className="flex justify-between">
              <span className="text-muted-foreground">Prize Won</span>
              <span className="font-medium">₹{finalPrize.toLocaleString()}</span>
            </div>
          </div>
        </div>
        
        <Separator className="my-6" />
        
        <div className="flex flex-col sm:flex-row gap-3">
          <Button 
            variant="outline" 
            className="flex-1"
            onClick={() => navigate('/')}
          >
            <Home size={18} className="mr-2" />
            Home
          </Button>
          
          <Button 
            className="flex-1"
            onClick={onPlayAgain}
          >
            <RotateCcw size={18} className="mr-2" />
            Play Again
          </Button>
        </div>
      </Card>
    </div>
  );
};

export default ResultModal;
