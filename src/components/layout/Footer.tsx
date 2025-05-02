
import { BookOpen } from "lucide-react";
import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="bg-white border-t">
      <div className="container mx-auto px-4 py-8 md:py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-2">
            <Link to="/" className="flex items-center space-x-2 mb-4">
              <BookOpen className="w-6 h-6 text-study-purple-300" />
              <span className="font-bold text-lg text-study-neutral-800">Study Buddy AI</span>
            </Link>
            <p className="text-study-neutral-400 max-w-md">
              Your intelligent study assistant that helps you create personalized study plans, 
              resolve doubts in real-time, generate flashcards, and track progress.
            </p>
          </div>
          
          <div>
            <h3 className="font-medium text-study-neutral-800 mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-study-neutral-500 hover:text-study-purple-300 transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/dashboard" className="text-study-neutral-500 hover:text-study-purple-300 transition-colors">
                  Dashboard
                </Link>
              </li>
              <li>
                <Link to="/qa" className="text-study-neutral-500 hover:text-study-purple-300 transition-colors">
                  Q&A
                </Link>
              </li>
              <li>
                <Link to="/flashcards" className="text-study-neutral-500 hover:text-study-purple-300 transition-colors">
                  Flashcards
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-medium text-study-neutral-800 mb-4">Contact</h3>
            <ul className="space-y-2">
              <li className="text-study-neutral-500">
                support@studybuddyai.com
              </li>
              <li className="text-study-neutral-500">
                Created for Hackathon 2023
              </li>
            </ul>
          </div>
        </div>
        
        <div className="border-t mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-study-neutral-400 text-sm">
            © {new Date().getFullYear()} Study Buddy AI. All rights reserved.
          </p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <a href="#" className="text-study-neutral-400 hover:text-study-purple-300 transition-colors">
              Privacy Policy
            </a>
            <a href="#" className="text-study-neutral-400 hover:text-study-purple-300 transition-colors">
              Terms of Service
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
