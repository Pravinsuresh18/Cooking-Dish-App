import { StyleSheet, Text, View ,ScrollView,TextInput,Image, ImageBackground, TouchableOpacity, SafeAreaView,ActivityIndicator} from 'react-native'
import React, { useEffect ,useState} from 'react'
import { SliderBox } from 'react-native-image-slider-box'
import { Modal } from 'react-native-paper'
import { StatusBar } from 'expo-status-bar'

export default function Home ({navigation,route})  {
    const[statecha,setstatecha]=useState([])
    const[stateker,setstateker]=useState([])
    const[statechi,setstatechi]=useState([])
    const[statelike,setstatelike]=useState([])
    const[stateall,setstateall]=useState([])
    const[cato,setcato]=useState([])
    const[time,settime]=useState([])

    const[load,setload]=useState(true)
    const[timemod,settimemod]=useState(false)

    const[mod,setmod]=useState(false)
    const[mod1,setmod1]=useState(false)
    const[mod2,setmod2]=useState(false)

    const[home,sethome]=useState(true)
    const[veg,setveg]=useState(false)
    const[nonveg,setnonveg]=useState(false)

    const[mob,setmob]=useState('')
    const[name,setname]=useState('')

    const[dname,setdname]=useState('')
    const[dtime,setdtime]=useState('')
    const[ddisc,setddisc]=useState('')
    const[dimage,setdimage]=useState('')
    


const samp=async()=>{
    
    const requestOptions = {
        method: 'POST',
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({mobile:mob}),
        redirect: 'follow'
      };
    await fetch('http://192.168.1.29:6111/dishdb', requestOptions)
      .then(response => response.json())
      .then((params) => {
        awaitfun(params)
        setstateall(params)

        
        let cha=params.filter((ele,ind)=>{
            if(ele.Cusine=='Chatinadu'){
                return ele
                
            }
        })
        setstatecha(cha)
        let ker=params.filter((ele,ind)=>{
            if(ele.Cusine=='Kerala'){
                return ele
                
            }
        })
        setstateker(ker)
        let chi=params.filter((ele,ind)=>{
            if(ele.Cusine=='Chinese'){
                return ele
            }
        })
        setstatechi(chi)

        
        
    })

    
}



    const awaitfun=async(result)=>{
        const requestOptions = {
            method: 'POST',
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({mobile:route.params.mobile}),
            redirect: 'follow'
          };
        await fetch('http://192.168.1.17:6111/likedetailsdb', requestOptions)
        .then(response => response.json())
        .then((params) => {
          setname(params[0].username)
          if(params[0].dish == ''){
             setstatelike(result)
             setload(false)
          }else{
            
              let like=[];
              result?.forEach((ele,ind)=>{
                  
                  params[0]?.dish.forEach(element => {
                    if(ele.dish === element.dish){
                          like?.push(ele)
                          
                      }
                    
                  })
                  
              })
              setstatelike(like)
              
              
                setload(false)
                         
              
              
          }
      })
    }

    const images=[
        require('../assets/slide/image1.jpg'),
        require('../assets/slide/image2.jpg'),
        require('../assets/slide/image3.jpg'),
        require('../assets/slide/image4.jpg'),
        require('../assets/slide/image5.jpg'),
        require('../assets/slide/image6.jpg'),
  ]

  const favfun=async(dish1)=>{
    const requestOptions = {
        method: 'POST',
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({mobile:mob,dish:dish1}),
        redirect: 'follow'
      };

      await fetch('http://192.168.1.17:6111/likeadddb', requestOptions)
      .then(response => response.json())
      .then((params) => {
      })
      await fetch('http://192.168.1.17:6111/likedetailsdb', requestOptions)
          .then(response => response.json())
          .then((params) => {
                let like=[];
                   stateall.forEach((ele,ind)=>{
                    params[0].dish.forEach(element => {
                        
                          
                        if(ele.dish === element.dish){
                            like.push(ele)
                        }
                    })
                })
                setstatelike(like)
            
        })
    }

    const usersdish=()=>{
        
        const requestOptions = {
            method: 'POST',
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({mobile:mob,Dname:dname,Dtime:dtime,Ddisc:ddisc,Dimage:dimage}),
            redirect: 'follow'
          };
          fetch('http://192.168.1.17:6111/usersdishadd', requestOptions)
          .then(response => response.json())
          .then((params) => {
            setddisc('')
            setdimage('')
            setdname('')
            setdtime('')
          })

    }
    const setlogintime=async()=>{
        settimemod(!timemod)
        const requestOptions = {
            method: 'POST',
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({mobile:route.params.mobile}),
            redirect: 'follow'
          };
          await fetch('http://192.168.1.17:6111/getlogintimedb', requestOptions)
          .then(response => response.json())
          .then((params) => {
            settime(params)
            console.log(time)
           
        })

    }


    useEffect(()=>{
        setmob(route.params.mobile)   
        samp()
        
          
    },[])

    const setlogout=async()=>{
        const requestOptions = {
            method: 'POST',
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({mobile:route.params.mobile}),
            redirect: 'follow'
          };
          await fetch('http://192.168.1.17:6111/setlogouttime', requestOptions)
          .then(response => response.json())
          .then((params) => {
            settime(params)
            console.log(time)
           
        })

    }

    
   

    
  return (
    <View>
        

    
    <StatusBar backgroundColor="#F54949" />
    
    
    <View style={styles.container}>
          <View style={styles.header}>
                  <View style={[{flexDirection:'row',gap:80}]}>
                    <TouchableOpacity onPress={()=>{setmod1(!mod1)}}><Image style={[{height:35,width:40 ,margin:8}]} source={require('../assets/mess1.png')}/></TouchableOpacity>
                      
                      <Image style={[{height:45,width:80,marginTop:5}]} source={require('../assets/logo3.png')}/>
                      <TouchableOpacity onPress={()=>{navigation.navigate('Userdish',{mobile:mob})}}><Image style={[{height:50,width:50,marginTop:2,marginLeft:5}]} source={require('../assets/like1.png')}/></TouchableOpacity>
                  </View>
                  
          </View>
          
       
        
        <ScrollView>
        <SliderBox images={images} dotColor="#FFFFFF"  inactiveDotColor="#90A4AE" imageLoadingColour="Grey"  circleLoop={true}/>
            <View style={styles.title}>
              <Image style={[{width:240,height:180}]} source={require('../assets/chieflogo.png')}/>

            </View>
            <View style={styles.cardbox}>
            <View style={styles.cardhead}>
                   <Text style={styles.texthead}>{name} favourate Dishes</Text>
                </View>
                
                 <ScrollView horizontal={true}>

                 { statelike.map((element,index)=>{
           
                     return(
                        <TouchableOpacity key={index} onPress={()=>{setmod(!mod),setcato(element),favfun(element.dish)}} style={[styles.singlecard,styles.shadow1]}>
                            <Image style={styles.card} source={{uri:element.image}}/>
                            <Text style={styles.cardtext}>{element.dish}</Text>
                        </TouchableOpacity>

                    )
                })}  

                       
                  </ScrollView>

            </View>
                
            <View style={styles.cardbox}>
            <View style={styles.cardhead}>
                   <Text style={styles.texthead}>Kerala Dishes</Text>
                </View>
                
                 <ScrollView horizontal={true}>

                 { stateker.map((element,index)=>{
           
                     return(
                        <TouchableOpacity key={index}  onPress={()=>{setmod(!mod),setcato(element),favfun(element.dish)}} style={[styles.singlecard,styles.shadow1]}>
                            <Image style={styles.card} source={{uri:element.image}}/>
                            <Text style={styles.cardtext}>{element.dish}</Text>
                        </TouchableOpacity>

                    )
                })}  

                       
                  </ScrollView>

            </View>

            <View style={styles.cardbox}>
            <View style={styles.cardhead}>
                   <Text style={styles.texthead}>Traditional Tamilnadu Dishes</Text>
                </View>
                 <ScrollView horizontal={true}>
                 { statecha.map((element,index)=>{
                          
                          return(
                             <TouchableOpacity key={index}  onPress={()=>{setmod(!mod),setcato(element),favfun(element.dish)}} style={[styles.singlecard,styles.shadow1]}>
                                 <Image style={styles.card} source={{uri:element.image}}/>
                                 <Text style={styles.cardtext}>{element.dish}</Text>
                             </TouchableOpacity>
               
                         )
                     })}  
                  </ScrollView>

            </View>
            <View style={styles.cardbox}>
            <View style={styles.cardhead}>
                   <Text style={styles.texthead}>Chines Dishes</Text>
                </View>
                 <ScrollView horizontal={true}>
                 { statechi.map((element,index)=>{
           
                         return(
                            <TouchableOpacity key={index}  onPress={()=>{setmod(!mod),setcato(element),favfun(element.dish)}} style={[styles.singlecard,styles.shadow1]}>
                                <Image style={styles.card} source={{uri:element.image}}/>
                                <Text style={styles.cardtext}>{element.dish}</Text>
                            </TouchableOpacity>
              
                        )
                    })}  
                  </ScrollView>

            </View>
           

            <View style={styles.about}>
               
                    <Image style={styles.footerimg} source={require('../assets/icon.png')}/>
                    <Text style={[{fontSize:15,bottom:35}]}> © Designed and Developed By PRAVIN </Text>
            </View>
            <View style={[{height:40}]}>

            </View>
      </ScrollView>
        <View style={[{height:138,width:'100%',position:'absolute',bottom:0,backgroundColor:'#F54949'}]}>
            <View style={[{flexDirection:'row'}]}>
                <View>
                   <TouchableOpacity onPress={()=>{}}>
                        { home?<ImageBackground  >
                            <Image style={[{height:50,width:50,marginLeft:40,marginTop:1,backgroundColor:'#FFFFFF',opacity:0.4,borderRadius:10}]} source={require('../assets/home.png')}></Image>
                           <Text style={[{bottom:18,marginLeft:47,marginTop:10,color:'#FFFFFF'}]}>Home</Text>
                            </ImageBackground> :
                       <ImageBackground>
                            <Image style={[{height:50,width:50,marginLeft:40,marginTop:1}]} source={require('../assets/home.png')}></Image>
                           <Text style={[{bottom:18,marginLeft:47,marginTop:10,color:'#FFFFFF'}]}>Home</Text>
                           </ImageBackground>
                        }
                        </TouchableOpacity>
                    
                </View>
                <View>
                    <TouchableOpacity onPress={()=>{navigation.navigate('Veg',{mobile:mob})}}>
                        {veg?
                        <ImageBackground><Image style={[{height:50,width:50,marginLeft:70,marginTop:2,backgroundColor:'#FFFFFF',opacity:0.4,borderRadius:10}]} source={require('../assets/veg.png')}></Image>
                        <Text style={[{bottom:18,marginLeft:80,marginTop:8,color:'#FFFFFF'}]}>Veg</Text>
                    </ImageBackground>:
                    <ImageBackground><Image style={[{height:50,width:50,marginLeft:70,marginTop:2}]} source={require('../assets/veg.png')}></Image>
                    <Text style={[{bottom:18,marginLeft:80,marginTop:8,color:'#FFFFFF'}]}>Veg</Text>
                    </ImageBackground>}

                    
                    </TouchableOpacity>
                </View>
                <View>
                    <TouchableOpacity  onPress={()=>{navigation.navigate('NonVeg',{mobile:mob})}}>{nonveg?
                        <ImageBackground><Image style={[{height:50,width:50,marginLeft:65,marginTop:1,backgroundColor:'#FFFFFF',opacity:0.4,borderRadius:10}]} source={require('../assets/nonveg.png')}></Image>
                    <Text style={[{bottom:18,marginLeft:67,marginTop:8,color:'#FFFFFF'}]}>Non-Veg</Text>
                    </ImageBackground>:
                    <ImageBackground><Image style={[{height:50,width:50,marginLeft:65,marginTop:1}]} source={require('../assets/nonveg.png')}></Image>
                    <Text style={[{bottom:18,marginLeft:67,marginTop:8,color:'#FFFFFF'}]}>Non-Veg</Text>
                    </ImageBackground>}
                    </TouchableOpacity>
                </View>

            </View>
                    

            </View>

          <Modal visible={mod}>
                  <View style={styles.modbox}>
                     <View >
                        <ImageBackground style={styles.imgback} source={{uri:cato.image}}>
                            <TouchableOpacity onPress={()=>{setmod(!mod)}}><Image style={[{height:40,width:40,marginLeft:250,marginTop:5}]} source={require('../assets/close.png')}/></TouchableOpacity>
                          <Image style={styles.imgcir} source={{uri:cato.image}}/>
            
                        </ImageBackground>
                        <View style={styles.modhed}>
                            <Text style={[{fontSize:30,}]}>{cato.dish}</Text>
                        </View>
                        <ScrollView style={[{height:280}]}>
                             <View style={styles.modtime}>
                                 <Text style={styles.modtexhed}>Cooking Time </Text>
                                 
                             </View>
                             <Text style={styles.modtext}>{cato.time} </Text>
                             <View style={styles.moddes}>
                                 <Text style={styles.modtexhed}>How to make {cato.dish}</Text>
                                 
                             </View>
                             <Text style={styles.modtext}>{cato.description} </Text>
                             <View style={[{height:60}]}>
            
                             </View>
            
                       </ScrollView>
                       </View>
      
                   </View>
      
                  </Modal>

                  <Modal visible={mod1}>
                    <View style={styles.hedmod}>
                        <View style={{justifyContent:'center',alignItems:"center"}}>
                            <TouchableOpacity style={styles.button} onPress={()=>{setmod1(!mod1)}}><Text>Back</Text></TouchableOpacity>
                            <TouchableOpacity style={styles.button} onPress={()=>{setmod2(!mod2),setmod1(!mod1)}}><Text>Add Dish</Text></TouchableOpacity>
                            <TouchableOpacity style={styles.button} onPress={()=>{navigation.navigate('Login')}}><Text>Logout</Text></TouchableOpacity>
                            <TouchableOpacity style={styles.button} onPress={()=>{setlogintime()}}><Text>Login time details  ▼</Text></TouchableOpacity>
                            </View>
                        </View>
                            <Modal visible={timemod}>
                              <View style={{backgroundColor:'#ffffff',width:150,heigth:160,marginTop:15}}>
                               
                               <TouchableOpacity style={[styles.button]} onPress={()=>{settimemod(!timemod)}}><Text>Hide details   ▲</Text></TouchableOpacity>
                               <ScrollView >
                                {time.map((element,ind)=>{
                                   
                                    return(
                                        <View key={ind}>
                                            <View style={[{flexDirection:"row"}]}>
                                                <Text style={[{marginLeft:4}]}>Login Time :</Text>
                                               <Text>{element.logintime}</Text>
                                            </View>
                                            
                                        </View>

                                    )

                                })}


   
   
                               </ScrollView>
                               </View>
                            </Modal>
                            
                            


                   

                  </Modal>

                  <Modal visible={mod2}>
                  <View style={styles.box1}>
                    <View style={styles.box2}>
                        <View style={[{}]}>
                        <TouchableOpacity onPress={()=>{setmod2(!mod2)}}><Image style={[{height:25,width:25,marginLeft:260,marginTop:9}]} source={require('../assets/deletepink.png')}/></TouchableOpacity>

                        </View>
                      
                      
                        <View style={[{alignItems:'center',opacity:1}]}>
                           <Text style={[{fontSize:30,opacity:1,}]}>Add Dish</Text>
                        </View>
                      <View>
                         <Text style={styles.text}>Dish Name</Text>
                         <TextInput  style={styles.inputtext} onChangeText={(e)=>{setdname(e)}} placeholder='Enter Dish Name'/>
                      </View>
                      <View>
                         <Text style={styles.text}>Cooking Time</Text>
                         <TextInput  style={styles.inputtext} onChangeText={(e)=>{setdtime(e)}} placeholder='Enter Cooking Time'/>
                      </View>
                      <View>
                         <Text style={styles.text}>Description</Text>
                         <TextInput  style={styles.inputtext} onChangeText={(e)=>{setddisc(e)}} placeholder='Enter Cooking Description'/>
                      </View>
                      <View style={[{marginTop:5}]}>
                         <Text style={styles.text}>Dish Image</Text>
                         <TextInput style={styles.inputtext} onChangeText={(e)=>{setdimage(e)}}  placeholder='Enter Dish Image as googole link'></TextInput>
                      </View>

                      <View>
                        <TouchableOpacity  style={styles.buttonmod2} onPress={()=>{setmod2(!mod2),usersdish()}} ><Text>Add</Text></TouchableOpacity>
                        </View>  
                   </View>
                  </View>
             </Modal>

             <Modal visible={load} > 
                <View style={[{justifyContent:'center',alignItems:'center'}]}>
                <Image style={[{height:200,width:220}]} source={require('../assets/loadinggif.gif')}/>
                </View>

             </Modal>

                  

                  


                 
        
       
      
      
    </View>
    
    </View>
    
  )
}

 

