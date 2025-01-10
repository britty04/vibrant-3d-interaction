import React, { useState, useRef, useEffect } from 'react';
import { toast } from '@/components/ui/use-toast';

interface TerminalLine {
  content: string;
  isCommand?: boolean;
  isError?: boolean;
  isTable?: boolean;
}

const Terminal = () => {
  const [lines, setLines] = useState<TerminalLine[]>([
    { content: "Welcome to MikasaAI Terminal [Version 1.0.0]" },
    { content: "© Survey Corps Technology Division. All rights reserved." },
    { content: "\nType 'help' to see available commands, soldier! 🗡️" }
  ]);
  const [currentInput, setCurrentInput] = useState('');
  const bottomRef = useRef<HTMLDivElement>(null);

  const randomResponses = [
    "Just like fighting titans, I'll handle this with precision!",
    "Even Levi would be impressed with that question...",
    "As expected of you, that's exactly right!",
    "Interesting... reminds me of something Erwin would say.",
    "Let me dedicate my heart to answering that!",
    "SHINZOU WO SASAGEYO! (That means I'm processing your request)",
    "Even beyond these walls, I'll find you an answer.",
    "That's a question worthy of the Survey Corps!",
    "Eren might go berserk over this one...",
    "Captain Levi would say this needs cleaning up..."
  ];

  const getRandomResponse = (input: string) => {
    const response = randomResponses[Math.floor(Math.random() * randomResponses.length)];
    return `${response}\n\nRegarding "${input}": Let me analyze this with the power of the Founding Titan...`;
  };

  const commands = {
    help: () => ({
      content: `Available Commands:
┌────────────┬──────────────────────────────────┐
│ Command    │ Description                      │
├────────────┼──────────────────────────────────┤
│ help       │ Display available commands       │
│ features   │ Show MikasaAI features          │
│ roadmap    │ View project roadmap            │
│ about      │ Learn about MikasaAI            │
│ github     │ Visit our GitHub                │
│ twitter    │ Follow us on Twitter            │
│ chat       │ Start interactive chat          │
└────────────┴──────────────────────────────────┘`,
      isTable: true
    }),

    features: () => ({
      content: `╔════ ✨ Features ════════════════════════╗
║                                        ║
║ 🤖 Interactive CLI Interface           ║
║ 📚 Dynamic API Understanding           ║
║ 💻 Custom Code Generation              ║
║ ⚡ Smart Resource Management           ║
║ 📁 Organized Project Structure         ║
║                                        ║
╚════════════════════════════════════════╝`,
      isTable: true
    }),

    roadmap: () => ({
      content: `╔═══════ Roadmap ═══════════════════════╗
║                                        ║
║ Phase 1: Token Launch                  ║
║ ├─ Initial distribution               ║
║ └─ Community building                 ║
║                                        ║
║ Phase 2: Integration                   ║
║ ├─ API infrastructure                 ║
║ └─ Developer tools                    ║
║                                        ║
║ Phase 3: Ecosystem Growth              ║
║ ├─ Partner integrations               ║
║ └─ Advanced features                  ║
║                                        ║
╚════════════════════════════════════════╝`,
      isTable: true
    }),

    about: () => "MikasaAI: Your AI-powered developer assistant. Like Mikasa Ackerman, we're here to protect your development process. Dedicate your heart to coding! ⚔️",

    github: () => {
      window.open('https://github.com/mikasaai', '_blank');
      return "Opening GitHub repository... Dedicate your heart! ⚔️";
    },

    twitter: () => {
      window.open('https://twitter.com/mikasaai', '_blank');
      return "Following the path to Twitter... Tatakae! 🦅";
    },

    chat: (input?: string) => {
      if (!input) {
        return "Enter your message after 'chat', like: chat What is MikasaAI?";
      }
      return getRandomResponse(input);
    }
  };

  const handleCommand = (cmd: string) => {
    const trimmedCmd = cmd.trim();
    if (trimmedCmd === '') return;

    const [command, ...args] = trimmedCmd.split(' ');
    const input = args.join(' ');

    setLines(prev => [...prev, { content: `> ${cmd}`, isCommand: true }]);

    const commandFn = commands[command.toLowerCase() as keyof typeof commands];
    
    if (commandFn) {
      const response = commandFn(input);
      if (typeof response === 'string') {
        setLines(prev => [...prev, { content: response }]);
      } else {
        setLines(prev => [...prev, response]);
      }
    } else {
      setLines(prev => [
        ...prev,
        { content: `Error: Unknown command '${command}'. Did you skip training, recruit? Type 'help' for available commands.`, isError: true }
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
            className={`terminal-line ${line.isError ? 'text-red-400' : ''} ${line.isTable ? 'whitespace-pre font-mono' : ''}`}
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