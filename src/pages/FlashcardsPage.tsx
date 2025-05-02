
import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import FlashcardGenerator from "@/components/flashcards/FlashcardGenerator";
import FlashcardView, { Flashcard } from "@/components/flashcards/FlashcardView";

// Sample flashcards for demonstration
const initialFlashcards: Flashcard[] = [
  {
    id: "1",
    question: "What is the capital of France?",
    answer: "Paris",
    status: "correct"
  },
  {
    id: "2",
    question: "What is photosynthesis?",
    answer: "The process by which green plants and some other organisms use sunlight to synthesize foods with the help of chlorophyll.",
    status: "unreviewed"
  },
  {
    id: "3",
    question: "What is Newton's First Law?",
    answer: "An object at rest stays at rest, and an object in motion stays in motion with the same speed and direction unless acted upon by an external force.",
    status: "incorrect"
  }
];

export default function FlashcardsPage() {
  const [flashcards, setFlashcards] = useState<Flashcard[]>(initialFlashcards);
  
  const handleGenerateFlashcards = (newCards: { question: string; answer: string }[]) => {
    const formattedCards = newCards.map((card, index) => ({
      id: `new-${Date.now()}-${index}`,
      question: card.question,
      answer: card.answer,
      status: "unreviewed" as const
    }));
    
    setFlashcards([...flashcards, ...formattedCards]);
  };
  
  const handleUpdateStatus = (id: string, status: "correct" | "incorrect") => {
    setFlashcards(
      flashcards.map(card =>
        card.id === id
          ? { ...card, status, lastReviewed: new Date() }
          : card
      )
    );
  };
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1 py-8 bg-study-neutral-100">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-5xl mx-auto">
            <h1 className="text-2xl font-bold mb-6">Flashcards</h1>
            
            <Tabs defaultValue="review">
              <TabsList className="w-full max-w-md mb-6">
                <TabsTrigger value="review" className="flex-1">Review Flashcards</TabsTrigger>
                <TabsTrigger value="create" className="flex-1">Create Flashcards</TabsTrigger>
              </TabsList>
              
              <TabsContent value="review">
                <FlashcardView 
                  flashcards={flashcards}
                  onUpdateStatus={handleUpdateStatus}
                />
              </TabsContent>
              
              <TabsContent value="create">
                <FlashcardGenerator onGenerateFlashcards={handleGenerateFlashcards} />
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
}
