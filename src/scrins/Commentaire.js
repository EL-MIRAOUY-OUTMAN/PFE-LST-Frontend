import React,{useState,useEffect,Component}  from 'react';
import { useNavigation,useRoute} from '@react-navigation/native';
import { StyleSheet, Text,View ,FlatList,
ScrollView,Image,ActivityIndicator,InteractionWrapper,Interaction, ImageBackground, TextInput
} from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import { MaterialIcons } from '@expo/vector-icons'; 
import NewAPI from '../../apis/News';
import LikeDiscmt from '../compents/commentairecomposa/LikeDiscmt';

const Commentaire =(props)=>{ 
   
  const route =useRoute();
const role=props.route.params.role;
const iduser=props.route.params.iduser;
const idpub=props.route.params.idpub;
const iduserpub=props.route.params.iduserpub;
const imagepost=props.route.params.image;
const textpost=props.route.params.text;

   // navifgation 
   const navigation = useNavigation();

    const [text,setText]=useState('');
    const [publications,setPublications]=useState()
    const [isLoading,setIsLoading]=useState(false)
    const [data,setData]=useState([]);
    const [etatlike,setEtatlike]=useState(false);
    const [etatdislike,setEtatdislike]=useState(false);
       
    useEffect(()=>{
      setIsLoading(true);
      getCommentaires();
      return ()=>{}
    },[])
   

                    // function teste 
     function TesteAdmincommentaire(idcmt,idusercmt) {
             if (role=="admin" || idusercmt==iduser ) {
            return   <MaterialIcons name="delete-outline" size={24} color="#D52231"  onPress={()=>DeleteCommentaire(idcmt)}/>;
             }
             else
                      return ;
                    };
                   //supprimer commentaire
 const DeleteCommentaire=(idcmt) =>{
  const url=`/publication/${idpub}/commentaires/supprimer/${idcmt}`;
  NewAPI.delete(url)
  .then((response)=>{
   console.log('delete succes');
   getCommentaires();
  })
  .catch(function(erreur){
    console.log(erreur)
  }) 
};   
                         // return button 
     function buttomposter(){
       if(text==''){
         return  <Ionicons style={{marginTop:10}} name="send" size={35} color="#CBBCBC" />;
       }
       else return <Ionicons style={{marginTop:10}} name="send" size={35} color="#4D6EC8" onPress={publierCommentaire}/>;
     };
       
     function publierCommentaire (){
      NewAPI.post(`users/${iduser}/publications/${idpub}/commentaire`,{ 
        text:text,
      })
    .then(function(response){
          notifier();
           getCommentaires();
          console.log("text commentaire",response.data.text); 
          setText('');
        })
          .catch(function(erreur){
            console.log(erreur)
    })
     };
     //     ----------notification 
     function notifier (){
      NewAPI.post(`/user/${iduser}/publication/${idpub}/notifier/${iduserpub}/notification`,{ 
        type:'commenté',
        idpub:idpub,
      })
    .then(function(response){
          
          // getCommentaires();
          console.log("notification reussi"); 
         
        })
          .catch(function(erreur){
            console.log(erreur)
    })
     };
  
   //fetch tous les commentaires dune publication avec son id 
   function  getCommentaires(){
    NewAPI.get(`/commentaires/${idpub}`)
  .then(function(response){ 
         setPublications(response.data);
      })
        .catch(function(erreur){
          console.log(erreur)
  })
   };
  
   //invoque fonction getCommentaire debut 
   useState(()=>{
    getCommentaires();
   },[])
   // render image post
   function renderimagepost(){
     if(imagepost==null){
       return <View style={{marginBottom:30}}></View>;
     }
     else{
       return  <Image  source={{uri:imagepost}} style={ styles.postImage} resizeMode="cover"/> ;
     }
   }
    
  // pour chaque item
 const renderItem =({item})=>{
     return(
         <View style={styles.item}>      
              <Image style={styles.image}
             source={{uri:item.user.image}}
             />
               <View style={{flex:1}}>
                 <View style={{flexDirection:'row',justifyContent:'space-between',alignItems:'center'}}>
                   <View >
                     <Text style={styles.name}> {item.user.nom} {item.user.prenom} </Text>
                     <Text style={styles.time}> {item.dateCommentaire}</Text>
                   </View>         
                 </View>
                 <Text style={styles.post}> {item.text} </Text>
                 <View style={{flexDirection:'row',justifyContent: 'space-between',alignContent:'center'}}>
                      <View  style={{flexDirection:'row',marginLeft:20}}>              
                     <LikeDiscmt  
                     IdCmt={item.idComt} IdUser={iduser} 
                     role={role}/>  

                      </View>
                      {
                       // parametre c'est id de user actuel avec id publication
                       TesteAdmincommentaire(item.idComt,item.user.idUser)
                     }
              </View>
          </View>

         </View> 
     )
     }
   
     
return (
<View style={styles.container}>
        <View style={{width:350,justifyContent:'center',marginLeft:25,marginTop:10}}>
        <Text style={styles.post}> {textpost} </Text>
       {
         renderimagepost()
       } 
        </View>
        <View>
          <Text style={styles.textcommentaire}>Tous les commentaires : </Text>
        </View>
        <FlatList style={styles.list}
         data={publications}
     renderItem={renderItem}
     keyExtractor={(item)=>item.idComt}
     showsVerticalScrollIndicator={false} 
     />
     <View style={{justifyContent: 'space-between',flexDirection:'row'}}>
       <View>
          <TextInput 
          style={{
            height:80,
           width:340,
            padding:10,
            borderColor:'#B22732',
            borderWidth:1, 
            backgroundColor:'#F2E8E8',
            borderRadius:10,
            marginLeft:10,

            
          }} 
          onChangeText={setText} value={text} multiline={true}
          placeholder='Enter votre commentaire '
          borderColor='#B22732'
          />  
       </View>
       <View>
                  {
                       buttomposter()
                     }
         
         </View>
       </View>

      </View>
      );
};
const styles = StyleSheet.create({
  
   postImage:{
    width:80,
    height:120,
    borderRadius:5,
    marginVertical:16,
    marginLeft:17,
  },
  textcommentaire:{
    fontSize:20,
    marginLeft:10,
    color:'#4290D4'
  },
  container: {
    flex: 1,
   backgroundColor: '#EFECF4',
    marginTop:20
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
    padding:1,
    flexDirection:'row',
    marginVertical:5,
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
export default Commentaire;