import React from "react";
import { View, StyleSheet, Image, Text, FlatList, TouchableOpacity } from "react-native";
import { colors } from "../components/Color";
import { Ionicons } from "@expo/vector-icons";
import { useOrderWishStore } from "../store/indexWishStore";
import { useOrderStore } from "../store/index";
import { SafeAreaView } from "react-native-safe-area-context";

const WishListScreen = () => {
  const orders = useOrderWishStore((state) => state.orders);
  const removeOrderWishItem = useOrderWishStore((state) => state.removeOrderWishItem);
  const getPriceForSize = useOrderWishStore((state) => state.getPriceForSize);
  const setOrders = useOrderStore((state) => state.setOrders);

  const handleDelete = (item: any) => {
    removeOrderWishItem(item);
  };

  const handleBuy = (item: any) => {
    const priceForSize = getPriceForSize(item);
    setOrders({ ...item, price: priceForSize });
    removeOrderWishItem(item);
  };

  const renderItem = ({ item }: any) => (
    <View style={styles.item}>
      <View>
        <Image source={item.image} style={styles.image} />
      </View>
      <View style={styles.wrapRight}>
        <View style={styles.wrapTitle}>
          <Text style={styles.title}>{item.title}</Text>
          <TouchableOpacity onPress={() => handleDelete(item)}>
            <Ionicons name="close-circle" size={20} color={colors.red} />
          </TouchableOpacity>
        </View>
        <View style={styles.priceContainer}>
          <View style={styles.priceText}>
            <Text style={styles.titlePrice}>Price:</Text>
            <Text style={styles.price}>{getPriceForSize(item).pricePizza}</Text>
          </View>
        </View>
        <TouchableOpacity style={styles.buyButton} onPress={() => handleBuy(item)}>
          <Text style={styles.buyButtonText}>Buy</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.titleContainer}>
        <Text style={styles.titleOrders}>WishList: {orders.length} items</Text>
      </View>
      <FlatList
        data={orders}
        renderItem={renderItem}
        keyExtractor={(item) => `${item.id}-${item.selectedSize}`}
      />
      <View style={styles.cartIconContainer}>
        {orders.length === 0 && (
          <Ionicons name="heart-outline" size={91} color={colors.red} />
        )}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.mainBackground
  },
  titleContainer: {
    marginHorizontal: 30,
    marginTop: 10
  },
  titleOrders: {
    fontSize: 18,
    fontWeight: "bold",
    color: colors.textColor
  },
  item: {
    backgroundColor: colors.itemBackground,
    margin: 10,
    padding: 5,
    gap: 20,
    minHeight: 100,
    flexDirection: "row",
    justifyContent: "space-between",
    borderRadius: 10,
    borderWidth: 2,
    borderColor: colors.shadowColor
  },
  image: {
    width: 120,
    height: 120,
    resizeMode: "stretch"
  },
  wrapRight: {
    gap: 10,
    flex: 1
  },
  wrapTitle: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center"
  },
  title: {
    fontSize: 16,
    fontWeight: "bold",
    color: colors.textColor
  },
  priceContainer: {
    flexDirection: "row",
    justifyContent: "space-between"
  },
  priceText: {
    flexDirection: "column"
  },
  titlePrice: {
    fontSize: 14,
    fontWeight: "bold",
    textDecorationLine: "underline",
    color: colors.textColor
  },
  price: {
    fontSize: 20,
    color: colors.green
  },
  buyButton: {
    backgroundColor: colors.green,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
    alignItems: "center",
    marginTop: 10
  },
  buyButtonText: {
    fontSize: 16,
    fontWeight: "bold",
    color: colors.black
  },
  cartIconContainer: {
    flex: 70,
    justifyContent: "center",
    alignItems: "center"
  }
});

export default WishListScreen;