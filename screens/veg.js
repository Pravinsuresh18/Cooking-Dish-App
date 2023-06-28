import { StyleSheet, Text, View ,ScrollView,TextInput,Image,ImageBackground,Dimensions, Touchable, TouchableOpacity,ActivityIndicator} from 'react-native'
import React, { useEffect ,useState} from 'react'
import { Modal } from 'react-native-paper';
    const screenHeight = Dimensions.get('window').height;
    const screenWidth = Dimensions.get('window').width;

export default function Veg  ({navigation,route})  {
    const[text,settext]=useState([])
    const[state,setstate]=useState([])
    const[cato,setcato]=useState([])
    const[state1,setstate1]=useState([])
    const[stateall,setstateall]=useState([])
    const[mod,setmod]=useState(false)
    const[mod3,setmod3]=useState(false)
    const[cart,setcart]=useState([])
    const[home,sethome]=useState(false)
    const[veg,setveg]=useState(true)
    const[nonveg,setnonveg]=useState(false)
    const[mob,setmob]=useState('')
    const[load,setload]=useState(true)

    useEffect(()=>{
        setmob(route.params.mobile)
        
        const requestOptions = {
            method: 'POST',
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({cato:'veg'}),
            redirect: 'follow'
          };
         fetch('http://192.168.1.17:6111/catodishdb', requestOptions)
          .then(response => response.json())
          .then((params) => {
          setstate(params)
          setstate1(params)
          setload(false)
        })
        
    },[])

    

    const ricefun=()=>{
       
        let ricecato =state1.filter((ele,ind)=>{
            if( ele.type=='Rice'){
                return ele
            }
          })
          setstate(ricecato)
    }
    const kolambufun=()=>{
       
        let ricecato =state1.filter((ele,ind)=>{
            if( ele.type=='kolambu'){
                return ele
            }
          })
          setstate(ricecato)
    }
    const poriyalfun=()=>{
       
        let ricecato =state1.filter((ele,ind)=>{
            if( ele.type=='Poriyal'){
                return ele
            }
          })
          setstate(ricecato)
    }
    const fryfun=()=>{
       
        let ricecato =state1.filter((ele,ind)=>{
            if( ele.type=='fry'){
                return ele
            }
          })
          setstate(ricecato)
    }
    const serchfun=()=>{
        let ricecato =state1.filter((ele,ind)=>{
            if( ele.type==text || ele.dish == text){
                return ele
            }
          })
          setstate(ricecato)
        
    }
    const cartfun=(element)=>{
        let arr = [{}] 
        arr.push(element)
        

    }

    const favfun=(dish1)=>{
        console.log(mob)
        console.log(dish1)
        const requestOptions = {
            method: 'POST',
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({mobile:mob,dish:dish1}),
            redirect: 'follow'
          };
    
          fetch('http://192.168.1.17:6111/likeadddb', requestOptions)
          .then(response => response.json())
          .then((params) => {
          })
          
           
    
      }







     

  return (

    


    <View style={styles.container}>
              
               <View style={styles.header}>
                       <View style={[{flexDirection:'row',gap:80}]}>
                         
                           <Image style={[{height:45,width:80,marginTop:5,marginLeft:140}]} source={require('../assets/logo3.png')}/>

                           <TouchableOpacity onPress={()=>{navigation.navigate('Userdish',{mobile:mob})}}><Image style={[{height:50,width:50,marginTop:2,marginLeft:5}]} source={require('../assets/like1.png')}/></TouchableOpacity>
                       </View>
               </View>
              
    
    <ScrollView>
        <View style={styles.search}>
            <TextInput placeholder='   Search for Dishes' onChangeText={(e)=>{settext(e)}} style={styles.textinp} ></TextInput>
            <TouchableOpacity onPress={serchfun}><Image style={[styles.search1,{width:45,height:45}]} source={require('../assets/search.png')}/></TouchableOpacity>
        </View>

        <View style={styles.iconbox}>
            <View  style={styles.iconrow}>
                <TouchableOpacity style={[styles.iconbut,styles.shadow1]} onPress={ricefun}><Image style={[{width:50,height:50,}]} source={require('../assets/veg/rice.png')}></Image><Text style={[{fontSize:13,marginLeft:15}]}>Rice</Text></TouchableOpacity>
                <TouchableOpacity style={[styles.iconbut,styles.shadow1]} onPress={kolambufun}><Image style={[{width:60,height:60}]} source={require('../assets/veg/kolambu.png')}></Image><Text style={[{fontSize:13,marginLeft:8,bottom:10}]}>Kulumbu</Text></TouchableOpacity>
                <TouchableOpacity style={[styles.iconbut,styles.shadow1]} onPress={poriyalfun}><Image style={[{width:50,height:50,marginLeft:5}]} source={require('../assets/veg/poriyal.png')}></Image><Text style={[{fontSize:13,marginLeft:12,bottom:1}]}>Poriyal</Text></TouchableOpacity>
                <TouchableOpacity style={[styles.iconbut,styles.shadow1]} onPress={fryfun}><Image style={[{width:60,height:60}]} source={require('../assets/veg/fry.png')}></Image><Text style={[{fontSize:13,marginLeft:20,bottom:10}]}>Fry</Text></TouchableOpacity>
                

            </View>

        </View>
        { state.map((element,index)=>{
           
                return(
                    < View key={index} style={styles.dishcard}>
            <TouchableOpacity onPress={()=>{setmod(!mod),setcato(element),favfun(element.dish)}} style={[styles.dishbox,styles.shadow1]} >
                <View>
                <ImageBackground style={styles.dishimg} source={{uri:element.image}}>
                    <View style={[{marginTop:5,alignItems:'flex-end',marginRight:5}]}>
                    <TouchableOpacity onPress={()=>{cartfun(element)} } ><Image style={[{height:30,width:30}]} source={require('../assets/like.png')}></Image></TouchableOpacity>
                    </View>
                
                    <View style={[{marginTop:120,alignItems:'flex-end'}]}>
                        <View style={[{height:35,width:140,backgroundColor:"#FFE9E9",justifyContent:'center',alignContent:'center',alignItems:'center',borderTopLeftRadius:10,opacity:0.8}]}>
                        <Text style={styles.time}>{element.time}</Text>
                        

                        </View>
                    </View>
                </ImageBackground>
                </View>
                
                <View style={styles.dishrow}>
                    <Text style={styles.cardname}>{element.dish}</Text>
                    <View style={[{alignItems:'flex-end',justifyContent:'flex-end',alignContent:'flex-end'}]}>
                    
                    </View>
                    
                    

                </View>
                

            </TouchableOpacity>

        </View>
                )
           })}  
     <View style={[{height:100}]}>

     </View>
          

    </ScrollView>

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
                    <TouchableOpacity onPress={()=>{}}>
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
                    <Text style={[{bottom:18,marginLeft:67,marginTop:8,color:'#FFFFFF'}]}>Non-Veg</Text>
                    </ImageBackground>}
                    </TouchableOpacity>
                </View>

            </View>
                    

            </View>
        
   <Modal visible={mod} >
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
   <Modal visible={false} transparent={false} style={{backgroundColor:'lightgray'}}>
                <View style={[{justifyContent:'center',alignItems:'center'}]}>
                <Image style={[{height:200,width:220}]} source={require('../assets/loadinggif.gif')}/>
                </View>

             </Modal>
 
  
        
  
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
     header:{
        
        height:50,
        width:'100%',
        backgroundColor:'#F54949',
        
        
     },
     img:{
         justifyContent:'center',
         alignContent:'center',
         alignItems:'center',
         height: 300,
         width: 330,
         
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
         backgroundColor:'#FFFFFF',
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
        gap:12
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
        alignItems:'flex-start',
        fontSize:19,
        marginLeft:10
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
     

   
})