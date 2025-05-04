
import { Message } from "./types";
import MessageBubble from "./MessageBubble";

interface MessageListProps {
  messages: Message[];
  onToggleSave: (id: string) => void;
  loading: boolean;
}

export default function MessageList({ messages, onToggleSave, loading }: MessageListProps) {
  return (
    <div className="flex-1 overflow-y-auto mb-4 space-y-4">
      {messages.map((message) => (
        <div
          key={message.id}
          className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
        >
          <MessageBubble message={message} onToggleSave={onToggleSave} />
        </div>
      ))}
      
      {loading && (
        <div className="flex justify-start">
          <div className="qa-message-ai p-4 rounded-2xl">
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-study-green-400 rounded-full animate-pulse"></div>
              <div className="w-2 h-2 bg-study-green-400 rounded-full animate-pulse delay-150"></div>
              <div className="w-2 h-2 bg-study-green-400 rounded-full animate-pulse delay-300"></div>
              <span className="text-sm text-study-neutral-300">Study Buddy is thinking...</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
