
import { useState } from "react";
import { toast } from "sonner";
import { Message } from "./types";
import MessageList from "./MessageList";
import QuestionForm from "./QuestionForm";
import ApiKeyInput from "./ApiKeyInput";
import { fetchAIResponse } from "@/utils/ai-service";

export default function QASection() {
  const [loading, setLoading] = useState(false);
  const [apiKey, setApiKey] = useState<string>("");
  const [conversation, setConversation] = useState<Message[]>([
    {
      id: "welcome",
      content: "Hello! I'm your Study Buddy AI assistant. Ask me any study-related question, and I'll do my best to help you.",
      sender: "ai",
      timestamp: new Date(),
    }
  ]);

  // Mock responses for demo without API key
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

  const handleSubmit = async (question: string) => {
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
      // Check if API key is provided
      let response: string;
      
      if (!apiKey) {
        // For demo without API key, use mock responses
        await new Promise(resolve => setTimeout(resolve, 1000));
        response = generateMockResponse(question);
      } else {
        // Make actual API call
        try {
          response = await fetchAIResponse(question, apiKey);
        } catch (error) {
          console.error("Error with AI service:", error);
          toast.error("Failed to get a response from the AI service. Please check your API key.");
          
          // Fallback to mock responses if API call fails
          response = "Sorry, I couldn't connect to the AI service. " + 
            (error instanceof Error ? error.message : "Please verify your API key or try again later.");
        }
      }
      
      // Add AI response to conversation
      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: response,
        sender: 'ai',
        timestamp: new Date(),
        isSaved: false
      };
      
      setConversation(prev => [...prev, aiMessage]);
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

  const handleApiKeyChange = (newApiKey: string) => {
    setApiKey(newApiKey);
  };

  return (
    <div className="flex flex-col h-full text-white">
      <ApiKeyInput onApiKeyChange={handleApiKeyChange} />
      <MessageList 
        messages={conversation} 
        onToggleSave={toggleSaveMessage} 
        loading={loading} 
      />
      <QuestionForm onSubmit={handleSubmit} loading={loading} />
    </div>
  );
}
