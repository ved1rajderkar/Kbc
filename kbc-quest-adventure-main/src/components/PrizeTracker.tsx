
import { cn } from '@/lib/utils';

interface PrizeTrackerProps {
  prizes: number[];
  currentPrizeIndex: number;
}

const PrizeTracker = ({ prizes, currentPrizeIndex }: PrizeTrackerProps) => {
  const reversedIndex = prizes.length - 1 - currentPrizeIndex;
  
  return (
    <div className="w-full max-w-xs">
      <div className="space-y-2">
        {prizes.map((prize, index) => {
          // Whether this is a milestone (guaranteed) prize
          const isMilestone = index === prizes.length - 1 || index === prizes.length - 5 || index === prizes.length - 9;
          // Whether this is the current question's prize
          const isCurrent = index === reversedIndex;
          // Whether this prize is won already
          const isWon = index > reversedIndex;
          
          return (
            <div 
              key={index} 
              className={cn(
                "flex items-center px-4 py-2 rounded-lg text-sm transition-all duration-300",
                isMilestone ? "border-l-4 border-prize-milestone" : "",
                isCurrent ? "bg-prize-current/10 border-l-4 border-prize-current" : "",
                isWon ? "text-muted-foreground" : "",
                !isCurrent && !isWon ? "opacity-70" : "opacity-100"
              )}
            >
              <div className={cn(
                "w-6 h-6 rounded-full flex items-center justify-center text-xs mr-3",
                isCurrent ? "bg-prize-current text-white" : "bg-muted text-muted-foreground"
              )}>
                {prizes.length - index}
              </div>
              <span className={cn(
                "font-medium",
                isMilestone ? "text-prize-milestone" : "",
                isCurrent ? "text-prize-current" : ""
              )}>
                ₹{prize.toLocaleString()}
              </span>
              {isMilestone && (
                <span className="ml-auto text-xs text-muted-foreground">
                  {index === prizes.length - 1 ? "Grand Prize" : "Milestone"}
                </span>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default PrizeTracker;
