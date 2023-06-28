import { StyleSheet, Text, View,Dimensions,useState ,Image} from 'react-native'
import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { ViewProps } from 'react-native';


import { NavigationContainer } from '@react-navigation/native'


import Home from './screens/home'
import Veg from './screens/veg'
import NonVeg from './screens/NonVeg1';
import Login from './screens/login';
import SignIn from './screens/signIn';
import Userdish from './screens/usersdish';

    const screenHeight = Dimensions.get('window').height;
    const screenWidth = Dimensions.get('window').width; 


const stack=createStackNavigator();



export default function cooking  () {

 
  return (
    <NavigationContainer >

      
       <stack.Navigator  screenOptions={{
        activeTintColor: '#9E9E9E',
        inactiveTintColor: '#9E9E9E',
        backgroundColor:'red',
        headerShown:false,
        
        
        labelStyle: { fontSize: 25, marginBottom: 4, },
        style: { borderTopColor: '#E0E0E0', borderTopWidth: 1 , backgroundColor: 'red',},
        
      
      }} >

         <stack.Screen name="Login" component={Login}  
          
         /> 
         <stack.Screen name="SignIn" component={SignIn}  
          
          />
          <stack.Screen name="Userdish" component={Userdish}  
          
          />

        <stack.Screen name="Home" component={Home}  
          options={{
            
            tabBarIcon: ({ focused }) => (
              <Image
                source={ require('./assets/home.png') }
                style={styles.tabIcon}
              />
            ),
          }}
         /> 
        <stack.Screen name="Veg" component={Veg}   options={{
            
            tabBarIcon: ({ focused }) => (
              <Image
              source={ require('./assets/veg.png') }
                style={styles.tabIcon}
              />
            ),
          }}/>
        <stack.Screen name="NonVeg" component={NonVeg}  options={{
            
            tabBarIcon: ({ focused }) => (
              <Image
              source={ require('./assets/nonveg.png') }
              style={styles.tabIcon}
                
              />
            ),
          }}/>
      </stack.Navigator>
       
      
        
      
      
    </NavigationContainer>
    
  )
}

 

const styles = StyleSheet.create({
  tabIcon: {
    width: 40,
    height: 40,
    resizeMode: 'contain',
    marginTop:8,
    
  },
  img: {
    height: screenHeight,
    width: screenWidth,
    justifyContent: 'center',
    alignItems: 'center',
  },
})