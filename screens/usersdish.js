import { StyleSheet, Text, View ,ScrollView,TextInput,Image,ImageBackground,Dimensions, Touchable, TouchableOpacity,ActivityIndicator} from 'react-native'
import React, { useEffect ,useState} from 'react'
import { Modal } from 'react-native-paper';
    const screenHeight = Dimensions.get('window').height;
    const screenWidth = Dimensions.get('window').width;

export default function Userdish  ({navigation,route})  {
const[state,setstate]=useState([])

const[mod,setmod]=useState(false)
const[cato,setcato]=useState([])

    const[home,sethome]=useState(false)
    const[veg,setveg]=useState(false)
    const[nonveg,setnonveg]=useState(false)
    const[load,setload]=useState(true)

    const[mob,setmob]=useState('')
    const[name,setname]=useState('')

    useEffect(()=>{
        
        setmob(route.params.mobile)
        console.log(mob)
        if(mob !=' '){
            dishfun()
        }
        
       

    },[mob])
    const dishfun=async()=>{
        const requestOptions = {
            method: 'POST',
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({mobile:route.params.mobile}),
            redirect: 'follow'
          };
        
         await fetch('http://192.168.1.17:6111/getusersdishdb', requestOptions)
          .then(response => response.json())
          .then((params) => {
            setname(params[0].username)
        
             
            setstate(params[0].dish)
            setload(false)
          
          
          
        })
    }
 return (
    <View style={styles.container}>
        <View style={styles.header}>
                       <View style={[{flexDirection:'row',gap:80}]}>
                         
                           
                           <Image style={[{height:45,width:80,marginTop:5,marginLeft:140}]} source={require('../assets/logo3.png')}/>
                           <TouchableOpacity><Image style={[{height:50,width:50,marginTop:2,marginLeft:5}]} source={require('../assets/like1.png')}/></TouchableOpacity>
                       </View>
          </View>
          <View style={styles.userhead}>
            <Text style={[{fontSize:25}]}> {name} Own Dishes </Text>

          </View>
    
    <ScrollView>
        
        { state.map((element,index)=>{
           
                return(
                    < View key={index}  style={styles.dishcard}>
            <TouchableOpacity style={[styles.dishbox,styles.shadow1]}onPress={()=>{setmod(!mod),setcato(element)}}>
                <View>
                <ImageBackground style={styles.dishimg} source={{uri:element.dishimage}}>
                    <View style={[{marginTop:155,alignItems:'flex-end'}]}>
                        <View style={[{height:35,width:140,backgroundColor:"#FFE9E9",justifyContent:'center',alignContent:'center',alignItems:'center',borderTopLeftRadius:10}]}>
                        <Text style={styles.time}>{element.dishtime}</Text>

                        </View>
                    </View>
                </ImageBackground>
                </View>
                
                <View style={styles.dishrow}>
                    <Text style={styles.cardname}>{element.dishname}</Text>
                    

                </View>
                

            </TouchableOpacity>

        </View>
                )
           
                
          
          })}  

          

    </ScrollView>
        
   <Modal visible={mod}>
    <View style={styles.modbox}>
        <View >
            <ImageBackground style={styles.imgback} source={{uri:cato.dishimage}}>
                <TouchableOpacity onPress={()=>{setmod(!mod)}}><Image style={[{height:40,width:40,marginLeft:250,marginTop:5}]} source={require('../assets/close.png')}/></TouchableOpacity>
              <Image style={styles.imgcir} source={{uri:cato.dishimage}}/>

            </ImageBackground>
            <View style={styles.modhed}>
                <Text style={[{fontSize:30,}]}>{cato.dishname}</Text>
            </View>
            <ScrollView style={[{height:280}]}>
                 <View style={styles.modtime}>
                     <Text style={styles.modtexhed}>Cooking Time </Text>
                     
                 </View>
                 <Text style={styles.modtext}>{cato.dishtime}</Text>
                 <View style={styles.moddes}>
                     <Text style={styles.modtexhed}>How to make {cato.dish}</Text>
                     
                 </View>
                 <Text style={styles.modtext}>{cato.dishdiscription}</Text>

            </ScrollView>
            
            
            

        </View>

    </View>

   </Modal>
   <Modal visible={load}>
                <View>
                <ActivityIndicator   size="large" color="#FFE8EB" /> 
                </View>

             </Modal>

   <View style={[{height:85,width:'100%',position:'absolute',bottom:0,backgroundColor:'#F54949'}]}>
            <View style={[{flexDirection:'row'}]}>
                <View>
                   <TouchableOpacity onPress={()=>{navigation.navigate('Home',{mobile:mob})}}>
                        { home ?  <ImageBackground  >
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
                        <ImageBackground><Image style={[{height:50,width:50,marginLeft:70,marginTop:4,backgroundColor:'#FFFFFF',opacity:0.4,borderRadius:10}]} source={require('../assets/veg.png')}></Image>
                        <Text style={[{bottom:18,marginLeft:80,marginTop:8,color:'#FFFFFF'}]}>Veg</Text>
                    </ImageBackground>:
                    <ImageBackground><Image style={[{height:50,width:50,marginLeft:70,marginTop:4}]} source={require('../assets/veg.png')}></Image>
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
                    <Text style={[{bottom:18,marginLeft:62,marginTop:8,color:'#FFFFFF'}]}>Non-Veg</Text>
                    </ImageBackground>}
                    </TouchableOpacity>
                </View>

            </View>
                    

            </View>
 
  
        
  
</View>

  )
}

 

const styles = StyleSheet.create({
    container:{
        alignItems:'center',
        justifyContent:'center',
        backgroundColor:'#FFE8EB',
        height:'100%',
        top:20
       
         
     },
     img:{
         justifyContent:'center',
         alignContent:'center',
         alignItems:'center',
         height: 300,
         width: 330,
         
     },
     header:{
        
        height:50,
        width:'100%',
        backgroundColor:'#F54949',
        
        
     },
     search:{
         flexDirection:'row',
         gap:10,
     },
     search1:{
         marginTop:20
     },
     textinp:{
         height:40,
         width:240,
         backgroundColor:'#FFFCFF',
         borderRadius:10,
         borderWidth:2,
         borderColor:'#5B565A',    
         marginLeft:30,
         marginTop:20,
         marginBottom:20,
         
 
     },
     iconbox:{
        justifyContent:'center',
         alignContent:'center',
         alignItems:'center',
        height:100,
        width:300,
        backgroundColor:'#FFFFFF',
        borderRadius:10,
        margin:20,

     },
     iconrow:{
        flexDirection:'row',
        gap:25
     },
     iconbut:{
        height:50,
        width:60,
        backgroundColor:'#F6F6F6',
        borderWidth:1,
        borderColor:'#FFABB6',
        borderRadius:5,
     },
     dishcard:{
        height:260,
        width:330,
        backgroundColor:'#FFFFFF',
        margin:10,
        borderRadius:10,
     },
     dishbox:{
        height:230,
        width:302,
        backgroundColor:'#F6F6F6',
        borderWidth:1,
        borderColor:'#DEDEDE',
        margin:15,
        borderRadius:10,

     },
     dishimg:{
        height:190,
        width:300,
        borderTopLeftRadius:10,
        borderTopRightRadius:10,
     },
     dishrow:{
        flexDirection:'row',
        margin:5
        
     },
     cardname:{
        fontSize:19,
     },
     time:{
        fontSize:15,
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
      userhead:{
        justifyContent:"center",
        alignItems:'center',
        margin:20
      }
     

   
})