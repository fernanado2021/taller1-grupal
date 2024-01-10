import { Alert, StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import React from 'react';
import { getAuth, signOut } from "firebase/auth";
import { auth } from '../config/Config';

export default function WelcomeScreen({ navigation }: any) {
  function salir() {
    const auth = getAuth();
    signOut(auth)
      .then(() => {
        Alert.alert("Sesión cerrada correctamente", "Vuelve Pronto");
        navigation.navigate("Login");
      })
      .catch(() => {
        Alert.alert("Error", "No se pudo cerrar sesión");
      });
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>¡Bienvenido!</Text>
      <TouchableOpacity
        style={styles.button}
        onPress={() => salir()}
      >
        <Text style={styles.buttonText}>Cerrar Sesión</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f0f0f0',
    padding: 20,
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
    fontWeight: 'bold',
    color: '#333',
  },
  button: {
    backgroundColor: 'red', // Puedes cambiar el color del botón según tus preferencias
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
  },
  buttonText: {
    color: '#fff', // Puedes cambiar el color del texto del botón según tus preferencias
    fontSize: 16,
    fontWeight: 'bold',
  },
});
