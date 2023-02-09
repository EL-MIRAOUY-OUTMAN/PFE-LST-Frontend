import { StyleSheet, Text, View } from 'react-native';
import HeaderPublications from '../compents/publication/HeaderPublications';
import ListPublication from '../compents/publication/ListPublication';



export default function Publication() {
  return (
    <View style={styles.container}>
  <Text>vous etes dans l'interface des Publications</Text>
  
       <ListPublication />
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
