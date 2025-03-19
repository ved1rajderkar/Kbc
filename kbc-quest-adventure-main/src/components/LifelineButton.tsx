
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { Divide, Users, Phone } from 'lucide-react';

type LifelineType = '50-50' | 'audience' | 'phone';

interface LifelineButtonProps {
  type: LifelineType;
  onUse: () => void;
  disabled?: boolean;
}

const LifelineButton = ({ type, onUse, disabled = false }: LifelineButtonProps) => {
  const [isUsed, setIsUsed] = useState(false);
  
  const handleUse = () => {
    if (!isUsed && !disabled) {
      setIsUsed(true);
      onUse();
    }
  };
  
  const getIcon = () => {
    switch (type) {
      case '50-50':
        return <Divide size={18} />;
      case 'audience':
        return <Users size={18} />;
      case 'phone':
        return <Phone size={18} />;
    }
  };
  
  const getLabel = () => {
    switch (type) {
      case '50-50':
        return "50:50";
      case 'audience':
        return "Audience Poll";
      case 'phone':
        return "Phone a Friend";
    }
  };
  
  return (
    <Button
      variant="outline"
      size="sm"
      onClick={handleUse}
      disabled={isUsed || disabled}
      className={cn(
        "relative transition-all duration-300",
        isUsed ? "opacity-50 grayscale" : "hover:bg-secondary",
        disabled && !isUsed ? "cursor-not-allowed opacity-70" : ""
      )}
    >
      <span className="flex items-center gap-1.5">
        {getIcon()}
        {getLabel()}
      </span>
    </Button>
  );
};

export default LifelineButton;
