import React from 'react';
import { View, Text, TouchableOpacity, SafeAreaView } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import styles from '../styles';

const Play = ({ onFinish, randomPlayer, playerNames }) => {
  return (
    <LinearGradient colors={['#2563eb', '#7c3aed']} style={styles.container}>
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.content}>
          <Text style={styles.mainTitle}>Grajmy!</Text>
          <Text style={styles.mainTitle}>Zaczyna gracz: {playerNames[randomPlayer]}</Text>
          <TouchableOpacity
            style={styles.largeButton}
            onPress={onFinish}
            activeOpacity={0.8}
          >
            <Text style={styles.largeButtonText}>Finish</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </LinearGradient>
  );
};

export default Play;