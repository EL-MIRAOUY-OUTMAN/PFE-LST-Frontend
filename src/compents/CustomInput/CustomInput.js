import React from 'react';
import {View, TextInput, StyleSheet } from 'react-native';
const CustomInput = ({value, setValue,placeholder,secureTextEntry }) => {
    return(
        <View style={styles.container}>
            <TextInput 
            value={value}
            onChangeText={setValue}
            placeholder={placeholder} 
            style={styles.input} 
            secureTextEntry={secureTextEntry}
            />
            
        </View>
        );

};

const styles = StyleSheet.create({
    
    container: {
    height:50,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor:'white',
    width: '100%',
    borderColor: '#e8e8e8',
    borderWidth: 1,
    paddingHorizontal: 20,
    marginVertical: 10,
    marginTop:20
    },
    input: {},
});
export default CustomInput;
