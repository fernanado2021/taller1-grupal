import React, { useEffect, useState } from 'react';
import { View, Text, Button, TextInput, Image, StyleSheet, Alert } from 'react-native';
import { db } from '../config/Config';
import { ref, onValue, update } from 'firebase/database';

export default function PerfilScreen() {
  const [correo, setCorreo] = useState('');
  const [nick, setNick] = useState('');
  const [edad, setEdad] = useState('');
  const [avatarURL, setAvatarURL] = useState('');

  useEffect(() => {
    const starCountRef = ref(db, `usuarios/${correo.replace(/\./g, '_')}`);
    onValue(starCountRef, (snapshot) => {
      const userData = snapshot.val();
      if (userData) {
        setNick(userData.nick);
        setEdad(userData.edad);
        setAvatarURL(userData.avatarURL);
      }
    });
  }, [correo]);

  function actualizar() {
    // Realiza la actualización en la base de datos
    update(ref(db, `usuarios/${correo.replace(/\./g, '_')}`), {
      edad: edad,
      nick: nick,
    })
      .then(() => {
        Alert.alert('Éxito', 'Perfil actualizado correctamente.');
        console.log('Perfil actualizado correctamente');
      })
      .catch((error) => {
        console.error('Error al actualizar el perfil:', error);
        Alert.alert('Error', 'Ocurrió un error al actualizar el perfil.');
      });
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>ACTUALIZAR DATOS</Text>
      <Image source={{ uri: avatarURL }} style={styles.avatar} />
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

      <Button color={'#50C878'} title='Actualizar' onPress={() => actualizar()} />

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
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginTop: 20,
  },
});
