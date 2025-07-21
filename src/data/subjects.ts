export interface Subject {
  id: string;
  name: string;
  level: "HL" | "SL";
  progress: number;
  nextMilestone: string;
  dueDate: string;
  color: string;
  icon: string;
  papers: string[];
  milestones: Milestone[];
}

export interface Milestone {
  id: string;
  title: string;
  description: string;
  dueDate: string;
  completed: boolean;
  files: File[];
}

export interface File {
  id: string;
  name: string;
  type: string;
  uploadDate: string;
  size: string;
}

export const availableSubjects: Subject[] = [
  {
    id: "physics-hl",
    name: "Physics",
    level: "HL",
    progress: 75,
    nextMilestone: "Draft 1 Due",
    dueDate: "Dec 15",
    color: "#3B82F6",
    icon: "physics",
    papers: ["Paper 1", "Paper 2"],
    milestones: [
      {
        id: "1",
        title: "Topic Selection",
        description: "Choose and approve your IA topic",
        dueDate: "2024-01-15",
        completed: true,
        files: []
      },
      {
        id: "2",
        title: "Research and Data Collection",
        description: "Gather data and conduct research",
        dueDate: "2024-02-15",
        completed: true,
        files: []
      },
      {
        id: "3",
        title: "Draft 1",
        description: "Submit first complete draft",
        dueDate: "2024-12-15",
        completed: false,
        files: []
      }
    ]
  },
  {
    id: "chemistry-hl",
    name: "Chemistry",
    level: "HL",
    progress: 45,
    nextMilestone: "Data Collection",
    dueDate: "Jan 10",
    color: "#10B981",
    icon: "chemistry",
    papers: ["Paper 1", "Paper 2", "Paper 3"],
    milestones: []
  },
  {
    id: "math-aa-hl",
    name: "Math AA",
    level: "HL",
    progress: 90,
    nextMilestone: "Final Review",
    dueDate: "Dec 20",
    color: "#8B5CF6",
    icon: "math",
    papers: ["Paper 1", "Paper 2", "Paper 3"],
    milestones: []
  },
  {
    id: "economics-hl",
    name: "Economics",
    level: "HL",
    progress: 30,
    nextMilestone: "Topic Selection",
    dueDate: "Jan 25",
    color: "#F59E0B",
    icon: "economics",
    papers: ["Paper 1", "Paper 2", "Paper 3"],
    milestones: []
  },
  {
    id: "geography-hl",
    name: "Geography",
    level: "HL",
    progress: 60,
    nextMilestone: "Research Phase",
    dueDate: "Feb 01",
    color: "#EF4444",
    icon: "geography",
    papers: ["Paper 1", "Paper 2", "Paper 3"],
    milestones: []
  },
  {
    id: "computer-science-hl",
    name: "Computer Science",
    level: "HL",
    progress: 85,
    nextMilestone: "Testing Phase",
    dueDate: "Dec 18",
    color: "#06B6D4",
    icon: "computer",
    papers: ["Paper 1", "Paper 2"],
    milestones: []
  },
  {
    id: "english-lang-lit-sl",
    name: "English Lang & Lit",
    level: "SL",
    progress: 55,
    nextMilestone: "Draft Review",
    dueDate: "Jan 08",
    color: "#EC4899",
    icon: "english",
    papers: ["Paper 1", "Paper 2"],
    milestones: []
  },
  {
    id: "arabic-lang-lit-sl",
    name: "Arabic Lang & Lit",
    level: "SL",
    progress: 40,
    nextMilestone: "Topic Research",
    dueDate: "Jan 30",
    color: "#84CC16",
    icon: "arabic",
    papers: ["Paper 1", "Paper 2"],
    milestones: []
  }
];