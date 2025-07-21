import { useState } from "react";
import { Navbar } from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Plus, Calendar, BookOpen, Target, Trophy, Clock } from "lucide-react";
import { SubjectSelectionModal } from "@/components/SubjectSelectionModal";
import { IAWorkspace } from "@/components/IAWorkspace";
import { CalendarView } from "@/components/CalendarView";
import { availableSubjects } from "@/data/subjects";

export const IADashboard = () => {
  const [selectedSubjects, setSelectedSubjects] = useState(availableSubjects.slice(0, 3));
  const [showSubjectModal, setShowSubjectModal] = useState(false);
  const [activeWorkspace, setActiveWorkspace] = useState<string | null>(null);
  const [showCalendar, setShowCalendar] = useState(false);

  const addSubject = (subjectId: string) => {
    const subject = availableSubjects.find(s => s.id === subjectId);
    if (subject && !selectedSubjects.find(s => s.id === subjectId)) {
      setSelectedSubjects([...selectedSubjects, subject]);
    }
  };

  const removeSubject = (subjectId: string) => {
    setSelectedSubjects(selectedSubjects.filter(s => s.id !== subjectId));
  };

  const getProgressStatus = (progress: number) => {
    if (progress >= 90) return { status: "Excellent", color: "secondary", icon: Trophy };
    if (progress >= 70) return { status: "On Track", color: "primary", icon: Target };
    if (progress >= 40) return { status: "In Progress", color: "warning", icon: Clock };
    return { status: "Getting Started", color: "destructive", icon: BookOpen };
  };

  if (activeWorkspace) {
    const subject = selectedSubjects.find(s => s.id === activeWorkspace);
    return subject ? (
      <IAWorkspace 
        subject={subject} 
        onBack={() => setActiveWorkspace(null)} 
      />
    ) : null;
  }

  return (
    <div className="min-h-screen bg-gradient-bg">
      <Navbar />
      
      <main className="container mx-auto px-6 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold mb-2">Internal Assessment Hub 🎯</h1>
            <p className="text-muted-foreground">
              Plan, track, and excel in your IB Internal Assessments across all subjects.
            </p>
          </div>
          
          <div className="flex gap-3">
            <Button 
              variant="outline"
              onClick={() => setShowCalendar(!showCalendar)}
              className="hover:border-primary transition-colors"
            >
              <Calendar size={16} className="mr-2" />
              {showCalendar ? "Grid View" : "Calendar"}
            </Button>
            <Button 
              onClick={() => setShowSubjectModal(true)}
              className="bg-gradient-primary hover:shadow-glow transition-all duration-300"
            >
              <Plus size={16} className="mr-2" />
              Add Subject
            </Button>
          </div>
        </div>

        {/* Stats Overview - Simplified */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          <Card className="bg-gradient-primary text-white animate-fade-in shadow-glow">
            <CardContent className="p-8 text-center">
              <Trophy className="h-10 w-10 mx-auto mb-4 animate-bounce-gentle" />
              <div className="text-3xl font-bold mb-2">
                {selectedSubjects.filter(s => s.progress >= 70).length}
              </div>
              <p className="text-lg opacity-90">On Track</p>
            </CardContent>
          </Card>
          
          <Card className="bg-gradient-success text-white animate-fade-in shadow-glow" style={{ animationDelay: "150ms" }}>
            <CardContent className="p-8 text-center">
              <Target className="h-10 w-10 mx-auto mb-4" />
              <div className="text-3xl font-bold mb-2">
                {selectedSubjects.filter(s => s.progress < 70 && s.progress >= 30).length}
              </div>
              <p className="text-lg opacity-90">In Progress</p>
            </CardContent>
          </Card>
          
          <Card className="bg-gradient-warm text-white animate-fade-in shadow-glow" style={{ animationDelay: "300ms" }}>
            <CardContent className="p-8 text-center">
              <Plus className="h-10 w-10 mx-auto mb-4" />
              <div className="text-3xl font-bold mb-2">
                {Math.max(0, 8 - selectedSubjects.length)}
              </div>
              <p className="text-lg opacity-90">Available Subjects</p>
            </CardContent>
          </Card>
        </div>

        {/* Calendar/Grid Toggle */}
        {showCalendar ? (
          <CalendarView subjects={selectedSubjects} />
        ) : (
          <>
            {/* IA Subject Cards */}
            {selectedSubjects.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {selectedSubjects.map((subject, index) => {
                  const { status, color, icon: StatusIcon } = getProgressStatus(subject.progress);
                  
                  return (
                    <Card 
                      key={subject.id}
                      className="group relative overflow-hidden hover:shadow-elevated transition-all duration-300 animate-fade-in cursor-pointer"
                      style={{ animationDelay: `${index * 150}ms` }}
                    >
                      {/* Background gradient */}
                      <div 
                        className="absolute inset-0 opacity-5 group-hover:opacity-10 transition-opacity duration-300"
                        style={{ background: `linear-gradient(135deg, ${subject.color}, ${subject.color}80)` }}
                      />
                      
                      <CardHeader className="relative">
                        <div className="flex items-center justify-between mb-4">
                          <div className="flex items-center gap-3">
                            <div className="text-2xl">{subject.icon === "physics" ? "⚛️" : subject.icon === "chemistry" ? "🧪" : subject.icon === "math" ? "📐" : subject.icon === "economics" ? "📊" : subject.icon === "geography" ? "🌍" : subject.icon === "computer" ? "💻" : subject.icon === "english" ? "📚" : "🔤"}</div>
                            <div>
                              <CardTitle className="text-lg">{subject.name}</CardTitle>
                              <Badge 
                                variant="secondary"
                                style={{ backgroundColor: `${subject.color}20`, color: subject.color }}
                              >
                                {subject.level}
                              </Badge>
                            </div>
                          </div>
                          <StatusIcon 
                            size={20} 
                            className={`text-${color}`}
                            style={{ color: subject.color }}
                          />
                        </div>
                        
                        {/* Progress Circle */}
                        <div className="relative w-20 h-20 mx-auto mb-4">
                          <svg className="w-20 h-20 transform -rotate-90" viewBox="0 0 100 100">
                            <circle
                              cx="50"
                              cy="50"
                              r="40"
                              stroke="currentColor"
                              strokeWidth="8"
                              fill="transparent"
                              className="text-muted/20"
                            />
                            <circle
                              cx="50"
                              cy="50"
                              r="40"
                              stroke={subject.color}
                              strokeWidth="8"
                              fill="transparent"
                              strokeDasharray={`${2 * Math.PI * 40}`}
                              strokeDashoffset={`${2 * Math.PI * 40 * (1 - subject.progress / 100)}`}
                              className="transition-all duration-1000 ease-out"
                              strokeLinecap="round"
                            />
                          </svg>
                          <div className="absolute inset-0 flex items-center justify-center">
                            <span className="text-lg font-bold" style={{ color: subject.color }}>
                              {subject.progress}%
                            </span>
                          </div>
                        </div>
                      </CardHeader>

                      <CardContent className="relative space-y-4">
                        <div className="text-center">
                          <p className="font-medium mb-1">{status}</p>
                          <p className="text-sm text-muted-foreground">Next: {subject.nextMilestone}</p>
                          <p className="text-xs text-muted-foreground">Due: {subject.dueDate}</p>
                        </div>

                        <Button 
                          onClick={() => setActiveWorkspace(subject.id)}
                          className="w-full group-hover:scale-105 transition-transform duration-200"
                          style={{ backgroundColor: subject.color, color: "white" }}
                        >
                          Start Planning IA
                        </Button>
                      </CardContent>
                    </Card>
                  );
                })}
              </div>
            ) : (
              <Card className="text-center py-16 animate-fade-in">
                <CardContent>
                  <div className="text-6xl mb-4">📚</div>
                  <h3 className="text-xl font-semibold mb-2">No Subjects Added Yet</h3>
                  <p className="text-muted-foreground mb-6">
                    Start by adding your IB subjects to begin planning your Internal Assessments.
                  </p>
                  <Button 
                    onClick={() => setShowSubjectModal(true)}
                    className="bg-gradient-primary hover:shadow-glow transition-all duration-300"
                  >
                    <Plus size={16} className="mr-2" />
                    Add Your First Subject
                  </Button>
                </CardContent>
              </Card>
            )}
          </>
        )}
      </main>

      {/* Subject Selection Modal */}
      <SubjectSelectionModal 
        open={showSubjectModal}
        onClose={() => setShowSubjectModal(false)}
        onSelectSubject={addSubject}
        selectedSubjects={selectedSubjects.map(s => s.id)}
      />
    </div>
  );
};