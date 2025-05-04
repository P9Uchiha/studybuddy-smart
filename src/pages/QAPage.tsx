
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import QASection from "@/components/qa/QASection";
import { Card } from "@/components/ui/card";

export default function QAPage() {
  return (
    <div className="min-h-screen flex flex-col bg-study-dark-800">
      <Navbar />
      
      <main className="flex-1 py-12 container mx-auto px-4 md:px-6">
        <div className="max-w-4xl mx-auto">
          <div className="mb-8">
            <h1 className="text-3xl font-bold mb-4 text-white text-shadow">AI Study Assistant</h1>
            <p className="text-study-neutral-300 mb-2">
              Get instant answers to your study questions. Our AI assistant helps you understand complex topics and clear your doubts in real-time.
            </p>
            <p className="text-study-neutral-400 text-sm mb-4">
              To use the AI features, please provide your API key from <a href="https://console.groq.com/keys" target="_blank" rel="noreferrer" className="text-study-green-400 hover:underline">Groq</a>.
              For demo purposes, you can also ask about Newton's Second Law, photosynthesis, or the Pythagorean theorem without an API key.
            </p>
          </div>
            
          <Card className="p-6 bg-study-dark-700/70 border border-study-green-900/20 text-white">
            <QASection />
          </Card>
        </div>
      </main>
      
      <Footer />
    </div>
  );
}
