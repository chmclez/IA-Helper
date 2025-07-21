import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import { TrendingUp, Clock, CheckCircle, AlertTriangle } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { availableSubjects } from "@/data/subjects";
import { useEffect } from "react";
export const DashboardStats = () => {
  const { user, updateProgress } = useAuth();
  const userSubjects = user?.subjects
    ? availableSubjects.filter(s => user.subjects?.includes(s.id))
    : [];

  const overallProgress =
    userSubjects.length > 0
      ? Math.round(
          userSubjects.reduce((acc, s) => acc + (s.progress || 0), 0) /
            userSubjects.length
        )
      : 0;
 // store overall progress so other components can access it
  useEffect(() => {
    updateProgress(overallProgress);
  }, [overallProgress, updateProgress]);

  const stats = [
    {
      title: "Overall Progress",
      value: '${overallProgress}%',
      description: "Across all subjects",
      icon: TrendingUp,
      color: "primary",
      gradient: "bg-gradient-primary"
    },
    {
      title: "Due This Week",
      value: "0",
      description: "Upcoming milestones",
      icon: Clock,
      color: "warning",
      gradient: "bg-gradient-warm"
    },
    {
      title: "Completed",
      value: "0",
      description: "IA milestones",
      icon: CheckCircle,
      color: "secondary",
      gradient: "bg-gradient-success"
    },
    {
      title: "Needs Attention",
      value: "0",
      description: "Overdue tasks",
      icon: AlertTriangle,
      color: "destructive",
      gradient: "bg-red-500"
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      {stats.map((stat, index) => (
        <Card 
          key={stat.title}
          className="relative overflow-hidden hover:shadow-elevated transition-all duration-300 animate-fade-in group"
          style={{ animationDelay: `${index * 100}ms` }}
        >
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              {stat.title}
            </CardTitle>
            <div className={`${stat.gradient} p-2 rounded-lg`}>
              <stat.icon className="h-4 w-4 text-white" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold mb-1">{stat.value}</div>
            <p className="text-xs text-muted-foreground">{stat.description}</p>
            
            {/* Animated background glow */}
            <div 
              className={`absolute -bottom-2 -right-2 w-20 h-20 ${stat.gradient} rounded-full opacity-10 group-hover:opacity-20 transition-opacity duration-300`}
            />
          </CardContent>
        </Card>
      ))}
    </div>
  );
};