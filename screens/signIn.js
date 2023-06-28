import { StyleSheet, Text, View,Dimensions,Image,StatusBar, Touchable, TouchableOpacity, ToastAndroid} from 'react-native'
import React, { useState } from 'react'
import { ImageBackground } from 'react-native'
import { TextInput } from 'react-native-paper'
import { useNavigation } from '@react-navigation/native'



export default function SignIn  () {
   const[name,setname]=useState('')
   const[mob,setmob]=useState('')
   const[pas,setpas]=useState('')   
   const[cpas,setcpas]=useState('')
   // const[cpas,setcpas]=useState()
    const navigation = useNavigation()

    const signfun=()=>{
      let verify = /^[a-zA-Z]*$/
      let verifyn = /^0|[1-9]\d*$/
      let count=0
      if(name.length >= 3 && verify.test(name)){
         count++
      }else{
         ToastAndroid.show('Username length should be greater than 3 and name must be alphabetes',ToastAndroid.LONG)
      }
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
      if(cpas == pas){
         count++
      }else{
         ToastAndroid.show('Password and Confirn password mismatch',ToastAndroid.LONG)
      }

        if(count == 4){


         const requestOptions = {
            method: 'POST',
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({username:name,mobile:mob,password:pas,cpassword:cpas}),
            redirect: 'follow'
          };
          fetch('http://192.168.1.17:6111/signdb', requestOptions)
          .then(response => response.json())
           .then(result => {
            if( result === "sucess"){
            favfun()
            
            
            }else{
             ToastAndroid.show(result,ToastAndroid.SHORT)
            }
         })
          .catch(error => console.log('error', error));
             count=0
         } 
    } 
    const favfun=()=>{
      const requestOptions = {
         method: 'POST',
         headers: {"Content-Type": "application/json"},
         body: JSON.stringify({username:name,mobile:mob}),
         redirect: 'follow'
       };
       fetch('http://192.168.1.17:6111/likedb', requestOptions)
       .then(response => response.json())
        .then(result => {
         if( result === "sucess"){
            favfun1()
            console.log(result)
            
            }else{
             ToastAndroid.show(result,ToastAndroid.SHORT)
            }
         
        })

      }
     
      const favfun1=()=>{
         const requestOptions = {
            method: 'POST',
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({username:name,mobile:mob}),
            redirect: 'follow'
          };
         fetch('http://192.168.1.17:6111/userdishcreatedb', requestOptions)
       .then(response => response.json())
        .then(result => {
         if( result === "sucess"){
            logintime()
            
            }else{
             ToastAndroid.show(result,ToastAndroid.SHORT)
            }
         
        })

      }  
      
      const logintime=()=>{

         const requestOptions = {
            method: 'POST',
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({username:name,mobile:mob}),
            redirect: 'follow'
          };
          fetch('http://192.168.1.17:6111/logintimedb', requestOptions)
          .then(response => response.json())
           .then(result => {
            if( result === "sucess"){
               navigation.navigate('Home',{mobile:mob})
               
               }else{
                ToastAndroid.show(result,ToastAndroid.SHORT)
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
            <View style={{alignItems:'center'}}>
                 <Image style={[{height:200,width:200,alignItems:'center',opacity:0.8}]} source={require('../assets/chiefa.png')}/>
                 </View>
                 <View style={styles.box1}>
                    <View style={styles.box2}>
                      
                      
                        <View style={[{alignItems:'center',opacity:1}]}>
                           <Text style={[{fontSize:30,opacity:1,}]}>SignIn</Text>
                        </View>
                      <View>
                         <Text style={styles.text}>Username</Text>
                         <TextInput onChangeText={(e)=>{setname(e)}} style={styles.inputtext} placeholder='Enter Username'/>
                         
                      </View>
                      <View>
                         <Text style={styles.text}>Mobile No</Text>
                         <TextInput onChangeText={(e)=>{setmob(e)}} style={styles.inputtext} placeholder='Enter Mobile Number'/>
                         
                      </View>
                      <View>
                         <Text style={styles.text}>Password</Text>
                         <TextInput onChangeText={(e)=>{setpas(e)}} style={styles.inputtext} placeholder='Enter Password'/>
                         
                      </View>
                      <View>
                      <Text style={styles.text}>Confirm Password</Text>
                      <TextInput  onChangeText={(e)=>{setcpas(e)}} style={styles.inputtext} placeholder='Enter Confirm Password'/>

                      </View>

                      <View>
                        <TouchableOpacity onPress={signfun} style={styles.button}><Text>SignIn</Text></TouchableOpacity>
                        </View>  

                        <View>
                          <View style={styles.navi}>
                            <Text>Already have an account ?</Text>
                            <TouchableOpacity onPress={()=>{navigation.navigate('Login')}}><Text style={{color:"#FF0A0A"}}>Login</Text></TouchableOpacity>

                          </View>
                        </View>
                      
                      

                    </View>

                   </View>
                  
                      <ImageBackground style={[{height:300,width:300,marginLeft:10,opacity:0.2,marginTop:200}]} >
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
     
     box2:{
      height:410,
      width:300,
      backgroundColor:"#FFFFFF",
      opacity:0.8,
      borderRadius:10,
      
     },
     box1:{
        justifyContent:'center',
        alignItems:'center',
        bottom:30
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