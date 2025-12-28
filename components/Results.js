import React from 'react';
import { View, Text, TouchableOpacity, SafeAreaView, ScrollView } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import styles from '../styles';

const Results = ({ impostorPlayer, jesterPlayer, onBackToMenu, playerNames, points, onPlayAgain }) => {
  return (
    <LinearGradient colors={['#2563eb', '#7c3aed']} style={styles.container}>
      <SafeAreaView style={styles.safeArea}>
        <ScrollView style={styles.scrollView} contentContainerStyle={styles.scrollContent}>
          <Text style={styles.title}>Game Over!</Text>
          <View style={styles.resultContainer}>
            <Text style={styles.resultText}>The Impostors were:</Text>
            <Text style={styles.impostorNumberText}>{impostorPlayer.map(i => playerNames[i]).join(', ')}</Text>
          </View>
          {jesterPlayer !== -1 && (
            <View style={styles.resultContainer}>
              <Text style={styles.resultText}>The Jester was:</Text>
              <Text style={styles.impostorNumberText}>{playerNames[jesterPlayer]}</Text>
            </View>
          )}
          <View style={styles.resultContainer}>
            <Text style={styles.resultText}>Player Points:</Text>
            {playerNames.map((name, i) => (
              <Text key={i} style={styles.resultText}>{name}: {points[i] || 0} points</Text>
            ))}
          </View>
          <View style={styles.resultContainer}>
            <Text style={styles.resultText}>Who won?</Text>
            <View style={styles.buttonRow}>
              <TouchableOpacity
                style={styles.resultButton}
                onPress={() => onPlayAgain('impostors')}
                activeOpacity={0.8}
              >
                <Text style={styles.resultButtonText}>Impostors</Text> 
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.resultButton}
                onPress={() => onPlayAgain('crewmates')}
                activeOpacity={0.8}
              >
                <Text style={styles.resultButtonText}>Crewmates</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.buttonRow}>
              {jesterPlayer !== -1 && (
              <TouchableOpacity
                style={styles.resultButton}
                onPress={() => onPlayAgain('jester')}
                activeOpacity={0.8}
              >
                <Text style={styles.resultButtonText}>Jester</Text> 
              </TouchableOpacity>
              )}
            </View>
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
        </ScrollView>
      </SafeAreaView>
    </LinearGradient>
  );
};

export default Results;