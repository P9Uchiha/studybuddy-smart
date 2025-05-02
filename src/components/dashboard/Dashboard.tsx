
import { useState } from "react";
import { PlusCircle } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { CustomButton } from "@/components/ui/custom-button";
import StudyPlan from "./StudyPlan";
import ProgressCharts from "./ProgressCharts";
import { toast } from "sonner";

const mockStudyPlans = [
  {
    subject: "Mathematics",
    hoursAllocated: 4,
    days: ["Monday", "Wednesday"],
    topics: ["Calculus", "Algebra", "Trigonometry"],
    progress: 65
  },
  {
    subject: "Physics",
    hoursAllocated: 6,
    days: ["Tuesday", "Thursday"],
    topics: ["Mechanics", "Thermodynamics", "Electromagnetism"],
    progress: 42
  },
  {
    subject: "Computer Science",
    hoursAllocated: 3,
    days: ["Friday"],
    topics: ["Data Structures", "Algorithms"],
    progress: 78
  }
];

const mockStudyStats = {
  totalStudyHours: 13,
  subjectsProgress: [
    { name: "Mathematics", hours: 4, percentage: 65 },
    { name: "Physics", hours: 6, percentage: 42 },
    { name: "Computer Science", hours: 3, percentage: 78 },
  ],
  streaks: 5,
  flashcardsMastered: 45
};

export default function Dashboard() {
  const [studyPlans] = useState(mockStudyPlans);
  const [studyStats] = useState(mockStudyStats);
  
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-study-neutral-800">Your Dashboard</h1>
        <CustomButton 
          variant="gradient"
          onClick={() => toast.success("This would open a study plan creation modal!")}
        >
          <PlusCircle className="h-5 w-5 mr-2" />
          Add Study Plan
        </CustomButton>
      </div>

      <Tabs defaultValue="overview">
        <TabsList className="w-full max-w-md">
          <TabsTrigger value="overview" className="flex-1">Overview</TabsTrigger>
          <TabsTrigger value="study-plan" className="flex-1">Study Plan</TabsTrigger>
          <TabsTrigger value="progress" className="flex-1">Progress</TabsTrigger>
        </TabsList>
        
        <TabsContent value="overview" className="mt-4 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-study-neutral-500">Total Study Hours</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{studyStats.totalStudyHours} hrs</div>
                <p className="text-xs text-study-neutral-400 mt-1">This week</p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-study-neutral-500">Study Streak</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{studyStats.streaks} days</div>
                <p className="text-xs text-study-neutral-400 mt-1">Keep it up!</p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-study-neutral-500">Subjects</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{studyPlans.length}</div>
                <p className="text-xs text-study-neutral-400 mt-1">In your study plan</p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-study-neutral-500">Flashcards Mastered</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{studyStats.flashcardsMastered}</div>
                <p className="text-xs text-study-neutral-400 mt-1">Out of 100</p>
              </CardContent>
            </Card>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card className="col-span-1">
              <CardHeader>
                <CardTitle>Study Time Distribution</CardTitle>
              </CardHeader>
              <CardContent className="h-80">
                <ProgressCharts data={studyStats.subjectsProgress} />
              </CardContent>
            </Card>
            
            <Card className="col-span-1">
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle>Current Study Plans</CardTitle>
                <Button variant="ghost" size="sm" className="text-study-purple-400">
                  View All
                </Button>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {studyPlans.map((plan, index) => (
                    <div key={index} className="flex items-center justify-between pb-4 last:pb-0 border-b last:border-0">
                      <div>
                        <p className="font-medium">{plan.subject}</p>
                        <p className="text-sm text-study-neutral-400">{plan.hoursAllocated} hours • {plan.days.join(', ')}</p>
                      </div>
                      <div className="flex items-center">
                        <span className="mr-2 text-sm font-medium">{plan.progress}%</span>
                        <div className="w-16 h-2 bg-study-neutral-100 rounded-full">
                          <div 
                            className="h-full bg-study-purple-300 rounded-full" 
                            style={{ width: `${plan.progress}%` }}
                          />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        
        <TabsContent value="study-plan" className="mt-4">
          <StudyPlan plans={studyPlans} />
        </TabsContent>
        
        <TabsContent value="progress" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Progress Overview</CardTitle>
            </CardHeader>
            <CardContent className="h-96">
              <ProgressCharts data={studyStats.subjectsProgress} showDetails />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
