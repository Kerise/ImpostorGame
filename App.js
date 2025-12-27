
import React, { useState, useEffect } from 'react';
import { BackHandler } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { nouns } from './nouns';
import Menu from './components/Menu';
import PlayerCount from './components/PlayerCount';
import PlayerNames from './components/PlayerNames';
import Game from './components/Game';
import Play from './components/Play';
import Options from './components/Options';
import Results from './components/Results';

export default function App() {
  const [gamePhase, setGamePhase] = useState('menu');
  const [playerCount, setPlayerCount] = useState(2);
  const [impostorCount, setImpostorCount] = useState(1);
  const [playerNames, setPlayerNames] = useState([]);
  const [impostorPlayer, setImpostorPlayer] = useState([]);
  const [randomPlayer, setRandomPlayer] = useState(0);
  const [currentPlayer, setCurrentPlayer] = useState(0);
  const [codeRevealed, setCodeRevealed] = useState(false);
  const [secretCode, setSecretCode] = useState(null);

  useEffect(() => {
    loadPlayerCount();
    loadImpostorCount();
  }, []);

  const getPreviousPhase = (phase) => {
    switch (phase) {
      case 'playerCount': return 'menu';
      case 'playerNames': return 'playerCount';
      case 'game': return 'playerNames';
      case 'play': return 'game';
      case 'results': return 'play';
      case 'options': return 'menu';
      default: return null;
    }
  };

  useEffect(() => {
    const backAction = () => {
      const prevPhase = getPreviousPhase(gamePhase);
      if (prevPhase) {
        setGamePhase(prevPhase);
        // Reset relevant state if needed
        if (prevPhase === 'menu') {
          setImpostorPlayer([]);
          setCurrentPlayer(0);
          setCodeRevealed(false);
          setSecretCode(null);
        }
        return true; // Prevent default back
      }
      return false; // Allow default back (exit app)
    };

    const backHandler = BackHandler.addEventListener('hardwareBackPress', backAction);

    return () => backHandler.remove();
  }, [gamePhase]);

  const loadPlayerCount = async () => {
    try {
      const saved = await AsyncStorage.getItem('playerCount');
      if (saved) {
        setPlayerCount(parseInt(saved, 10));
      }
    } catch (error) {
      console.error('Error loading player count:', error);
    }
  };

  const loadImpostorCount = async () => {
    try {
      const saved = await AsyncStorage.getItem('impostorCount');
      if (saved) {
        setImpostorCount(parseInt(saved, 10));
      }
    } catch (error) {
      console.error('Error loading impostor count:', error);
    }
  };

  const startGame = () => {
    setGamePhase('playerCount');
  };

  const options = () => {
    setGamePhase('options');
  };

  const exitGame = () => {
    BackHandler.exitApp();
  };
  
  const submitPlayerCount = async () => {
    try {
      await AsyncStorage.setItem('playerCount', playerCount.toString());
    } catch (error) {
      console.error('Error saving player count:', error);
    }

    setPlayerNames(Array(playerCount).fill(''));
    setGamePhase('playerNames');
  };

  const showCode = () => {
    setCodeRevealed(true);
  };

  const backToMenu = () => {
    setGamePhase('menu');
    setImpostorPlayer([]);
    setCurrentPlayer(0);
    setCodeRevealed(false);
    setSecretCode(null);
  };

  const playAgain = () => {
    setGamePhase('game');
    const impostors = [];
    const available = Array.from({ length: playerCount }, (_, i) => i);
    for (let i = 0; i < impostorCount; i++) {
      const randIndex = Math.floor(Math.random() * available.length);
      impostors.push(available.splice(randIndex, 1)[0]);
    }
    const randomPlayer = Math.floor(Math.random() * playerCount);
    const randomNoun = nouns[Math.floor(Math.random() * nouns.length)];
    setCurrentPlayer(0);
    setRandomPlayer(randomPlayer);
    setCodeRevealed(false);
    setImpostorPlayer(impostors);
    setSecretCode(randomNoun);
  };

  const submitPlayerNames = () => {
    const impostors = [];
    const available = Array.from({ length: playerCount }, (_, i) => i);
    for (let i = 0; i < impostorCount; i++) {
      const randIndex = Math.floor(Math.random() * available.length);
      impostors.push(available.splice(randIndex, 1)[0]);
    }
    const randomPlayer = Math.floor(Math.random() * playerCount);
    const randomNoun = nouns[Math.floor(Math.random() * nouns.length)];
    setImpostorPlayer(impostors);
    setSecretCode(randomNoun);
    setRandomPlayer(randomPlayer);
    setCurrentPlayer(0);
    setCodeRevealed(false);
    setGamePhase('game');
  };

  const nextPlayer = () => {
    if (currentPlayer < playerCount - 1) {
      setCurrentPlayer(currentPlayer + 1);
      setCodeRevealed(false);
    } else {
      setGamePhase('play');
    }
  };

  // Main Menu
  if (gamePhase === 'menu') {
    return <Menu onStartGame={startGame} onOptions={options} onExit={exitGame} />;
  }

  // Player Count Selection
  if (gamePhase === 'playerCount') {
    return <PlayerCount playerCount={playerCount} setPlayerCount={setPlayerCount} onSubmit={submitPlayerCount} />;
  }

  // Options Screen
  if (gamePhase === 'options') {
    return <Options impostorCount={impostorCount} setImpostorCount={setImpostorCount} onBack={() => setGamePhase('menu')} />;
  }

  // Player Names Screen
  if (gamePhase === 'playerNames') {
    return <PlayerNames playerNames={playerNames} setPlayerNames={setPlayerNames} onSubmit={submitPlayerNames} />;
  }

  // Game Phase
  if (gamePhase === 'game') {
    return <Game currentPlayer={currentPlayer} playerCount={playerCount} codeRevealed={codeRevealed} onShowCode={showCode} impostorPlayer={impostorPlayer} secretCode={secretCode} onNextPlayer={nextPlayer} playerNames={playerNames} />;
  }

  // Play Phase
  if (gamePhase === 'play') {
    return <Play onFinish={() => setGamePhase('results')} randomPlayer={randomPlayer} playerNames={playerNames} />;
  }

  // Results
  if (gamePhase === 'results') {
    return <Results impostorPlayer={impostorPlayer} onBackToMenu={backToMenu} playerNames={playerNames} onPlayAgain={playAgain} />;
  }

  return null;
}