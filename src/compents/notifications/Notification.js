import React,{useState,useEffect,Component}  from 'react';
import { useNavigation,useRoute} from '@react-navigation/native';
import { StyleSheet, Text,View ,FlatList,
ScrollView,Image,ActivityIndicator,InteractionWrapper,Interaction, ImageBackground, TextInput
} from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import { MaterialIcons,AntDesign } from '@expo/vector-icons'; 
import NewAPI from '../../../apis/News';


const Notification =(props)=>{ 
   
    const route =useRoute();
    const role =props.route.params.role ;
    const iduser=props.route.params.iduser;
    const navigation = useNavigation()
    const [notification,setnotification]=useState()
    const [isLoading,setIsLoading]=useState(false)

    useState(()=>{
      getNotification(iduser);
     },[])
     
    useEffect(()=>{
      setIsLoading(true);
      getNotification(iduser);
      return ()=>{}
    },[])
   //fetch tous les commentaires dune publication avec son id 
   function  getNotification(iduser){
    NewAPI.get(`/notifications/${iduser}`)
  .then(function(response){ 
         setnotification(response.data);
      })
        .catch(function(erreur){
          console.log(erreur)
  })
   };

  // pour chaque item
 const renderItem =({item})=>{
     return(        
         <View style={styles.item}>           
              <Image style={styles.image}
             source={{uri:item.userfait.image}}
             />
               <View style={{flex:1}}>
                 <View style={{flexDirection:'row',justifyContent:'space-between',alignItems:'center'}}>
                   <View >
                     <Text style={styles.name}> {item.userfait.nom} {item.userfait.prenom} a 
                     <Text style={styles.type}> {item.type}  </Text>
                     votre publication  </Text>               
                   </View>     
                 </View>  
              </View>
          </View> 
     )
     }   
return (
<View style={styles.container}>
        <View  style={{flexDirection:'row'}}>
        
          <Text style={styles.notification}>Notifications </Text>
          <Ionicons name="notifications"size={24} color="black" />
        </View>
        <FlatList style={styles.list}
         data={notification}
     renderItem={renderItem}
     keyExtractor={(item)=>item.id}
     showsVerticalScrollIndicator={false} 
     />
     <View style={{justifyContent: 'space-between',flexDirection:'row'}}>
       </View>
       <View style={{flexDirection:'row', justifyContent:'space-between'}}>
        <Ionicons style={styles.iconsbar} name="ios-home-outline" size={35} color="#05AEE2"
          onPress={()=> {navigation.navigate("Publications",{
            iduser:iduser,
            role:role,
               })
               }} />
      
         <Ionicons name="notifications"size={35} color="#05AEE2" 
                   onPress={()=> navigation.navigate("Notification",{
                  iduser:iduser,
                 
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
   marginTop:40
  },
  notification:{
    fontSize:20,
    marginLeft:20,
     fontStyle:'italic',
     
  },
  type:{

  }
  ,
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
    padding:2,
    flexDirection:'row',
    marginVertical:2,
   },
   image:{
     marginLeft:6,
    width:36,
    height:36,
    borderRadius:18,
    marginRight:16,
   },
   time:{
     color:'#C4C6CE',
     fontSize:11,
     marginTop:4,
 
   },
   name:{
     fontSize:14,
     marginTop:1,
     color:'#454D65',
     fontWeight:"500",
   },
   post:{
     fontSize:  14,
     marginTop:16,
     color:'#000000',
   },
   postImage:{
     width:undefined,
     height:170,
     borderRadius:5,
     marginVertical:16,
   },
   listtab:{
    flexDirection:'row',
    flex:0.3,
    backgroundColor:'#fff',
    padding:2,
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
texttab:{
    fontSize:16,
    fontStyle:'italic',
    color:'#000000',
},
btntabActive:{
backgroundColor:'#C961A1',
}
});
export default Notification;