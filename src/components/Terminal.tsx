import React, { useState, useRef, useEffect } from 'react';
import { toast } from '@/components/ui/use-toast';

interface TerminalLine {
  content: string;
  isCommand?: boolean;
  isError?: boolean;
  isLoading?: boolean;
}

const Terminal = () => {
  const [lines, setLines] = useState<TerminalLine[]>([
    { content: "Welcome to MikasaAI Terminal [Version 1.0.0]" },
    { content: "Copyright (c) 2024 MikasaAI Corporation. All rights reserved." },
    { content: "\nAvailable commands: github, x, doc, chat, help, clear" }
  ]);
  const [currentInput, setCurrentInput] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);

  const commands = {
    help: () => {
      return `Available commands:
- help: Show this help message
- github: Visit GitHub profile
- x: Visit X (Twitter) profile
- doc: View documentation
- chat [message]: Chat with AI
- clear: Clear terminal`;
    },
    github: () => {
      window.open('https://github.com/tinobreg', '_blank');
      return 'Opening GitHub profile...';
    },
    x: () => {
      window.open('https://twitter.com/tinobreg', '_blank');
      return 'Opening X (Twitter) profile...';
    },
    doc: () => {
      window.open('https://tinobritty.tech', '_blank');
      return 'Opening documentation...';
    },
    chat: async (message: string) => {
      if (!message) return "Please provide a message to chat. Usage: chat [message]";
      
      setIsProcessing(true);
      try {
        const response = await fetch('https://api.openai.com/v1/chat/completions', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${import.meta.env.VITE_OPENAI_API_KEY}`
          },
          body: JSON.stringify({
            model: "gpt-4o",
            messages: [
              {
                role: "system",
                content: "You are MikasaAI, a helpful AI assistant inspired by Attack on Titan. Keep responses concise and relevant."
              },
              {
                role: "user",
                content: message
              }
            ],
            max_tokens: 150
          })
        });

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.error?.message || 'Failed to get response from AI');
        }

        const data = await response.json();
        return data.choices[0].message.content;
      } catch (error: any) {
        console.error('Chat error:', error);
        toast({
          variant: "destructive",
          title: "Error",
          description: error.message || "Failed to process chat request"
        });
        return `Error: ${error.message || 'Failed to process chat request'}`;
      } finally {
        setIsProcessing(false);
      }
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
        setLines(prev => [...prev, { content: `> ${cmd}`, isCommand: true }]);
        if (command === 'chat') {
          setLines(prev => [...prev, { content: 'Processing...', isLoading: true }]);
        }
        
        const response = await commandFn(args.join(' '));
        
        if (response) {
          setLines(prev => {
            const newLines = prev.filter(line => !line.isLoading);
            return [...newLines, { content: response }];
          });
        }
      } catch (error: any) {
        setLines(prev => {
          const newLines = prev.filter(line => !line.isLoading);
          return [...newLines, { content: `Error: ${error.message}`, isError: true }];
        });
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
          <div 
            key={i} 
            className={`terminal-line ${line.isError ? 'text-red-400' : ''} ${line.isLoading ? 'animate-pulse' : ''}`}
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
            disabled={isProcessing}
            placeholder={isProcessing ? 'Processing...' : 'Type a command...'}
          />
        </div>
        <div ref={bottomRef} />
      </div>
    </div>
  );
};

export default Terminal;