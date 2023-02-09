import { StyleSheet, Text, View,Image,SafeAreaView} from 'react-native';
import SignUpScreen from './SignUpScreen';


export default function Inscription() {
  return (
    <SafeAreaView style={styles.root}>
  <SignUpScreen/>
</SafeAreaView>
  );
}

const styles = StyleSheet.create({
  
root: {
  flex: 1,
  backgroundColor: "#F9FBFC"
  },
    
});
