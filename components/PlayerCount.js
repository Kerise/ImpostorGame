import React from 'react';
import { View, Text, TouchableOpacity, SafeAreaView } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import styles from '../styles';

const PlayerCount = ({ playerCount, setPlayerCount, onSubmit }) => {
  return (
    <LinearGradient colors={['#2563eb', '#7c3aed']} style={styles.container}>
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.content}>
          <Text style={styles.title}>Select Number of Players</Text>
          <View style={styles.counterContainer}>
            <TouchableOpacity
              style={styles.counterButton}
              onPress={() => setPlayerCount(Math.max(2, playerCount - 1))}
              activeOpacity={0.8}
            >
              <Text style={styles.counterButtonText}>−</Text>
            </TouchableOpacity>
            <View style={styles.counterDisplay}>
              <Text style={styles.counterText}>{playerCount}</Text>
            </View>
            <TouchableOpacity
              style={styles.counterButton}
              onPress={() => setPlayerCount(playerCount + 1)}
              activeOpacity={0.8}
            >
              <Text style={styles.counterButtonText}>+</Text>
            </TouchableOpacity>
          </View>
          <TouchableOpacity
            style={styles.button}
            onPress={onSubmit}
            activeOpacity={0.8}
          >
            <Text style={styles.buttonText}>Next</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </LinearGradient>
  );
};

export default PlayerCount;