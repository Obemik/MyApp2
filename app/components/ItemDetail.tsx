import React, {useState, useEffect} from "react";
import {View, StyleSheet, Image, Text, ScrollView, TouchableOpacity, FlatList} from  "react-native"
import { colors } from "./Color";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { mockVegetables, mockMeats, mockCheese, mockFish } from "./MockData";

const IconDetailsScreen =({route})=>{
  const {item, togglePizzaSize}= route.params;
  const [selectedCategory, setSelectedCategory]= useState(null)
  const [selectedTopping, setSelectedTopping]= useState([])
  const [totalPrice, setTotalPrice]= useState()
  const onPressCategory=(category)=>{
    setSelectedCategory(category)
  }
//   const renderProductList=(data, key)=>{
//     return(

//     )
    const renderItem=()=>{
        return(
            <View style={styles.item}>
                <View >
                  <Image source={item.image} style={styles.image}/>
                </View>
                <View style={styles.textContainer}>
                    <View style={styles.wrapTitle}>
                        <Text style={styles.title}>{item.title}</Text>
                        <TouchableOpacity>
                            <Ionicons
                                name={'heart-outline'}
                                size={20}
                                color={colors.title}
                            />
                        </TouchableOpacity>
                    </View>
                    <Text style={styles.description}>{item.description}</Text>
                    <View style={styles.switchContainer}>
                        <TouchableOpacity
                                        style={[
                                          styles.sizeButton,
                                          item.selectedSize === 32 && styles.sizeButtonActive,
                                        ]}
                                        onPress={() => togglePizzaSize(item)}
                                      >
                                        <Image
                                          source={require("../../assets/images/icon-diameter.png")}
                                          style={styles.sizeIcon}
                                        />
                                        <Text
                                          style={[
                                            styles.sizeText,
                                            item.selectedSize === 32 && styles.sizeTextActive,
                                          ]}
                                        >
                                          32 cm
                                        </Text>
                                      </TouchableOpacity>
                        
                                      <TouchableOpacity
                                        style={[
                                          styles.sizeButton,
                                          item.selectedSize === 42 && styles.sizeButtonActive,
                                        ]}
                                        onPress={() => togglePizzaSize(item)}
                                      >
                                        <Image
                                          source={require("../../assets/images/icon-diameter.png")}
                                          style={styles.sizeIcon}
                                        />
                                        <Text
                                          style={[
                                            styles.sizeText,
                                            item.selectedSize === 42 && styles.sizeTextActive,
                                          ]}
                                        >
                                          42 cm
                                        </Text>
                                      </TouchableOpacity>
                    </View>
                    <View >
                        <Text style={styles.toppingTitle}>Add topping</Text>
                        <View style={styles.categoryContainer}>
                            <TouchableOpacity>
                                <Text style={selectedCategory===mockVegetables ? styles.selectedCategory:styles.category}>Vegetables</Text>
                            </TouchableOpacity>
                            <TouchableOpacity>
                                <Text style={selectedCategory===mockMeats ? styles.selectedCategory:styles.category}>Meats</Text>
                            </TouchableOpacity>
                            <TouchableOpacity>
                                <Text style={selectedCategory===mockCheese ? styles.selectedCategory:styles.category}>Cheese</Text>
                            </TouchableOpacity>
                            <TouchableOpacity>
                                <Text style={selectedCategory===mockFish ? styles.selectedCategory:styles.category}>Fish</Text>
                            </TouchableOpacity>
                        </View>
                    </View>

                </View>

            </View>
        )
    }
  };
const styles= StyleSheet.create({
    item: {
        backgroundColor: colors.itemBackground,
        padding: 10,
        marginVertical: 30,
        marginHorizontal: 20,
        flexDirection: 'column',
        alignItems: 'center',
        borderRadius: 10,
        borderWidth: 2,
        borderColor: colors.shadowBorderColor,
      },
      textContainer:{
        flex:1,
        maxWidth: 300,
        marginTop:30,
        },
        image: {
            width: 300,
            height: 300,
            borderRadius: 10,
            marginTop:10,
        },
        wrapTitle:{
            flexDirection:"row",
            justifyContent:"space-between",
            marginBottom: 20,
        },
        title:{
            fontSize:30,
            fontWeight:"bold",
            color:colors.title,
        },
        description: {
            fontSize:16,
            color:colors.textColor,
            marginBottom:20,
        },
        switchContainer:{
            flexDirection:"row",
        },
        categoryContainer:{
            flexDirection:"row",
            justifyContent:"space-between",
            marginBottom:20,
        },
        category:{
            fontSize:16,
            color:colors.textColor,
            padding:6,
            borderRadius:4,
            borderWidth:1,
            borderColor:colors.shadowColor,
            marginTop:20,
        },
        selectedCategory:{
            fontSize:16,
            backgroundColor:colors.green,
            color:colors.mainColor,
            padding:6,
            borderRadius:4,
            borderWidth:1,
            borderColor:colors.shadowBorderColor,
            marginTop:20,
        },
        toppingTitle:{
            fontSize:18,
            color:colors.title,
            fontWeight:"bold",
            marginTop:20,
        },
  sizeButton: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: colors.borderMuted,
    backgroundColor: "transparent",
  },
  sizeButtonActive: {
    backgroundColor: colors.green,
    borderColor: colors.green,
  },
  sizeIcon: {
    width: 20,
    height: 20,
  },
  sizeText: {
    fontSize: 13,
    fontWeight: "600",
    color: colors.textColor,
  },
  sizeTextActive: {
    color: colors.black,
  },
    });

export default IconDetailsScreen;