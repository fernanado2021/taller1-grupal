import { StyleSheet, Text, View, Alert, TextInput, Image, Button } from 'react-native';
import React, { useState } from 'react'

import { ref as databaseRef, onValue, update } from "firebase/database"
import { getStorage, uploadBytes, getDownloadURL, ref } from "firebase/storage";
import { storage } from '../config/Config';
import { TouchableOpacity } from 'react-native-gesture-handler';
import * as ImagePicker from 'expo-image-picker';

export default function AvatarScreen({ navigation }: any) {
  //cargar imagen desde la galeria
  const [imagen, setimagen] = useState(' ')
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
  async function subirImagen(nombre:string) {
    const storageRef = ref(storage, 'avatars/' + nombre);

    try {
      const response = await fetch(imagen);
      const blob = await response.blob();

      await uploadBytes(storageRef, blob, {
        contentType: 'image/jpg'
      });

      console.log('La imagen se subió con éxito');
      Alert.alert('Mensaje', 'La imagen se subio con exito')

     
      const imageURL = await getDownloadURL(storageRef);
      console.log('URL de desacarga de la imagen', imageURL);
    } catch (error) {
      console.error(error);
    }
  }
  return (
        <View><TouchableOpacity onPress={() => pickImage()} style={styles.button}>
      <Text style={styles.buttonText}>Seleccionar imagen</Text>
    </TouchableOpacity><Image source={{ uri: imagen }} style={styles.img} />
    
    <TouchableOpacity onPress={() => subirImagen('Avatars')} style={styles.button}>
        <Text style={styles.buttonText}>Cargar imagen</Text>
      </TouchableOpacity>
      <Button title='Regresar' onPress={()=>  navigation.navigate('Registro')}/>
      </View>
  )
}
const styles = StyleSheet.create({
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
  }
});