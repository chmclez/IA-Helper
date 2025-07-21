import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { BookOpen, Clock, Upload, CheckCircle } from "lucide-react";

interface SubjectCardProps {
  subject: {
    id: string;
    name: string;
    level: "HL" | "SL";
    progress: number;
    nextMilestone: string;
    dueDate: string;
    color: string;
    icon: string;
  };
  onClick: () => void;
}

export const SubjectCard = ({ subject, onClick }: SubjectCardProps) => {
  const getProgressColor = (progress: number) => {
    if (progress >= 80) return "secondary";
    if (progress >= 60) return "warning";
    return "primary";
  };

  const getIconComponent = (iconName: string) => {
    const icons = {
      physics: "⚛️",
      chemistry: "🧪",
      math: "📐",
      economics: "📊",
      geography: "🌍",
      computer: "💻",
      english: "📚",
      arabic: "🔤"
    };
    return icons[iconName as keyof typeof icons] || "📖";
  };

  return (
    <Card 
      className="group relative overflow-hidden cursor-pointer transition-all duration-300 hover:shadow-elevated hover:scale-[1.02] animate-fade-in"
      onClick={onClick}
    >
      {/* Background gradient overlay */}
      <div 
        className="absolute inset-0 opacity-5 group-hover:opacity-10 transition-opacity duration-300"
        style={{ background: `linear-gradient(135deg, ${subject.color}, ${subject.color}80)` }}
      />
      
      <CardHeader className="relative">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="text-2xl">{getIconComponent(subject.icon)}</div>
            <div>
              <CardTitle className="text-lg font-semibold">{subject.name}</CardTitle>
              <Badge 
                variant="secondary" 
                className="mt-1 text-xs"
                style={{ backgroundColor: `${subject.color}20`, color: subject.color }}
              >
                {subject.level}
              </Badge>
            </div>
          </div>
          <div className="text-right text-sm text-muted-foreground">
            <div className="flex items-center gap-1 mb-1">
              <Clock size={12} />
              <span>{subject.dueDate}</span>
            </div>
            <div className="font-medium text-foreground">{subject.progress}%</div>
          </div>
        </div>
      </CardHeader>

      <CardContent className="relative space-y-4">
        {/* Progress bar */}
        <div className="space-y-2">
          <Progress 
            value={subject.progress} 
            className="h-2"
            style={{ '--progress-color': subject.color } as React.CSSProperties}
          />
          <div className="flex justify-between text-xs text-muted-foreground">
            <span>IA Progress</span>
            <span>{subject.nextMilestone}</span>
          </div>
        </div>

        {/* Action buttons */}
        <div className="flex gap-2 pt-2">
          <Button 
            variant="outline" 
            size="sm" 
            className="flex-1 group-hover:border-primary transition-colors"
            onClick={(e) => {
              e.stopPropagation();
              window.location.href = '/ia';
            }}
          >
            <BookOpen size={14} className="mr-2" />
            View Plan
          </Button>
          <Button 
            variant="outline" 
            size="sm"
            className="group-hover:border-primary transition-colors"
            onClick={(e) => {
              e.stopPropagation();
              alert('Upload feature coming soon!');
            }}
          >
            <Upload size={14} />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};