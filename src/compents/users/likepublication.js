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

const LikePublic =(props)=>{ 
         
  const [isLoading,setIsLoading]=useState(false)
  useEffect(()=>{
    setIsLoading(true);
    return ()=>{}
  },[])

  const [type,setType]=useState('');
  const [nbrlike,setNbrlike]=useState(0);
    const [nbrdislike,setNbrdislike]=useState(0);
    const idpub=props.IdPub; 
    const iduser=props.IdUser; 
    const iduserpub=props.iduserpub;
     //   get publication par id 
    
     function  getPublication(){
      NewAPI.get(`/chercherpublications/${idpub}`)
    .then(function(response){ 
            
           setNbrlike( response.data.nbrlike);
           setNbrdislike(response.data.nbrdislike);
        })
          .catch(function(erreur){
            console.log(erreur)
    })
     };
    // function principale
  function  getlike(){
    NewAPI.get(`/apreciation/users/${iduser}/publication/${idpub}`)
   .then(function(response){
      
       setType(response.data.type);
       setIsLoading(true);
     //  console.log('type --------',response.data.type);
       //console.log('user--------',iduser);
    // console.log('idpub --------',idpub);
       getPublication();
      
      })
    .catch(function(erreur){
          console.log(erreur)
  })
   };
             
    //-----------------------------------function like  -------------------------------------------------------------
    function AjouterLIKE (iduserr,idpub){
      NewAPI.post(`/apreciation/users/${iduserr}/publication/${idpub}/appreciation/insert`,{
        "type":"like"
      })
    .then(function(response){
           //alert("like");
           getlike();
           notifier();
        })
          .catch(function(erreur){
            console.log(erreur)
    })
     };
      //     ----------notification 
      function notifier (){
        NewAPI.post(`/user/${iduser}/publication/${idpub}/notifier/${iduserpub}/notification`,{ 
          type:'aimé',
         
        })
      .then(function(response){    
            // getCommentaires();
            console.log("notification reussi"); 
          })
            .catch(function(erreur){
              console.log(erreur)
      })
       };
     //----------------------------------- dis--- like  -------------------------------------------------------------
     function AjouterDisLIKE (iduserr,idpubb){
      NewAPI.post(`/apreciation/users/${iduserr}/publication/${idpubb}/appreciation/insert`,{
        "type":"dislike"
      })
    .then(function(response){
           //alert("dislike");
           getlike();
        })
          .catch(function(erreur){
            console.log(erreur)
    })
     };      

         //-----------------------------------Supppppppppp-------------------------------------
   const DeleteLIKE=(iduser,idpub) =>{
    const url=`/apreciation/users/${iduser}/publication/${idpub}/appreciation/delete`;
    NewAPI.delete(url)
     .then((response)=>{
    //alert('delete like succes');
       getlike();
    })
     .catch(function(erreur){
      console.log(erreur)
    }) 
   };
   const DeletedisLIKE=(iduser,idpub) =>{
    const url=`/apreciation/users/${iduser}/publication/${idpub}/appreciation/delete`;
    NewAPI.delete(url)
     .then((response)=>{
      // alert('delete dislike succes');
       getlike();
    })
     .catch(function(erreur){
      console.log(erreur)
    }) 
   };
   
          //------------------------------------function like---------->dislike-------------------------------------------------------------
  function modifierlike_par_dislike ( iduserr,idpubb){
    NewAPI.post(`/apreciation/users/${iduserr}/publication/${idpubb}/appreciation/update`,{
      "type":"dislike"
    })
  .then(function(response){
        // alert("modifier lik par dislike");
         getlike();
      })
        .catch(function(erreur){
          console.log(erreur)
  })
   };
   ////------------------------------------function dislike---------->like-------------------------------------------------------------
  function modifierdislike_par_like ( iduserr,idpubb){
    NewAPI.post(`/apreciation/users/${iduserr}/publication/${idpubb}/appreciation/update`,{
      "type":"like"
    })
  .then(function(response){
//alert("modifier dislik par like");
         getlike();
      })
        .catch(function(erreur){
          console.log(erreur)
  })
   };

      
     //------------------------------------------render---------------------------------------------------------
if(1==1){
  getlike();
  if(type=="like"){
        return (
          <View style={{flexDirection:'row',justifyContent: 'space-between',}}>
              <View style={{flexDirection:'row',justifyContent: 'space-between',}}>
                  <View>
                     <Ionicons name="ios-thumbs-up-outline" size={22} color="#3180E1" 
                      onPress={()=> DeleteLIKE(iduser,idpub)}/>
                  </View>
                  <View style={{marginRight:10}}> 
                      <Text style={{fontSize:20,marginRight:25}}>{nbrlike}</Text>
                 </View>
              </View>
                <View>
                   <Ionicons name="ios-thumbs-down-outline" size={22} color="black"  
                   onPress={()=>modifierlike_par_dislike(iduser,idpub)}/>
                 </View>
                <View style={{marginRight:10}}> 
                    <Text style={{fontSize:20,marginRight:10}}>{nbrdislike}</Text>
                </View>
           </View>
          );
    }
      else if(type=="dislike"){
        return (
          <View style={{flexDirection:'row',justifyContent: 'space-between',}}>
          <View style={{flexDirection:'row',justifyContent: 'space-between',}}>
              <View>
                 <Ionicons name="ios-thumbs-up-outline" size={22} color="black" 
                  onPress={()=> modifierdislike_par_like(iduser,idpub)}/>
              </View>
              <View style={{marginRight:10}}> 
                  <Text style={{fontSize:20,marginRight:25}}>{nbrlike}</Text>
             </View>
          </View>
            <View>
               <Ionicons name="ios-thumbs-down-outline" size={22} color="#3180E1"  
               onPress={()=> DeletedisLIKE(iduser,idpub)}/>
             </View>
            <View style={{marginRight:10}}> 
                <Text style={{fontSize:20,marginRight:25}}>{nbrdislike}</Text>
            </View>
       </View>
              );
      }
      else{  
        //------------------------DEERNIERE UNDEFINED --------------
        return (
          <View style={{flexDirection:'row',justifyContent: 'space-between',}}>
          <View style={{flexDirection:'row',justifyContent: 'space-between',}}>
              <View>
                 <Ionicons name="ios-thumbs-up-outline" size={22} color="black" 
                  onPress={()=> AjouterLIKE(iduser,idpub)}/>
              </View>
              <View style={{marginRight:10}}> 
                  <Text style={{fontSize:20,marginRight:25}}>{nbrlike}</Text>
             </View>
          </View>
            <View>
               <Ionicons name="ios-thumbs-down-outline" size={22} color="black" 
                onPress={()=> AjouterDisLIKE(iduser,idpub)}/>
             </View>
            <View style={{marginRight:10}}> 
                <Text style={{fontSize:20,marginRight:25}}>{nbrdislike}</Text>
            </View>
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
export default LikePublic;