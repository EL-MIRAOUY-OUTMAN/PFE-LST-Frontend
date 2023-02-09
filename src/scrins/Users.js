import { StyleSheet, Text, View } from 'react-native';
import FlatListUser from '../compents/users/likepublication';
export default function Users() {
  return (
  
    <View style={styles.container}>
     <FlatListUser />
    
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
