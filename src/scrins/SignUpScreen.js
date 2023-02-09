import React,{useEffect, useState} from 'react';
import {View, StyleSheet,Button,TextInput,TouchableOpacity,Image,Text,ScrollView,useWindowDimensions} from 'react-native';
import CustomInput from '../compents/CustomInput/Buttonimputinscire';
import CustomButton from '../compents/CustomButton/Buttoninscrire';
import PropTypes from 'prop-types';
import ProfilePicture from '../compents/ProfilePicture/ProfilePicture';
import UploadImage from '../compents/UploadImage/UploadImage';
import Ionicons from '@expo/vector-icons/Ionicons';
import { useNavigation} from '@react-navigation/native';
import NewAPI from '../../apis/News';
import * as ImagePicker from 'expo-image-picker';
import * as Permissions from 'expo-permissions';

const SignUpScreen = () => {

  const [picture,setPicture] = useState('')
  const [position,setPosition] = useState('')
  const [modal,setModal] = useState(false)
  const [url,setUrl] = useState('')

  const [data,setData]=useState([]);
  const [iduser,setIdUser]=useState('');
  const [nom,setNom] = useState('');
  const [prenom,setPrenom] = useState('');
  const [email,setEmail] = useState('');
  const [pseudo,setPseudo] = useState('');
  const [login,setLogin] = useState('');
  const [password,setPassword] = useState('');
  const [passwordRepeat,setPasswordRepeat] = useState('');

  const navigation = useNavigation();

  const Authentifier =() => {
  navigation.navigate("Authentification")     
  };

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let data = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });
       
          if(!data.cancelled){
              let newfile = { 
                uri:data.uri,
                type:'test/jpg',
                name:'test/image' 
                
            }
           // console.log(data.uri.split(".")[1])
            setPicture(data.uri)
            console.log(data)
            console.log(newfile)
            handleUpload(newfile)
          }
    else{
       Alert.alert("you need to give up permission to work")
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
      setModal(false)
      //setUrl(data.url)
      console.log(picture)

  }).catch(err=>{
      console.log("error while uploading")
  })
}
useState(()=>{
 setPicture('https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcROFSJMrq6VXjkoJrGfHpVW67o2M37FE_XEXg&usqp=CAU')
 },[])
  useEffect(()=>{
   // enregister ()
  })
    function testchamp(){
   
    if(nom=='' || prenom=='' || email=='' || password=='' ){
     alert('remplir tous les champs')
    }
    else  if(password!=passwordRepeat){
      alert ('répéter meme mot de passe')
    }
    else if (password.length<8){
     alert('mot de passe court')
    }
    else{
      enregister();
    }
    }
  
  function enregister (){
   
    NewAPI.post('/users/user',{
      nom:nom,
      prenom:prenom,
      email:email,
      pseudo:pseudo,
      role:'user',
      login:login,
      password:password,
      image:picture
    })
  .then(function(response){
          
         setData(response.data);
         setIdUser(response.data.idUser+1);
        console.log(iduser);
        setEmail('')
        setNom('')
        setPassword('')
        setPasswordRepeat('')
        setPicture('')
        setPrenom('')
        setUrl('')
        
        //console.log(response.data.nom);
         alert("Bienvenu ");
        
      })
        .catch(function(erreur){
          console.log(erreur)
  })
   };
  const {height} = useWindowDimensions();
  const onTermsOfUsePressed =() =>{
    console.warn('onTermsOfUsePressed');
  };
  
  const onPrivacyPressed =() =>{
    console.warn('onPrivacyPressed');
  };
                                // render iamge 
          function renderImage(st){
            if (st!=='') {
              return <Image source={{ uri: picture }} style={styles.imagecompte} /> 
            }
            else return ;
          }
  return ( 
    <ScrollView showVerticalScrollIndicator={false}>
      <View style={styles}>
         <View style={{   marginTop:30}}>      
             {
               renderImage(picture)
             }     
          </View>      
             <View >
      <TouchableOpacity onPress={pickImage} style={styles.button}>
        <Text style={styles.buttonText}>Choisir votre image</Text>
      </TouchableOpacity>
            </View> 
            <Text style={styles.txt}>required *</Text>
      <CustomInput 
      placeholder="Nom" 
      value={nom} 
      setValue={setNom} 
      />
      <Text style={styles.txt}>required *</Text>
       <CustomInput 
      placeholder="Prenom" 
      value={prenom} 
      setValue={setPrenom} 
      />
     
      <Text style={styles.txt}>required *</Text>
      <CustomInput 
      placeholder="Email" 
      value={email} 
      setValue={setEmail} 
      />
      <Text style={styles.txt}>required * --longeur supérieur à 8 caractères--</Text>
      <CustomInput 
      placeholder="Password" 
      value={password} 
      setValue={setPassword} 
      secureTextEntry={true}
      />
      <Text style={styles.txt}>required *</Text>
       <CustomInput 
      placeholder="Repeat Password" 
      value={passwordRepeat} 
      setValue={setPasswordRepeat} 
      secureTextEntry={true}
      />
      <CustomButton 
      text="S'inscrire" 
      onPress={testchamp} 
      type="TERTIARY"
      bgColor="#3B71F3"
      />
                     
      <CustomButton 
      text="Avez-vous un compte? Authentifiez-vous." 
      onPress={Authentifier} 
      fgColor="#3B71F3"
       />
    </View>
    </ScrollView>
    
      );
    };
const styles = StyleSheet.create({
  flex:1,
  marginVertical: 10, 
  root: {
    alignItems: 'center',
    padding: 20,
    
  },
  txt:{
    marginLeft:40,
    fontSize:14 ,
    marginBottom:-8,
    color:'#F30E0E'
  },

    imagecompte:{
      width: 200, 
      height: 200,
      borderRadius:100,
      borderColor:"#5740C8",
      marginLeft:105
    },
     title: {
       fontSize: 60,
         fontWeight: 'bold', 
    
         margin: 30,
         textAlign: 'center',
     },
     link: {
       color: "#DD4D44",
     },
      container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
      },
      logo: {
        width: 400, 
        height: 200,
        marginBottom: 40,
      },
      button: {
        width: '70%',
        marginLeft:65,
        backgroundColor: '#3B71F3',
        padding: 15,
        borderRadius: 5,
        marginVertical: 5,
        alignItems: 'center',
      },
      buttonText: {
        fontWeight: 'bold',
        fontSize: 15,
        alignItems: 'center',
        color: '#FFF',
      },
  icons:{
       shadowColor:'#E9446A',
       textShadowOffset:{width:0,height:0},
       shadowRadius:10,
       shadowOpacity:0.3,
  },
  iconstext:{
    fontSize:18,
    color:'#6E76E8',
  }
    });
    
export default SignUpScreen;


