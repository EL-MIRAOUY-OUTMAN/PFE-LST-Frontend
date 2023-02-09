import { useNavigation } from '@react-navigation/native';
import { useEffect } from 'react';
import { StyleSheet, Button,Text, View } from 'react-native';




export default function BodyLogin() {
  

  const navigation = useNavigation();
  const goTo = () => navigation.navigate("Users");

  return (
    <View style={styles.container}>
  <Text>je suis le corps de votre interface login</Text>
  <Text>je suis le corps de votre interface login</Text>
  <Button onPress={goTo} title={"Go users"} />       
    </View>
    
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
