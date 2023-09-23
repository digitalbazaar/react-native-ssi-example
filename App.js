import './shim.js';
import './polyfill.js';
import PolyfillCrypto from 'react-native-webview-crypto';
import {StatusBar} from 'expo-status-bar';
import {StyleSheet, Text, View} from 'react-native';
import {start} from './example.js';

export default function App() {
  return (
    <View style={styles.container}>
      <PolyfillCrypto />
      <Text>Open up App.js to start working on your app!</Text>
      <StatusBar style='auto' />
    </View>
  );
}

start();

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
