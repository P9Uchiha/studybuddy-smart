
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CustomButton } from "@/components/ui/custom-button";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { PlusCircle, Upload } from "lucide-react";
import { toast } from "sonner";

interface FlashcardGeneratorProps {
  onGenerateFlashcards: (flashcards: { question: string; answer: string }[]) => void;
}

interface ManualFlashcardInput {
  question: string;
  answer: string;
}

export default function FlashcardGenerator({ onGenerateFlashcards }: FlashcardGeneratorProps) {
  const [generationMethod, setGenerationMethod] = useState<"manual" | "text" | "upload">("manual");
  const [manualInputs, setManualInputs] = useState<ManualFlashcardInput[]>([
    { question: "", answer: "" }
  ]);
  const [textInput, setTextInput] = useState("");
  const [subject, setSubject] = useState("");
  const [loading, setLoading] = useState(false);

  const addFlashcardInput = () => {
    setManualInputs([...manualInputs, { question: "", answer: "" }]);
  };

  const updateManualInput = (index: number, field: "question" | "answer", value: string) => {
    const newInputs = [...manualInputs];
    newInputs[index][field] = value;
    setManualInputs(newInputs);
  };

  const removeFlashcardInput = (index: number) => {
    if (manualInputs.length > 1) {
      const newInputs = [...manualInputs];
      newInputs.splice(index, 1);
      setManualInputs(newInputs);
    }
  };

  const handleManualGeneration = () => {
    // Validate inputs
    const validInputs = manualInputs.filter(
      input => input.question.trim() && input.answer.trim()
    );
    
    if (validInputs.length === 0) {
      toast.error("Please enter at least one flashcard with question and answer.");
      return;
    }
    
    onGenerateFlashcards(validInputs);
    toast.success(`${validInputs.length} flashcards created successfully!`);
  };

  const generateFlashcardsFromText = async () => {
    if (!textInput.trim()) {
      toast.error("Please enter some text to generate flashcards from.");
      return;
    }
    
    if (!subject.trim()) {
      toast.error("Please specify a subject for better flashcard generation.");
      return;
    }
    
    setLoading(true);
    
    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Mock flashcard generation logic
      const contentParagraphs = textInput.split('\n\n').filter(p => p.trim().length > 0);
      const mockFlashcards = [];
      
      // Generate simple flashcards based on the content paragraphs
      for (let i = 0; i < Math.min(contentParagraphs.length, 3); i++) {
        const paragraph = contentParagraphs[i];
        if (paragraph.length > 20) {
          // Extract first sentence as the answer
          const firstSentence = paragraph.split('.')[0] + '.';
          
          // Create a question from the first sentence
          let question = "";
          if (subject.toLowerCase().includes("math")) {
            question = `Explain the concept of ${firstSentence.replace(/\./g, "?")}`;
          } else if (subject.toLowerCase().includes("science") || subject.toLowerCase().includes("bio")) {
            question = `Define the process of ${firstSentence.replace(/\./g, "?")}`;
          } else {
            question = `What is meant by "${firstSentence.replace(/\./g, "")}"?`;
          }
          
          mockFlashcards.push({
            question,
            answer: paragraph,
          });
        }
      }
      
      // Add some additional mock flashcards based on the subject
      if (subject.toLowerCase().includes("math")) {
        mockFlashcards.push({
          question: "What is the quadratic formula?",
          answer: "x = (-b ± √(b² - 4ac)) / 2a, where ax² + bx + c = 0",
        });
      } else if (subject.toLowerCase().includes("science")) {
        mockFlashcards.push({
          question: "What are the three laws of thermodynamics?",
          answer: "1st: Energy cannot be created or destroyed. 2nd: Entropy of an isolated system always increases. 3rd: As temperature approaches absolute zero, entropy approaches a minimum value.",
        });
      }
      
      if (mockFlashcards.length > 0) {
        onGenerateFlashcards(mockFlashcards);
        toast.success(`Generated ${mockFlashcards.length} flashcards from your text!`);
      } else {
        toast.error("Couldn't generate flashcards from the provided text. Try with more detailed content.");
      }
    } catch (error) {
      toast.error("Failed to generate flashcards. Please try again.");
      console.error("Error:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    
    if (!subject.trim()) {
      toast.error("Please specify a subject for better flashcard generation.");
      return;
    }
    
    if (file.type !== 'application/pdf' && !file.type.includes('text')) {
      toast.error("Only PDF and text files are supported");
      return;
    }
    
    setLoading(true);
    
    try {
      // Simulate file processing delay
      await new Promise(resolve => setTimeout(resolve, 2500));
      
      // Mock flashcards for this demo
      const mockFlashcards = [
        {
          question: "What is the capital of France?",
          answer: "Paris",
        },
        {
          question: "Who wrote 'Romeo and Juliet'?",
          answer: "William Shakespeare",
        },
        {
          question: "What is the chemical formula for water?",
          answer: "H₂O",
        },
        {
          question: "What is the Pythagorean theorem?",
          answer: "In a right triangle, the square of the length of the hypotenuse equals the sum of the squares of the other two sides (a² + b² = c²).",
        },
      ];
      
      onGenerateFlashcards(mockFlashcards);
      toast.success(`Generated ${mockFlashcards.length} flashcards from your file!`);
    } catch (error) {
      toast.error("Failed to process the file. Please try again.");
      console.error("Error:", error);
    } finally {
      setLoading(false);
      // Reset file input
      e.target.value = '';
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Create Flashcards</CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs value={generationMethod} onValueChange={(val) => setGenerationMethod(val as any)}>
          <TabsList className="grid w-full grid-cols-3 mb-6">
            <TabsTrigger value="manual">Manual Input</TabsTrigger>
            <TabsTrigger value="text">From Text</TabsTrigger>
            <TabsTrigger value="upload">Upload File</TabsTrigger>
          </TabsList>

          {/* Common subject field */}
          <div className="mb-6">
            <Label htmlFor="subject">Subject</Label>
            <Input
              id="subject"
              placeholder="e.g., Mathematics, Biology, History"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              className="mt-1"
            />
          </div>
          
          <TabsContent value="manual">
            <div className="space-y-6">
              {manualInputs.map((input, index) => (
                <div key={index} className="space-y-4 p-4 border rounded-lg">
                  <div className="flex justify-between items-center">
                    <h3 className="font-medium">Flashcard {index + 1}</h3>
                    {manualInputs.length > 1 && (
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => removeFlashcardInput(index)}
                      >
                        Remove
                      </Button>
                    )}
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor={`question-${index}`}>Question</Label>
                    <Input
                      id={`question-${index}`}
                      value={input.question}
                      onChange={(e) => updateManualInput(index, "question", e.target.value)}
                      placeholder="Enter your question"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor={`answer-${index}`}>Answer</Label>
                    <Textarea
                      id={`answer-${index}`}
                      value={input.answer}
                      onChange={(e) => updateManualInput(index, "answer", e.target.value)}
                      placeholder="Enter the answer"
                      rows={3}
                    />
                  </div>
                </div>
              ))}
              
              <div className="flex justify-between">
                <Button
                  variant="outline"
                  onClick={addFlashcardInput}
                >
                  <PlusCircle className="h-4 w-4 mr-2" />
                  Add Flashcard
                </Button>
                
                <CustomButton
                  variant="gradient"
                  onClick={handleManualGeneration}
                >
                  Create Flashcards
                </CustomButton>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="text">
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="text-content">Enter Text Content</Label>
                <Textarea
                  id="text-content"
                  placeholder="Paste your notes, paragraphs, or study content here..."
                  rows={10}
                  value={textInput}
                  onChange={(e) => setTextInput(e.target.value)}
                />
                <p className="text-xs text-study-neutral-400">
                  The AI will analyze the text and generate relevant flashcards based on the content and subject.
                </p>
              </div>
              
              <div className="flex justify-end">
                <CustomButton
                  variant="gradient"
                  onClick={generateFlashcardsFromText}
                  disabled={loading}
                >
                  {loading ? "Generating..." : "Generate Flashcards"}
                </CustomButton>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="upload">
            <div className="space-y-4">
              <div className="border-2 border-dashed rounded-lg p-6 text-center">
                <Upload className="h-10 w-10 text-study-neutral-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium mb-2">Upload a File</h3>
                <p className="text-sm text-study-neutral-400 mb-4">
                  Support for PDF and text files only
                </p>
                
                <Input
                  id="file-upload"
                  type="file"
                  accept=".pdf,.txt,.doc,.docx"
                  onChange={handleFileUpload}
                  disabled={loading}
                  className="hidden"
                />
                
                <label htmlFor="file-upload">
                  <Button 
                    variant="outline" 
                    className="cursor-pointer" 
                    disabled={loading}
                    asChild
                  >
                    <span>{loading ? "Processing..." : "Select File"}</span>
                  </Button>
                </label>
                
                <p className="text-xs text-study-neutral-400 mt-4">
                  The AI will extract content from the file and generate flashcards based on the subject.
                </p>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
}
