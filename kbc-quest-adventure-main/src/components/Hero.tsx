
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowRight, Trophy, HelpCircle } from 'lucide-react';

const Hero = () => {
  const navigate = useNavigate();
  const [isHovering, setIsHovering] = useState(false);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 sm:px-6 relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-blue-50/30 to-blue-100/10 z-0" />
      
      <div className="absolute w-[500px] h-[500px] rounded-full bg-blue-100/50 blur-3xl -top-64 -right-64 z-0" />
      <div className="absolute w-[300px] h-[300px] rounded-full bg-blue-200/30 blur-2xl -bottom-20 -left-20 z-0" />
      
      <div className="relative z-10 max-w-4xl w-full text-center space-y-10">
        <div 
          className="space-y-3 animate-fade-in"
          style={{ animationDelay: '0.2s' }}
        >
          <h2 className="text-sm sm:text-base font-medium text-blue-600 tracking-wide">
            THE ULTIMATE QUIZ CHALLENGE
          </h2>
          <h1 className="text-4xl sm:text-6xl md:text-7xl font-bold tracking-tighter text-balance">
            Who Wants to Be a<br/>
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-blue-400">
              Millionaire
            </span>
          </h1>
          <p className="max-w-lg mx-auto text-muted-foreground text-balance pt-2">
            Test your knowledge in this classic trivia game. Answer 12 increasingly difficult questions to win the grand prize.
          </p>
        </div>
        
        <div 
          className="flex flex-col sm:flex-row gap-4 justify-center items-center animate-fade-in"
          style={{ animationDelay: '0.5s' }}
        >
          <Button 
            size="lg" 
            className="group relative overflow-hidden glass border-0 px-8 py-6 text-black hover:text-black hover:shadow-xl transition-all duration-300"
            onClick={() => navigate('/game')}
            onMouseEnter={() => setIsHovering(true)}
            onMouseLeave={() => setIsHovering(false)}
          >
            <div className="absolute inset-0 bg-blue-500/10 group-hover:bg-blue-500/20 transition-colors duration-300" />
            <span className="relative z-10 font-medium text-lg flex items-center gap-2">
              Start Game
              <ArrowRight className={`transition-transform duration-300 ${isHovering ? 'translate-x-1' : ''}`} size={20} />
            </span>
          </Button>
          
          <Button 
            variant="outline" 
            size="lg"
            className="border-[1.5px] px-8 py-6 hover:bg-secondary"
          >
            <HelpCircle className="mr-2 h-5 w-5" />
            How to Play
          </Button>
        </div>
        
        <div 
          className="flex justify-center gap-8 pt-6 animate-fade-in"
          style={{ animationDelay: '0.7s' }}
        >
          <div className="flex items-center gap-2 text-muted-foreground">
            <Trophy size={18} />
            <span>12 Questions</span>
          </div>
          <div className="flex items-center gap-2 text-muted-foreground">
            <Trophy size={18} />
            <span>3 Lifelines</span>
          </div>
          <div className="flex items-center gap-2 text-muted-foreground">
            <Trophy size={18} />
            <span>₹1,000,000 Prize</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
