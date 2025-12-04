import React, { useState, useMemo } from "react";
import { View, StyleSheet, Image, Text, FlatList, TouchableOpacity } from "react-native";
import { colors } from "../components/Color";
import { Ionicons } from "@expo/vector-icons";
import { useOrderStore } from "../store/index";
import { SafeAreaView } from "react-native-safe-area-context";

const BasketScreen = () => {
  const orders = useOrderStore((state) => state.orders);
  
  const clearOrders = useOrderStore((state) => state.clearOrders);
  const removeOrder = useOrderStore((state) => state.removeOrder);
  const confirmOrder = useOrderStore((state) => state.confirmOrder);
  const increaseQuantity = useOrderStore((state) => state.increaseQuantity);
  const decreaseQuantity = useOrderStore((state) => state.decreaseQuantity);
  const getPriceForSize = useOrderStore((state) => state.getPriceForSize);

  const totalItems = useMemo(() => {
    return orders.reduce((total, item) => total + (item.quantity || 0), 0);
  }, [orders]);

  const totals = useMemo(() => {
    let totalAmount = 0;
    let totalDiscount = 0;

    orders.forEach((item) => {
      const basePrice = item.selectedSize === 42 ? item.size42 || '0' : item.newPrice;
      const itemPrice = parseFloat(basePrice.replace('$', '')) || 0;
      const quantity = item.quantity || 1;
      
      const itemTotal = itemPrice * quantity;
      totalAmount += itemTotal;

      if (item.oldPrice) {
        const oldPriceValue = parseFloat(item.oldPrice.replace('$', '')) || 0;
        const discount = (oldPriceValue - itemPrice) * quantity;
        totalDiscount += discount;
      }
    });

    return {
      totalAmount: `$${totalAmount.toFixed(2)}`,
      totalDiscount: `$${totalDiscount.toFixed(2)}`
    };
  }, [orders]);

  const [confirmationMessage, setConfirmationMessage] = useState("");

  const onPress = () => {
    clearOrders();
    setConfirmationMessage("Order successfully cleared!");
    setTimeout(() => {
      setConfirmationMessage("");
    }, 2000);
  };

  const onItemRemove = (item) => {
    removeOrder(item);
  };

  const onConfirmOrder = () => {
    confirmOrder();
    setConfirmationMessage("Order successfully sent!");
    setTimeout(() => {
      setConfirmationMessage("");
    }, 2000);
  };

  const renderItem = ({ item }) => {
    const priceInfo = getPriceForSize(item);
    return (
      <View style={styles.item}>
        <View>
          <Image source={item.image} style={styles.image} />
        </View>
        <View style={styles.wrapRight}>
          <View style={styles.wrapTitle}>
            <TouchableOpacity onPress={() => onItemRemove(item)}>
              <Ionicons name="close-circle" size={20} color={colors.title} />
            </TouchableOpacity>
          </View>
          <View style={styles.priceContainer}>
            <View style={styles.priceText}>
              <Text style={styles.titlePrice}>Price:</Text>
              <Text style={styles.price}>${priceInfo.pricePizza.toFixed(2)}</Text>
            </View>
          </View>
          <View style={styles.quantityContainer}>
            <TouchableOpacity onPress={() => increaseQuantity(item)}>
              <Text style={styles.quantityButton}>+</Text>
            </TouchableOpacity>
            <Text style={styles.quantity}>{item.quantity}</Text>
            <TouchableOpacity onPress={() => decreaseQuantity(item)}>
              <Text style={styles.quantityButton}>-</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.titleContainer}>
        <Text style={styles.titleClear} onPress={onPress}>Clear</Text>
        <Text style={styles.titleOrders}>{`In your basket: ${totalItems} items`}</Text>
      </View>
      <FlatList
        data={orders}
        renderItem={renderItem}
        keyExtractor={(item) => `${item.id}-${item.selectedSize}`}
      />
      <View style={styles.cartIconContainer}>
        {orders.length === 0 && (
          <Image style={styles.iconCart} source={require("../../assets/images/homeScreen/icon-basket.png")} />
        )}
      </View>
      {orders.length > 0 && (
        <View style={styles.totalContainer}>
          <View style={styles.wrapTotal}>
            <View style={styles.wrapTotalTitle}>
              <Text style={styles.totalTitle}>Total: </Text>
              <Text style={styles.totalPrice}>{totals.totalAmount}</Text>
            </View>
            <TouchableOpacity style={styles.confirmButton} onPress={onConfirmOrder}>
              <Text style={styles.confirmButtonText}>Confirm Order</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}
      {confirmationMessage && (
        <View style={styles.conformationMessageContainer}>
          <Text style={styles.conformationMessageText}>{confirmationMessage}</Text>
        </View>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  conformationMessageContainer: {
    marginBottom: 40,
    padding: 10,
    backgroundColor: "lightgreen",
    borderRadius: 8,
    alignItems: "center"
  },
  conformationMessageText: {
    color: colors.newPriceColor,
    fontSize: 16
  },
  totalContainer: {
    margin: 10,
  },
  wrapTotal: {
    flexDirection: "row",
    justifyContent: "space-between"
  },
  wrapTotalTitle: {
    flexDirection: "row",
    alignItems: "center",
  },
  totalTitle: {
    fontSize: 18,
    color: colors.title
  },
  totalPrice: {
    fontSize: 18,
    fontWeight: "bold",
    color: colors.green
  },
  confirmButton: {
    backgroundColor: colors.green,
    padding: 14,
    borderRadius: 8,
    marginTop: 10,
    alignItems: "center"
  },
  confirmButtonText: {
    color: colors.white,
    fontSize: 16,
    fontWeight: "bold"
  },
  container: {
    flex: 1,
    backgroundColor: colors.mainBackground
  },
  titleContainer: {
    marginHorizontal: 30,
    marginTop: 10
  },
  titleClear: {
    fontSize: 18,
    marginLeft: "auto",
    color: colors.green
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
    alignItems: "flex-end"
  },
  priceContainer: {
    flexDirection: "row",
    justifyContent: 'space-between'
  },
  priceText: {
    flexDirection: "column",
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
  quantityContainer: {
    flexDirection: "row",
    marginTop: 20,
    borderWidth: 1,
    borderRadius: 10,
    borderColor: colors.green
  },
  quantityButton: {
    marginHorizontal: 20,
    fontSize: 16,
    fontWeight: "bold",
    color: colors.green
  },
  quantity: {
    color: colors.white
  },
  cartIconContainer: {
    flex: 70,
    justifyContent: "center",
    alignItems: "center",
  },
  iconCart: {
    width: 91,
    height: 91
  }
});

export default BasketScreen;