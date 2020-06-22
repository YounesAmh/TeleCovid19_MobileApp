import React, { useState } from 'react'
import { View,  StyleSheet, AsyncStorage, TextInput } from 'react-native'
import { Text, Button,  } from 'galio-framework';
import { Item, Input } from 'native-base';
import { FontAwesome } from '@expo/vector-icons';
import Loader from '../config/Loader'

export function Signup(props) {
  const [username, setusername] = useState({ value: '', error: '' });
  const [password, setPassword] = useState({ value: '', error: '' });
  const [firstname, setfirstname] = useState({ value: '', error: '' });
  const [lastname, setlastname] = useState({ value: '', error: '' });
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
    if( icon === 'eye-slash'){
      seticon('eye')
    }
    setinputtext(!inputtext)
  }


  const _onSignupPressed = () => {
    setloadingstate(true)
    if (username.value.length > 0 && password.value.length > 0 && firstname.value.length > 0 &&
      lastname.value.length > 0) {
      fetch('https://telecovidprojet.herokuapp.com/api/UserPatient/create_account/', {
        method: 'POST',
        headers: {
          Accept:
            'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username: username.value,
          password: password.value,
          first_name: firstname.value,
          last_name: lastname.value,
        }),
      }).then(res => res.json())
        .then(res => {          
          if (res.message === true) {
            token('@id', res.id)
            token('@firstname', res.First_name)
            token('@lastname', res.Last_name)
            token('@email', res.username)
            setloadingstate(false)
            props.navigation.navigate('main')
          }
          else {
            setfirstname({ value: '' })
            setlastname({ value: '' })
            setusername({ value: '' })
            setPassword({ value: '' })
            if(res.message === 1)
            {
              seterror(" Email est incorrect")

            }else if(res.message === 0)
            {
              seterror("Email déja existe ")
            }
            setloadingstate(false)
            
          }
        }
        )
        .catch(error => console.log(error))
    } else {
      setfirstname({ value: '' })
      setlastname({ value: '' })
      setusername({ value: '' })
      setPassword({ value: '' })
      seterror("Veuillez remplir tous les champs !")
    }

  };
  return (
    <View style={styles.container}>
      <Text style={styles.head}>Inscription</Text>

      <TextInput
        value={firstname.value}
        style={styles.textInput}
        onChangeText={text => setfirstname({ value: text, error: '' })}
        placeholder="Prénom"
        placeholderTextColor={'#d3d0d2'} />
      <TextInput
        value={lastname.value}
        style={styles.textInput}
        onChangeText={text => setlastname({ value: text, error: '' })}
        placeholder="Nom"
        placeholderTextColor={'#d3d0d2'} />
      <TextInput
        value={username.value}
        style={styles.textInput}
        onChangeText={text => setusername({ value: text, error: '' })}
        placeholder="Email"
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

      <Button style={{ marginTop: 30 }} round size="small" color="#ecf0f1" onPress={_onSignupPressed}>
      <Text style={styles.buttontext} >S'incrire</Text></Button>

      <Text style={styles.error}>{error}</Text>
      <Loader loading={loadingstate} />

      <Text style={{ marginTop: 60, color: '#ffffff' }}> Si vous avez déjà un compte, identifiez-vous.</Text>
      <Button
        onPress={() => props.navigation.navigate('Login')} 
        style={{ marginTop: 15 }} round size="small" color="#ecf0f1">
          <Text style={styles.buttontext} >Login</Text></Button>

    </View>
  );
}


export default Signup;

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
    height: 40,
    width: '75%',
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