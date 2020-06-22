import React ,{useState, useEffect} from 'react'
import { createStackNavigator } from '@react-navigation/stack';


import Login from './main/Login'
import Signup from './main/Signup'
import Home from './main/Home'
import reducer from './main/reducer'


import { NavigationContainer } from '@react-navigation/native';
import {  AsyncStorage  } from 'react-native'

const Stack = createStackNavigator();

function SplashScreen() {
    return (
      <>
      </>
    );
  }

 
   
function MyStack({ navigation }) {
     
  const [isloading, setisloading] = useState(true);
  const [username, setusername] = useState('');
  token = async () => {
    try {
      const getusername = await AsyncStorage.getItem('@email');
      setusername(getusername)
      setisloading(false)
    }
    catch (error) { console.error(error) }
  };
  useEffect(() => {
    token()
  })
    return (
        <NavigationContainer >
            <Stack.Navigator screenOptions={{ headerShown: false }}>
            {isloading ? (
            <Stack.Screen name="Splash" component={SplashScreen} />
          ) : username == null ? (
            <>
                <Stack.Screen name="Home" component={Home} />
                <Stack.Screen name="Signup" component={Signup} />
                <Stack.Screen name="Login" component={Login} />
                <Stack.Screen name="reducer" component={reducer} />
            </>
          ) : (
            <>
                <Stack.Screen name="reducer" component={reducer} />
                <Stack.Screen name="Home" component={Home} />
                <Stack.Screen name="Signup" component={Signup} />
                <Stack.Screen name="Login" component={Login} />
             </>
            )} 
                </Stack.Navigator>
        </NavigationContainer>

    );
}
export default MyStack