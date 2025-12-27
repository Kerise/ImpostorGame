import React from 'react';
import { View, Text, TouchableOpacity, SafeAreaView } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import styles from '../styles';

const Results = ({ impostorPlayer, onBackToMenu, playerNames, onPlayAgain }) => {
  return (
    <LinearGradient colors={['#2563eb', '#7c3aed']} style={styles.container}>
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.content}>
          <Text style={styles.title}>Game Over!</Text>
          <View style={styles.resultContainer}>
            <Text style={styles.resultText}>The Impostors were:</Text>
            <Text style={styles.impostorNumberText}>{impostorPlayer.map(i => playerNames[i]).join(', ')}</Text>
          </View>
          <TouchableOpacity
            style={styles.largeButton}
            onPress={onPlayAgain}
            activeOpacity={0.8}
          >
            <Text style={styles.largeButtonText}>Play Again</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.largeButton}
            onPress={onBackToMenu}
            activeOpacity={0.8}
          >
            <Text style={styles.largeButtonText}>Back to Menu</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </LinearGradient>
  );
};

export default Results;