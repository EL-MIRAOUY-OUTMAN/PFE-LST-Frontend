import React, { useState } from 'react'
import { StyleSheet, Text, View,TouchableOpacity } from 'react-native';

export default function Filter() {
    const listtab=[
        {
            status:'All'
        },
        {
            status:'Food'
        },
        {
            status:'Restaurant'
        },
        {
            status:'Sport'
        },
          
    ]
     const [status,setStatus]=useState('All')
     const setStatusFilter=status=>{
         setStatus(status)
     }
  return (
   <View style={{flexDirection:'row', height:28}}>
    
        {
            listtab.map(e=>(
            <View style={[styles.listtab, status===e.status && styles.btntabActive]}>
                <TouchableOpacity style={styles.btntab} 
                onPress={()=>setStatusFilter(e.status)}
                >     
           <Text style={styles.texttab}>{e.status}</Text>
       </TouchableOpacity>
           
       </View>
        ))
        }
    </View>  
  );
}

const styles = StyleSheet.create({
listtab:{
    flexDirection:'row',
    flex:0.5,
    backgroundColor:'#fff',
    padding:5,
    
    justifyContent:'center',

},
btntab:{
   flexDirection:'row',
  
   borderColor:'#EBEBEB',
   justifyContent:'center',
},
texttab:{
    fontSize:16,
},
btntabActive:{
backgroundColor:'#C961A1',

}
});
