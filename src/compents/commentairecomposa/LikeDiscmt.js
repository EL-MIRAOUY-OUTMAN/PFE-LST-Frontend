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


const LikeDiscmt =(props)=>{ 
  
  const [isLoading,setIsLoading]=useState(false)
  useEffect(()=>{
    setIsLoading(true);
    return ()=>{}
  },[])
  const navigation = useNavigation();
  const [type,setType]=useState('');

    const [nbrlike,setNbrlike]=useState(0);
    const [nbrdislike,setNbrdislike]=useState(0);
   
  const iduser  =props.IdUser;
  const idcmt=props.IdCmt; 
    // get commentaire
    function  getCommentaires(){
        NewAPI.get(`/commentaireparid/${idcmt}`)
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
    NewAPI.get(`/users/${iduser}/commentaire/${idcmt}`)
   .then(function(response){
     //console.log("hhhhhhhhhhhhhh",response.data.type);
       setType(response.data.type);
       setIsLoading(true);
       getCommentaires();
      })
    .catch(function(erreur){
          console.log(erreur)
  })
   };
   //-----------------------------------Supppppppppp-------------------------------------
   const DeleteLIKE=(iduser,idpub) =>{
    const url=`users/${iduser}/commentaire/${idcmt}/appreciation/delete`;
    NewAPI.delete(url)
     .then((response)=>{
       getlike();  
    })
     .catch(function(erreur){
      console.log(erreur)
    }) 
   };
   const DeletedisLIKE=(iduser,idpub) =>{
    const url=`users/${iduser}/commentaire/${idpub}/appreciation/delete`;
    NewAPI.delete(url)
     .then((response)=>{
       getlike();
    })
     .catch(function(erreur){
      console.log(erreur)
    }) 
   };
   


   //-----------------------------------function like  -------------------------------------------------------------
   function AjouterLIKE (iduserr,idc){
    NewAPI.post(`/users/${iduserr}/commentaire/${idc}/appreciation/insert`,{
      "type":"like"
    })
  .then(function(response){
         getlike();
      })
        .catch(function(erreur){
          console.log(erreur)
  })
   };
   //----------------------------------- dis--- like  -------------------------------------------------------------
   function AjouterDisLIKE (iduserr,idc){
    NewAPI.post(`/users/${iduserr}/commentaire/${idc}/appreciation/insert`,{
      "type":"dislike"
    })
  .then(function(response){
         getlike();
      })
        .catch(function(erreur){
          console.log(erreur)
  })
   };


  //------------------------------------function like---------->dislike-------------------------------------------------------------
  function modifierlike_par_dislike ( iduserr,idc){
    NewAPI.post(`/users/${iduserr}/commentaire/${idc}/appreciation/update`,{
      "type":"dislike"
    })
  .then(function(response){
         getlike();
      })
        .catch(function(erreur){
          console.log(erreur)
  })
   };
   ////------------------------------------function dislike---------->like-------------------------------------------------------------
  function modifierdislike_par_like ( iduserr,idc){
    NewAPI.post(`/users/${iduserr}/commentaire/${idc}/appreciation/update`,{
      "type":"like"
    })
  .then(function(response){
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
                      onPress={()=> DeleteLIKE(iduser,idcmt)}/>
                  </View>
                  <View style={{marginRight:10}}> 
                      <Text style={{fontSize:20,marginRight:25}}>{nbrlike}</Text>
                 </View>
              </View>
                <View>
                   <Ionicons name="ios-thumbs-down-outline" size={22} color="black"  
                   onPress={()=>modifierlike_par_dislike(iduser,idcmt)}/>
                 </View>
                <View style={{marginRight:10}}> 
                    <Text style={{fontSize:20,marginRight:25}}>{nbrdislike}</Text>
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
                  onPress={()=> modifierdislike_par_like(iduser,idcmt)}/>
              </View>
              <View style={{marginRight:10}}> 
                  <Text style={{fontSize:20,marginRight:25}}>{nbrlike}</Text>
             </View>
          </View>
            <View>
               <Ionicons name="ios-thumbs-down-outline" size={22} color="#3180E1"  
               onPress={()=> DeletedisLIKE(iduser,idcmt)}/>
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
                  onPress={()=> AjouterLIKE(iduser,idcmt)}/>
              </View>
              <View style={{marginRight:10}}> 
                  <Text style={{fontSize:20,marginRight:25}}>{nbrlike}</Text>
             </View>
          </View>
            <View>
               <Ionicons name="ios-thumbs-down-outline" size={22} color="black" 
                onPress={()=> AjouterDisLIKE(iduser,idcmt)}/>
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
export default LikeDiscmt;