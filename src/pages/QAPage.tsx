
import { useState } from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import QASection from "@/components/qa/QASection";
import { Card } from "@/components/ui/card";

export default function QAPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1 py-8 bg-study-neutral-100">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-2xl font-bold mb-6">AI Study Assistant</h1>
            <p className="text-study-neutral-500 mb-2">
              Get instant answers to your study questions. Our AI assistant helps you understand complex topics and clear your doubts in real-time.
              Try asking questions about Newton's Second Law, photosynthesis, or the Pythagorean theorem.
            </p>
            <p className="text-study-neutral-400 text-sm mb-6 italic">
              Note: For a production version, you would add your API key as VITE_GROQ_API_KEY in a .env file.
            </p>
            
            <Card className="p-6">
              <QASection />
            </Card>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
}
