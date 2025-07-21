import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import { Navbar } from "@/components/Navbar";
import { DashboardStats } from "@/components/DashboardStats";
import { SubjectCard } from "@/components/SubjectCard";
import { SubjectSelectionModal } from "@/components/SubjectSelectionModal";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { availableSubjects } from "@/data/subjects";
import { Plus, Calendar, TrendingUp, Target, ArrowRight } from "lucide-react";

export const Dashboard = () => {
  const { user, updateUserSubjects } = useAuth();
  const [selectedSubjects, setSelectedSubjects] = useState<typeof availableSubjects>([]);
  const [showSubjectModal, setShowSubjectModal] = useState(false);

  useEffect(() => {
    if (user?.subjects && user.subjects.length > 0) {
      const userSelectedSubjects = availableSubjects.filter(subject => 
        user.subjects?.includes(subject.id)
      );
      setSelectedSubjects(userSelectedSubjects);
    }
  }, [user]);

  const handleAddSubject = (subjectId: string) => {
    const subject = availableSubjects.find(s => s.id === subjectId);
    if (subject && !selectedSubjects.find(s => s.id === subjectId)) {
      const newSubjects = [...selectedSubjects, subject];
      setSelectedSubjects(newSubjects);
      updateUserSubjects(newSubjects.map(s => s.id));
    }
  };

  const upcomingTasks = [
    { subject: "Physics HL", task: "Draft 1 Submission", due: "Dec 15", priority: "high" },
    { subject: "Computer Science HL", task: "Testing Documentation", due: "Dec 18", priority: "medium" },
    { subject: "Math AA HL", task: "Final Review", due: "Dec 20", priority: "low" },
  ];

  return (
    <div className="min-h-screen bg-gradient-bg">
      <Navbar />
      
      <main className="container mx-auto px-6 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-3xl font-bold mb-2">Welcome back, {user?.name}! 👋</h1>
              <p className="text-muted-foreground">
                Stay on track with your IB Internal Assessments and ace your studies.
              </p>
            </div>
            <Button 
              className="bg-gradient-primary hover:shadow-glow transition-all duration-300"
              onClick={() => setShowSubjectModal(true)}
            >
              <Plus size={16} className="mr-2" />
              Add Subject
            </Button>
          </div>
          
          <DashboardStats />
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Subjects Grid */}
          <div className="lg:col-span-2">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-semibold">Your Subjects</h2>
              <div className="flex items-center gap-3">
                <Badge variant="secondary" className="bg-primary/10 text-primary">
                  {selectedSubjects.length} Active
                </Badge>
                <Button asChild className="bg-gradient-primary hover:shadow-glow transition-all duration-300">
                  <Link to="/ia">
                    <Target size={16} className="mr-2" />
                    Plan IAs
                    <ArrowRight size={14} className="ml-2" />
                  </Link>
                </Button>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {selectedSubjects.map((subject, index) => (
                <div
                  key={subject.id}
                  style={{ animationDelay: `${index * 150}ms` }}
                >
                   <SubjectCard 
                     subject={subject} 
                     onClick={() => window.location.href = '/ia'}
                   />
                </div>
              ))}
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Upcoming Tasks */}
            <Card className="animate-fade-in">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Calendar size={18} className="text-primary" />
                  Upcoming Tasks
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {upcomingTasks.map((task, index) => (
                  <div 
                    key={index}
                    className="flex items-center justify-between p-3 rounded-lg bg-muted/50 hover:bg-muted transition-colors"
                  >
                    <div className="flex-1">
                      <p className="font-medium text-sm">{task.task}</p>
                      <p className="text-xs text-muted-foreground">{task.subject}</p>
                    </div>
                    <div className="text-right">
                      <Badge 
                        variant={task.priority === "high" ? "destructive" : 
                               task.priority === "medium" ? "warning" : "secondary"}
                        className="text-xs"
                      >
                        {task.due}
                      </Badge>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card className="animate-fade-in">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Target size={18} className="text-primary" />
                  Quick Actions
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button asChild variant="outline" className="w-full justify-start">
                  <Link to="/ia">
                    <TrendingUp size={16} className="mr-2" />
                    View Progress Report
                  </Link>
                </Button>
                <Button asChild variant="outline" className="w-full justify-start">
                  <Link to="/past-papers">
                    <Calendar size={16} className="mr-2" />
                    Browse Past Papers
                  </Link>
                </Button>
                 <Button 
                   variant="outline" 
                   className="w-full justify-start" 
                   onClick={() => setShowSubjectModal(true)}
                 >
                   <Plus size={16} className="mr-2" />
                   Add New Subject
                 </Button>
              </CardContent>
            </Card>

            {/* Motivational Quote */}
            <Card className="bg-gradient-primary text-white animate-fade-in">
              <CardContent className="p-6 text-center">
                <div className="text-2xl mb-2">🎯</div>
                <p className="font-medium mb-2">"Success is the sum of small efforts repeated day in and day out."</p>
                <p className="text-sm opacity-90">- Robert Collier</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>

      <SubjectSelectionModal
        open={showSubjectModal}
        onClose={() => setShowSubjectModal(false)}
        onSelectSubject={handleAddSubject}
        selectedSubjects={selectedSubjects.map(s => s.id)}
      />
    </div>
  );
};