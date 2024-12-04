import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useState } from "react";

const LLM_OPTIONS = [
  { id: "gpt4", name: "GPT-4", personality: "Precise and analytical" },
  { id: "claude", name: "Claude", personality: "Thoughtful and nuanced" },
  { id: "llama", name: "LLaMA", personality: "Creative and exploratory" },
  { id: "palm", name: "PaLM", personality: "Concise and direct" },
];

interface ConversationSetupProps {
  onStart: (topic: string, participants: string[]) => void;
}

export const ConversationSetup = ({ onStart }: ConversationSetupProps) => {
  const [topic, setTopic] = useState("");
  const [participant1, setParticipant1] = useState("");
  const [participant2, setParticipant2] = useState("");

  const handleStart = () => {
    if (topic && participant1 && participant2) {
      onStart(topic, [participant1, participant2]);
    }
  };

  return (
    <div className="animate-fade-in-slow space-y-6 w-full max-w-md mx-auto p-6 glass-panel">
      <div className="space-y-2">
        <label className="text-sm font-medium">Conversation Topic</label>
        <Input
          placeholder="Enter a topic for discussion..."
          value={topic}
          onChange={(e) => setTopic(e.target.value)}
          className="bg-white bg-opacity-50"
        />
      </div>

      <div className="space-y-4">
        <div className="space-y-2">
          <label className="text-sm font-medium">First Participant</label>
          <Select value={participant1} onValueChange={setParticipant1}>
            <SelectTrigger className="bg-white bg-opacity-50">
              <SelectValue placeholder="Select LLM" />
            </SelectTrigger>
            <SelectContent>
              {LLM_OPTIONS.map((llm) => (
                <SelectItem key={llm.id} value={llm.id}>
                  <div className="flex flex-col">
                    <span>{llm.name}</span>
                    <span className="text-xs text-muted-foreground">{llm.personality}</span>
                  </div>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium">Second Participant</label>
          <Select value={participant2} onValueChange={setParticipant2}>
            <SelectTrigger className="bg-white bg-opacity-50">
              <SelectValue placeholder="Select LLM" />
            </SelectTrigger>
            <SelectContent>
              {LLM_OPTIONS.map((llm) => (
                <SelectItem key={llm.id} value={llm.id}>
                  <div className="flex flex-col">
                    <span>{llm.name}</span>
                    <span className="text-xs text-muted-foreground">{llm.personality}</span>
                  </div>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      <Button 
        onClick={handleStart}
        disabled={!topic || !participant1 || !participant2}
        className="w-full transition-all hover:scale-[1.02] active:scale-[0.98]"
      >
        Start Conversation
      </Button>
    </div>
  );
};