import React from 'react';
import { View, Text, TouchableOpacity, SafeAreaView } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import styles from '../styles';

const Game = ({ currentPlayer, playerCount, codeRevealed, onShowCode, impostorPlayer, secretCode, onNextPlayer, playerNames }) => {
  return (
    <LinearGradient colors={['#2563eb', '#7c3aed']} style={styles.container}>
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.content}>
          <Text style={styles.title}>{playerNames[currentPlayer]}</Text>
          {!codeRevealed ? (
            <TouchableOpacity
              style={styles.largeButton}
              onPress={onShowCode}
              activeOpacity={0.8}
            >
              <Text style={styles.largeButtonText}>Show Code</Text>
            </TouchableOpacity>
          ) : (
            <>
              <View style={styles.codeDisplay}>
                {impostorPlayer.includes(currentPlayer) ? (
                  <>
                    <Text style={styles.impostorText}>IMPOSTOR</Text>
                    <Text style={styles.hintText}>{secretCode?.hint}</Text>
                  </>
                ) : (
                  <Text style={styles.codeText}>{secretCode?.pl}</Text>
                )}
              </View>
              <TouchableOpacity
                style={styles.largeButton}
                onPress={onNextPlayer}
                activeOpacity={0.8}
              >
                <Text style={styles.largeButtonText}>
                  {currentPlayer < playerCount - 1 ? 'Next' : 'Finish'}
                </Text>
              </TouchableOpacity>
            </>
          )}
        </View>
      </SafeAreaView>
    </LinearGradient>
  );
};

export default Game;