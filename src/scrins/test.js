import React,{useState,Component}from 'react';

import { StyleSheet, View } from 'react-native';
import {Picker} from '@react-native-picker/picker';





const App =(props)=>{ 
    
  const [typecat,setTypecat]=useState('/all');
  showGendercat = (option) => {
     if(option!=='disabled'){
     console.log(option);
     setTypecat(option)
   }
 };

 
 
  return (
    <View  >

      <Picker 
      onValueChange={showGendercat}
      selectedValue={typecat}>
        <Picker.Item label="Select Item" value="disabled" color="#aaa"/>
      <Picker.Item label="Food" value="food" />
      <Picker.Item label="Santée" value="sante" />
      <Picker.Item label="Sport" value="sport" />
      <Picker.Item label="Technologie" value="technologies" />
      <Picker.Item label="lieux Simpa" value="lieux" />
      </Picker>
      </View>
  );

}
export default  App;

const styles = StyleSheet.create({

  body:{
    flex: 1,
    margin: 60,
    width: 160,
    
  },
});
