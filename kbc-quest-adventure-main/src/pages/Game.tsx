
import { useEffect } from 'react';
import GameBoard from '@/components/GameBoard';
import { questions } from '@/data/questions';

const Game = () => {
  useEffect(() => {
    // Scroll to top when component mounts
    window.scrollTo(0, 0);
  }, []);
  
  return (
    <div className="min-h-screen bg-background">
      <GameBoard questions={questions} />
    </div>
  );
};

export default Game;
