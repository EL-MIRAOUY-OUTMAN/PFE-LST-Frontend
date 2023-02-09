import React,{useEffect, useState} from 'react';
import {View, StyleSheet,Button,TextInput,TouchableOpacity,Image,Text
  ,ScrollView} from 'react-native';
import CustomInput from '../compents/CustomInput/CustomInput';
import CustomButton from '../compents/CustomButton/CustomButton';
import PropTypes from 'prop-types';
import ProfilePicture from '../compents/ProfilePicture/ProfilePicture';
import UploadImage from '../compents/UploadImage/UploadImage';
import Ionicons from '@expo/vector-icons/Ionicons';
import {useNavigation} from '@react-navigation/native';
import  NewAPI from '../../apis/News';
import * as ImagePicker from 'expo-image-picker';
import * as Permissions from 'expo-permissions';
import { RadioButton } from 'react-native-paper';

const PosterPublication = (props) => {
  
  const [checked, setChecked] = React.useState('teste');
  const [checkedcat, setCheckedcat] = React.useState('sante');
  const [picture,setPicture] = useState(null)
  const [modal,setModal] = useState(false)
  const [datapublication,setDatapublication]=useState([]);
  const [passwordRepeat,setPasswordRepeat] = useState('');
  const [text,setText]=useState('');
  const navigation = useNavigation();
  const role =props.route.params.role ;
  const iduser= props.route.params.iduser;
  
   useState(()=>{
   //console.log(checked)
   },[])
  
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
      Alert.alert("error while uploading")
  })
}
useState(()=>{
 //setPicture('https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcROFSJMrq6VXjkoJrGfHpVW67o2M37FE_XEXg&usqp=CAU')
 },[])
  useEffect(()=>{
   // enregister ()
  })
    
      

  function enregister (){
   
    NewAPI.post(`/users/${iduser}/${checkedcat}/publication`,{
      text:text,
      image:picture,
      type:checked
    })
  .then(function(response){
         setDatapublication(response.data);
         console.log(datapublication)
         alert("Votre publication est publié "); 
         setPicture(null);
         setText(''); 
      })
        .catch(function(erreur){
          console.log(erreur)
  })
   };
                          // render iamge 
          function renderImage(st){
            if (st!==null) {
              return <Image source={{ uri: picture }} style={styles.postImage} /> ;
            }
            else return ;
          }
  return ( 

    <ScrollView showVerticalScrollIndicator={false}>
      <View style={styles}>
      <View >
      <TouchableOpacity onPress={pickImage} style={styles.button}>
        <Text style={styles.buttonText}>Ajouter image</Text>
      </TouchableOpacity>
            </View> 
            <View style={{alignContent:'center',justifyContent:'center'}}>
            <TextInput       
          onChangeText={setText} value={text} multiline={true}
          placeholder='Exprimer Vous... '
          borderColor='#B22732'
          style={styles.textpublication}
          />
          </View >
         <View style={{}}>
             {
               renderImage(picture)
             }     
          </View>
 <View  style={styles.radiobuttonview} >
          <View style={styles.cat_genre}>

            <Text style={styles.textcheck}>Type de publication</Text>

          <View style={{flexDirection:'row',marginTop:15}}>   
      <RadioButton
        value="teste"
        status={ checked === 'teste' ? 'checked' : 'unchecked' }
        onPress={() => setChecked('teste')    }
      />
       <Text style={styles.textteste}>Annonce</Text>
      </View>
      <View style={{flexDirection:'row'}}>
      <RadioButton
        value="recommende"
        status={ checked === 'recommande' ? 'checked' : 'unchecked' }
        onPress={() =>   setChecked('recommande')}
        
      />
      <Text style={styles.textteste}>Recommandation</Text>
    
    </View>
  </View>

  <View    style={styles.cat_genre}>
      <Text style={styles.textcheck}>Catégorie du publication</Text>
          <View style={{flexDirection:'row',marginTop:15}}>   
      <RadioButton
        value="sante"
        status={ checkedcat === 'sante' ? 'checked' : 'unchecked' }
        onPress={() => setCheckedcat('sante')    }
      />
       <Text style={styles.textteste}>Santé</Text>
      </View>
      <View style={{flexDirection:'row'}}>
      <RadioButton
        value="food"
        status={ checkedcat === 'food' ? 'checked' : 'unchecked' }
        onPress={() =>   setCheckedcat('food')} 
      />
      <Text style={styles.textteste}>Food</Text>
    </View>
    <View style={{flexDirection:'row'}}>
      <RadioButton
        value="sport"
        status={ checkedcat === 'sport' ? 'checked' : 'unchecked' }
        onPress={() =>   setCheckedcat('sport')} 
      />
      <Text style={styles.textteste}>Sport</Text>
    </View>
    <View style={{flexDirection:'row'}}>
      <RadioButton
        value="lieux"
        status={ checkedcat === 'lieux' ? 'checked' : 'unchecked' }
        onPress={() =>   setCheckedcat('lieux')} 
      />
      <Text style={styles.textteste}>Lieux Sympa</Text>
    </View>
    <View style={{flexDirection:'row'}}>
      <RadioButton
        value="technologies"
        status={ checkedcat === 'technologies' ? 'checked' : 'unchecked' }
        onPress={() =>   setCheckedcat('technologies')} 
      />
      <Text style={styles.textteste}>Technologies</Text>
    </View>
  </View>

  </View >
         <View style={{flexDirection:'row',justifyContent:'space-around',}}>
           <View >
             <TouchableOpacity onPress={enregister} style={styles.buttonpublier}>
             <Text style={styles.buttonText}>Poster</Text>
             </TouchableOpacity>
           </View>
        <View >
        <TouchableOpacity onPress={()=> navigation.navigate("Publications",{
            iduser:iduser,
            role:role,
               }) 
              }
           style={styles.buttonpublier}>
        <Text style={styles.buttonText}>Retour</Text>
        </TouchableOpacity>
            </View>
     </View>
    </View>
    </ScrollView>
    
      );
    };
