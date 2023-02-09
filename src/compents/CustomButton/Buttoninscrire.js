import React from 'react';
import { Text,StyleSheet,Pressable } from 'react-native';

const Buttoninscrire = ({onPress,text, type ="PRIMARY", bgColor,fgColor}) =>{
    return(
        <Pressable 
        onPress={onPress} 
        style={[
            styles.container,
            styles['container_${type}'],
            bgColor ? {backgroundColor : bgColor} :{}
            ]}>
            <Text 
            style={[
                styles.text, 
                styles['text_${type}'],
                fgColor ? {color: fgColor} : {},
                ]}>{text}</Text>
        </Pressable>
    );
};

const styles = StyleSheet.create({
    container: {
        width: '70%',
        marginLeft:65,
        borderRadius: 5,
        padding: 15,
        marginVertical: 5,

        alignItems: 'center',
        
    },

    container_PRIMARY:{
        backgroundColor :'#3B71F3',
    },
    container_TERTIARY:{},
    text: {
        fontWeight: 'bold',
        color:'white',
    },
    text_TERTIARY: {
        color: 'gray'
    },
    
});

export default Buttoninscrire;
