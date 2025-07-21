import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { Navbar } from "../components/Navbar";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Badge } from "../components/ui/badge";
import { 
  FolderOpen, 
  FileText, 
  Download, 
  ChevronLeft,
  Calendar,
  Plus,
  Upload
} from "lucide-react";
import { availableSubjects } from "@/data/subjects";

interface PaperFile {
  id: string;
  name: string;
  paper: string;
  downloadUrl: string;
}

// Generate years
const generateYears = () => {
  const years = [];
  const currentYear = new Date().getFullYear();
  
  for (let year = currentYear + 1; year >= 1999; year--) {
    years.push(year);
  }
  
  return years;
};

const years = generateYears();
const sessions = ["May", "November"];

// Subject paper structure 
const getAvailablePapers = (subject: string, year: number) => {
  const paperStructure: Record<string, { before2025: string[], from2025: string[] }> = {
    "Physics HL": { 
      before2025: ["Paper 1", "Paper 2", "Paper 3"], 
      from2025: ["Paper 1", "Paper 2"] 
    },
    "Physics SL": { 
      before2025: ["Paper 1", "Paper 2", "Paper 3"], 
      from2025: ["Paper 1", "Paper 2"] 
    },
    "Chemistry HL": { 
      before2025: ["Paper 1", "Paper 2", "Paper 3"], 
      from2025: ["Paper 1", "Paper 2"] 
    },
    "Math AA HL": { 
      before2025: ["Paper 1", "Paper 2", "Paper 3"], 
      from2025: ["Paper 1", "Paper 2", "Paper 3"] 
    },
    "Math AA SL": { 
      before2025: ["Paper 1", "Paper 2", "Paper 3"], 
      from2025: ["Paper 1", "Paper 2"] 
    },
    "Economics HL": { 
      before2025: ["Paper 1", "Paper 2", "Paper 3"], 
      from2025: ["Paper 1", "Paper 2", "Paper 3"] 
    },
    "Geography HL": { 
      before2025: ["Paper 1", "Paper 2", "Paper 3"], 
      from2025: ["Paper 1", "Paper 2", "Paper 3"] 
    },
    "Computer Science HL": { 
      before2025: ["Paper 1", "Paper 2", "Paper 3"], 
      from2025: ["Paper 1", "Paper 2", "Paper 3"] 
    },
    "English Lang & Lit SL": { 
      before2025: ["Paper 1", "Paper 2"], 
      from2025: ["Paper 1", "Paper 2"] 
    },
    "Arabic Lang & Lit SL": { 
      before2025: ["Paper 1", "Paper 2"], 
      from2025: ["Paper 1", "Paper 2"] 
    }
  };
  
  const structure = paperStructure[subject];
  if (!structure) return [];
  
  return year >= 2025 ? structure.from2025 : structure.before2025;
};

const getSubjectColor = (subject: string) => {
  const colors: Record<string, string> = {
    "Physics HL": "from-blue-500 to-blue-600",
    "Physics SL": "from-blue-400 to-blue-500",
    "Chemistry HL": "from-green-500 to-green-600", 
    "Math AA HL": "from-purple-500 to-purple-600",
    "Math AA SL": "from-purple-400 to-purple-500",
    "Economics HL": "from-orange-500 to-orange-600",
    "Geography HL": "from-emerald-500 to-emerald-600",
    "Computer Science HL": "from-indigo-500 to-indigo-600",
    "English Lang & Lit SL": "from-rose-500 to-rose-600",
    "Arabic Lang & Lit SL": "from-amber-500 to-amber-600"
  };
  return colors[subject] || "from-gray-500 to-gray-600";
};

// Mock paper files
const generateMockPapers = (subject: string, year: number, session: string): PaperFile[] => {
  const papers = getAvailablePapers(subject, year);
  return papers.map((paper) => ({
    id: `${subject}-${year}-${session}-${paper}`.replace(/\s+/g, '-').toLowerCase(),
    name: `${subject} ${paper} – ${session} ${year}`,
    paper,
    downloadUrl: `/mock-papers/${subject.toLowerCase().replace(/\s+/g, '-')}-${year}-${session.toLowerCase()}-${paper.toLowerCase().replace(/\s+/g, '')}.pdf`
  }));
};