const styles = StyleSheet.create({
  flex:1,
  marginVertical: 10, 
   textteste:{ 
     marginLeft:15,
     marginTop:8,
   },
   radiobuttonview:{
     flexDirection:'row',justifyContent:'space-around',
   borderColor: '#05AEE2',marginTop:5,borderWidth:1.5,
   
   },
   cat_genre: {
    borderColor: '#05AEE2',
    marginTop:5,borderWidth:1,
    marginBottom:5,
    
   },
      textpublication:{
        height:120,
        width:'95%',
        marginLeft:30,
         padding:10,
         borderColor:'#05AEE2',
         borderWidth:1, 
         backgroundColor:'#F2E8E8',
         borderRadius:10,
         marginLeft:10,
      },
      textcheck:{
        marginTop:10,
        fontSize:16,
        marginLeft:16,
        color:'#000000',
        marginRight:5,
      },
    postImage:{
      width:'85%',
      height:170,
      borderRadius:5,
      marginLeft:30,
      marginVertical:16,
    },
     title: {
       fontSize: 60,
         fontWeight: 'bold', 
    
         margin: 30,
         textAlign: 'center',
     },
    
      container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
      },
    
      button: {
        width: '60%',
        marginLeft:80,
        marginTop:60,
        backgroundColor: '#05AEE2',
        padding: 15,
        borderRadius: 5,
        marginVertical: 5,
        alignItems: 'center',
        borderColor:'#05AEE2',
        borderWidth:1, 
       
        borderRadius:10,
      },
      buttonpublier: {
        width:  150,
        marginLeft:0,
        marginTop:20,

        padding: 15,
        borderRadius: 5,
        marginVertical: 5,
        alignItems: 'center',
        borderColor:'#05AEE2',
        borderWidth:1, 
        backgroundColor:'#05AEE2',
        borderRadius:10,
      },
      buttonText: {
        fontWeight: 'bold',
        fontSize: 15,
        alignItems: 'center',
        color: '#FFF',
      },

     
    });
    
export default PosterPublication;


