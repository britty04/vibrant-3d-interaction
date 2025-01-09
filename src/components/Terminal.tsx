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
    { content: "Copyright (c) 2024 MikasaAI Corporation. All rights reserved." },
    { content: "\nType 'help' for available commands." }
  ]);
  const [currentInput, setCurrentInput] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);

  const commands = {
    help: () => {
      return `Available commands:
- help: Show this help message
- github: Go to GitHub
- doc: Go to documentation
- chat [message]: Chat with AI (coming soon)
- clear: Clear the terminal
- about: About MikasaAI`;
    },
    github: () => {
      window.open('https://github.com', '_blank');
      return 'Opening GitHub...';
    },
    doc: () => {
      window.open('https://tinobritty.tech', '_blank');
      return 'Opening documentation...';
    },
    about: () => {
      return `MikasaAI - Inspired by Attack on Titan
A next-generation AI assistant ready to help you with your development journey.
Version: 1.0.0`;
    },
    chat: async (message: string) => {
      if (!message) return "Please provide a message to chat. Usage: chat [message]";
      setIsProcessing(true);
      // GPT integration will be added here when API key is provided
      await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate API call
      setIsProcessing(false);
      return "Chat functionality coming soon...";
    },
    clear: () => {
      setLines([]);
      return '';
    }
  };

  const handleCommand = async (cmd: string) => {
    const trimmedCmd = cmd.trim();
    if (trimmedCmd === '') return;

    const [command, ...args] = trimmedCmd.split(' ');
    const commandFn = commands[command.toLowerCase() as keyof typeof commands];

    if (commandFn) {
      try {
        const response = await commandFn(args.join(' '));
        if (response) {
          setLines(prev => [...prev, 
            { content: `> ${cmd}`, isCommand: true },
            { content: response }
          ]);
        }
      } catch (error) {
        setLines(prev => [...prev,
          { content: `> ${cmd}`, isCommand: true },
          { content: `Error: ${error.message}`, isError: true }
        ]);
      }
    } else {
      setLines(prev => [
        ...prev,
        { content: `> ${cmd}`, isCommand: true },
        { content: `Command not found: ${command}. Type 'help' for available commands.`, isError: true }
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
    <div className="terminal-container backdrop-blur-sm bg-black/80 border border-rose-300/20">
      <div className="terminal-header">
        <div className="terminal-button red"></div>
        <div className="terminal-button yellow"></div>
        <div className="terminal-button green"></div>
        <span className="ml-4 text-xs text-gray-400">mikasa@ai ~ </span>
      </div>
      <div className="terminal-content">
        {lines.map((line, i) => (
          <div key={i} className={`terminal-line ${line.isError ? 'text-red-400' : ''}`}>
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
            disabled={isProcessing}
            placeholder={isProcessing ? 'Processing...' : ''}
          />
        </div>
        <div ref={bottomRef} />
      </div>
    </div>
  );
};

export default Terminal;