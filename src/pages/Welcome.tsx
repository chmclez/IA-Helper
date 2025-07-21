import { Button } from "../components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import { Badge } from "../components/ui/badge";
import { BookOpen, TrendingUp, Clock, Users, Star, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

export const Welcome = () => {
  const features = [
    {
      icon: BookOpen,
      title: "IA Planning",
      description: "Track milestones for all your IB subjects with visual progress indicators",
      color: "primary"
    },
    {
      icon: TrendingUp,
      title: "Smart Analytics",
      description: "Monitor your progress and get insights to optimize your study schedule",
      color: "secondary" 
    },
    {
      icon: Clock,
      title: "Deadline Management",
      description: "Never miss a deadline with intelligent reminders and notifications",
      color: "warning"
    },
    {
      icon: Users,
      title: "Past Papers",
      description: "Search through thousands of IB past paper questions with OCR technology",
      color: "accent"
    }
  ];

  const subjects = [
    "Physics HL/SL", "Chemistry HL", "Math AA SL/HL", "Economics HL",
    "Geography HL", "Computer Science HL", "English Lang & Lit SL", "Arabic Lang & Lit SL"
  ];

  return (
    <div className="min-h-screen bg-gradient-bg">
      {/* Navigation */}
      <nav className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="bg-gradient-primary p-2 rounded-xl">
              <BookOpen className="h-6 w-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold bg-gradient-primary bg-clip-text text-transparent">
                IB Master
              </h1>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Button variant="ghost">Sign In</Button>
            <Button className="bg-gradient-primary hover:shadow-glow transition-all duration-300">
              Get Started
            </Button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="container mx-auto px-6 py-16">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-8">
            <div className="space-y-4">
              <Badge className="bg-primary/10 text-primary border-primary/20">
                ✨ For IB Students
              </Badge>
              <h1 className="text-4xl lg:text-6xl font-bold leading-tight">
                Master Your 
                <span className="bg-gradient-primary bg-clip-text text-transparent"> IB Journey</span>
              </h1>
              <p className="text-xl text-muted-foreground leading-relaxed">
                The ultimate platform to plan, track, and excel in your Internal Assessments. 
                With smart past paper search and visual progress tracking.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <Button 
                asChild
                size="lg" 
                className="bg-gradient-primary hover:shadow-glow transition-all duration-300 group"
              >
                <Link to="/dashboard">
                  Start Your Journey
                  <ArrowRight size={18} className="ml-2 group-hover:translate-x-1 transition-transform" />
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg">
                <Link to="/dashboard">
                  <Star size={18} className="mr-2" />
                  View Demo
                </Link>
              </Button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-6 pt-8 border-t">
              <div className="text-center">
                <div className="text-2xl font-bold text-primary">8</div>
                <div className="text-sm text-muted-foreground">IB Subjects</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-secondary">1000+</div>
                <div className="text-sm text-muted-foreground">Past Papers</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-accent">24/7</div>
                <div className="text-sm text-muted-foreground">Support</div>
              </div>
            </div>
          </div>

          <div className="relative">
            <div className="absolute inset-0 bg-gradient-primary rounded-3xl opacity-20 blur-3xl"></div>
            <img 
              alt="IB Master Dashboard"
              className="relative z-10 rounded-3xl shadow-elevated w-full"
            />
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="container mx-auto px-6 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Everything You Need to Succeed</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Comprehensive tools designed specifically for IB students to manage their academic journey effectively.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <Card 
              key={feature.title}
              className="text-center hover:shadow-elevated transition-all duration-300 animate-fade-in group"
              style={{ animationDelay: `${index * 150}ms` }}
            >
              <CardHeader>
                <div className={`bg-gradient-${feature.color} p-3 rounded-xl w-fit mx-auto mb-4`}>
                  <feature.icon className="h-6 w-6 text-white" />
                </div>
                <CardTitle className="text-lg">{feature.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">{feature.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Supported Subjects */}
      <section className="container mx-auto px-6 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Supported IB Subjects</h2>
          <p className="text-muted-foreground">
            Track your progress across all major IB subjects
          </p>
        </div>

        <div className="flex flex-wrap justify-center gap-3 max-w-4xl mx-auto">
          {subjects.map((subject, index) => (
            <Badge 
              key={subject}
              variant="secondary"
              className="px-4 py-2 text-sm animate-fade-in hover:scale-105 transition-transform"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              {subject}
            </Badge>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="container mx-auto px-6 py-16">
        <Card className="bg-gradient-primary text-white">
          <CardContent className="text-center py-16">
            <h2 className="text-3xl font-bold mb-4">Ready to Excel in Your IB Studies?</h2>
            <p className="text-xl opacity-90 mb-8 max-w-2xl mx-auto">
              Join thousands of IB students who are already using IB Master to organize their studies and achieve excellent results.
            </p>
            <Button 
              size="lg" 
              variant="secondary"
              className="bg-white text-primary hover:bg-white/90 transition-all duration-300"
            >
              Start Your Free Trial
              <ArrowRight size={18} className="ml-2" />
            </Button>
          </CardContent>
        </Card>
      </section>

      {/* Footer */}
      <footer className="border-t py-8">
        <div className="container mx-auto px-6 text-center text-muted-foreground">
          <p>&copy; 2024 IB Master. Built for IB students, by IB students.</p>
        </div>
      </footer>
    </div>
  );
};