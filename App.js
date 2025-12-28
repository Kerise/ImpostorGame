
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
  const [jesterEnable, setJesterEnable] = useState(false);
  const [jesterPercentage, setJesterPercentage] = useState(50);
  const [jesterShowCode, setJesterShowCode] = useState(false);
  const [jesterPlayer, setJesterPlayer] = useState(-1);
  const [points, setPoints] = useState([]);
  const [playerNames, setPlayerNames] = useState([]);
  const [impostorPlayer, setImpostorPlayer] = useState([]);
  const [randomPlayer, setRandomPlayer] = useState(0);
  const [currentPlayer, setCurrentPlayer] = useState(0);
  const [codeRevealed, setCodeRevealed] = useState(false);
  const [secretCode, setSecretCode] = useState(null);

  useEffect(() => {
    loadPlayerCount();
    loadImpostorCount();
    loadJesterEnable();
    loadJesterPercentage();
    loadJesterShowCode();
    loadPoints();
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

  const loadJesterEnable = async () => {
    try {
      const saved = await AsyncStorage.getItem('jesterEnable');
      if (saved !== null) {
        setJesterEnable(saved === 'true');
      }
    } catch (error) {
      console.error('Error loading jester enable:', error);
    }
  };

  const loadJesterPercentage = async () => {
    try {
      const saved = await AsyncStorage.getItem('jesterPercentage');
      if (saved) {
        setJesterPercentage(parseInt(saved, 10));
      }
    } catch (error) {
      console.error('Error loading jester percentage:', error);
    }
  };

  const loadJesterShowCode = async () => {
    try {
      const saved = await AsyncStorage.getItem('jesterShowCode');
      if (saved !== null) {
        setJesterShowCode(saved === 'true');
      }
    } catch (error) {
      console.error('Error loading jester show code:', error);
    }
  };

  const loadPoints = async () => {
    try {
      const saved = await AsyncStorage.getItem('points');
      if (saved) {
        setPoints(JSON.parse(saved));
      }
    } catch (error) {
      console.error('Error loading points:', error);
    }
  };

  const setupGame = () => {
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

    // Jester logic
    let jester = -1;
    if (jesterEnable) {
      const chance = Math.floor(Math.random() * 100);
      if (chance < jesterPercentage) {
        // Select a non-impostor player as jester
        const nonImpostors = available.filter(player => !impostors.includes(player));
        if (nonImpostors.length > 0) {
          jester = nonImpostors[Math.floor(Math.random() * nonImpostors.length)];
        }
      }
    }
    setJesterPlayer(jester);
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
    setPoints(new Array(playerCount).fill(0));
    setGamePhase('playerNames');
  };

  const showCode = () => {
    setCodeRevealed(true);
  };

  const backToMenu = () => {
    setGamePhase('menu');
    setImpostorPlayer([]);
    setJesterPlayer(-1);
    setCurrentPlayer(0);
    setCodeRevealed(false);
    setSecretCode(null);
  };

  const playGame = (winner) => {
    if (winner) {
      // Update points based on winner
      setPoints(prevPoints => {
        const newPoints = [...prevPoints];
        if (winner === 'impostors') {
          impostorPlayer.forEach(i => newPoints[i] += 2);
        } else if (winner === 'jester') {
          newPoints[jesterPlayer] += 2;
        } else if (winner === 'crewmates') {
          for (let i = 0; i < playerCount; i++) {
            if (!impostorPlayer.includes(i) && i !== jesterPlayer) {
              newPoints[i] += 1;
            }
          }
        }
        // Save points
        AsyncStorage.setItem('points', JSON.stringify(newPoints)).catch(error => console.error('Error saving points:', error));
        return newPoints;
      });
    }
    setupGame();
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
    return <Options impostorCount={impostorCount} setImpostorCount={setImpostorCount} jesterEnable={jesterEnable} setJesterEnable={setJesterEnable} jesterPercentage={jesterPercentage} setJesterPercentage={setJesterPercentage} jesterShowCode={jesterShowCode} setJesterShowCode={setJesterShowCode} onBack={() => setGamePhase('menu')} />;
  }

  // Player Names Screen
  if (gamePhase === 'playerNames') {
    return <PlayerNames playerNames={playerNames} setPlayerNames={setPlayerNames} onSubmit={playGame} />;
  }

  // Game Phase
  if (gamePhase === 'game') {
    return <Game currentPlayer={currentPlayer} playerCount={playerCount} codeRevealed={codeRevealed} onShowCode={showCode} impostorPlayer={impostorPlayer} jesterPlayer={jesterPlayer} jesterShowCode={jesterShowCode} secretCode={secretCode} onNextPlayer={nextPlayer} playerNames={playerNames} />;
  }

  // Play Phase
  if (gamePhase === 'play') {
    return <Play onFinish={() => setGamePhase('results')} randomPlayer={randomPlayer} playerNames={playerNames} />;
  }

  // Results
  if (gamePhase === 'results') {
    return <Results impostorPlayer={impostorPlayer} jesterPlayer={jesterPlayer} onBackToMenu={backToMenu} playerNames={playerNames} points={points} onPlayAgain={playGame} />;
  }

  return null;
}