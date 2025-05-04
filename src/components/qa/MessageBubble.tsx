
import { Button } from "@/components/ui/button";
import { Bookmark, BookmarkCheck } from "lucide-react";
import { Message } from "./types";

interface MessageBubbleProps {
  message: Message;
  onToggleSave: (id: string) => void;
}

export default function MessageBubble({ message, onToggleSave }: MessageBubbleProps) {
  return (
    <div
      className={`
        max-w-3xl p-4 rounded-2xl shadow-md
        ${message.sender === 'user' 
          ? 'qa-message-user' 
          : 'qa-message-ai'}
      `}
    >
      <div className="flex flex-col">
        <div className="flex justify-between items-start">
          <div className="prose prose-invert max-w-none">
            {message.content}
          </div>
          {message.sender === 'ai' && (
            <Button
              variant="ghost"
              size="sm"
              className="ml-2 -mt-1 -mr-2 text-study-green-300 hover:text-study-green-200 hover:bg-study-dark-800/50"
              onClick={() => onToggleSave(message.id)}
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
    </div>
  );
}
