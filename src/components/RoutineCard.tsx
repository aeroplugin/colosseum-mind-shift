
import { Routine } from "@/types";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import PrimaryButton from "@/components/ui/PrimaryButton";
import { Brain, Target, Zap, Award, Smile, Snowflake, Eye, Scissors, User } from "lucide-react";

interface RoutineCardProps {
  routine: Routine;
  onStart: (routineId: string) => void;
  compact?: boolean;
}

const RoutineCard: React.FC<RoutineCardProps> = ({
  routine,
  onStart,
  compact = false
}) => {
  const getIcon = (iconName: string) => {
    switch (iconName) {
      case "brain": return <Brain className="w-6 h-6 text-[#D8C5A3]" />;
      case "target": return <Target className="w-6 h-6 text-[#D8C5A3]" />;
      case "zap": return <Zap className="w-6 h-6 text-[#D8C5A3]" />;
      case "award": return <Award className="w-6 h-6 text-[#D8C5A3]" />;
      case "smile": return <Smile className="w-6 h-6 text-[#D8C5A3]" />;
      case "snowflake": return <Snowflake className="w-6 h-6 text-[#D8C5A3]" />;
      case "eye": return <Eye className="w-6 h-6 text-[#D8C5A3]" />;
      case "scissors": return <Scissors className="w-6 h-6 text-[#D8C5A3]" />;
      case "user": return <User className="w-6 h-6 text-[#D8C5A3]" />;
      default: return <Brain className="w-6 h-6 text-[#D8C5A3]" />;
    }
  };

  return (
    <Card className="bg-[#121212] border border-[#2A2A2A] text-[#F5F5F5] shadow-lg overflow-hidden hover:border-[#D8C5A3] transition-all">
      <CardHeader className="pb-2">
        <div className="flex justify-between items-center">
          {getIcon(routine.iconName)}
          <span className="text-[#D8C5A3] text-sm">{routine.duration}</span>
        </div>
        <CardTitle className="text-xl font-trajan tracking-wide text-[#F5F5F5] uppercase mt-2">
          {routine.name}
        </CardTitle>
        <CardDescription className="text-[#B3B3B3]">
          {routine.purpose}
        </CardDescription>
      </CardHeader>
      <CardContent>
        {!compact && (
          <div className="mb-4">
            <h4 className="text-[#D8C5A3] text-sm uppercase mb-2">Steps:</h4>
            <ul className="space-y-1 text-sm text-[#F5F5F5]">
              {routine.steps.map((step, index) => (
                <li key={index} className="flex items-start">
                  <span className="mr-2 text-[#D8C5A3]">{index + 1}.</span>
                  <span>{step}</span>
                </li>
              ))}
            </ul>
            <p className="mt-3 text-xs text-[#B3B3B3] italic">{routine.science}</p>
          </div>
        )}
        <div className="flex flex-wrap gap-2 mb-4">
          {routine.tags.map(tag => (
            <span key={tag} className="px-2 py-1 bg-[#2A2A2A] text-[#D8C5A3] text-xs rounded-full">
              {tag}
            </span>
          ))}
        </div>
        <PrimaryButton 
          variant="primary" 
          className="w-full" 
          onClick={() => onStart(routine.id)}
        >
          Start Routine
        </PrimaryButton>
      </CardContent>
    </Card>
  );
};

export default RoutineCard;
