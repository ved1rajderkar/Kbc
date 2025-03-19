import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import { Question as QuestionType } from '@/data/questions';

interface QuestionProps {
  question: QuestionType;
  onAnswer: (isCorrect: boolean) => void;
  fiftyFiftyActive: boolean;
  disabled?: boolean;
  audiencePoll?: number[] | null;
}

const Question = ({ 
  question, 
  onAnswer, 
  fiftyFiftyActive, 
  disabled = false,
  audiencePoll = null
}: QuestionProps) => {
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [filteredOptions, setFilteredOptions] = useState<number[]>([]);
  const [animatingOption, setAnimatingOption] = useState<number | null>(null);
  const [showAnswer, setShowAnswer] = useState(false);
  
  useEffect(() => {
    // Reset state when question changes
    setSelectedOption(null);
    setShowAnswer(false);
    setAnimatingOption(null);
    
    // Handle 50:50 lifeline
    if (fiftyFiftyActive) {
      // Keep correct answer and one random incorrect answer
      const incorrectOptions = [0, 1, 2, 3].filter(i => i !== question.correctAnswer);
      const randomIncorrect = incorrectOptions[Math.floor(Math.random() * incorrectOptions.length)];
      
      const toKeep = [question.correctAnswer, randomIncorrect];
      const toRemove = [0, 1, 2, 3].filter(i => !toKeep.includes(i));
      
      setFilteredOptions(toRemove);
    } else {
      setFilteredOptions([]);
    }
  }, [question, fiftyFiftyActive]);
  
  const handleSelectOption = (index: number) => {
    if (disabled || filteredOptions.includes(index)) return;
    
    setSelectedOption(index);
    setAnimatingOption(index);
    
    // Add a delay to show the answer
    setTimeout(() => {
      setShowAnswer(true);
      
      // Add a delay before triggering the onAnswer callback
      setTimeout(() => {
        onAnswer(index === question.correctAnswer);
      }, 1500);
    }, 1000);
  };
  
  const getOptionClass = (index: number) => {
    const isCorrect = index === question.correctAnswer;
    const isSelected = index === selectedOption;
    const isFiltered = filteredOptions.includes(index);
    
    return cn(
      "w-full p-4 flex items-center text-left border-2 rounded-lg transition-all duration-300",
      isFiltered ? "opacity-0 pointer-events-none" : "opacity-100",
      showAnswer && isCorrect ? "border-green-500 bg-green-50" : "",
      showAnswer && isSelected && !isCorrect ? "border-red-500 bg-red-50" : "",
      !showAnswer && !isFiltered ? "hover:border-blue-400 hover:bg-blue-50/50 hover:translate-y-[-2px]" : "",
      animatingOption === index && !showAnswer ? "border-blue-400 bg-blue-50/30" : "",
      !showAnswer && !isFiltered && !isSelected ? "border-gray-200" : "",
      disabled ? "cursor-not-allowed opacity-70" : "cursor-pointer"
    );
  };
  
  const labels = ['A', 'B', 'C', 'D'];
  
  return (
    <div className="w-full max-w-3xl animate-scale-in">
      <Card className="mb-6 p-6 shadow-md">
        <div className="text-xl md:text-2xl font-medium mb-2 text-center">{question.text}</div>
        <div className="text-xs text-muted-foreground text-center mt-1 mb-2">
          Question for ₹{question.prize.toLocaleString()}
        </div>
      </Card>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {question.options.map((option, index) => (
          <Button
            key={index}
            variant="ghost"
            className={getOptionClass(index)}
            onClick={() => handleSelectOption(index)}
            disabled={disabled || selectedOption !== null}
          >
            <div className="flex items-center w-full">
              <span className="w-8 h-8 rounded-full bg-muted flex items-center justify-center mr-3 text-sm font-medium">
                {labels[index]}
              </span>
              <span className="flex-1">{option}</span>
              {audiencePoll && !filteredOptions.includes(index) && (
                <span className="ml-2 text-sm text-muted-foreground">{audiencePoll[index]}%</span>
              )}
            </div>
          </Button>
        ))}
      </div>
    </div>
  );
};

export default Question;
