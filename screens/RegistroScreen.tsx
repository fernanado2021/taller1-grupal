import { StyleSheet, Text, View, Button, Alert, TextInput, Image } from 'react-native';
import React, { useState } from 'react';
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth, db } from '../config/Config';
import { ref, update } from "firebase/database";
import * as ImagePicker from 'expo-image-picker';
//firebase
import { getStorage, uploadBytes, getDownloadURL } from "firebase/storage";
import { storage } from '../config/Config';
import { TouchableOpacity } from 'react-native-gesture-handler';

export default function RegistroScreen({ navigation }: any) {
  const [correo, setCorreo] = useState('');
  const [contrasenia, setContrasenia] = useState('');
  const [nick, setNick] = useState('');
  const [edad, setEdad] = useState('');
  const [imagen, setimagen] = useState(' ')

  //cargar imagen desde la galeria
  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true, //editar img true : false
      aspect: [4, 3], //dimension de la imagen
      quality: 1, //calidad
    });

    console.log(result);

    if (!result.canceled) {
      setimagen(result.assets[0].uri);
    }
  };
  function registro() {
    createUserWithEmailAndPassword(auth, correo, contrasenia)
      .then((userCredential) => {
        const user = userCredential.user;

        // Guardar información adicional en la base de datos
        const userRef = ref(db, `usuarios/${correo.replace(/\./g, '_')}`);
        update(userRef, {
          nick: nick,
          edad: edad,
        })

        console.log("REGISTRO CORRECTO");
        // Mostrar una alerta de registro exitoso
        Alert.alert('Registro exitoso', '¡Bienvenido! Has sido registrado correctamente.');
        navigation.navigate('Drawer');
        // Limpiar los campos después de un registro exitoso
        setCorreo('');
        setContrasenia('');
        setNick('');
        setEdad('');
      })
      .catch((error) => {
        const errorCode = error.code;

        switch (errorCode) {
          case 'auth/weak-password':
            Alert.alert('Error', 'La contraseña debe tener al menos 6 caracteres');
            break;
          case 'auth/email-already-in-use':
            Alert.alert('Error', 'El correo electrónico ya está registrado. Por favor, inicia sesión o utiliza otro correo.');
            break;
          default:
            Alert.alert('Error', 'Ocurrió un error durante el registro');
            break;
        }
      });
  }
 

    return (
      <View style={styles.container}>
        <Text style={styles.title}>Registro</Text>
        <TextInput
          style={styles.input}
          placeholder='Ingrese email'
          onChangeText={(texto) => setCorreo(texto)}
        />
        <TextInput
          style={styles.input}
          placeholder='Ingrese contraseña'
          onChangeText={(texto) => setContrasenia(texto)}
          secureTextEntry={true}
        />
        <TextInput
          style={styles.input}
          placeholder="Ingrese un nick"
          onChangeText={(texto) => setNick(texto)}
        />
        <TextInput
          style={styles.input}
          placeholder="Edad"
          onChangeText={(texto) => setEdad(texto)}
        />
        <TouchableOpacity onPress={() => pickImage()} style={styles.button}>
          <Text style={styles.buttonText}>Seleccionar imagen</Text>
        </TouchableOpacity>
        <Image source={{ uri: imagen }} style={styles.img} />
        <TouchableOpacity onPress={() => subirImagen('Avatars')} style={styles.button}>
          <Text style={styles.buttonText}>Cargar imagen</Text>
        </TouchableOpacity>

        <Button title='Registrarse' onPress={() => registro()} />
      </View>
    );
  }

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#f0f0f0', // Cambiado el color de fondo
      padding: 20, // Añadido espacio de relleno
    },
    title: {
      fontSize: 30,
      marginBottom: 20,
      fontWeight: 'bold', // Añadido negrita
      color: '#333', // Cambiado el color del texto
    },
    img: {
      width: 300,
      height: 300,
      resizeMode: 'contain'
    },
    button: {
      backgroundColor: '#FBE1AD',
      borderRadius: 5,
      padding: 10,
      marginBottom: 10,
      width: '100%',
      alignItems: 'center',
    },
    buttonText: {
      color: 'Black',
      fontSize: 16,
    },
    input: {
      width: '80%',
      height: 40,
      borderColor: '#ccc', // Cambiado el color del borde
      borderWidth: 1,
      marginBottom: 20,
      padding: 10,
      borderRadius: 8,
      backgroundColor: '#fff', // Añadido color de fondo
    }
  });
