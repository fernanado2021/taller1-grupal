import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { useRoute, useNavigation } from '@react-navigation/native';

const GameOverScreen = () => {
  const route = useRoute();
  const navigation = useNavigation();
  const score = route.params?.score || 0;

  const handlePlayAgain = () => {
    // Navegar de vuelta a la pantalla de selección de dificultad
    navigation.navigate('Niveles');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.gameOverText}>Juego terminado</Text>
      <Text style={styles.scoreText}>Puntuación final: {score}</Text>
      <Button title="Jugar de nuevo" onPress={handlePlayAgain} color={"#D4AC0D"} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  gameOverText: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  scoreText: {
    fontSize: 18,
    marginBottom: 24,
  },
});

export default GameOverScreen;
