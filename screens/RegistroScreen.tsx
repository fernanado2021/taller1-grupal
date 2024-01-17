import { StyleSheet, Text, View, Button, Alert, TextInput, Image } from 'react-native';
import React, { useState } from 'react';
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth, db } from '../config/Config';
 
 
import * as ImagePicker from 'expo-image-picker';
//firebase
import { ref as databaseRef, onValue, update } from "firebase/database"
import { getStorage, uploadBytes, getDownloadURL,ref } from "firebase/storage";
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
 
    async function subirImagenYRegistrar() {
      try {
        // Subir la imagen
        const storageRef = ref(storage, 'avatars/' + correo);
        const response = await fetch(imagen);
        const blob = await response.blob();
        await uploadBytes(storageRef, blob, {
          contentType: 'image/jpg',
        });
   
        // Obtener la URL de la imagen
        const imageURL = await getDownloadURL(storageRef);
        console.log('URL de descarga de la imagen', imageURL);
   
        // Registro de usuario
        const userCredential = await createUserWithEmailAndPassword(auth, correo, contrasenia);
        const user = userCredential.user
   
        // Guardar información adicional en la base de datos
        const userRef = databaseRef(db, `usuarios/${correo.replace(/\./g, '_')}`);
        await update(userRef, {
          nick: nick,
          edad: edad,
          avatarURL: imageURL, // Añade la URL de la imagen al objeto
        });
   
        // Registro exitoso
        console.log('REGISTRO CORRECTO');
        Alert.alert('Registro exitoso', '¡Bienvenido! Has sido registrado correctamente.');
        navigation.navigate('Login');
   
        // Limpiar los campos después de un registro exitoso
        setCorreo('');
        setContrasenia('');
        setNick('');
        setEdad('');
      } catch (error) {
        // Manejar errores
        console.error(error);
        Alert.alert('Error', 'Ocurrió un error durante la carga de imagen o el registro.');
      }
    }
   
   
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Registro</Text>
        <Image source={{ uri: imagen }} style={styles.img} />
        <TouchableOpacity onPress={() => pickImage()} style={styles.button}>
          <Text style={styles.buttonText}>Seleccionar imagen</Text>
        </TouchableOpacity>
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
        <Button title='Registrarse' onPress={() => subirImagenYRegistrar()} />
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