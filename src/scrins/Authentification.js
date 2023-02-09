import React,{useState} from 'react';
import {View, Text,StyleSheet,Button,TextInput,Image,useWindowDimensions} from 'react-native';
import CustomInput from '../compents/CustomInput/CustomInput';
import CustomButton from '../compents/CustomButton/CustomButton';
import Icons from '../compents/Icons/Icons';
import NewAPI from '../../apis/News';
import { FontAwesome } from '@expo/vector-icons'; 
import { useNavigation } from '@react-navigation/native';


const Authentification = () => {
    // navigation
  const navigation = useNavigation();
  // use state
  const [data,setData]=useState(null);
  const [gmail,setGmail]=useState(null);
  const [password,setPassword]=useState(null);
  const {height} = useWindowDimensions();
    
  function Sign (){
    NewAPI.post('/users',{
      email:gmail,
      password:password,
    }) 
  .then(function(response){
           setData(response.data.password);
      if(password!=response.data.password ||  response.data.password==null){
         alert('Email or password incorrect');
        console.log("email or pass word incorrect");
        console.log('pass enter-------- ',password);
        console.log('pas recuperrer ------- ',response.data.password);
        }
       else {
         setData(response.data);
         const iduser=response.data.idUser; 
         console.log(iduser);    
         const role=response.data.role; 
         console.log(role); 
        alert("Bienvenu dans notre page principale");

        navigation.navigate("Publications",{
          iduser:iduser,
           role:role,
        });

         
        }
        
      })
        .catch(function(erreur){
        console.log(erreur)
  })
   };
    
 
  const Authentifier =() => {
    navigation.navigate("Inscription");
  };
  
  return (

    <View style={styles.root}>
     
    <Image
          source={{
            uri: 'http://res.cloudinary.com/kaoutar/image/upload/v1653730498/zu24zyikqf0klgxfpbch.png',
          }}
          style={{ 
            width: 300, 
            height: 200,
            borderRadius:10,
            marginBottom:10,
            marginTop:-30,      
                }}              
        />         
      <CustomInput 
      placeholder="Gmail" 
      value={gmail} 
      setValue={setGmail} 
      />
      <CustomInput 
      placeholder="Password" 
      value={password} 
      setValue={setPassword} 
      secureTextEntry={true}
      />
      <CustomButton 
      text="Se Connecter" 
      onPress={Sign} 
      type="TERTIARY"
      bgColor="#3B71F3"
      />   
            
      <CustomButton 
      text="vous n'avez pas un compte? Inscrivez-vous..." 
      onPress={Authentifier} 
      fgColor="#3B71F3"
       />
    
    </View>
      );
    };

const styles = StyleSheet.create({
  root: {marginTop:140,
    alignItems: 'center',
    padding: 20,

  },
  icons:{
    flexDirection:'row',
    justifyContent:'space-between',
  }
}
);
export default Authentification;


