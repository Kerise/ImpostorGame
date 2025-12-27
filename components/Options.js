import React from 'react';
import { View, Text, TouchableOpacity, SafeAreaView } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { LinearGradient } from 'expo-linear-gradient';
import styles from '../styles';

const Options = ({ impostorCount, setImpostorCount, onBack }) => {
  const handleBack = async () => {
    try {
      await AsyncStorage.setItem('impostorCount', impostorCount.toString());
    } catch (error) {
      console.error('Error saving impostor count:', error);
    }
    onBack();
  };

  return (
    <LinearGradient colors={['#2563eb', '#7c3aed']} style={styles.container}>
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.content}>
          <Text style={styles.mainTitle}>Options</Text>
          <Text style={styles.title}>Number of Impostors</Text>
          <View style={styles.counterContainer}>
            <TouchableOpacity
              style={styles.counterButton}
              onPress={() => setImpostorCount(Math.max(1, impostorCount - 1))}
              activeOpacity={0.8}
            >
              <Text style={styles.counterButtonText}>−</Text>
            </TouchableOpacity>
            <View style={styles.counterDisplay}>
              <Text style={styles.counterText}>{impostorCount}</Text>
            </View>
            <TouchableOpacity
              style={styles.counterButton}
              onPress={() => setImpostorCount(Math.min(3, impostorCount + 1))}
              activeOpacity={0.8}
            >
              <Text style={styles.counterButtonText}>+</Text>
            </TouchableOpacity>
          </View>
          <TouchableOpacity
            style={styles.largeButton}
            onPress={handleBack}
            activeOpacity={0.8}
          >
            <Text style={styles.largeButtonText}>Back to Menu</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </LinearGradient>
  );
};

export default Options;