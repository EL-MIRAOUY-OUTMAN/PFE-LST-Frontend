
import { StyleSheet, Text, View } from 'react-native';

export default function AvatarLogin()
{
  return (
    <View style={styles.container}>
      <Text>je suis avatar de votre interface login</Text> 
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
