import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Check } from "lucide-react";
import { availableSubjects } from "@/data/subjects";

interface SubjectSelectionModalProps {
  open: boolean;
  onClose: () => void;
  onSelectSubject: (subjectId: string) => void;
  selectedSubjects: string[];
}

export const SubjectSelectionModal = ({ 
  open, 
  onClose, 
  onSelectSubject, 
  selectedSubjects 
}: SubjectSelectionModalProps) => {
  
  const handleSubjectSelect = (subjectId: string) => {
    if (!selectedSubjects.includes(subjectId)) {
      onSelectSubject(subjectId);
      onClose();
    }
  };

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
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-center mb-2">
            Choose Your IB Subjects 📚
          </DialogTitle>
          <p className="text-muted-foreground text-center">
            Select the subjects you want to track for your Internal Assessments
          </p>
        </DialogHeader>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-6">
          {availableSubjects.map((subject, index) => {
            const isSelected = selectedSubjects.includes(subject.id);
            
            return (
              <Card 
                key={subject.id}
                className={`relative overflow-hidden cursor-pointer transition-all duration-300 hover:shadow-lg animate-scale-in ${
                  isSelected ? "ring-2 ring-primary bg-primary/5" : "hover:scale-105"
                }`}
                style={{ animationDelay: `${index * 100}ms` }}
                onClick={() => handleSubjectSelect(subject.id)}
              >
                <CardContent className="p-6 text-center relative">
                  {/* Selected indicator */}
                  {isSelected && (
                    <div className="absolute top-2 right-2 bg-primary text-white rounded-full p-1 animate-scale-in">
                      <Check size={12} />
                    </div>
                  )}
                  
                  {/* Subject icon */}
                  <div className="text-3xl mb-3 animate-bounce-gentle">
                    {getSubjectIcon(subject.icon)}
                  </div>
                  
                  {/* Subject name */}
                  <h3 className="font-semibold text-lg mb-2">{subject.name}</h3>
                  
                  {/* Level badge */}
                  <Badge 
                    variant="secondary"
                    className="mb-3"
                    style={{ backgroundColor: `${subject.color}20`, color: subject.color }}
                  >
                    {subject.level}
                  </Badge>
                  
                  {/* Paper info */}
                  <div className="text-xs text-muted-foreground">
                    Papers: {subject.papers.join(", ")}
                  </div>
                  
                  {/* Background gradient */}
                  <div 
                    className="absolute inset-0 opacity-5 hover:opacity-10 transition-opacity duration-300"
                    style={{ background: `linear-gradient(135deg, ${subject.color}, ${subject.color}80)` }}
                  />
                </CardContent>
              </Card>
            );
          })}
        </div>
        
        <div className="flex justify-center mt-6">
          <Button variant="outline" onClick={onClose}>
            Done
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};