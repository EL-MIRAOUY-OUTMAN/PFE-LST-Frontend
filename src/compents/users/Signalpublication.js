import React,{useState,useEffect,Component}  from 'react';
import { StyleSheet, Text, Pressable,View ,Button,FlatList,TouchableOpacity,
ScrollView,StatusBar,Image,ActivityIndicator
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import NewAPI from '../../../apis/News';
import axios,{AxiosResponse} from 'axios';
import { useLinkProps } from '@react-navigation/native';
import Ionicons from '@expo/vector-icons/Ionicons';

const backgroundImg = 'https://wallpaperaccess.com/full/57166.jpg'

const Siganlpublication =(props)=>{ 
         
  const [isLoading,setIsLoading]=useState(false)
  useEffect(()=>{
    setIsLoading(true);
    return ()=>{}
  },[])

    const [type,setType]=useState(false);
    const [nbrsignal,setNbrsignal]=useState(0);
   
    const idpub=props.IdPub; 
    const iduser=props.IdUser; 
    const iduserpub=props.iduserpub;
  
     function  getPublication(){
      NewAPI.get(`/chercherpublications/${idpub}`)
    .then(function(response){ 
           setNbrsignal( response.data.nbrsignal);
        })
          .catch(function(erreur){
            console.log(erreur)
    })
     };
    // function principale
  function  getSignal(){
    NewAPI.get(`/signal/users/${iduser}/publication/${idpub}/signal`)
   .then(function(response){
       //console.log(response.data.signalpub)
       setType(response.data.signalpub);
       setIsLoading(true);
     // console.log('type --------',response.data.signalpub);
       getPublication();
      
      })
    .catch(function(erreur){
          console.log(erreur)
  })
   };
             
    //-----------------------------------function like  -------------------------------------------------------------
    function AjouterSignal (iduserr,idpub){
      NewAPI.post(`/signal/users/${iduser}/publication/${idpub}/signal/insert`,{
      
      })
    .then(function(response){
           //alert("like");
           getSignal();
           notifier();
        })
          .catch(function(erreur){
            console.log(erreur)
    })
     };
   
      //     ----------notification 
      function notifier (){
        NewAPI.post(`/user/${iduser}/publication/${idpub}/notifier/${iduserpub}/notification`,{ 
          type:'signalé',
         
        })
      .then(function(response){    
            // getCommentaires();
            console.log("notification reussi"); 
          })
            .catch(function(erreur){
              console.log(erreur)
      })
       };

         //-----------------------------------Supppppppppp-------------------------------------
   const deleteSignal=(iduser,idpub) =>{
    const url=`/signal/users/${iduser}/publication/${idpub}/signal/delete`;
    NewAPI.delete(url)
     .then((response)=>{
    //alert('delete like succes');
       getSignal();
    })
     .catch(function(erreur){
      console.log(erreur)
    }) 
   };
   
     //------------------------------------------render---------------------------------------------------------
if(1==1){
  getSignal();
  if(type==true){
        return (
            <View  style={{flexDirection:'row',justifyContent: 'space-between',}}>
         
            <Ionicons  name="ios-warning-outline" size={22} color="#F31414" 
             onPress={()=> deleteSignal(iduser,idpub)}/>
              <Text style={{fontSize:20}}>{nbrsignal}</Text>
         </View>
        );
    }
      else{  
       
        return (
          <View style={{flexDirection:'row',justifyContent: 'space-between',}}>
        < Ionicons  name="ios-warning-outline" size={22} color="black"
             onPress={()=> AjouterSignal(iduser,idpub)}/>
              <Text style={{fontSize:20}}>{nbrsignal}</Text>
       </View>
        );

      }
 }
      else
      { 
        return <Ionicons name="ios-ellipsis-vertical-outline" size={22} color="black" />;
      }

  
};

const styles = StyleSheet.create({
 
});
export default Siganlpublication;