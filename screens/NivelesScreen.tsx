import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const NivelesScreen = ({ navigation }: any) => {

  const startGame = (difficulty: string) => {
    navigation.navigate('Juegos', { difficulty });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Seleccione la dificultad:</Text>
      <Button title="Fácil" onPress={() => startGame('easy')} style={styles.button} />
      <Button title="Moderado" onPress={() => startGame('medium')} style={styles.button} />
      <Button title="Difícil" onPress={() => startGame('hard')} style={styles.button} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#f0f0f0', // Cambia el color de fondo según tus preferencias
  },
  title: {
    fontSize: 18,
    marginBottom: 20,
    fontWeight: 'bold',
  },
  button: {
    marginVertical: 10,
  },
});

export default NivelesScreen;
