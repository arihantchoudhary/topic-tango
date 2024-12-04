import { useState, useEffect } from "react";
import { ConversationSetup } from "@/components/ConversationSetup";
import { ConversationDisplay } from "@/components/ConversationDisplay";

interface Message {
  id: string;
  content: string;
  sender: string;
}

const MOCK_RESPONSES: { [key: string]: string[] } = {
  gpt4: [
    "From an analytical perspective, this is quite interesting.",
    "Let me break this down systematically.",
    "Based on the available data, I would suggest...",
  ],
  claude: [
    "That's an intriguing perspective to consider.",
    "We should examine this from multiple angles.",
    "Building on that thought, I wonder...",
  ],
  llama: [
    "Here's a creative way to look at this...",
    "What if we approached this differently?",
    "This reminds me of an interesting pattern...",
  ],
  palm: [
    "The key point here is...",
    "Simply put, we should focus on...",
    "To be direct, I think...",
  ],
};

const getLLMName = (id: string) => {
  const names: { [key: string]: string } = {
    gpt4: "GPT-4",
    claude: "Claude",
    llama: "LLaMA",
    palm: "PaLM",
  };
  return names[id] || id;
};

const Index = () => {
  const [isConversationStarted, setIsConversationStarted] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [currentParticipants, setCurrentParticipants] = useState<string[]>([]);
  const [currentSpeakerIndex, setCurrentSpeakerIndex] = useState(0);

  const simulateResponse = async (sender: string) => {
    setIsLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 1500));
    const responses = MOCK_RESPONSES[sender];
    const randomResponse = responses[Math.floor(Math.random() * responses.length)];
    
    setMessages((prev) => [
      ...prev,
      {
        id: Date.now().toString(),
        content: randomResponse,
        sender: getLLMName(sender),
      },
    ]);
    setIsLoading(false);
    
    // Switch to the next speaker
    setCurrentSpeakerIndex((prevIndex) => (prevIndex + 1) % 2);
  };

  // Effect to continue the conversation
  useEffect(() => {
    if (isConversationStarted && !isLoading && currentParticipants.length === 2) {
      const timeoutId = setTimeout(() => {
        simulateResponse(currentParticipants[currentSpeakerIndex]);
      }, 2000);

      return () => clearTimeout(timeoutId);
    }
  }, [isConversationStarted, isLoading, messages, currentParticipants, currentSpeakerIndex]);

  const handleStart = async (topic: string, participants: string[]) => {
    setCurrentParticipants(participants);
    setIsConversationStarted(true);
    setCurrentSpeakerIndex(0);
    setMessages([
      {
        id: Date.now().toString(),
        content: `Let's discuss: ${topic}`,
        sender: getLLMName(participants[0]),
      },
    ]);
  };

  const handleReset = () => {
    setIsConversationStarted(false);
    setMessages([]);
    setCurrentParticipants([]);
    setCurrentSpeakerIndex(0);
  };

  return (
    <div className="min-h-screen p-6 bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12 animate-fade-in-slow">
          <h1 className="text-4xl font-bold mb-4">LLM Conversation Simulator</h1>
          <p className="text-muted-foreground">
            Watch AI models engage in thoughtful discussion
          </p>
        </div>

        {!isConversationStarted ? (
          <ConversationSetup onStart={handleStart} />
        ) : (
          <ConversationDisplay
            messages={messages}
            isLoading={isLoading}
            onReset={handleReset}
          />
        )}
      </div>
    </div>
  );
};

export default Index;