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
    { content: "Welcome to the Walls Terminal [Version 850]" },
    { content: "© Survey Corps. All rights reserved within Wall Maria, Rose, and Sina." },
    { content: "\nAvailable commands: scout, titan, rumbling, help, clear" }
  ]);
  const [currentInput, setCurrentInput] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);

  const commands = {
    help: () => {
      return `Available commands:
- help: Show this help message (like a good little soldier)
- scout: Join the Survey Corps
- titan: Information about Titan types
- rumbling: Initiate the rumbling (just kidding)
- clear: Clear terminal (like wiping your memories)`;
    },
    scout: () => {
      window.open('https://github.com/tinobreg', '_blank');
      return 'Shinzou wo Sasageyo! Redirecting to the Survey Corps recruitment...';
    },
    titan: () => {
      return `Known Titan Types:
- Founding Titan
- Attack Titan
- Female Titan
- Armored Titan
- Colossal Titan
- Beast Titan
- Jaw Titan
- Cart Titan
- War Hammer Titan`;
    },
    rumbling: () => {
      toast({
        title: "Warning from Commander Erwin",
        description: "The rumbling cannot be initiated without the Founding Titan's power.",
        variant: "destructive",
      });
      return "ERROR: You need royal blood and the Founding Titan to activate this command.";
    },
    clear: () => {
      setLines([]);
      return '';
    }
  };

  const handleCommand = async (cmd: string) => {
    const trimmedCmd = cmd.trim().toLowerCase();
    if (trimmedCmd === '') return;

    const [command, ...args] = trimmedCmd.split(' ');
    const commandFn = commands[command as keyof typeof commands];

    if (commandFn) {
      setLines(prev => [...prev, { content: `> ${cmd}`, isCommand: true }]);
      const response = await commandFn(args.join(' '));
      if (response) {
        setLines(prev => [...prev, { content: response }]);
      }
    } else {
      setLines(prev => [
        ...prev,
        { content: `> ${cmd}`, isCommand: true },
        { content: `Error: Command not found. What are they teaching you in training these days? Type 'help' for available commands.`, isError: true }
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
    <div className="terminal-container backdrop-blur-sm bg-black/80 border border-rose-900/20">
      <div className="terminal-header">
        <div className="terminal-button red"></div>
        <div className="terminal-button yellow"></div>
        <div className="terminal-button green"></div>
        <span className="ml-4 text-xs text-gray-400">scout@survey-corps ~ </span>
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
            disabled={isProcessing}
            placeholder={isProcessing ? 'Processing...' : 'Enter a command, recruit...'}
          />
        </div>
        <div ref={bottomRef} />
      </div>
    </div>
  );
};

export default Terminal;