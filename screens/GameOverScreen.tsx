import { View, Text } from 'react-native'
import React from 'react'

export default function GameOverScreen() {
  return (
    <View>
      <Text>GameOverScreen</Text>
    </View>
  )
}import React, { useState } from 'react';
import { View, Text, Button, StyleSheet, TextInput } from 'react-native';
import { useRoute, useNavigation } from '@react-navigation/native';
import { db } from '../config/Config';
const GameOverScreen = () => {
  const route = useRoute();
  const navigation = useNavigation();
  const [nickname, setNickname] = useState('');
  const score = route.params?.score || 0;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Juego terminado</Text>
      <Text style={styles.score}>Puntuación final: {score}</Text>
      <TextInput
        style={styles.input}
        placeholder="Ingresa tu nickname"
        onChangeText={(text) => setNickname(text)}
      />
      <Button title="Jugar de nuevo" onPress={handlePlayAgain} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  score: {
    fontSize: 18,
    marginBottom: 16,
  },
  input: {
    height: 40,
    width: '80%',
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 16,
    paddingLeft: 10,
  },
});

export default GameOverScreen;
