import { Heart, Shield } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";

export const WelcomeScreen = () => {
  return (
    <div className="flex flex-col items-center justify-center p-6 text-center space-y-6 animate-in fade-in duration-500">
      <div className="flex items-center gap-3">
        <div className="p-3 bg-primary/10 rounded-2xl">
          <Heart className="h-8 w-8 text-primary" />
        </div>
        <h1 className="text-3xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
          DiaCare Assistant
        </h1>
      </div>
      
      <p className="text-muted-foreground max-w-md text-lg">
        Your friendly companion for understanding diabetes and building healthy habits 💙
      </p>

      <Alert className="max-w-md border-accent/20 bg-accent/5">
        <Shield className="h-4 w-4 text-accent" />
        <AlertDescription className="text-sm">
          <strong className="text-accent">Important:</strong> I'm here to provide education and support, 
          but I'm not a doctor. Always consult your healthcare provider for medical advice, 
          diagnoses, or treatment decisions.
        </AlertDescription>
      </Alert>

      <div className="grid grid-cols-2 gap-4 max-w-md text-sm">
        <div className="p-4 rounded-xl bg-card border border-border">
          <span className="text-2xl mb-2 block">🥗</span>
          <p className="font-medium">Meal Planning</p>
          <p className="text-muted-foreground text-xs mt-1">Healthy eating tips</p>
        </div>
        <div className="p-4 rounded-xl bg-card border border-border">
          <span className="text-2xl mb-2 block">🚶</span>
          <p className="font-medium">Exercise</p>
          <p className="text-muted-foreground text-xs mt-1">Activity guidance</p>
        </div>
        <div className="p-4 rounded-xl bg-card border border-border">
          <span className="text-2xl mb-2 block">📊</span>
          <p className="font-medium">Monitoring</p>
          <p className="text-muted-foreground text-xs mt-1">Track your health</p>
        </div>
        <div className="p-4 rounded-xl bg-card border border-border">
          <span className="text-2xl mb-2 block">💪</span>
          <p className="font-medium">Motivation</p>
          <p className="text-muted-foreground text-xs mt-1">Stay encouraged</p>
        </div>
      </div>

      <p className="text-sm text-muted-foreground">
        Ask me anything about diabetes management! 😊
      </p>
    </div>
  );
};
