import React, { useState, useRef, useEffect } from 'react';
import { toast } from '@/components/ui/use-toast';

interface TerminalLine {
  content: string;
  isCommand?: boolean;
}

const Terminal = () => {
  const [lines, setLines] = useState<TerminalLine[]>([
    { content: "MikasaAI is now online. Type 'help' for available commands." }
  ]);
  const [currentInput, setCurrentInput] = useState('');
  const bottomRef = useRef<HTMLDivElement>(null);

  const commands = {
    help: () => {
      return `Available commands:
- help: Show this help message
- github: Go to GitHub
- doc: Go to documentation
- chat: Start a chat session
- clear: Clear the terminal`;
    },
    github: () => {
      window.open('https://github.com', '_blank');
      return 'Opening GitHub...';
    },
    doc: () => {
      window.open('https://tinobritty.tech', '_blank');
      return 'Opening documentation...';
    },
    chat: () => {
      return 'Chat functionality coming soon...';
    },
    clear: () => {
      setLines([]);
      return '';
    }
  };

  const handleCommand = (cmd: string) => {
    const trimmedCmd = cmd.trim().toLowerCase();
    if (trimmedCmd === '') return;

    const command = commands[trimmedCmd as keyof typeof commands];
    if (command) {
      const response = command();
      if (response) {
        setLines(prev => [...prev, { content: `> ${cmd}`, isCommand: true }, { content: response }]);
      }
    } else {
      setLines(prev => [
        ...prev,
        { content: `> ${cmd}`, isCommand: true },
        { content: `Command not found: ${cmd}. Type 'help' for available commands.` }
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
    <div className="terminal-container">
      <div className="terminal-header">
        <div className="terminal-button red"></div>
        <div className="terminal-button yellow"></div>
        <div className="terminal-button green"></div>
      </div>
      <div className="terminal-content">
        {lines.map((line, i) => (
          <div key={i} className="terminal-line">
            {line.isCommand ? (
              <span className="terminal-prompt">{line.content}</span>
            ) : (
              line.content
            )}
          </div>
        ))}
        <div className="terminal-line">
          <span className="terminal-prompt">{'> '}</span>
          <input
            type="text"
            value={currentInput}
            onChange={(e) => setCurrentInput(e.target.value)}
            onKeyPress={handleKeyPress}
            className="terminal-input"
            autoFocus
          />
        </div>
        <div ref={bottomRef} />
      </div>
    </div>
  );
};

export default Terminal;