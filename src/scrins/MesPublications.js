import { StyleSheet, Text, View } from 'react-native';
import MesPublications from '../compents/publication/MesPubListe';



export default function Publication() {
  return (
    <View style={styles.container}>
         <MesPublications />
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
