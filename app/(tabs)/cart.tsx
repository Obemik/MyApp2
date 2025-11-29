import React,{useState} from "react";
import {View, StyleSheet, Image, Text, FlatList, TouchableOpacity} from  "react-native"
import { colors } from "../components/Color";
import { Ionicons } from "@expo/vector-icons";
import {useOrderStore} from "../store/index"
import { SafeAreaView } from "react-native-safe-area-context";



const BasketScreen =()=>{
const orders= useOrderStore((state)=> state.orders)
const clearOrders= useOrderStore((state)=> state.clearOrders)
const removeOrder=useOrderStore((state)=> state.removeOrder)
const confirmOrder=useOrderStore((state)=> state.confirmOrder)
const increaseQuantity=useOrderStore((state)=> state.increaseQuantity)
const decreaseQuantity=useOrderStore((state)=> state.decreaseQuantity)
const totalItems=useOrderStore((state)=> state.totalItems)
const getPriceForSize=useOrderStore((state)=> state.getPriceForSize)
const[confirmationMessage, setConfirmationMessage]= useState("")
// const totals= useOrderStore((state)=> state.calculateTotal())


const renderItem=({item})=>(
  <View style={styles.item}>
    <View >
      <Image source={item.image} style={styles.image}/>
    </View>
    <View style={styles.wrapRight}>
      <View  style={styles.wrapTitle}>
        <TouchableOpacity>
          <Ionicons name="close-circle" size={20} color={colors.title}/>
        </TouchableOpacity>
      </View>
      <View style={styles.priceContainer}>
        <View style={styles.priceText}>
          <Text style={styles.titlePrice}>Price:</Text>
          <Text style={styles.price}>{getPriceForSize(item).pricePizza}</Text>

        </View>

      </View>
      <View style={styles.quantityContainer}>
         <TouchableOpacity onPress={()=> increaseQuantity(item)}>
          <Text style={styles.quantityButton}>+</Text>
        </TouchableOpacity>
        <Text style={styles.quantity}>{item.quantity}</Text>
          <TouchableOpacity onPress={()=> decreaseQuantity(item)}>
          <Text style={styles.quantityButton}>-</Text>
        </TouchableOpacity>
      </View>
    </View>

  </View>
)

return(
  <SafeAreaView style={styles.container}>
    <View style={styles.titleContainer}>
      <Text style={styles.titleClear}>Clear</Text>
      <Text  style={styles.titleOrders}>{`In yor basket:${totalItems} items`}</Text>
    </View>
    <FlatList
    data={orders}
    renderItem={renderItem}
    keyExtractor={(item)=> `${item.id}-${item.selectedSize}`}
    />
    <View style={styles.cartIconContainer}>
      {orders.length===0 &&(
        <Image style={styles.iconCart} source={require("../../assets/images/homeScreen/icon-basket.png")}/>
      )}
    </View>
    

  </SafeAreaView>
)
}
const styles= StyleSheet.create({
  container:{
    flex:1,
    backgroundColor:colors.mainBackground

  },
  titleContainer:{
    marginHorizontal:30,
    marginTop:10
  },
  titleClear:{
    fontSize:18,
    marginLeft:"auto",
    color:colors.green

  },
  titleOrders:{
   fontSize:18,
   fontWeight:"bold",
   color:colors.textColor
  },

item:{
  backgroundColor:colors.itemBackground,
  margin:10,
  padding:5,
  gap:20,
  minHeight:100,
  flexDirection:"row",
  justifyContent: "space-between",
  borderRadius:10,
  borderWidth: 2,
  borderColor:colors.shadowColor
},
image:{
  width:120,
  height:120,
  resizeMode:"stretch"
},
wrapRight:{
  gap:10,
  flex:1
},
wrapTitle:{
  flexDirection:"row",
  alignItems:"flex-end"
},
priceContainer:{
  flexDirection:"row",
  justifyContent:'space-between'
},
priceText:{
  flexDirection:"column",
},
titlePrice:{
  fontSize:14,
  fontWeight:"bold",
  textDecorationLine: "underline",
  color:colors.textColor
},
 price:{
   fontSize:20,
   color:colors.green
 },
 quantityContainer:{
  flexDirection: "row",
  marginTop:20,
  borderWidth:1,
  borderRadius:10,
  borderColor:colors.green
 },
 quantityButton:{
  marginHorizontal:20,
  fontSize:16,
  fontWeight:"bold",
  color:colors.green
 },
 quantity:{
  color:colors.white
 },
 cartIconContainer:{
  flex:70,
  justifyContent:"center",
  alignItems:"center",

 },
 iconCart:{
  width:91,
  height:91
 }

})
export default BasketScreen