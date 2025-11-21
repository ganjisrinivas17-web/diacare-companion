import { Button } from "@/components/ui/button";
import { Utensils, Dumbbell, Heart, Lightbulb } from "lucide-react";

interface QuickActionsProps {
  onActionClick: (message: string) => void;
  disabled?: boolean;
}

export const QuickActions = ({ onActionClick, disabled }: QuickActionsProps) => {
  const actions = [
    {
      icon: Utensils,
      label: "Meal Ideas",
      message: "Can you suggest some healthy meal ideas for diabetes?",
    },
    {
      icon: Dumbbell,
      label: "Exercise Tips",
      message: "What are some good exercises for people with diabetes?",
    },
    {
      icon: Heart,
      label: "A1C Explained",
      message: "Can you explain what A1C is and why it's important?",
    },
    {
      icon: Lightbulb,
      label: "Daily Tips",
      message: "Give me a motivational tip for managing diabetes today",
    },
  ];

  return (
    <div className="grid grid-cols-2 gap-2 mb-4">
      {actions.map((action) => (
        <Button
          key={action.label}
          variant="outline"
          className="h-auto flex-col items-start p-3 text-left hover:bg-muted/50 transition-colors"
          onClick={() => onActionClick(action.message)}
          disabled={disabled}
        >
          <action.icon className="h-5 w-5 mb-2 text-primary" />
          <span className="text-sm font-medium">{action.label}</span>
        </Button>
      ))}
    </div>
  );
};
