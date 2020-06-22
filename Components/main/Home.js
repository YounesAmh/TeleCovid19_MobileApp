import React from 'react'
import { View, StyleSheet, Image } from 'react-native'

import { Text, Button } from 'galio-framework';

export function Home(props) {
  return (
    <View style={styles.container}>
      <Text style={styles.para}>Bienvenue sur la plateforme TéléCovid</Text>
      <Image
        style={styles.logo}
        source={require('../assets/img/mask_covid1.png')}
      />

      <Button style={{ marginTop: 60 }} round size="small" color="#ecf0f1"
        onPress={() => props.navigation.navigate('Login')}>
        <Text style={styles.buttontext} >Login</Text></Button>
      <Button style={{ marginTop: 15 }} round size="small" color="#ecf0f1"
        onPress={() => props.navigation.navigate('Signup')}>
        <Text style={styles.buttontext} >S'incrire</Text></Button>
    </View>
  );
}


export default Home;

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#273c75',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  logo: {
    width: 227,
    height: 181,
    marginBottom: 40,
  },
  para: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#ecf0f1',
    justifyContent: 'center',
    textAlign: 'center',
    marginLeft: 20,
    marginRight: 20,
    marginBottom: 80,
  },
  buttontext: {
    color: '#273c75',
    fontWeight: "bold",
    fontSize: 16,
  },
}
);