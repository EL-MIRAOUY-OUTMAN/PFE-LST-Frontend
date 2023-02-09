import React, { useState, useEffect } from 'react';
import { Button, Image, View, Platform } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { Alert } from 'react-native-web';
import axios,{AxiosResponse}  from "axios";

export default function ImagePickerExample() {


  const [image, setImage] = useState(null);
  const [picture, setPicture] = useState(null);

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let images = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });
    
    if(!images.cancelled){
      console.log(images);
      setImage(images.uri);
      let newFile={
        uri:images.uri,
        type:`test/${images.uri.split(".")[1]}`,
        name:`test.${images.uri.split(".")[1]}`
      }
      handleUpload(newFile)
       console.log(newFile)

    } 
    else {
      Alert.alert("you need to give a permission");
    }
   
}
const handleUpload = (image)=>{
  const data = new FormData()
  data.append('file',image)
  data.append('upload_preset','_imagepublication')
  data.append("cloud_name","kaoutar")
  

  fetch("https://api.cloudinary.com/v1_1/kaoutar/image/upload",{
      method:"post",
      body:data
  }).then(res=>res.json()).
  then(data=>{
      setPicture(data.url)
     // setModal(false)
  }).catch(err=>{
      Alert.alert("error while uploading")
  })
}



  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Button title="Pick an image from camera roll" onPress={pickImage} />
      {image && <Image source={{ uri: image }} style={{ width: 200, height: 200 }} />}
    </View>
  );
};