import React, { useEffect, useState } from 'react';
import { View, Text, Button, TextInput, StyleSheet, Alert } from 'react-native';
import { db } from '../config/Config';
import { ref, onValue, update } from "firebase/database";

export default function PerfilScreen() {
  const [nick, setNick] = useState('');
  const [edad, setEdad] = useState('');
  const [correo, setCorreo] = useState('');


  const [datos, setDatos] = useState([]);

  useEffect(() => {
    const starCountRef = ref(db, 'usuarios/');
    onValue(starCountRef, (snapshot) => {
      const data = snapshot.val();

      const dataTemp = Object.keys(data).map((key) => ({
        key, ...data[key]
      }));

      setDatos(dataTemp);
    });
  }, []);

  function actualizar(correo,nick, edad) {
    update(ref(db, `usuarios/${correo.replace(/\./g, '_')}`), {
      edad: edad,
      nick:nick
    })
    .then(() => {
      // Actualización exitosa
      Alert.alert('Éxito', 'Perfil actualizado correctamente.');
      console.log('Perfil actualizado correctamente');
    })
    .catch((error) => {
      // Error durante la actualización
      console.error('Error al actualizar el perfil:', error);
      Alert.alert('Error', 'Ocurrió un error al actualizar el perfil.');
    });
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>ACTUALIZAR DATOS</Text>
      <TextInput
      style={styles.input}
        placeholder='Ingrese su correo actual'
        onChangeText={(texto) => setCorreo(texto)}
      />

      <TextInput
      style={styles.input}
        placeholder='Ingrese su nuevo nick'
        onChangeText={(texto) => setNick(texto)}
      />

      <TextInput
      style={styles.input}
        placeholder='Ingrese su nueva edad'
        onChangeText={(texto) => setEdad(texto)}
      />

      <Button color={"#50C878"} title='Actualizar' onPress={() => actualizar(correo,nick, edad)}/>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#fff',
  },
   title: {
    fontSize: 30,
    marginBottom: 20,
    fontWeight: 'bold',
    color: '#333',
  },
  input: {
    width: '80%',
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    marginBottom: 20,
    padding: 10,
    borderRadius: 8,
    backgroundColor: '#fff',
  }
  });
