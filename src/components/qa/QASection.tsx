import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { CustomButton } from "@/components/ui/custom-button";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Search, Bookmark, BookmarkCheck } from "lucide-react";
import { toast } from "sonner";

interface Message {
  id: string;
  content: string;
  sender: 'user' | 'ai';
  timestamp: Date;
  isSaved?: boolean;
}

const API_KEY = process.env.REACT_APP_GROQ_API_KEY || ""; // API key will be stored in environment variable

export default function QASection() {
  const [question, setQuestion] = useState("");
  const [loading, setLoading] = useState(false);
  const [conversation, setConversation] = useState<Message[]>([
    {
      id: "welcome",
      content: "Hello! I'm your Study Buddy AI assistant. Ask me any study-related question, and I'll do my best to help you.",
      sender: "ai",
      timestamp: new Date(),
    }
  ]);

  const mockResponses: Record<string, string> = {
    "What is Newton's Second Law?": 
      "Newton's Second Law of Motion states that the force acting on an object is equal to the mass of the object multiplied by its acceleration (F = ma). This law explains how the velocity of an object changes when it is subjected to an external force.",
    "Explain photosynthesis": 
      "Photosynthesis is the process by which green plants, algae, and some bacteria convert light energy, usually from the sun, into chemical energy in the form of glucose or other sugars. The basic equation is: 6CO₂ + 6H₂O + light energy → C₆H₁₂O₆ + 6O₂. This process takes place in the chloroplasts, specifically in the thylakoid membrane.",
    "What is the Pythagorean theorem?":
      "The Pythagorean theorem states that in a right triangle, the square of the length of the hypotenuse equals the sum of the squares of the other two sides. If we call the hypotenuse c, and the other two sides a and b, then the theorem can be expressed as: a² + b² = c². This fundamental relationship is the basis of many applications in geometry, trigonometry, and practical real-world problems.",
  };

  const generateMockResponse = (q: string): string => {
    const lowercaseQ = q.toLowerCase();
    
    // Check if we have a predefined response
    for (const [key, value] of Object.entries(mockResponses)) {
      if (lowercaseQ.includes(key.toLowerCase())) {
        return value;
      }
    }
    
    // Fallback for unknown questions
    return "I don't have specific information on that topic yet. In a complete implementation, I would connect to an AI service like Groq or xAI to provide accurate answers. For this demo, I can only answer questions about Newton's Second Law, photosynthesis, and the Pythagorean theorem.";
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!question.trim()) {
      toast.error("Please enter a question");
      return;
    }
    
    // Add user question to conversation
    const userMessage: Message = {
      id: Date.now().toString(),
      content: question,
      sender: 'user',
      timestamp: new Date(),
    };
    
    setConversation(prev => [...prev, userMessage]);
    setLoading(true);
    
    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // In a production app, we would make an actual API call to Groq here
      // const response = await fetchAIResponse(question, API_KEY);
      
      // For now, generate mock response
      const response = generateMockResponse(question);
      
      // Add AI response to conversation
      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: response,
        sender: 'ai',
        timestamp: new Date(),
        isSaved: false
      };
      
      setConversation(prev => [...prev, aiMessage]);
      setQuestion("");
    } catch (error) {
      toast.error("Failed to get a response. Please try again.");
      console.error("Error:", error);
    } finally {
      setLoading(false);
    }
  };

  const toggleSaveMessage = (id: string) => {
    setConversation(prev => 
      prev.map(msg => 
        msg.id === id ? { ...msg, isSaved: !msg.isSaved } : msg
      )
    );
    
    const message = conversation.find(msg => msg.id === id);
    if (message) {
      toast.success(message.isSaved ? "Answer removed from saved items" : "Answer saved for future reference");
    }
  };

  return (
    <div className="flex flex-col h-full">
      {/* Conversation Display */}
      <div className="flex-1 overflow-y-auto mb-4 space-y-4">
        {conversation.map((message) => (
          <div
            key={message.id}
            className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <Card className={`
              max-w-3xl rounded-2xl
              ${message.sender === 'user' 
                ? 'bg-study-purple-300 text-white' 
                : 'bg-white'}
            `}>
              <CardContent className="p-4">
                <div className="flex flex-col">
                  <div className="flex justify-between items-start">
                    <div className="prose max-w-none">
                      {message.content}
                    </div>
                    {message.sender === 'ai' && (
                      <Button
                        variant="ghost"
                        size="sm"
                        className="ml-2 -mt-1 -mr-2 text-study-neutral-400 hover:text-study-purple-400"
                        onClick={() => toggleSaveMessage(message.id)}
                      >
                        {message.isSaved ? (
                          <BookmarkCheck className="h-4 w-4" />
                        ) : (
                          <Bookmark className="h-4 w-4" />
                        )}
                      </Button>
                    )}
                  </div>
                  <div className="text-xs text-right mt-2 opacity-70">
                    {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        ))}
        
        {loading && (
          <div className="flex justify-start">
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-study-purple-300 rounded-full animate-pulse"></div>
                  <div className="w-2 h-2 bg-study-purple-300 rounded-full animate-pulse delay-150"></div>
                  <div className="w-2 h-2 bg-study-purple-300 rounded-full animate-pulse delay-300"></div>
                  <span className="text-sm text-study-neutral-400">Study Buddy is thinking...</span>
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
      
      {/* Question Input */}
      <form onSubmit={handleSubmit} className="flex flex-col space-y-2">
        <Textarea
          placeholder="Ask any study question... (e.g., What is Newton's Second Law?)"
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          className="resize-none"
          rows={3}
          disabled={loading}
        />
        <div className="flex justify-end">
          <CustomButton
            type="submit"
            variant="gradient"
            disabled={loading || !question.trim()}
          >
            <Search className="h-4 w-4 mr-2" />
            {loading ? "Getting Answer..." : "Ask Question"}
          </CustomButton>
        </div>
      </form>
    </div>
  );
}