const styles = StyleSheet.create({
    container:{
        alignItems:'center',
        justifyContent:'center',
        backgroundColor:'#FFE8EB',
        top:23
       
         
     },
     title:{
       justifyContent:'center',
       alignItems:'center',
       marginTop:10
     },
     header:{
        
        height:50,
        width:'100%',
        backgroundColor:'#F54949',
        
        
     },
    
     img:{
         justifyContent:'center',
         alignContent:'center',
         alignItems:'center',
         height:400,
         width:200
     }, 
     card:{
        
        height:200,
        width:200,
        borderTopLeftRadius:15,
        borderTopRightRadius:15
     },
     texthead:{
        fontSize:20


     },
     cardbox:{
        margin:7,
        height:320,
        width:345,
        backgroundColor:'#FFFFFF',
        borderRadius:10
     },
     cardhead:{
        margin:10


     },
     singlecard:{
        margin:10,
        height:240,
        width:202 ,
       
        borderRadius:15,
        backgroundColor:'#F6F6F6',
        borderWidth:1,
        borderColor:'#FFABB6'

        
     },
     cardtext:{
        fontSize:18,
        color:'#5A5A5A',
        textAlign:'center',
        marginTop:5
     },
 
     about:{
        height:270,
        width:'100%',
        backgroundColor:"#B7B7B7",
        borderTopLeftRadius:10,
        borderTopRightRadius:10,
        marginTop:20,
        alignItems:'center',
        justifyContent:'center',
        flexDirection:'column',
        marginBottom:40
     },
     modbox:{
        
        margin:18,
        height:600,
        width:320,
        backgroundColor:'#FFFFFF',
        borderRadius:10,
        borderWidth:1,
        borderColor:'#E1DEDF'
     },
    
     
     imgback:{
        height:220,
        width:300,
        margin:9,

     },
     imgcir:{
        height:100,
        width:100,
        borderRadius:10,
        borderWidth:2,
        borderColor:'#FFFFFF',
        marginTop:120,
        marginLeft:100
     },
     modhed:{
        justifyContent:'space-between',
        alignContent:'space-between',
        alignItems:'center',
        marginTop:30
     },
     modtime:{
        height:30,
        width:'100%',
        backgroundColor:'#FFE8EB',
        marginTop:10,
        
        
     },
     modtexhed:{
        fontSize:20,
        marginLeft:20,
    
     },
     modtext:{
        fontSize:15,
        marginLeft:20,
        marginTop:10,
        marginRight:10
        
        
     },
     moddes:{
        height:30,
        width:'100%',
        backgroundColor:'#FFE8EB',
        marginTop:10,
     },
     shadow1: {
        shadowColor: '#FF3D57',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 1,
        shadowRadius: 4,  
        elevation: 10
      },
      footerimg:{
        height:150,
        width:150,
       
        
      },
      hedmod:{
        height:'100%',
        width:150,
        backgroundColor:'#FFFFFF',
        
      },
      maincard:{
        height:140,
        width:348,
        backgroundColor:'#FFFFFF',
        marginLeft:6,
        marginRight:6,
        borderRadius:10,
      },
      button:{
        height:40,
        width:'100%',
        backgroundColor:'#FF94AD',
        justifyContent:'center',
        alignItems:'center',
        
        borderWidth:2,
        borderColor:"#FFC0CF",
        
        marginTop:10
        
       },
       box1:{
        justifyContent:'center',
        alignItems:'center'
      
       },
       box2:{
        height:470,
        width:300,
        backgroundColor:"#FFFFFF",
        borderRadius:10,
        marginBottom:50
        
       },
       text:{
        fontSize:20,
        marginLeft:15,
        marginTop:10
        
       },
       inputtext:{
        height:40,
        width:260,
        marginLeft:20,
        backgroundColor:'#FFE8EB',
        textAlign:'center',
        borderBottomWidth:2,
        borderColor:'#FF285A',
        opacity:0.6
        
       },
       buttonmod2:{
        height:40,
        width:120,
        backgroundColor:'#FF94AD',
        justifyContent:'center',
        alignItems:'center',
        borderRadius:10,
        borderWidth:2,
        borderColor:"#FFC0CF",
        marginLeft:90,
        marginTop:20
        
       },
     
    
})