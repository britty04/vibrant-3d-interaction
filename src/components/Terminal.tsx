import React, { useState, useRef, useEffect } from 'react';
import { toast } from '@/components/ui/use-toast';

interface TerminalLine {
  content: string;
  isCommand?: boolean;
  isError?: boolean;
}

const Terminal = () => {
  const [lines, setLines] = useState<TerminalLine[]>([
    { content: "Welcome to MikasaAI Terminal [Version 1.0.0]" },
    { content: "© Survey Corps Technology Division. All rights reserved." },
    { content: "\nType 'help' to see available commands." }
  ]);
  const [currentInput, setCurrentInput] = useState('');
  const bottomRef = useRef<HTMLDivElement>(null);

  const commands = {
    help: () => `Available commands:
- help: Display available commands
- features: Show MikasaAI features
- roadmap: View project roadmap
- about: Learn about MikasaAI
- github: Visit our GitHub
- twitter: Follow us on Twitter
- chat: Start AI chat (requires API key)`,

    features: () => `✨ Features:
- 🤖 Interactive CLI: Simple, user-friendly prompts
- 📚 Dynamic API Understanding: Parses openai.json
- 💻 Custom Code Generation: Tailored application code
- ⚡ Handles API Limitations: Clear constraints
- 📁 Project Output: Organized project files`,

    roadmap: () => `🗺️ Roadmap:
1️⃣ Phase 1: Token Launch
   - Initial token distribution
   - Community building

2️⃣ Phase 2: Integration
   - API infrastructure
   - Developer tools

3️⃣ Phase 3: Ecosystem Growth
   - Partner integrations
   - Advanced features`,

    about: () => "MikasaAI: Your AI-powered developer assistant for streamlined application building. Like Mikasa Ackerman, we're here to protect your development process.",

    github: () => {
      window.open('https://github.com/mikasaai', '_blank');
      return "Opening GitHub repository... Dedicate your heart! ⚔️";
    },

    twitter: () => {
      window.open('https://twitter.com/mikasaai', '_blank');
      return "Following the path to Twitter... Tatakae! 🦅";
    },

    chat: () => {
      toast({
        title: "API Key Required",
        description: "Please contact Survey Corps Command to obtain your API key.",
        variant: "destructive",
      });
      return "Error: You need proper authorization to access the AI chat feature. Contact Survey Corps Command for clearance.";
    }
  };

  const handleCommand = (cmd: string) => {
    const trimmedCmd = cmd.trim().toLowerCase();
    if (trimmedCmd === '') return;

    const commandFn = commands[trimmedCmd as keyof typeof commands];

    setLines(prev => [...prev, { content: `> ${cmd}`, isCommand: true }]);

    if (commandFn) {
      const response = commandFn();
      if (response) {
        setLines(prev => [...prev, { content: response }]);
      }
    } else {
      setLines(prev => [
        ...prev,
        { content: `Error: Unknown command '${cmd}'. What kind of training did you receive? Type 'help' for available commands.`, isError: true }
      ]);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleCommand(currentInput);
      setCurrentInput('');
    }
  };

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [lines]);

  return (
    <div className="terminal-container backdrop-blur-sm bg-black/80">
      <div className="terminal-header">
        <div className="terminal-button red"></div>
        <div className="terminal-button yellow"></div>
        <div className="terminal-button green"></div>
        <span className="ml-4 text-xs text-gray-400">mikasa@survey-corps ~ </span>
      </div>
      <div className="terminal-content">
        {lines.map((line, i) => (
          <div 
            key={i} 
            className={`terminal-line ${line.isError ? 'text-red-400' : ''}`}
          >
            {line.isCommand ? (
              <span className="terminal-prompt text-rose-400">{line.content}</span>
            ) : (
              line.content
            )}
          </div>
        ))}
        <div className="terminal-line">
          <span className="terminal-prompt text-rose-400">{'> '}</span>
          <input
            type="text"
            value={currentInput}
            onChange={(e) => setCurrentInput(e.target.value)}
            onKeyPress={handleKeyPress}
            className="terminal-input"
            autoFocus
            placeholder="Enter a command, soldier..."
          />
        </div>
        <div ref={bottomRef} />
      </div>
    </div>
  );
};

export default Terminal;