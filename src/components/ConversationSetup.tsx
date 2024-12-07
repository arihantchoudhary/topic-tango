import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useState } from "react";

const LLM_OPTIONS = [
  { id: "human", name: "Human", personality: "That's you!" },
  { id: "gpt4", name: "GPT-4", personality: "Precise and analytical" },
  { id: "claude", name: "Claude", personality: "Thoughtful and nuanced" },
  { id: "llama", name: "LLaMA", personality: "Creative and exploratory" },
  { id: "palm", name: "PaLM", personality: "Concise and direct" },
];

const GAME_OPTIONS = [
  { id: "minecraft", name: "Minecraft" },
  { id: "fortnite", name: "Fortnite" },
  { id: "valorant", name: "Valorant" },
  { id: "league", name: "League of Legends" },
  { id: "csgo", name: "Counter-Strike" },
  { id: "overwatch", name: "Overwatch" },
  { id: "apex", name: "Apex Legends" },
  { id: "genshin", name: "Genshin Impact" },
];

interface ConversationSetupProps {
  onStart: (topic: string, participants: string[]) => void;
}

export const ConversationSetup = ({ onStart }: ConversationSetupProps) => {
  const [selectedGame, setSelectedGame] = useState("");
  const [participant1, setParticipant1] = useState("");
  const [participant2, setParticipant2] = useState("");

  const handleStart = () => {
    if (selectedGame && participant1 && participant2) {
      const gameName = GAME_OPTIONS.find(game => game.id === selectedGame)?.name || selectedGame;
      onStart(gameName, [participant1, participant2]);
    }
  };

  const handleParticipantChange = (value: string, isFirstParticipant: boolean) => {
    if (isFirstParticipant) {
      setParticipant1(value);
      // If human is selected for first participant, ensure second participant is not human
      if (value === "human" && participant2 === "human") {
        setParticipant2("");
      }
    } else {
      setParticipant2(value);
      // If human is selected for second participant, ensure first participant is not human
      if (value === "human" && participant1 === "human") {
        setParticipant1("");
      }
    }
  };

  return (
    <div className="animate-fade-in-slow space-y-6 w-full max-w-md mx-auto p-6 glass-panel">
      <div className="space-y-2">
        <label className="text-sm font-medium">Select Game</label>
        <Select 
          value={selectedGame} 
          onValueChange={setSelectedGame}
        >
          <SelectTrigger className="bg-white bg-opacity-50">
            <SelectValue placeholder="Choose a game..." />
          </SelectTrigger>
          <SelectContent>
            {GAME_OPTIONS.map((game) => (
              <SelectItem 
                key={game.id} 
                value={game.id}
              >
                {game.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-4">
        <div className="space-y-2">
          <label className="text-sm font-medium">First Participant</label>
          <Select 
            value={participant1} 
            onValueChange={(value) => handleParticipantChange(value, true)}
          >
            <SelectTrigger className="bg-white bg-opacity-50">
              <SelectValue placeholder="Select Participant" />
            </SelectTrigger>
            <SelectContent>
              {LLM_OPTIONS.map((llm) => (
                <SelectItem 
                  key={llm.id} 
                  value={llm.id}
                  disabled={llm.id === "human" && participant2 === "human"}
                >
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
          <Select 
            value={participant2} 
            onValueChange={(value) => handleParticipantChange(value, false)}
          >
            <SelectTrigger className="bg-white bg-opacity-50">
              <SelectValue placeholder="Select Participant" />
            </SelectTrigger>
            <SelectContent>
              {LLM_OPTIONS.map((llm) => (
                <SelectItem 
                  key={llm.id} 
                  value={llm.id}
                  disabled={llm.id === "human" && participant1 === "human"}
                >
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
        disabled={!selectedGame || !participant1 || !participant2}
        className="w-full transition-all hover:scale-[1.02] active:scale-[0.98]"
      >
        Start Conversation
      </Button>
    </div>
  );
};