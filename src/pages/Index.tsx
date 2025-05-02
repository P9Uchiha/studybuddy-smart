
import { Link } from "react-router-dom";
import { ArrowRight, CheckCircle, BookOpen, Brain, BarChart } from "lucide-react";
import { CustomButton } from "@/components/ui/custom-button";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

export default function Index() {
  const features = [
    {
      icon: <BookOpen className="h-8 w-8 text-study-purple-300" />,
      title: "Personalized Study Plans",
      description: "Create custom study schedules based on your subjects and available time. Our AI optimizes your learning for maximum efficiency.",
    },
    {
      icon: <Brain className="h-8 w-8 text-study-purple-300" />,
      title: "AI-Powered Q&A",
      description: "Get instant answers to your study questions. Our AI assistant helps you understand complex topics and clear your doubts in real-time.",
    },
    {
      icon: <CheckCircle className="h-8 w-8 text-study-purple-300" />,
      title: "Smart Flashcards",
      description: "Generate and review flashcards created from your notes or textbooks. Our spaced repetition system helps you remember information longer.",
    },
    {
      icon: <BarChart className="h-8 w-8 text-study-purple-300" />,
      title: "Progress Tracking",
      description: "Monitor your study progress with detailed analytics. See your improvements over time and identify areas that need more attention.",
    },
  ];

  const testimonials = [
    {
      quote: "Study Buddy AI completely transformed how I prepare for exams. The personalized study plans helped me organize my time efficiently.",
      author: "Alex Johnson, Computer Science Student",
    },
    {
      quote: "The flashcard feature is amazing! I uploaded my notes and it created perfect question-answer pairs that helped me ace my biology exam.",
      author: "Sarah Williams, Medical Student",
    },
    {
      quote: "As a math major, the Q&A feature has been invaluable. It's like having a tutor available 24/7 to explain complex concepts.",
      author: "Michael Chen, Mathematics Student",
    },
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1">
        {/* Hero Section */}
        <section className="gradient-bg py-20 md:py-28">
          <div className="container mx-auto px-4 md:px-6">
            <div className="flex flex-col md:flex-row items-center justify-between">
              <div className="md:w-1/2 mb-10 md:mb-0">
                <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
                  Your Personal AI Study Assistant
                </h1>
                <p className="text-lg md:text-xl text-white opacity-90 mb-8 max-w-md">
                  Create personalized study plans, get instant answers, generate flashcards, and track your progress all in one place.
                </p>
                <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
                  <Link to="/dashboard">
                    <CustomButton variant="gradient" size="lg" className="bg-white text-study-purple-500 hover:bg-gray-100">
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
                <div className="bg-white rounded-lg shadow-xl p-6 transform rotate-2 max-w-lg mx-auto">
                  <div className="aspect-video bg-study-purple-50 rounded flex items-center justify-center mb-4">
                    <BookOpen className="h-16 w-16 text-study-purple-300" />
                  </div>
                  <div className="space-y-4">
                    <div className="h-4 bg-study-neutral-100 rounded-full w-3/4"></div>
                    <div className="h-4 bg-study-neutral-100 rounded-full"></div>
                    <div className="h-4 bg-study-neutral-100 rounded-full w-5/6"></div>
                    <div className="flex justify-end">
                      <div className="h-10 w-32 bg-study-purple-300 rounded"></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-16 md:py-24 bg-white">
          <div className="container mx-auto px-4 md:px-6">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">How Study Buddy AI Helps You</h2>
              <p className="text-lg text-study-neutral-500 max-w-2xl mx-auto">
                Our platform combines AI technology with proven study techniques to help you learn more efficiently and effectively.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {features.map((feature, idx) => (
                <div key={idx} className="bg-white rounded-lg p-6 card-shadow">
                  <div className="mb-4">{feature.icon}</div>
                  <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                  <p className="text-study-neutral-500">{feature.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* How It Works Section */}
        <section className="py-16 md:py-24 bg-study-neutral-100">
          <div className="container mx-auto px-4 md:px-6">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">How It Works</h2>
              <p className="text-lg text-study-neutral-500 max-w-2xl mx-auto">
                Getting started with Study Buddy AI is quick and easy. Follow these simple steps:
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
              <div className="relative">
                <div className="bg-white rounded-lg p-6 card-shadow h-full">
                  <div className="absolute top-0 left-0 -mt-4 -ml-4 bg-study-purple-300 text-white w-10 h-10 rounded-full flex items-center justify-center font-bold text-xl">
                    1
                  </div>
                  <h3 className="text-xl font-semibold mb-4 mt-4">Create Your Account</h3>
                  <p className="text-study-neutral-500">
                    Sign up for a free account to access all of Study Buddy AI's features and start organizing your study sessions.
                  </p>
                </div>
              </div>
              
              <div className="relative">
                <div className="bg-white rounded-lg p-6 card-shadow h-full">
                  <div className="absolute top-0 left-0 -mt-4 -ml-4 bg-study-purple-300 text-white w-10 h-10 rounded-full flex items-center justify-center font-bold text-xl">
                    2
                  </div>
                  <h3 className="text-xl font-semibold mb-4 mt-4">Input Your Study Goals</h3>
                  <p className="text-study-neutral-500">
                    Tell us about your subjects, available study time, and learning goals so we can create a customized plan.
                  </p>
                </div>
              </div>
              
              <div className="relative">
                <div className="bg-white rounded-lg p-6 card-shadow h-full">
                  <div className="absolute top-0 left-0 -mt-4 -ml-4 bg-study-purple-300 text-white w-10 h-10 rounded-full flex items-center justify-center font-bold text-xl">
                    3
                  </div>
                  <h3 className="text-xl font-semibold mb-4 mt-4">Start Learning Better</h3>
                  <p className="text-study-neutral-500">
                    Follow your personalized study plan, use the AI assistant for help, and track your progress as you learn.
                  </p>
                </div>
              </div>
            </div>
            
            <div className="text-center mt-12">
              <Link to="/dashboard">
                <CustomButton variant="gradient" size="lg">
                  Get Started Now
                  <ArrowRight className="ml-2 h-5 w-5" />
                </CustomButton>
              </Link>
            </div>
          </div>
        </section>

        {/* Testimonials Section */}
        <section className="py-16 md:py-24 bg-white">
          <div className="container mx-auto px-4 md:px-6">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Student Success Stories</h2>
              <p className="text-lg text-study-neutral-500 max-w-2xl mx-auto">
                See how Study Buddy AI has helped students achieve their academic goals and transform their learning experience.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {testimonials.map((testimonial, idx) => (
                <div key={idx} className="bg-white rounded-lg p-6 card-shadow">
                  <div className="mb-4 text-study-purple-300">
                    <svg className="h-8 w-8" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                    </svg>
                  </div>
                  <p className="text-study-neutral-800 mb-6 italic">"{testimonial.quote}"</p>
                  <p className="text-study-neutral-500 text-sm">{testimonial.author}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="gradient-bg py-16">
          <div className="container mx-auto px-4 md:px-6 text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">Ready to Transform Your Study Habits?</h2>
            <p className="text-xl text-white opacity-90 mb-8 max-w-2xl mx-auto">
              Join thousands of students who are studying smarter, not harder, with Study Buddy AI.
            </p>
            <Link to="/dashboard">
              <CustomButton variant="gradient" size="lg" className="bg-white text-study-purple-500 hover:bg-gray-100">
                Start Free Trial
              </CustomButton>
            </Link>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
