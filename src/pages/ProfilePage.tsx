
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { CustomButton } from "@/components/ui/custom-button";
import { BookOpen } from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { toast } from "sonner";

export default function ProfilePage() {
  const [user, setUser] = useState({
    name: "John Doe",
    email: "john.doe@example.com",
    avatar: "",
    bio: "Computer Science student passionate about AI and machine learning.",
    subjects: ["Mathematics", "Computer Science", "Physics"],
    badges: [
      { name: "5-day Streak", description: "Studied for 5 consecutive days", icon: "🔥" },
      { name: "Quiz Master", description: "Scored 100% on 5 quizzes", icon: "🏆" },
      { name: "Flashcard Pro", description: "Created 50 flashcards", icon: "🃏" },
    ],
    statistics: {
      studyHours: 42,
      questionsAsked: 24,
      flashcardsReviewed: 150,
      quizzesTaken: 8,
    },
    preferences: {
      dailyReminders: true,
      weeklyReports: true,
      darkMode: false,
      publicProfile: false,
    }
  });

  const handleSaveProfile = () => {
    toast.success("Profile updated successfully!");
  };

  const handleSavePreferences = () => {
    toast.success("Preferences saved!");
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1 py-8 bg-study-neutral-100">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-2xl font-bold mb-6">Your Profile</h1>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Profile Summary Card */}
              <Card className="col-span-1">
                <CardContent className="p-6">
                  <div className="flex flex-col items-center text-center">
                    <Avatar className="h-24 w-24 mb-4">
                      <AvatarImage src={user.avatar} />
                      <AvatarFallback className="bg-study-purple-300 text-white text-xl">
                        {user.name.split(' ').map(n => n[0]).join('')}
                      </AvatarFallback>
                    </Avatar>
                    
                    <h2 className="text-xl font-bold">{user.name}</h2>
                    <p className="text-sm text-study-neutral-500 mb-4">{user.email}</p>
                    
                    <p className="text-sm text-study-neutral-600">{user.bio}</p>
                    
                    <div className="w-full mt-6">
                      <h3 className="font-medium mb-2 text-left">Subjects</h3>
                      <div className="flex flex-wrap gap-2">
                        {user.subjects.map((subject, idx) => (
                          <span 
                            key={idx} 
                            className="bg-study-purple-100 text-study-purple-700 text-xs px-2 py-1 rounded"
                          >
                            {subject}
                          </span>
                        ))}
                      </div>
                    </div>
                    
                    <div className="w-full mt-6">
                      <h3 className="font-medium mb-2 text-left">Badges</h3>
                      <div className="grid grid-cols-3 gap-2">
                        {user.badges.map((badge, idx) => (
                          <div
                            key={idx}
                            className="flex flex-col items-center p-2 bg-study-neutral-100 rounded"
                            title={badge.description}
                          >
                            <span className="text-2xl mb-1">{badge.icon}</span>
                            <span className="text-xs">{badge.name}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              {/* Main Content Area */}
              <div className="col-span-1 md:col-span-2">
                <Tabs defaultValue="stats">
                  <TabsList className="w-full mb-6">
                    <TabsTrigger value="stats">Statistics</TabsTrigger>
                    <TabsTrigger value="edit-profile">Edit Profile</TabsTrigger>
                    <TabsTrigger value="preferences">Preferences</TabsTrigger>
                  </TabsList>
                  
                  <TabsContent value="stats">
                    <Card>
                      <CardHeader>
                        <CardTitle>Your Study Statistics</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="grid grid-cols-2 gap-4">
                          <div className="p-4 bg-study-neutral-50 rounded-lg">
                            <div className="text-3xl font-bold text-study-purple-400">
                              {user.statistics.studyHours}
                            </div>
                            <div className="text-sm text-study-neutral-500">Study Hours</div>
                          </div>
                          
                          <div className="p-4 bg-study-neutral-50 rounded-lg">
                            <div className="text-3xl font-bold text-study-purple-400">
                              {user.statistics.questionsAsked}
                            </div>
                            <div className="text-sm text-study-neutral-500">Questions Asked</div>
                          </div>
                          
                          <div className="p-4 bg-study-neutral-50 rounded-lg">
                            <div className="text-3xl font-bold text-study-purple-400">
                              {user.statistics.flashcardsReviewed}
                            </div>
                            <div className="text-sm text-study-neutral-500">Flashcards Reviewed</div>
                          </div>
                          
                          <div className="p-4 bg-study-neutral-50 rounded-lg">
                            <div className="text-3xl font-bold text-study-purple-400">
                              {user.statistics.quizzesTaken}
                            </div>
                            <div className="text-sm text-study-neutral-500">Quizzes Taken</div>
                          </div>
                        </div>
                        
                        <div className="mt-6">
                          <h3 className="font-medium mb-4">Recent Activity</h3>
                          <div className="space-y-4">
                            <div className="flex items-start">
                              <div className="bg-study-purple-100 p-2 rounded">
                                <BookOpen className="h-4 w-4 text-study-purple-500" />
                              </div>
                              <div className="ml-4">
                                <p className="text-sm font-medium">Studied Physics for 2 hours</p>
                                <p className="text-xs text-study-neutral-400">2 days ago</p>
                              </div>
                            </div>
                            
                            <div className="flex items-start">
                              <div className="bg-study-purple-100 p-2 rounded">
                                <BookOpen className="h-4 w-4 text-study-purple-500" />
                              </div>
                              <div className="ml-4">
                                <p className="text-sm font-medium">Created 5 new flashcards</p>
                                <p className="text-xs text-study-neutral-400">3 days ago</p>
                              </div>
                            </div>
                            
                            <div className="flex items-start">
                              <div className="bg-study-purple-100 p-2 rounded">
                                <BookOpen className="h-4 w-4 text-study-purple-500" />
                              </div>
                              <div className="ml-4">
                                <p className="text-sm font-medium">Asked 3 questions about calculus</p>
                                <p className="text-xs text-study-neutral-400">5 days ago</p>
                              </div>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </TabsContent>
                  
                  <TabsContent value="edit-profile">
                    <Card>
                      <CardHeader>
                        <CardTitle>Edit Your Profile</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <form className="space-y-6" onSubmit={(e) => { e.preventDefault(); handleSaveProfile(); }}>
                          <div className="space-y-2">
                            <Label htmlFor="name">Full Name</Label>
                            <Input 
                              id="name" 
                              value={user.name} 
                              onChange={(e) => setUser({ ...user, name: e.target.value })} 
                            />
                          </div>
                          
                          <div className="space-y-2">
                            <Label htmlFor="email">Email</Label>
                            <Input 
                              id="email" 
                              type="email" 
                              value={user.email} 
                              onChange={(e) => setUser({ ...user, email: e.target.value })} 
                            />
                          </div>
                          
                          <div className="space-y-2">
                            <Label htmlFor="bio">Bio</Label>
                            <Input 
                              id="bio" 
                              value={user.bio} 
                              onChange={(e) => setUser({ ...user, bio: e.target.value })} 
                            />
                          </div>
                          
                          <div className="space-y-2">
                            <Label htmlFor="subjects">Subjects (comma separated)</Label>
                            <Input 
                              id="subjects" 
                              value={user.subjects.join(", ")} 
                              onChange={(e) => setUser({ ...user, subjects: e.target.value.split(", ") })} 
                            />
                          </div>
                          
                          <div className="flex justify-end">
                            <CustomButton variant="gradient" type="submit">
                              Save Changes
                            </CustomButton>
                          </div>
                        </form>
                      </CardContent>
                    </Card>
                  </TabsContent>
                  
                  <TabsContent value="preferences">
                    <Card>
                      <CardHeader>
                        <CardTitle>Preferences</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <form className="space-y-6" onSubmit={(e) => { e.preventDefault(); handleSavePreferences(); }}>
                          <div className="flex items-center justify-between">
                            <div>
                              <h3 className="font-medium">Daily Study Reminders</h3>
                              <p className="text-sm text-study-neutral-500">Receive daily notifications to complete your study plan</p>
                            </div>
                            <Switch 
                              checked={user.preferences.dailyReminders} 
                              onCheckedChange={(checked) => setUser({ 
                                ...user, 
                                preferences: { ...user.preferences, dailyReminders: checked } 
                              })} 
                            />
                          </div>
                          
                          <div className="flex items-center justify-between">
                            <div>
                              <h3 className="font-medium">Weekly Progress Reports</h3>
                              <p className="text-sm text-study-neutral-500">Get a summary of your study progress every week</p>
                            </div>
                            <Switch 
                              checked={user.preferences.weeklyReports} 
                              onCheckedChange={(checked) => setUser({ 
                                ...user, 
                                preferences: { ...user.preferences, weeklyReports: checked } 
                              })} 
                            />
                          </div>
                          
                          <div className="flex items-center justify-between">
                            <div>
                              <h3 className="font-medium">Dark Mode</h3>
                              <p className="text-sm text-study-neutral-500">Switch between light and dark themes</p>
                            </div>
                            <Switch 
                              checked={user.preferences.darkMode} 
                              onCheckedChange={(checked) => setUser({ 
                                ...user, 
                                preferences: { ...user.preferences, darkMode: checked } 
                              })} 
                            />
                          </div>
                          
                          <div className="flex items-center justify-between">
                            <div>
                              <h3 className="font-medium">Public Profile</h3>
                              <p className="text-sm text-study-neutral-500">Allow other students to see your profile and progress</p>
                            </div>
                            <Switch 
                              checked={user.preferences.publicProfile} 
                              onCheckedChange={(checked) => setUser({ 
                                ...user, 
                                preferences: { ...user.preferences, publicProfile: checked } 
                              })} 
                            />
                          </div>
                          
                          <div className="flex justify-end">
                            <CustomButton variant="gradient" type="submit">
                              Save Preferences
                            </CustomButton>
                          </div>
                        </form>
                      </CardContent>
                    </Card>
                  </TabsContent>
                </Tabs>
              </div>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
}
