import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';

const ThemeContext = createContext(null);

export const useTheme = () => useContext(ThemeContext);

export function ThemeProvider({ children }) {
  const [isCrimson, setIsCrimson] = useState(false);
  
  // Game States: 'idle', 'active', 'win', 'loss'
  const [terminalGameState, setTerminalGameState] = useState('idle');
  
  // AI Dialogue Override Queue
  const [aiOverrideMessage, setAiOverrideMessage] = useState(null);

  useEffect(() => {
    // If the persistent theme is active OR the game is active, apply the red CSS variables
    if (isCrimson || terminalGameState === 'active' || terminalGameState === 'loss') {
      document.body.classList.add('theme-crimson');
    } else {
      document.body.classList.remove('theme-crimson');
    }
  }, [isCrimson, terminalGameState]);

  const toggleCrimsonTheme = useCallback(() => {
    setIsCrimson(prev => {
      const next = !prev;
      if (next) {
        setAiOverrideMessage("WARNING: Crimson Protocol activated. Manual override engaged.");
        console.log("%c[ SYSTEM ] CRIMSON PROTOCOL ENGAGED.", "color: #ff003c; font-weight: bold; font-size: 16px;");
      } else {
        setAiOverrideMessage("Crimson Protocol deactivated. Systems normalizing.");
      }
      return next;
    });
  }, []);

  const triggerTerminalGame = useCallback(() => {
    setTerminalGameState('active');
    setAiOverrideMessage("CRITICAL ALERT: Rogue entity detected. Containment breached.");
  }, []);

  const endTerminalGame = useCallback((won) => {
    setTerminalGameState(won ? 'win' : 'loss');
    if (won) {
      setAiOverrideMessage("Threat neutralized. Purging corrupted cache... Systems stabilizing.");
      setTimeout(() => {
        setTerminalGameState('idle');
      }, 5000);
    } else {
      setAiOverrideMessage("I cannot hold the firewall... Total system collapse imminent.");
      setTimeout(() => {
        window.location.reload();
      }, 6000);
    }
  }, []);

  const injectAiDialogue = useCallback((message) => {
    setAiOverrideMessage(message);
  }, []);

  const clearAiDialogue = useCallback(() => {
    setAiOverrideMessage(null);
  }, []);

  return (
    <ThemeContext.Provider value={{ 
      isCrimson, 
      terminalGameState, 
      toggleCrimsonTheme,
      triggerTerminalGame, 
      endTerminalGame, 
      aiOverrideMessage, 
      injectAiDialogue,
      clearAiDialogue
    }}>
      {children}
    </ThemeContext.Provider>
  );
}
