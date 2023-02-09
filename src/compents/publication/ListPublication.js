import React,{useState,useEffect,Component}  from 'react';
import { useNavigation } from '@react-navigation/native';
import { StyleSheet, Text, Pressable,View ,Button,FlatList,TouchableOpacity,
ScrollView,StatusBar,Image,ActivityIndicator,InteractionWrapper,Interaction, ImageBackground
} from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import { MaterialIcons,AntDesign } from '@expo/vector-icons'; 
import { SafeAreaView } from 'react-native-safe-area-context';
import NewAPI from '../../../apis/News';
import LikePub from '../users/likepublication';

import {useRoute } from '@react-navigation/native';
import Siganlpublication from '../users/Signalpublication';
import {Picker} from '@react-native-picker/picker';



const ListPublication =(props)=>{ 
     const [typecat,setTypecat]=useState('food');
     const [gender,setGender]=useState('all');
     const [publications,setPublications]=useState()
     const [isLoading,setIsLoading]=useState(false)
     const role =props.route.params.role ;
     const iduser= props.route.params.iduser;
     const [type,setType]=useState('all');

    const  showGender = (option) => {

     if(option!=='disabled'){
     console.log(option); 
     setGender(option)
     getPublications(option);

   }
   else{
     getPublications(type);
   }
 };

  const showGendercat = (option) => {
  if(option!=='disabled'){
  console.log(option);
  setTypecat(option);
  getPublication(option);
}
};

 
      
    useEffect(()=>{
      setIsLoading(true);
      getPublications(type);
      return ()=>{}
    },[])
                    //invoque fonction getUtlisateurs debut 
   useState(()=>{
    getPublications();
   },[])
                
                  //recupere les parametres du url 
     const route =useRoute();
                  //navigation            
    const navigation = useNavigation();
    
                  //fetch utous les publications 
   function  getPublications(type){
    NewAPI.get(`/publications/${type}`)
  .then(function(response){ 
         setPublications(response.data);
         //console.log("---------------");
         // console.log('iduser ----->',iduser);
         // console.log('image ----->',response.data.user.image);
         // console.log('role de user ---->:',role);
      })
        .catch(function(erreur){
          console.log(erreur)
  })
   };
                 //fetch publications par food
   function  getPublication(cat){
    NewAPI.get(`/publications/filter/${cat}`)
  .then(function(response){ 
         setPublications(response.data);
        
      })
        .catch(function(erreur){
          console.log(erreur)
  })
   };
   
                   // function teste 
   function TesteAdminPUB(idpub) {
    if (role=="admin"  ) {
      return   <MaterialIcons  style={{marginRight:10}} name="delete-outline" size={24} color="#D52231" 
       onPress={()=>DeletePublication(idpub)}/>;
    }
    return ;
  };
         //supprimer publicatiobn 
   const DeletePublication=(idpub) =>{
    const url=`/publications/supprimer/${idpub}`;
   // console.log("idpub ---->",idpub);
    NewAPI.delete(url)
    .then((response)=>{
     //console.log('delete succes');
     alert('delete succes');
     getPublications(type);
    })
    .catch(function(erreur){
      console.log(erreur)
    }) 
  };             
                             // function teste 
   function TesteAdminuser(iduserpost) {
     
    if (role=="user" || iduser==iduserpost ) {
      return   ;
    }
    return <MaterialIcons name="delete-outline" size={24} color="#D52231"  onPress={()=> DeleteUser(iduserpost)}/> ;
  };
                           //supprimer publication                         
  const DeleteUser=(iduserr) =>{
 const url=`/users/supprimer/${iduserr}`;
 NewAPI.delete(url)
  .then((response)=>{
   console.log('delete succes');
    alert('delete succes');
    getPublications(type);
 })
  .catch(function(erreur){
   console.log(erreur)
 }) 
};                  
             //render image poste 
     function renderImageposte(urlimage){
     // console.log(urlimage)
      if(urlimage===null){
      return ;
       }
       else
       {
         return <Image  source={{uri:urlimage}} style={ styles.postImage} resizeMode="cover"/>;      
       }
      }
          //affichage  des informations de chaque publications ---item
 const renderItem =({item})=>{
     return(
 <View style={styles.item}>           
        <View style={{flex:1}}>
             <View style={{flexDirection:'row',justifyContent:'space-between',alignItems:'center'}}>
               <TouchableOpacity  onPress={() =>{ navigation.navigate("Publicationuser",{
                        iduserconsulter:item.user.idUser,
                         role:role,
                         iduser:iduser,                                                                                   
                            })}
                          }>
             <Image style={styles.image}
             source={{uri:item.user.image}}
            />
            </TouchableOpacity>
               <View style={{marginRight:36,marginLeft:-160}}>
                 <Text style={styles.name}> {item.user.nom} {item.user.prenom}  </Text>
                 <Text style={styles.time}> {item.datepub}</Text>
              </View >
              <View  style={{flexDirection:'row',justifyContent: 'space-between',}}>
                   { 
                    // attentions le premier arg c'est id user actuel
                    TesteAdminuser(item.user.idUser)
                   }
                 <Ionicons name="ios-ellipsis-vertical-outline" size={22} color="black" />  
              </View> 
              
            </View>
            
        </View> 
        <Text style={styles.post}> {item.text} </Text>
                 { // image post
                 renderImageposte(item.image)
                 }
       <View  style={{flexDirection:'row',justifyContent:'space-between',alignItems:'center',marginLeft:20}}>
            <LikePub 
            IdUser={iduser} IdPub={item.idpub}   
            role={role}   iduserpub={item.user.idUser}/>
            <View  style={{flexDirection:'row',justifyContent:'space-between',alignItems:'center',marginLeft:-30}}>
            <TouchableOpacity  onPress={() =>{ navigation.navigate("Commentaires",
                                                             { iduser:iduser,
                                                               role:role,
                                                               idpub:item.idpub,
                                                               image:item.image,
                                                               text:item.text,
                                                              iduserpub:item.user.idUser,
                                                              
                                           //j'ai besoin de id user pour commenter                                                                                   
                                                            })}
                                                    }>
                        <Ionicons name="ios-chatbox-ellipses-outline" size={22} color="black"  />
                        </TouchableOpacity>
              <Text style={{fontSize:20}}>{item.nbrcom}</Text>
              </View> 
              <View></View>
              <Siganlpublication
                      IdUser={iduser} IdPub={item.idpub} iduserpub={item.user.idUser}/>
                      
     {  
          //la supprission
           // parametre c'est id de user actuel avec id publication
           TesteAdminPUB(item.idpub)
                     }
              </View>
</View> 
     )
     }
                // pour tous les elements 
return (
<View style={styles.container}>
        <View style={styles.header}  >
        <Image style={{height:90,width:400}} source={{uri:'https://res.cloudinary.com/kaoutar/image/upload/v1654096741/udmhwgfkwzx5cihuayop.jpg'}} />
        </View>
     <View >
        <View style={{flexDirection:'row', height:28}}>
       
        </View>

        </View>
        <View style={styles.viewpicker}>
     
<Picker style={styles.picklist}
onValueChange={showGender}
selectedValue={gender}>
<Picker.Item label="choisir un  type" value="disabled" color="#aaa" />
<Picker.Item label="Tous" value="all" color="#0215BE"/>
<Picker.Item label="Recommandation" value="all/recommande" color="#0215BE" />
<Picker.Item label="Annonce" value="all/teste" color="#0215BE"/>
</Picker>

<Picker style={styles.picklist}
onValueChange={showGendercat}
selectedValue={typecat}>
  <Picker.Item label="choisir une catégorie" value="disabled" color="#aaa"/>
<Picker.Item label="Food" value="food" color="#0215BE"/>
<Picker.Item label="Santé" value="sante" color="#0215BE"/>
<Picker.Item label="Sport" value="sport" color="#0215BE"/>
<Picker.Item label="Technologies" value="technologies" color="#0215BE" />
<Picker.Item label="lieux Sympa" value="lieux" color="#0215BE"/>
</Picker>

</View>
        <FlatList style={styles.list}
         data={publications}
     renderItem={renderItem}
     keyExtractor={(item)=>item.idpub}
     showsVerticalScrollIndicator={false} 
     />
     <View style={{flexDirection:'row', justifyContent:'space-between'}}>
        <Ionicons style={styles.iconsbar} name="ios-home-outline" size={35} color="#05AEE2"
          onPress={()=> {navigation.navigate("Publications",{
            iduser:iduser,
            role:role,
               })
               setGender(type)
               getPublications(type);
               }} />     
         <Ionicons name="notifications"size={35} color="#05AEE2" 
                   onPress={()=> navigation.navigate("Notification",{
                  iduser:iduser,
                  role:role, 
                })}/>
                <Ionicons style={styles.iconsbar} name="ios-add-circle-outline" size={35} color="#05AEE2"  
                 onPress={()=>navigation.navigate("PosterPublication",{
                  iduser:iduser,
                  role:role,
                })}/>
        <AntDesign name="logout" size={30} color="#05AEE2"
        onPress={()=> navigation.navigate("Authentification",{
         
        })} />
        <Ionicons style={styles.iconsbar} name="list" size={35} color="#05AEE2" 
        onPress={()=> navigation.navigate("MesPublications",{
                  iduser:iduser,
                  role:role,
                })}/>
      </View>           
      </View>
      );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
   backgroundColor: '#EFECF4',
  },
  picklist:{
    height:5,
    width: 180,
    marginTop:-40,
    marginBottom:-30,
  },
  viewpicker:{
    flexDirection:'row',
    justifyContent:'space-between'
    
  },
  header:{
    paddingTop:25,
   alignItems:'center',
   justifyContent:'center',
   borderBottomWidth:0.3,
   // borderBottomColor:'#EBECF4',
   shadowColor:'#454D65',
   shadowOffset:{height:5},
shadowRadius:15,
shadowOpacity:0.2,
zIndex:10,
  },
  titre:{
  },
   list:{
  fontSize:18,

   },
   item:{
    backgroundColor:'#FFF',
    borderRadius:5,
    padding:8,
  
    marginVertical:5,
   },
   image:{
    width:45,
    height:45,
    borderRadius:22,
    marginRight:16,
   },
   time:{
     color:'#C4C6CE',
     fontSize:11,
     marginTop:4,
 
   },
   name:{
     fontSize:15,
     color:'#454D65',
     fontWeight:"500",
    
   },
   post:{
     fontSize:  14,
     marginTop:16,
     color:'#838899',
   },
   postImage:{
     width:'90%',
     height:170,
     borderRadius:5,
     marginVertical:16,
     marginLeft:17,
   },
   listtab:{
    flexDirection:'row',
    flex:0.3,
    backgroundColor:'#fff',
    padding:2,
    justifyContent:'center',
    flex:0.3,
},
listtaball:{
  flexDirection:'row',
  flex:0.3,
  backgroundColor:'#fff',
  padding:3,
  justifyContent:'center',
  flex:0.3,
},
listtabRES:{
  backgroundColor:'#fff',
  padding:2,
  
},
btntab:{
   flexDirection:'row',
   padding:2,
   borderRadius:5,
   backgroundColor:'#5B83C2',
   borderColor:'#EBEBEB',
   justifyContent:'center',
},
btntaball:{
  flexDirection:'row',
  padding:2,
  borderRadius:5,
  backgroundColor:'#E9996E',
  borderColor:'#EBEBEB',
  justifyContent:'center',
},
texttab:{
    fontSize:16,
    fontStyle:'italic',
    color:'#000000',
},
btntabActive:{
backgroundColor:'#C961A1',
},
iconsbar:{
  shadowColor:'#E9446A',
  textShadowOffset:{width:0,height:0},
  shadowRadius:10,
  shadowOpacity:0.3,
}
});
export default ListPublication;