
import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ArrowLeft, ArrowRight, Check, X } from "lucide-react";
import { cn } from "@/lib/utils";

export interface Flashcard {
  id: string;
  question: string;
  answer: string;
  status?: "unreviewed" | "correct" | "incorrect";
  lastReviewed?: Date | null;
}

interface FlashcardViewProps {
  flashcards: Flashcard[];
  onUpdateStatus: (id: string, status: "correct" | "incorrect") => void;
}

export default function FlashcardView({ flashcards, onUpdateStatus }: FlashcardViewProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [view, setView] = useState<"cards" | "grid">("cards");
  const [filter, setFilter] = useState<"all" | "unreviewed" | "correct" | "incorrect">("all");
  
  // Filter flashcards based on selected filter
  const filteredFlashcards = flashcards.filter(card => {
    if (filter === "all") return true;
    return card.status === filter;
  });
  
  // Reset to first card when filter changes
  useEffect(() => {
    setCurrentIndex(0);
    setIsFlipped(false);
  }, [filter]);
  
  const handleFlip = () => {
    setIsFlipped(!isFlipped);
  };
  
  const handleNext = () => {
    if (currentIndex < filteredFlashcards.length - 1) {
      setCurrentIndex(currentIndex + 1);
      setIsFlipped(false);
    }
  };
  
  const handlePrevious = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
      setIsFlipped(false);
    }
  };
  
  const handleCardClick = (index: number) => {
    setCurrentIndex(index);
    setIsFlipped(false);
    setView("cards");
  };
  
  const handleMarkCard = (status: "correct" | "incorrect") => {
    if (filteredFlashcards.length > 0) {
      onUpdateStatus(filteredFlashcards[currentIndex].id, status);
      
      // Move to next card if available
      if (currentIndex < filteredFlashcards.length - 1) {
        setTimeout(() => {
          handleNext();
        }, 300);
      }
    }
  };
  
  // If no flashcards are available after filtering
  if (filteredFlashcards.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-64">
        <p className="text-study-neutral-400 text-lg">
          {flashcards.length === 0 
            ? "No flashcards available. Create some using the generator!"
            : `No ${filter} flashcards found. Try a different filter.`}
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div className="flex space-x-2">
          <Tabs value={filter} onValueChange={(val) => setFilter(val as any)}>
            <TabsList>
              <TabsTrigger value="all">All ({flashcards.length})</TabsTrigger>
              <TabsTrigger value="unreviewed">
                Unreviewed ({flashcards.filter(c => c.status === "unreviewed" || !c.status).length})
              </TabsTrigger>
              <TabsTrigger value="correct">
                Learned ({flashcards.filter(c => c.status === "correct").length})
              </TabsTrigger>
              <TabsTrigger value="incorrect">
                To Review ({flashcards.filter(c => c.status === "incorrect").length})
              </TabsTrigger>
            </TabsList>
          </Tabs>
        </div>
        
        <div className="flex space-x-2">
          <Button
            variant={view === "cards" ? "default" : "outline"}
            size="sm"
            onClick={() => setView("cards")}
          >
            Cards
          </Button>
          <Button
            variant={view === "grid" ? "default" : "outline"}
            size="sm"
            onClick={() => setView("grid")}
          >
            Grid
          </Button>
        </div>
      </div>
      
      {view === "cards" ? (
        <div className="space-y-6">
          <Card
            className={cn(
              "flip-card cursor-pointer relative min-h-[300px] transition-all",
              isFlipped ? "flipped" : ""
            )}
            onClick={handleFlip}
          >
            <div className="flip-card-inner">
              <div className="flip-card-front p-8 flex flex-col justify-center items-center">
                <div className="absolute top-2 right-2 text-xs text-study-neutral-400">
                  {currentIndex + 1} / {filteredFlashcards.length}
                </div>
                
                {filteredFlashcards[currentIndex]?.status && (
                  <div 
                    className={cn(
                      "absolute top-2 left-2 w-3 h-3 rounded-full",
                      {
                        "bg-green-400": filteredFlashcards[currentIndex]?.status === "correct",
                        "bg-red-400": filteredFlashcards[currentIndex]?.status === "incorrect",
                        "bg-gray-300": filteredFlashcards[currentIndex]?.status === "unreviewed"
                      }
                    )}
                  />
                )}
                
                <h2 className="text-xl font-medium text-center">
                  {filteredFlashcards[currentIndex]?.question}
                </h2>
                
                <div className="absolute bottom-4 left-0 right-0 text-center text-study-neutral-400 text-sm">
                  Click to flip and see answer
                </div>
              </div>
              
              <div className="flip-card-back p-8 flex flex-col justify-center items-center">
                <div className="absolute top-2 right-2 text-xs text-study-neutral-400">
                  {currentIndex + 1} / {filteredFlashcards.length}
                </div>
                
                <p className="text-center">
                  {filteredFlashcards[currentIndex]?.answer}
                </p>
                
                <div className="absolute bottom-4 left-0 right-0 text-center text-study-neutral-400 text-sm">
                  Click to see question
                </div>
              </div>
            </div>
          </Card>
          
          <div className="flex justify-between items-center">
            <Button
              onClick={handlePrevious}
              disabled={currentIndex === 0}
              variant="outline"
              className="flex items-center"
            >
              <ArrowLeft className="h-4 w-4 mr-1" />
              Previous
            </Button>
            
            <div className="flex space-x-2">
              <Button
                onClick={() => handleMarkCard("incorrect")}
                variant="outline"
                className="border-red-200 text-red-500 hover:bg-red-50 hover:text-red-600"
              >
                <X className="h-4 w-4 mr-2" />
                Need to Review
              </Button>
              
              <Button
                onClick={() => handleMarkCard("correct")}
                variant="outline"
                className="border-green-200 text-green-500 hover:bg-green-50 hover:text-green-600"
              >
                <Check className="h-4 w-4 mr-2" />
                Got it!
              </Button>
            </div>
            
            <Button
              onClick={handleNext}
              disabled={currentIndex === filteredFlashcards.length - 1}
              variant="outline"
              className="flex items-center"
            >
              Next
              <ArrowRight className="h-4 w-4 ml-1" />
            </Button>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredFlashcards.map((card, index) => (
            <Card
              key={card.id}
              className={cn(
                "p-4 cursor-pointer hover:shadow-md transition-shadow overflow-hidden",
                {
                  "border-green-200": card.status === "correct",
                  "border-red-200": card.status === "incorrect",
                  "ring-2 ring-study-purple-300": currentIndex === index && view === "grid",
                }
              )}
              onClick={() => handleCardClick(index)}
            >
              <div className="text-sm font-medium line-clamp-3 h-16">
                {card.question}
              </div>
              <div className="text-xs text-study-neutral-400 mt-2">
                Click to view
              </div>
              {card.status && (
                <div 
                  className={cn(
                    "absolute top-2 right-2 w-2 h-2 rounded-full",
                    {
                      "bg-green-400": card.status === "correct",
                      "bg-red-400": card.status === "incorrect",
                      "bg-gray-300": card.status === "unreviewed"
                    }
                  )}
                />
              )}
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
