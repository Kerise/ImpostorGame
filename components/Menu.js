import React from 'react';
import { View, Text, TouchableOpacity, SafeAreaView } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import styles from '../styles';

const Menu = ({ onStartGame, onOptions, onExit }) => {
  return (
    <LinearGradient colors={['#2563eb', '#7c3aed']} style={styles.container}>
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.content}>
          <Text style={styles.mainTitle}>Game Menu</Text>
          <TouchableOpacity
            style={styles.largeButton}
            onPress={onStartGame}
            activeOpacity={0.8}
          >
            <Text style={styles.largeButtonText}>Start Game</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.largeButton}
            onPress={onOptions}
            activeOpacity={0.8}
          >
            <Text style={styles.largeButtonText}>Options</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.largeButton}
            onPress={onExit}
            activeOpacity={0.8}
          >
            <Text style={styles.largeButtonText}>Exit</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </LinearGradient>
  );
};

export default Menu;