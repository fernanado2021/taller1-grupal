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
      <View >
      <Button title="Fácil" onPress={() => startGame('easy')}  color={"#CB4335"} />
      </View>
      <View style={{marginTop: 10}}>
      <Button title="Moderado" onPress={() => startGame('medium')} color={"#CB4335"} />
      </View>
      <View style={{marginTop: 10}}>
      <Button title="Difícil" onPress={() => startGame('hard')}  color={"#CB4335"}/>
      </View>
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
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  }  
  
});

export default NivelesScreen;
