import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { Ionicons } from '@expo/vector-icons'
import { useNavigation } from '@react-navigation/native'

const ViewFullImage = ({route}) => {
    const navigation = useNavigation()
const imageUri = route.params 
console.log("IM AGE LINK",imageUri)
  return (
    <View style={styles.mainContainer} >
        <TouchableOpacity onPress={() => navigation.goBack()} style={{marginTop:50,padding:8}}>
              <Ionicons name="arrow-back-outline" size={30} color="black" />
            </TouchableOpacity>
            <View style={{height:"90%", width:"100%"}}>

      {imageUri?.uri ? <Image source={{uri:imageUri?.uri}} style={{objectFit:"contain", height:"100%", width:"100%"}} /> : <Text style={{color:"white"}}> Please choose an image to show </Text>}
            </View>
    </View>
  )
}

export default ViewFullImage

const styles = StyleSheet.create({
    mainContainer:{
        // flex:1,
        // alignItems:"center",
        // justifyContent:"center",
        height: '100%',
        width: '100%',
        // backgroundColor:"black"
    }
})
