import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight, Calendar as CalendarIcon } from "lucide-react";
import { Subject } from "@/data/subjects";

interface CalendarViewProps {
  subjects: Subject[];
}

export const CalendarView = ({ subjects }: CalendarViewProps) => {
  const [currentDate, setCurrentDate] = useState(new Date());
  
  // Generate calendar days
  const generateCalendarDays = () => {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const startDate = new Date(firstDay);
    startDate.setDate(startDate.getDate() - firstDay.getDay());
    
    const days = [];
    const currentDay = new Date(startDate);
    
    for (let i = 0; i < 42; i++) {
      days.push(new Date(currentDay));
      currentDay.setDate(currentDay.getDate() + 1);
    }
    
    return days;
  };

  const getDayEvents = (date: Date) => {
    // Mock data - in real app this would come from actual milestones
    const mockEvents = [
      { date: 15, subject: "Physics HL", event: "Draft 1 Due", color: "#3B82F6" },
      { date: 18, subject: "Computer Science HL", event: "Testing Phase", color: "#06B6D4" },
      { date: 20, subject: "Math AA HL", event: "Final Review", color: "#8B5CF6" },
      { date: 25, subject: "Economics HL", event: "Topic Selection", color: "#F59E0B" },
    ];
    
    return mockEvents.filter(event => event.date === date.getDate() && 
      date.getMonth() === currentDate.getMonth());
  };

  const navigateMonth = (direction: 'prev' | 'next') => {
    const newDate = new Date(currentDate);
    newDate.setMonth(newDate.getMonth() + (direction === 'next' ? 1 : -1));
    setCurrentDate(newDate);
  };

  const monthNames = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];

  const dayNames = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const calendarDays = generateCalendarDays();

  return (
    <div className="space-y-6">
      <Card className="animate-fade-in">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              <CalendarIcon size={20} className="text-primary" />
              IA Deadlines Calendar
            </CardTitle>
            
            <div className="flex items-center gap-2">
              <Button 
                variant="outline" 
                size="icon"
                onClick={() => navigateMonth('prev')}
              >
                <ChevronLeft size={16} />
              </Button>
              
              <div className="min-w-[150px] text-center font-semibold">
                {monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}
              </div>
              
              <Button 
                variant="outline" 
                size="icon"
                onClick={() => navigateMonth('next')}
              >
                <ChevronRight size={16} />
              </Button>
            </div>
          </div>
        </CardHeader>
        
        <CardContent>
          {/* Calendar grid */}
          <div className="grid grid-cols-7 gap-2">
            {/* Day headers */}
            {dayNames.map(day => (
              <div key={day} className="p-2 text-center text-sm font-medium text-muted-foreground">
                {day}
              </div>
            ))}
            
            {/* Calendar days */}
            {calendarDays.map((day, index) => {
              const isCurrentMonth = day.getMonth() === currentDate.getMonth();
              const isToday = day.toDateString() === new Date().toDateString();
              const events = getDayEvents(day);
              
              return (
                <div
                  key={index}
                  className={`min-h-[80px] p-2 border rounded-lg transition-colors hover:bg-muted/50 ${
                    isCurrentMonth ? "bg-card" : "bg-muted/20"
                  } ${isToday ? "ring-2 ring-primary" : ""}`}
                >
                  <div className={`text-sm font-medium mb-1 ${
                    isCurrentMonth ? "text-foreground" : "text-muted-foreground"
                  } ${isToday ? "text-primary font-bold" : ""}`}>
                    {day.getDate()}
                  </div>
                  
                  {/* Events for this day */}
                  <div className="space-y-1">
                    {events.map((event, eventIndex) => (
                      <Badge
                        key={eventIndex}
                        variant="secondary"
                        className="block text-xs p-1 truncate"
                        style={{ 
                          backgroundColor: `${event.color}20`, 
                          color: event.color,
                          fontSize: '10px'
                        }}
                      >
                        {event.event}
                      </Badge>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* Upcoming deadlines sidebar */}
      <Card className="animate-fade-in" style={{ animationDelay: "200ms" }}>
        <CardHeader>
          <CardTitle className="text-lg">Upcoming Deadlines</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {[
              { subject: "Physics HL", task: "Draft 1 Submission", date: "Dec 15", color: "#3B82F6", days: 3 },
              { subject: "Computer Science HL", task: "Testing Documentation", date: "Dec 18", color: "#06B6D4", days: 6 },
              { subject: "Math AA HL", task: "Final Review", date: "Dec 20", color: "#8B5CF6", days: 8 },
              { subject: "Economics HL", task: "Topic Selection", date: "Jan 25", color: "#F59E0B", days: 44 }
            ].map((deadline, index) => (
              <div 
                key={index}
                className="flex items-center justify-between p-3 bg-muted/30 rounded-lg hover:bg-muted/50 transition-colors"
              >
                <div className="flex-1">
                  <p className="font-medium text-sm">{deadline.task}</p>
                  <p className="text-xs text-muted-foreground">{deadline.subject}</p>
                </div>
                <div className="text-right">
                  <Badge 
                    variant="outline"
                    className="text-xs"
                    style={{ borderColor: deadline.color, color: deadline.color }}
                  >
                    {deadline.date}
                  </Badge>
                  <p className="text-xs text-muted-foreground mt-1">
                    {deadline.days} days left
                  </p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};