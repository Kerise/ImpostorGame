import React, { useState } from 'react';
import { View, Text, TouchableOpacity, SafeAreaView, Switch, ScrollView, TextInput } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { LinearGradient } from 'expo-linear-gradient';
import styles from '../styles';

const Options = ({ impostorCount, setImpostorCount, jesterEnable, setJesterEnable, jesterPercentage, setJesterPercentage, jesterShowCode, setJesterShowCode, onBack }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const handleBack = async () => {
    try {
      await AsyncStorage.setItem('impostorCount', impostorCount.toString());
      await AsyncStorage.setItem('jesterEnable', jesterEnable.toString());
      await AsyncStorage.setItem('jesterPercentage', jesterPercentage.toString());
      await AsyncStorage.setItem('jesterShowCode', jesterShowCode.toString());
    } catch (error) {
      console.error('Error saving options:', error);
    }
    onBack();
  };

  return (
    <LinearGradient colors={['#2563eb', '#7c3aed']} style={styles.container}>
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.optionsWrapper}>
          <Text style={styles.mainTitle}>Options</Text>
          <ScrollView style={styles.scrollView} contentContainerStyle={styles.scrollContent}>
       
        <View style={styles.counterContainer}>
          <Text style={styles.optionText}>Impostors:</Text>
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
        <View style={styles.optionContainer}>
          <Text style={styles.optionText}>Jester Enable:</Text>
          <Switch
            value={jesterEnable}
            onValueChange={setJesterEnable}
            trackColor={{ false: '#767577', true: '#81b0ff' }}
            thumbColor={jesterEnable ? '#f5dd4b' : '#f4f3f4'}
          />
        </View>
        <View style={styles.counterContainer}>
          <Text style={[styles.optionText, !jesterEnable && { opacity: 0.5 }]}>Jester %:</Text>
          <TouchableOpacity
            style={[styles.counterButton, !jesterEnable && { opacity: 0.5 }]}
            onPress={() => setJesterPercentage(Math.max(5, jesterPercentage - 5))}
            disabled={!jesterEnable}
            activeOpacity={0.8}
          >
            <Text style={styles.counterButtonText}>−</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.counterDisplay, !jesterEnable && { opacity: 0.5 }]}
            onPress={() => {
              if (jesterEnable) {
                setInputValue(jesterPercentage.toString());
                setIsEditing(true);
              }
            }}
            disabled={!jesterEnable}
            activeOpacity={0.8}
          >
            {isEditing ? (
              <TextInput
                value={inputValue}
                onChangeText={setInputValue}
                onSubmitEditing={() => {
                  const num = parseInt(inputValue);
                  if (!isNaN(num) && num >= 1 && num <= 100) {
                    setJesterPercentage(num);
                  }
                  setIsEditing(false);
                }}
                onBlur={() => setIsEditing(false)}
                autoFocus
                keyboardType="numeric"
                style={styles.counterText}
                maxLength={3}
                selectTextOnFocus
              />
            ) : (
              <Text style={styles.counterText}>{jesterPercentage}</Text>
            )}
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.counterButton, !jesterEnable && { opacity: 0.5 }]}
            onPress={() => setJesterPercentage(Math.min(100, jesterPercentage + 5))}
            disabled={!jesterEnable}
            activeOpacity={0.8}
          >
            <Text style={styles.counterButtonText}>+</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.optionContainer}>
          <Text style={[styles.optionText, !jesterEnable && { opacity: 0.5 }]}>Jester show code:</Text>
          <Switch
            value={jesterShowCode}
            onValueChange={setJesterShowCode}
            disabled={!jesterEnable}
            trackColor={{ false: '#767577', true: '#81b0ff' }}
            thumbColor={jesterShowCode ? '#f5dd4b' : '#f4f3f4'}
          />
        </View>
          </ScrollView>
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