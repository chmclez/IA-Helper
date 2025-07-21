import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import Confetti from 'react-confetti';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Progress } from "@/components/ui/progress";
import { 
  ArrowLeft, 
  Calendar as CalendarIcon, 
  Upload, 
  FileText, 
  CheckCircle, 
  Circle, 
  Info,
  Bell,
  Plus
} from "lucide-react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { Subject } from "@/data/subjects";

interface IAWorkspaceProps {
  subject: Subject;
  onBack: () => void;
}

interface IAMilestone {
  id: string;
  title: string;
  description: string;
  dueDate: Date | null;
  completed: boolean;
  notes: string;
  files: File[];
  reminder: boolean;
  tips: string[];
}

export const IAWorkspace = ({ subject, onBack }: IAWorkspaceProps) => {
  const [milestones, setMilestones] = useState<IAMilestone[]>([
    {
      id: "1",
      title: "Topic Selection & Approval",
      description: "Choose and get approval for your IA topic",
      dueDate: null,
      completed: false,
      notes: "",
      files: [],
      reminder: false,
      tips: [
        "Make sure your topic is narrow enough for the word count",
        "Check that you have access to necessary data/equipment",
        "Ensure it aligns with the syllabus requirements"
      ]
    },
    {
      id: "2", 
      title: "Research & Data Collection",
      description: "Gather primary/secondary data and conduct research",
      dueDate: null,
      completed: false,
      notes: "",
      files: [],
      reminder: false,
      tips: [
        "Keep detailed records of all data sources",
        "Ensure data is sufficient for analysis",
        "Consider ethical implications of your research"
      ]
    },
    {
      id: "3",
      title: "Draft 1 - Structure & Analysis", 
      description: "Complete first draft with analysis and evaluation",
      dueDate: null,
      completed: false,
      notes: "",
      files: [],
      reminder: false,
      tips: [
        "Follow the IA structure guidelines",
        "Include proper citations and references",
        "Focus on analysis, not just description"
      ]
    },
    {
      id: "4",
      title: "Peer Review & Feedback",
      description: "Get feedback and revise your draft",
      dueDate: null,
      completed: false,
      notes: "",
      files: [],
      reminder: false,
      tips: [
        "Share with classmates for diverse perspectives",
        "Address all feedback constructively", 
        "Check against the assessment criteria"
      ]
    },
    {
      id: "5",
      title: "Final Submission",
      description: "Submit polished final version",
      dueDate: null,
      completed: false,
      notes: "",
      files: [],
      reminder: false,
      tips: [
        "Proofread for grammar and formatting",
        "Ensure all requirements are met",
        "Submit well before the deadline"
      ]
    },
    {
      id: "6",
      title: "Reflection & Learning",
      description: "Reflect on the IA process and learning outcomes",
      dueDate: null,
      completed: false,
      notes: "",
      files: [],
      reminder: false,
      tips: [
        "Think about what you learned from the process",
        "Consider how you could improve next time",
        "Document insights for future reference"
      ]
    }
  ]);

  const [showTips, setShowTips] = useState<string | null>(null);
  const [showConfetti, setShowConfetti] = useState(false);

  const updateMilestone = (id: string, updates: Partial<IAMilestone>) => {
    setMilestones(prev => prev.map(m => 
      m.id === id ? { ...m, ...updates } : m
    ));
  };

  const toggleCompletion = (id: string) => {
    const milestone = milestones.find(m => m.id === id);
    if (milestone && !milestone.completed) {
      setShowConfetti(true);
      setTimeout(() => setShowConfetti(false), 3000);
    }
    updateMilestone(id, { completed: !milestone?.completed });
  };

  const completedCount = milestones.filter(m => m.completed).length;
  const progressPercentage = (completedCount / milestones.length) * 100;

  const getSubjectIcon = (iconName: string) => {
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
    <div className="min-h-screen bg-gradient-bg">
      {showConfetti && (
        <Confetti
          width={window.innerWidth}
          height={window.innerHeight}
          recycle={false}
          numberOfPieces={200}
        />
      )}
      {/* Header */}
      <div className="border-b bg-card/95 backdrop-blur">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Button 
                variant="ghost" 
                size="icon"
                onClick={onBack}
                className="hover:bg-muted"
              >
                <ArrowLeft size={20} />
              </Button>
              
              <div className="flex items-center gap-3">
                <div className="text-2xl">{getSubjectIcon(subject.icon)}</div>
                <div>
                  <h1 className="text-xl font-bold">{subject.name} IA Planning</h1>
                  <div className="flex items-center gap-2">
                    <Badge 
                      variant="secondary"
                      style={{ backgroundColor: `${subject.color}20`, color: subject.color }}
                    >
                      {subject.level}
                    </Badge>
                    <span className="text-sm text-muted-foreground">
                      {completedCount} of {milestones.length} milestones completed
                    </span>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="flex items-center gap-3">
              <div className="text-right">
                <div className="text-lg font-bold" style={{ color: subject.color }}>
                  {Math.round(progressPercentage)}%
                </div>
                <div className="text-sm text-muted-foreground">Complete</div>
              </div>
            </div>
          </div>
          
          {/* Progress bar */}
          <div className="mt-4">
            <Progress 
              value={progressPercentage} 
              className="h-2"
              style={{ "--progress-color": subject.color } as React.CSSProperties}
            />
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="container mx-auto px-6 py-8">
        <div className="space-y-6">
          {milestones.map((milestone, index) => (
            <Card 
              key={milestone.id}
              className={`transition-all duration-300 hover:shadow-lg animate-fade-in ${
                milestone.completed ? "bg-secondary/20" : ""
              }`}
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <button
                      onClick={() => toggleCompletion(milestone.id)}
                      className="transition-transform hover:scale-110"
                    >
                      {milestone.completed ? (
                        <CheckCircle 
                          className="text-secondary animate-scale-in" 
                          style={{ color: subject.color }} 
                          size={24} 
                        />
                      ) : (
                        <Circle className="text-muted-foreground hover:text-primary" size={24} />
                      )}
                    </button>
                    <div>
                      <CardTitle className={cn(
                        "text-lg",
                        milestone.completed && "line-through text-muted-foreground"
                      )}>
                        {milestone.title}
                      </CardTitle>
                      <p className="text-sm text-muted-foreground">
                        {milestone.description}
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => setShowTips(showTips === milestone.id ? null : milestone.id)}
                      className="hover:bg-primary/10"
                    >
                      <Info size={16} />
                    </Button>
                    
                    <Badge variant={milestone.completed ? "secondary" : "outline"}>
                      Step {index + 1}
                    </Badge>
                  </div>
                </div>
              </CardHeader>

              <CardContent className="space-y-6">
                {/* Tips section */}
                {showTips === milestone.id && (
                  <div className="bg-primary/5 border border-primary/20 rounded-lg p-4 animate-fade-in">
                    <h4 className="font-medium text-primary mb-2">💡 Helpful Tips</h4>
                    <ul className="space-y-1 text-sm">
                      {milestone.tips.map((tip, tipIndex) => (
                        <li key={tipIndex} className="flex items-start gap-2">
                          <span className="text-primary mt-1">•</span>
                          <span>{tip}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                <div className="grid lg:grid-cols-2 gap-6">
                  {/* Left column - Notes and details */}
                  <div className="space-y-4">
                    <div>
                      <label className="text-sm font-medium mb-2 block">Notes & Ideas</label>
                      <Textarea
                        placeholder="Add your thoughts, questions, or progress notes..."
                        value={milestone.notes}
                        onChange={(e) => updateMilestone(milestone.id, { notes: e.target.value })}
                        className="min-h-[100px] resize-none"
                      />
                    </div>

                    <div className="flex items-center gap-4">
                      {/* Due date picker */}
                      <div className="flex-1">
                        <label className="text-sm font-medium mb-2 block">Due Date</label>
                        <Popover>
                          <PopoverTrigger asChild>
                            <Button
                              variant="outline"
                              className={cn(
                                "w-full justify-start text-left font-normal",
                                !milestone.dueDate && "text-muted-foreground"
                              )}
                            >
                              <CalendarIcon className="mr-2 h-4 w-4" />
                              {milestone.dueDate ? (
                                format(milestone.dueDate, "PPP")
                              ) : (
                                <span>Pick a date</span>
                              )}
                            </Button>
                          </PopoverTrigger>
                          <PopoverContent className="w-auto p-0">
                            <Calendar
                              mode="single"
                              selected={milestone.dueDate || undefined}
                              onSelect={(date) => updateMilestone(milestone.id, { dueDate: date || null })}
                              initialFocus
                              className="pointer-events-auto"
                            />
                          </PopoverContent>
                        </Popover>
                      </div>

                      {/* Reminder toggle */}
                      <div className="flex items-center space-x-2">
                        <Checkbox
                          id={`reminder-${milestone.id}`}
                          checked={milestone.reminder}
                          onCheckedChange={(checked) => 
                            updateMilestone(milestone.id, { reminder: !!checked })
                          }
                        />
                        <label 
                          htmlFor={`reminder-${milestone.id}`} 
                          className="text-sm font-medium cursor-pointer flex items-center gap-1"
                        >
                          <Bell size={14} />
                          Remind me
                        </label>
                      </div>
                    </div>
                  </div>

                  {/* Right column - File uploads */}
                  <div className="space-y-4">
                    <label className="text-sm font-medium block">Documents & Files</label>
                    
                    <div className="border-2 border-dashed border-muted rounded-lg p-6 text-center hover:border-primary/50 transition-colors cursor-pointer">
                      <Upload className="h-8 w-8 mx-auto mb-2 text-muted-foreground" />
                      <p className="text-sm text-muted-foreground mb-1">
                        Drop files here or click to upload
                      </p>
                      <p className="text-xs text-muted-foreground">
                        PDF, DOCX, XLSX supported
                      </p>
                    </div>

                    {/* File list */}
                    {milestone.files.length > 0 && (
                      <div className="space-y-2">
                        {milestone.files.map((file, fileIndex) => (
                          <div 
                            key={fileIndex}
                            className="flex items-center gap-2 p-2 bg-muted rounded border"
                          >
                            <FileText size={16} className="text-primary" />
                            <span className="text-sm flex-1">{file.name}</span>
                            <Button variant="ghost" size="icon" className="h-6 w-6">
                              <span className="sr-only">Remove file</span>
                              ×
                            </Button>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Success celebration */}
        {completedCount === milestones.length && (
          <Card className="bg-gradient-primary text-white text-center animate-fade-in">
            <CardContent className="py-8">
              <div className="text-4xl mb-4">🎉</div>
              <h3 className="text-xl font-bold mb-2">Congratulations!</h3>
              <p className="opacity-90">
                You have completed all milestones for your {subject.name} Internal Assessment!
              </p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};