export function PastPapers() {
  const { user } = useAuth();
  const [currentView, setCurrentView] = useState<"subjects" | "years" | "sessions" | "papers">("subjects");
  const [selectedSubject, setSelectedSubject] = useState<string>("");
  const [selectedYear, setSelectedYear] = useState<number>(0);
  const [selectedSession, setSelectedSession] = useState<string>("");
  const [breadcrumbs, setBreadcrumbs] = useState<string[]>(["Past Papers"]);

  // Get user's subjects
  const userSubjects = user?.subjects ? 
    availableSubjects.filter(subject => user.subjects?.includes(subject.id)) : [];

  const handleSubjectClick = (subjectName: string) => {
    setSelectedSubject(subjectName);
    setCurrentView("years");
    setBreadcrumbs(["Past Papers", subjectName]);
  };

  const handleYearClick = (year: number) => {
    setSelectedYear(year);
    setCurrentView("sessions");
    setBreadcrumbs(["Past Papers", selectedSubject, year.toString()]);
  };

  const handleSessionClick = (session: string) => {
    setSelectedSession(session);
    setCurrentView("papers");
    setBreadcrumbs(["Past Papers", selectedSubject, selectedYear.toString(), session]);
  };

  const handleBackClick = () => {
    if (currentView === "papers") {
      setCurrentView("sessions");
      setBreadcrumbs(["Past Papers", selectedSubject, selectedYear.toString()]);
      setSelectedSession("");
    } else if (currentView === "sessions") {
      setCurrentView("years");
      setBreadcrumbs(["Past Papers", selectedSubject]);
      setSelectedYear(0);
    } else if (currentView === "years") {
      setCurrentView("subjects");
      setBreadcrumbs(["Past Papers"]);
      setSelectedSubject("");
    }
  };

  const handleDownload = (paper: PaperFile) => {
    // Simulate download
    alert(`Downloading: ${paper.name}`);
  };

  const handleAddFolder = () => {
    alert('Add folder functionality - Admin only feature');
  };

  const handleUploadPDF = () => {
    alert('Upload PDF functionality - Admin only feature');
  };

  return (
    <div className="min-h-screen bg-gradient-bg">
      <Navbar />
      
      <main className="container mx-auto px-6 py-8 max-w-6xl">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold mb-2">Past Papers Collection 📂</h1>
              <p className="text-muted-foreground">
                Browse your IB past papers organized by subject and exam session
              </p>
            </div>
            
            {/* Admin Controls */}
            {user?.role === 'admin' && (
              <div className="flex gap-2">
                <Button variant="outline" onClick={handleAddFolder}>
                  <Plus size={16} className="mr-2" />
                  Add Folder
                </Button>
                <Button variant="outline" onClick={handleUploadPDF}>
                  <Upload size={16} className="mr-2" />
                  Upload PDF
                </Button>
              </div>
            )}
          </div>
        </div>

        {/* Breadcrumbs */}
        <div className="flex items-center gap-2 mb-6 text-sm text-muted-foreground">
          {breadcrumbs.map((crumb, index) => (
            <div key={index} className="flex items-center gap-2">
              {index > 0 && <span>/</span>}
              <span className={index === breadcrumbs.length - 1 ? "text-primary font-medium" : ""}>
                {crumb}
              </span>
            </div>
          ))}
          {currentView !== "subjects" && (
            <Button
              variant="ghost"
              size="sm"
              onClick={handleBackClick}
              className="ml-4"
            >
              <ChevronLeft size={16} className="mr-1" />
              Back
            </Button>
          )}
        </div>

        {/* Content */}
        {currentView === "subjects" && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {userSubjects.map((subject, index) => (
              <Card 
                key={subject.id}
                className="group cursor-pointer hover:shadow-elevated transition-all duration-300 animate-fade-in"
                style={{ animationDelay: `${index * 100}ms` }}
                onClick={() => handleSubjectClick(subject.name)}
              >
                <CardContent className="p-6">
                  <div className={`w-full h-32 rounded-lg bg-gradient-to-br ${getSubjectColor(subject.name)} mb-4 flex items-center justify-center group-hover:scale-105 transition-transform duration-200`}>
                    <FolderOpen size={48} className="text-white" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">{subject.name}</h3>
                  <p className="text-sm text-muted-foreground">
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        {currentView === "years" && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {years.map((year, index) => (
              <Card 
                key={year}
                className="group cursor-pointer hover:shadow-card transition-all duration-300 animate-fade-in"
                style={{ animationDelay: `${index * 50}ms` }}
                onClick={() => handleYearClick(year)}
              >
                <CardContent className="p-4">
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-primary/10">
                      <Calendar size={20} className="text-primary" />
                    </div>
                    <div>
                      <h4 className="font-medium">{year}</h4>
                      <p className="text-sm text-muted-foreground">
                        {sessions.length} sessions
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        {currentView === "sessions" && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {sessions.map((session, index) => (
              <Card 
                key={session}
                className="group cursor-pointer hover:shadow-card transition-all duration-300 animate-fade-in"
                style={{ animationDelay: `${index * 100}ms` }}
                onClick={() => handleSessionClick(session)}
              >
                <CardContent className="p-6">
                  <div className="flex items-center gap-4">
                    <div className="p-3 rounded-lg bg-primary/10">
                      <Calendar size={24} className="text-primary" />
                    </div>
                    <div>
                      <h4 className="text-lg font-medium">{session} {selectedYear}</h4>
                      <p className="text-sm text-muted-foreground">
                        {getAvailablePapers(selectedSubject, selectedYear).length} papers available
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        {currentView === "papers" && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {generateMockPapers(selectedSubject, selectedYear, selectedSession).map((paper, index) => (
              <Card 
                key={paper.id}
                className="group hover:shadow-elevated transition-all duration-300 animate-fade-in"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-3">
                      <div className="p-2 rounded-lg bg-primary/10">
                        <FileText size={20} className="text-primary" />
                      </div>
                      <div>
                        <CardTitle className="text-lg">{paper.paper}</CardTitle>
                        <p className="text-sm text-muted-foreground">{selectedSubject}</p>
                      </div>
                    </div>
                    <Badge variant="secondary">{selectedSession} {selectedYear}</Badge>
                  </div>
                </CardHeader>
                
                <CardContent className="space-y-4">
                  <div className="text-sm text-muted-foreground">
                    <p>Ready for download as PDF</p>
                  </div>
                  
                  <Button 
                    className="w-full group-hover:scale-105 transition-transform duration-200"
                    onClick={() => handleDownload(paper)}
                  >
                    <Download size={16} className="mr-2" />
                    Download {paper.paper}
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
        
        {/* Empty State */}
        {((currentView === "subjects" && userSubjects.length === 0) ||
          (currentView === "years" && years.length === 0) ||
          (currentView === "sessions" && sessions.length === 0) ||
          (currentView === "papers" && generateMockPapers(selectedSubject, selectedYear, selectedSession).length === 0)) && (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">📂</div>
            <h3 className="text-lg font-semibold mb-2">No content available</h3>
            <p className="text-muted-foreground">
              {currentView === "subjects" 
                ? "Add subjects to your dashboard to see past papers"
                : "No papers available for this selection"
              }
            </p>
          </div>
        )}
      </main>
    </div>
  );
}