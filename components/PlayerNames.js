import React from 'react';
import { View, Text, TouchableOpacity, ScrollView, TextInput } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import styles from '../styles';

const PlayerNames = ({ playerNames, setPlayerNames, onSubmit }) => {
  return (
    <LinearGradient colors={['#2563eb', '#7c3aed']} style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>Enter Player Names</Text>
        <ScrollView style={styles.namesContainer}>
          {playerNames.map((name, index) => (
            <View key={index} style={styles.nameInputWrapper}>
              <Text style={styles.playerLabel}>Player {index + 1}</Text>
              <TextInput
                style={styles.nameInput}
                placeholder={`Enter name...`}
                placeholderTextColor="#999"
                value={name}
                onChangeText={(text) => {
                  const newNames = [...playerNames];
                  newNames[index] = text;
                  setPlayerNames(newNames);
                }}
              />
            </View>
          ))}
        </ScrollView>
        <TouchableOpacity
          style={styles.button}
          onPress={onSubmit}
          activeOpacity={0.8}
        >
          <Text style={styles.buttonText}>Next</Text>
        </TouchableOpacity>
      </View>
    </LinearGradient>
  );
};

export default PlayerNames;