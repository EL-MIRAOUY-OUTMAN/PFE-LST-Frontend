import React from 'react';
import {View, StyleSheet} from 'react-native';

import { Entypo } from '@expo/vector-icons';
import { SimpleLineIcons } from '@expo/vector-icons';
 
const Icons =() =>{
    return(
        <View style={styles.container}>
      <SimpleLineIcons name="home" size={60} color="black"  onPress={()=>Home()}/>
      
      <View style={styles.root}>
          <Entypo name="user" size={60}  color="black" onPress={()=>SignIn()}/></View>
      </View>
        
      
    );
};
const styles = StyleSheet.create({
    
    container: {
        justifyContent:'space-between',
        flexDirection:'row',
        minHeight: 150,
        right:130,
        
    },
    root:{
      left: 250,
    },
});
export default Icons;