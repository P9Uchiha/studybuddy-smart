
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Calendar } from "lucide-react";

interface StudyTopic {
  name: string;
  duration: number; // in minutes
}

interface DayPlan {
  day: string;
  subjects: {
    name: string;
    topics: StudyTopic[];
    totalMinutes: number;
  }[];
}

interface StudyPlanProps {
  plans: {
    subject: string;
    hoursAllocated: number;
    days: string[];
    topics: string[];
    progress: number;
  }[];
}

// Convert the simple plan structure to a more detailed day-by-day schedule
const generateWeeklySchedule = (plans: StudyPlanProps["plans"]): DayPlan[] => {
  const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
  
  return days.map(day => {
    const subjects = plans
      .filter(plan => plan.days.includes(day))
      .map(plan => {
        const minutesPerTopic = (plan.hoursAllocated * 60) / plan.topics.length;
        return {
          name: plan.subject,
          topics: plan.topics.map(topic => ({
            name: topic,
            duration: minutesPerTopic
          })),
          totalMinutes: plan.hoursAllocated * 60
        };
      });
    
    return { day, subjects };
  });
};

export default function StudyPlan({ plans }: StudyPlanProps) {
  const [view, setView] = useState<"list" | "calendar">("list");
  const weeklySchedule = generateWeeklySchedule(plans);
  
  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-bold text-study-neutral-800">Weekly Study Plan</h2>
        <div className="flex items-center space-x-2">
          <Button
            variant={view === "list" ? "default" : "outline"}
            onClick={() => setView("list")}
            size="sm"
          >
            List View
          </Button>
          <Button
            variant={view === "calendar" ? "default" : "outline"}
            onClick={() => setView("calendar")}
            size="sm"
          >
            <Calendar className="h-4 w-4 mr-1" />
            Calendar
          </Button>
        </div>
      </div>

      {view === "list" ? (
        <Tabs defaultValue="Monday">
          <TabsList className="w-full max-w-md grid grid-cols-7">
            {weeklySchedule.map((day) => (
              <TabsTrigger key={day.day} value={day.day} className="text-xs px-1 md:text-sm md:px-2">
                {day.day.slice(0, 3)}
              </TabsTrigger>
            ))}
          </TabsList>
          
          {weeklySchedule.map((dayPlan) => (
            <TabsContent key={dayPlan.day} value={dayPlan.day} className="mt-4">
              <Card>
                <CardHeader>
                  <CardTitle className="flex justify-between items-center">
                    <span>{dayPlan.day}</span>
                    <span className="text-sm font-normal text-study-neutral-400">
                      {dayPlan.subjects.reduce((acc, s) => acc + s.totalMinutes, 0) / 60} hours
                    </span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  {dayPlan.subjects.length > 0 ? (
                    <div className="space-y-6">
                      {dayPlan.subjects.map((subject, idx) => (
                        <div key={idx} className="space-y-3">
                          <div className="flex justify-between items-center">
                            <h3 className="font-medium text-study-purple-400">{subject.name}</h3>
                            <span className="text-sm text-study-neutral-400">
                              {subject.totalMinutes / 60} hours
                            </span>
                          </div>
                          
                          <div className="space-y-2">
                            {subject.topics.map((topic, i) => (
                              <div key={i} className="flex items-center justify-between border-l-2 border-study-purple-300 pl-3 py-1">
                                <span>{topic.name}</span>
                                <span className="text-sm text-study-neutral-400">
                                  {Math.round(topic.duration)} min
                                </span>
                              </div>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="flex flex-col items-center justify-center h-40 text-study-neutral-400">
                      <p>No study plans for {dayPlan.day}</p>
                      <p className="text-sm mt-1">Enjoy your day off!</p>
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>
          ))}
        </Tabs>
      ) : (
        <Card className="p-4">
          <div className="space-y-4">
            <div className="grid grid-cols-7 gap-4 font-medium text-center text-sm">
              {weeklySchedule.map((dayPlan) => (
                <div key={dayPlan.day}>{dayPlan.day.slice(0, 3)}</div>
              ))}
            </div>
            
            <div className="grid grid-cols-7 gap-4">
              {weeklySchedule.map((dayPlan, idx) => (
                <div key={idx} className="min-h-[300px] border rounded-md p-2">
                  {dayPlan.subjects.length > 0 ? (
                    dayPlan.subjects.map((subject, subjectIdx) => (
                      <div 
                        key={subjectIdx} 
                        className="bg-study-purple-100 mb-2 p-2 rounded text-xs"
                        style={{ 
                          height: `${Math.max(subject.totalMinutes / 10, 30)}px`,
                          overflow: "hidden"
                        }}
                      >
                        <div className="font-medium text-study-purple-700">{subject.name}</div>
                        <div className="text-study-purple-500">{subject.totalMinutes / 60} hrs</div>
                      </div>
                    ))
                  ) : (
                    <div className="flex items-center justify-center h-full text-xs text-study-neutral-400">
                      No plans
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </Card>
      )}
    </div>
  );
}
