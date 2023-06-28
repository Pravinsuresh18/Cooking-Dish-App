import { StyleSheet, Text, View,Dimensions,Image,StatusBar, Touchable, TouchableOpacity,ToastAndroid} from 'react-native'
import React, { useState } from 'react'
import { ImageBackground } from 'react-native'
import { TextInput } from 'react-native-paper'
import { useNavigation } from '@react-navigation/native'


export default function Login  () {

  const[mob,setmob]=useState('')
  const[pas,setpas]=useState('')
  // const[mob1,setmob1]=useState('')
  // const[pas1,setpas1]=useState('')
  const navigation=useNavigation()
  const[focus,setFocus]=useState(true)

  const logfun=()=>{
         
         let verifyn = /^0|[1-9]\d*$/
         let count=0
         
         console.log(mob.length)

         if(mob1 === mob && pas1 === pas){
          ToastAndroid.show('Change the error',ToastAndroid.LONG)
         }else{
          setmob1(mob)
          setpas1(pas)
             if(mob.length == 10 && verifyn.test(mob)){
                count++
              }else{
                 ToastAndroid.show('Mobile length should be 10',ToastAndroid.LONG)
              }
              if(pas.length > 6){
                count++
              }else{
                 ToastAndroid.show('Password length should be greater than 6',ToastAndroid.LONG)
              }
              if(count ==2){

                const requestOptions = {
                  method: 'POST',
                  headers: {"Content-Type": "application/json"},
                  body: JSON.stringify({mobile:mob,password:pas}),
                  redirect: 'follow'
                };
                fetch('http://192.168.1.17:6111/logindb', requestOptions)
                .then(response => response.json())
                 .then(result => {
                  if( result === "sucess"){
                    setlogintime()
                   
                  console.log(result)
                  }else{
                   ToastAndroid.show(result,ToastAndroid.SHORT)
                  }
               })
                .catch(error => console.log('error', error));
                   count=0
               } 
                   
                   
              } 
            } 
            
            const setlogintime=async()=>{
              
              const requestOptions = {
                  method: 'POST',
                  headers: {"Content-Type": "application/json"},
                  body: JSON.stringify({mobile:mob}),
                  redirect: 'follow'
                };
                await fetch('http://192.168.1.17:6111/setlogintimedb', requestOptions)
                .then(response => response.json())
                .then((params) => {
                  if( params === "sucess"){
                    navigation.navigate('Home',{mobile:mob})
                  
                  
                  }else{
                   ToastAndroid.show(params,ToastAndroid.SHORT)
                  }
                 
              })
      
          }
               
     
    return (
        <View>
            <StatusBar backgroundColor="#F54949" />
            <View style={styles.container}>
                  <View style={styles.header}>
                    <View style={[{justifyContent:'center',alignContent:'center',alignItems:'center'}]}>
                       
                      
                      <Image style={[{height:45,width:80,marginTop:45}]} source={require('../assets/logo3.png')}/>
                      
                  </View>
                  
                  
          </View>
          <ImageBackground style={[{height:'100%',width:'100%'}]} source={require('../assets/background.jpg')}>
                 <ImageBackground style={[{height:300,width:300,marginLeft:20,opacity:0.8}]} source={require('../assets/chiefa.png')}>
                 <View style={styles.box1}>
                    <View style={styles.box2}>
                      
                      
                        <View style={[{alignItems:'center',opacity:1}]}>
                           <Text style={[{fontSize:30,opacity:1,}]}>Login</Text>
                        </View>
                      <View>
                         <Text style={styles.text}>Mobile No</Text>
                         <TextInput keyboardType='numeric' onChangeText={(e)=>{setmob(e)}} style={styles.inputtext} placeholder='Enter Mobile Number'/>
                         
                      </View>
                      <View style={[{marginTop:5}]}>
                         <Text style={styles.text}>Password</Text>
                         <TextInput style={styles.inputtext} onChangeText={(e)=>{setpas(e)}} secureTextEntry placeholder='Enter Password'></TextInput>
                         <TouchableOpacity><Text style={[{marginLeft:20}]}>Forgot Password ?</Text></TouchableOpacity>
                         
                      </View>

                      <View>
                        <TouchableOpacity onPress={logfun} style={styles.button}><Text>Login</Text></TouchableOpacity>
                        </View>  

                        <View>
                          <View style={styles.navi}>
                            <Text>Didn't have an account ?</Text>
                            <TouchableOpacity onPress={()=>{navigation.navigate('SignIn')}}><Text style={{color:"#FF0A0A"}}>SignIn</Text></TouchableOpacity>

                          </View>
                        </View>
                      

                    </View>
                    

                   </View>
                   

                 </ImageBackground>
                      
                  </ImageBackground>

           </View>

        </View>
      
      
    )
  }

  const styles = StyleSheet.create({
    container:{
        alignItems:'center',
        justifyContent:'center',
        backgroundColor:'#FFE8EB',
        
       
         
     },
     
     header:{
        
        height:90,
        width:'100%',
        backgroundColor:'#F54949',
        
        
     },
     box1:{
      
     },
     box2:{
      height:300,
      width:300,
      backgroundColor:"#FFFFFF",
      opacity:0.8,
      marginTop:250,
      marginLeft:8,
      borderRadius:10,
      
     },
     text:{
      fontSize:20,
      marginLeft:15,
      
     },
     inputtext:{
      height:40,
      width:260,
      marginLeft:20,
      backgroundColor:'#FFE8EB',
      borderBottomWidth:2,
      borderColor:'#FF285A',
      opacity:0.6
      
     },
     button:{
      height:40,
      width:90,
      backgroundColor:'#FF94AD',
      justifyContent:'center',
      alignItems:'center',
      borderRadius:10,
      borderWidth:2,
      borderColor:"#FFC0CF",
      marginLeft:100,
      marginTop:10
      
     },
     navi:{
      flexDirection:'row',
      gap:10,
      marginTop:10,
      marginLeft:80
     }
   
  })