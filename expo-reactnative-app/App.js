import * as React from'react';
import { StatusBar } from 'expo-status-bar';
import { Button, StyleSheet, Text, View } from 'react-native';

import { Metacom } from'./metacom/dist/metacom.js'

const metacom = Metacom.create('ws://localhost:8000/api');
(async () => {
  console.log("load server connection")
  await metacom.load('auth', 'console', 'example', 'files');
})()

const { api } = metacom;

export default function App() {
  const [token, setToken] = React.useState(null);

  const login = async () => {
    try {
      const res = await api.auth.signin({ login: 'marcus', password: 'marcus' })
      console.log("login res:", res)
      if (res.token) {
        setToken(res.token);
      }
    } catch (error) {
      console.log("login error:", error)
    }
  }
  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      {
        token ? (
          <Text>you are logged in, your token: {token}</Text>
        ) : (
          <View>
            <Text>you are not logged in</Text>
            <Button title={"login"} onPress={login}/>
          </View>
        )

      }

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
