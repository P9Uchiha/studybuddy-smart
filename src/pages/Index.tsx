
import { Link } from "react-router-dom";
import { ArrowRight, BookOpen, Brain, BarChart, CheckCircle } from "lucide-react";
import { CustomButton } from "@/components/ui/custom-button";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

export default function Index() {
  const features = [
    {
      icon: <BookOpen className="h-8 w-8 text-study-green-300" />,
      title: "Personalized Study Plans",
      description: "Create custom study schedules based on your subjects and available time. Our AI optimizes your learning for maximum efficiency.",
    },
    {
      icon: <Brain className="h-8 w-8 text-study-green-300" />,
      title: "AI-Powered Q&A",
      description: "Get instant answers to your study questions. Our AI assistant helps you understand complex topics and clear your doubts in real-time.",
    },
    {
      icon: <CheckCircle className="h-8 w-8 text-study-green-300" />,
      title: "Smart Flashcards",
      description: "Generate and review flashcards created from your notes or textbooks. Our spaced repetition system helps you remember information longer.",
    },
    {
      icon: <BarChart className="h-8 w-8 text-study-green-300" />,
      title: "Progress Tracking",
      description: "Monitor your study progress with detailed analytics. See your improvements over time and identify areas that need more attention.",
    },
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1">
        {/* Hero Section */}
        <section className="gradient-bg py-24 md:py-32">
          <div className="container mx-auto px-4 md:px-6">
            <div className="flex flex-col md:flex-row items-center justify-between">
              <div className="md:w-1/2 mb-10 md:mb-0">
                <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 leading-tight text-shadow">
                  Boost Your Study<br />Performance with AI
                </h1>
                <p className="text-xl text-white opacity-90 mb-8 max-w-lg">
                  Create personalized study plans, get instant answers, and track your progress with our intelligent study assistant.
                </p>
                <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
                  <Link to="/dashboard">
                    <CustomButton variant="gradient" size="lg" className="bg-white text-study-dark-800 hover:bg-gray-100">
                      Get Started
                      <ArrowRight className="ml-2 h-5 w-5" />
                    </CustomButton>
                  </Link>
                  <Link to="/qa">
                    <CustomButton variant="outline" size="lg" className="bg-transparent border-white text-white hover:bg-white/10">
                      Try Q&A Demo
                    </CustomButton>
                  </Link>
                </div>
              </div>
              
              <div className="md:w-1/2">
                <div className="bg-study-dark-800/70 glass-panel rounded-xl shadow-2xl p-6 transform rotate-2 max-w-lg mx-auto border border-study-green-700/30">
                  <div className="aspect-video bg-study-dark-700/50 rounded-lg flex items-center justify-center mb-6">
                    <BookOpen className="h-20 w-20 text-study-green-400" />
                  </div>
                  <div className="space-y-4">
                    <div className="h-5 bg-study-dark-700/50 rounded-full w-3/4"></div>
                    <div className="h-5 bg-study-dark-700/50 rounded-full"></div>
                    <div className="h-5 bg-study-dark-700/50 rounded-full w-5/6"></div>
                    <div className="flex justify-end">
                      <div className="h-10 w-32 bg-study-green-500 rounded-lg"></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-20 md:py-28 bg-study-dark-800">
          <div className="container mx-auto px-4 md:px-6">
            <div className="text-center mb-16 animation-fade-in">
              <h2 className="text-3xl md:text-5xl font-bold mb-4 text-white text-shadow">How Study Buddy AI Helps You</h2>
              <p className="text-lg text-study-neutral-300 max-w-2xl mx-auto">
                Our platform combines AI technology with proven study techniques to help you learn more efficiently and effectively.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {features.map((feature, idx) => (
                <div 
                  key={idx} 
                  className="bg-study-dark-700/70 rounded-lg p-8 card-shadow hover:shadow-lg transition-shadow duration-300 border border-study-green-900/20"
                >
                  <div className="mb-5 bg-study-green-900/30 p-4 rounded-full inline-block">{feature.icon}</div>
                  <h3 className="text-xl font-semibold mb-3 text-white">{feature.title}</h3>
                  <p className="text-study-neutral-300">{feature.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* How It Works Section */}
        <section className="py-20 md:py-28 bg-study-dark-700">
          <div className="container mx-auto px-4 md:px-6">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-5xl font-bold mb-4 text-white text-shadow">How It Works</h2>
              <p className="text-lg text-study-neutral-300 max-w-2xl mx-auto">
                Getting started with Study Buddy AI is quick and easy. Follow these simple steps:
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-10 max-w-4xl mx-auto">
              <div className="relative">
                <div className="bg-study-dark-800/70 rounded-xl p-8 card-shadow h-full transform hover:-translate-y-1 transition-transform duration-300 border border-study-green-900/20">
                  <div className="absolute top-0 left-0 -mt-5 -ml-5 bg-study-green-500 text-white w-12 h-12 rounded-full flex items-center justify-center font-bold text-xl shadow-lg">
                    1
                  </div>
                  <h3 className="text-xl font-semibold mb-4 mt-4 text-white">Create Your Account</h3>
                  <p className="text-study-neutral-300">
                    Sign up for a free account to access all of Study Buddy AI's features and start organizing your study sessions.
                  </p>
                </div>
              </div>
              
              <div className="relative">
                <div className="bg-study-dark-800/70 rounded-xl p-8 card-shadow h-full transform hover:-translate-y-1 transition-transform duration-300 border border-study-green-900/20">
                  <div className="absolute top-0 left-0 -mt-5 -ml-5 bg-study-green-500 text-white w-12 h-12 rounded-full flex items-center justify-center font-bold text-xl shadow-lg">
                    2
                  </div>
                  <h3 className="text-xl font-semibold mb-4 mt-4 text-white">Input Your Study Goals</h3>
                  <p className="text-study-neutral-300">
                    Tell us about your subjects, available study time, and learning goals so we can create a customized plan.
                  </p>
                </div>
              </div>
              
              <div className="relative">
                <div className="bg-study-dark-800/70 rounded-xl p-8 card-shadow h-full transform hover:-translate-y-1 transition-transform duration-300 border border-study-green-900/20">
                  <div className="absolute top-0 left-0 -mt-5 -ml-5 bg-study-green-500 text-white w-12 h-12 rounded-full flex items-center justify-center font-bold text-xl shadow-lg">
                    3
                  </div>
                  <h3 className="text-xl font-semibold mb-4 mt-4 text-white">Start Learning Better</h3>
                  <p className="text-study-neutral-300">
                    Follow your personalized study plan, use the AI assistant for help, and track your progress as you learn.
                  </p>
                </div>
              </div>
            </div>
            
            <div className="text-center mt-16">
              <Link to="/dashboard">
                <CustomButton variant="gradient" size="lg">
                  Get Started Now
                  <ArrowRight className="ml-2 h-5 w-5" />
                </CustomButton>
              </Link>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="gradient-bg py-20 md:py-24">
          <div className="container mx-auto px-4 md:px-6 text-center">
            <h2 className="text-3xl md:text-5xl font-bold text-white mb-6 text-shadow">Ready to Transform Your Study Habits?</h2>
            <p className="text-xl text-white opacity-90 mb-10 max-w-2xl mx-auto">
              Join thousands of students who are studying smarter, not harder, with Study Buddy AI.
            </p>
            <Link to="/dashboard">
              <CustomButton variant="gradient" size="lg" className="bg-white text-study-dark-800 hover:bg-gray-100 shadow-xl">
                Start Free Trial
                <ArrowRight className="ml-2 h-5 w-5" />
              </CustomButton>
            </Link>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
