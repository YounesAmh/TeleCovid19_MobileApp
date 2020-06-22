import React, { useState } from 'react'
import { View, StyleSheet, ActivityIndicator, AsyncStorage, TextInput } from 'react-native'
import { Text, Button } from 'galio-framework'
import { Item, Input } from 'native-base';
import { FontAwesome } from '@expo/vector-icons';
import Loader from '../config/Loader'
export function Login(props) {
  const [username, setusername] = useState({ value: 'test@gmail.com', error: '' });
  const [password, setPassword] = useState({ value: 'test', error: '' });
  const [error, seterror] = useState('');
  const [inputtext, setinputtext] = useState(true);
  const [icon, seticon] = useState('eye');
  const [loadingstate, setloadingstate] = useState(false);


  async function token(key, value) {
    try {
      await AsyncStorage.setItem(key, value.toString());
    } catch (error) {
      console.error(error);
      return false;
    }

    return true;
  };


  const _changeIcon = () => {
    if (icon === 'eye-slash') {
      seticon('eye')
    }
    setinputtext(!inputtext)
  }


  const _onLoginPressed = ({ }) => {
    if (username.value.length > 0 && password.value.length > 0) {
      <ActivityIndicator size="large" color="#ffffff" />
      setloadingstate(true)
      fetch('https://telecovidprojet.herokuapp.com/api/UserPatient/auth_patient/', {
        method: 'POST',
        headers: {
          Accept:
            'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username: username.value,
          password: password.value,
        }),
      }).then(res => res.json())
        .then(res => {
          setloadingstate(false)
          if (res.message === true) {
            token('@id', res.id)
            token('@firstname', res.First_name)
            token('@lastname', res.Last_name)
            token('@email', res.username)
            props.navigation.navigate('main');
          }else if (res.message === 1){
            setusername({ value: '' })
            setPassword({ value: '' })
            seterror("Email est Invalid")
          }else  if (res.message === 0){
            setusername({ value: '' })
            setPassword({ value: '' })
            seterror("Le nom d'utilisateur ou le mot de passe est incorrect")
          }
        }
        ).catch(error => console.log(error))
    } else {
      setusername({ value: '' })
      setPassword({ value: '' })
      seterror("Veuillez remplir tous les champs !")
    }
  };


  return (
    <View style={styles.container}>
      <Text style={styles.head}>Login</Text>

      <Loader loading={loadingstate} />

      <TextInput placeholder="Email"
        style={styles.textInput}
        value={username.value}
        onChangeText={text => setusername({ value: text, error: '' })}
        placeholderTextColor={'#d3d0d2'} />


      <Item style={styles.textInput}>
        <FontAwesome active name="lock" color='#ffffff' size={18} />
        <Input
          style={{ fontSize: 15, color: '#fff', paddingLeft: 10, height: 40 }}
          placeholder='Mot de passe'
          value={password.value}
          placeholderTextColor={'#d3d0d2'}
          secureTextEntry={inputtext}
          onChangeText={text => setPassword({ value: text, error: '' })}
        />
        <FontAwesome name={icon} color='#ffffff' size={18} onPress={() => _changeIcon()} />
      </Item>

      <Text style={styles.error}>{error}</Text>
      <Button
        onPress={_onLoginPressed} style={{ marginTop: 10 }} round size="small" color="#ecf0f1" >
        <Text style={styles.buttontext} >Login</Text></Button>
      <Text style={{ marginTop: 110, color: '#ecf0f1' }}> Vous n'avez pas de compte ? </Text>
      <Button
        onPress={() => props.navigation.navigate('Signup')}
        style={{ marginTop: 15 }} round size="small" color="#ecf0f1" >
        <Text style={styles.buttontext} >S'incrire</Text></Button>

    </View>
  );
}

export default Login

const styles = StyleSheet.create({
  head: {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#ecf0f1',
    marginBottom: 80,
  },
  container: {
    backgroundColor: '#273c75',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  textInput: {
    width: '75%',
    borderBottomColor: '#d3d0d2',
    borderBottomWidth: 1,
    marginBottom: 25,
  },
  textInput: {
    height: 40,
    width: '75%',
    borderBottomColor: '#d3d0d2',
    borderBottomWidth: 1,
    marginBottom: 25,
    fontSize: 15,
    color: '#ffffff'
  },
  PassTextInput: {
    height: 40,
    width: '75%',
    fontSize: 18,
    borderBottomColor: '#d3d0d2',
    borderBottomWidth: 1,
    marginBottom: 25,
    fontSize: 15,
    color: '#ffffff'
  },
  error: {
    fontSize: 16,
    marginTop: 20,
    marginBottom: 10,
    color: '#d3d0d2',
    marginLeft: 20,
    marginRight: 20,
  },
  buttontext: {
    color: '#273c75',
    fontWeight: "bold",
    fontSize: 16,
  },
}
);