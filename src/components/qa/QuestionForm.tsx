
import { Search } from "lucide-react";
import { CustomButton } from "@/components/ui/custom-button";
import { Textarea } from "@/components/ui/textarea";
import React, { useState } from "react";

interface QuestionFormProps {
  onSubmit: (question: string) => void;
  loading: boolean;
}

export default function QuestionForm({ onSubmit, loading }: QuestionFormProps) {
  const [question, setQuestion] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (question.trim()) {
      onSubmit(question.trim());
      setQuestion("");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col space-y-2">
      <Textarea
        placeholder="Ask any study question... (e.g., What is Newton's Second Law?)"
        value={question}
        onChange={(e) => setQuestion(e.target.value)}
        className="resize-none bg-study-dark-800 border-study-green-900/30 placeholder-study-neutral-400 text-white"
        rows={3}
        disabled={loading}
      />
      <div className="flex justify-end">
        <CustomButton
          type="submit"
          variant="gradient"
          disabled={loading || !question.trim()}
          className="bg-gradient-to-r from-study-green-500 to-study-blue-500"
        >
          <Search className="h-4 w-4 mr-2" />
          {loading ? "Getting Answer..." : "Ask Question"}
        </CustomButton>
      </div>
    </form>
  );
}
