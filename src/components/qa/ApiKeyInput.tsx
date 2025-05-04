
import React, { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { CustomButton } from "@/components/ui/custom-button";
import { Label } from "@/components/ui/label";
import { KeyRound } from "lucide-react";

interface ApiKeyInputProps {
  onApiKeyChange: (apiKey: string) => void;
}

export default function ApiKeyInput({ onApiKeyChange }: ApiKeyInputProps) {
  const [apiKey, setApiKey] = useState<string>("");
  const [savedKey, setSavedKey] = useState<string | null>(null);

  // Load API key from localStorage on component mount
  useEffect(() => {
    const savedApiKey = localStorage.getItem("groq_api_key");
    if (savedApiKey) {
      setApiKey(savedApiKey);
      setSavedKey(savedApiKey);
      onApiKeyChange(savedApiKey);
    }
  }, [onApiKeyChange]);

  const handleSaveApiKey = () => {
    if (apiKey.trim()) {
      localStorage.setItem("groq_api_key", apiKey);
      setSavedKey(apiKey);
      onApiKeyChange(apiKey);
    }
  };

  const handleClearApiKey = () => {
    localStorage.removeItem("groq_api_key");
    setApiKey("");
    setSavedKey(null);
    onApiKeyChange("");
  };

  return (
    <div className="mb-6 p-4 rounded-lg border border-study-green-900/20 bg-study-dark-700/50">
      <div className="flex flex-col space-y-4">
        <div className="flex items-center justify-between">
          <Label htmlFor="api-key" className="text-white font-medium flex items-center gap-2">
            <KeyRound className="h-4 w-4" /> API Key
          </Label>
          {savedKey && (
            <span className="text-xs text-study-green-400">
              API key saved
            </span>
          )}
        </div>
        
        <div className="flex flex-col sm:flex-row gap-2">
          <Input
            id="api-key"
            type="password"
            placeholder="Enter your API key"
            value={apiKey}
            onChange={(e) => setApiKey(e.target.value)}
            className="flex-1 bg-study-dark-800 border-study-green-900/30 text-white placeholder:text-study-neutral-400"
          />
          
          <div className="flex gap-2">
            <CustomButton
              onClick={handleSaveApiKey}
              disabled={!apiKey.trim() || apiKey === savedKey}
              className="bg-gradient-to-r from-study-green-500 to-study-blue-500"
              variant="gradient"
            >
              Save Key
            </CustomButton>
            
            {savedKey && (
              <CustomButton
                onClick={handleClearApiKey}
                variant="outline"
                className="border-study-green-900/30 text-study-neutral-300 hover:bg-study-dark-600"
              >
                Clear
              </CustomButton>
            )}
          </div>
        </div>
        
        <p className="text-xs text-study-neutral-400">
          Your API key is stored locally and never sent to our servers.
          Get an API key from <a href="https://console.groq.com/keys" target="_blank" rel="noreferrer" className="text-study-green-400 hover:underline">Groq</a>.
        </p>
      </div>
    </div>
  );
}
