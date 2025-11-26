import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";
import type { Item } from "./MockData";
import { LinearGradient } from "expo-linear-gradient";
import { colors } from "./Color";

type ItemListProps = {
  item: Item;
  index: number;
  togglePizzaSize: (item: Item) => void;
};

const ItemComponent = ({ item, togglePizzaSize }: ItemListProps) => {
  const currentPrice = item.selectedSize === 32 ? item.newPrice : item.size42;
  const currentWeight = item.selectedSize === 32 ? item.weight32 : item.weight42;

  return (
    <TouchableOpacity style={styles.container}>
      <LinearGradient
        colors={["#1b1D23", "#111217"]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.gradientCard}
      >
        <View style={styles.item}>
          <View style={styles.imageContainer}>
            <Image source={item.image} style={styles.image} />
            {item.isNew && (
              <View style={styles.badgeNew}>
                <Text style={styles.badgeText}>NEW</Text>
              </View>
            )}
            {!item.isNew && (
              <View style={[styles.badgeNew, styles.hitBadge]}>
                <Text style={styles.badgeText}>HIT</Text>
              </View>
            )}
          </View>

          <View style={styles.content}>
            <View style={styles.topRow}>
              <Text style={styles.title}>{item.title}</Text>
              <TouchableOpacity>
                <Image
                  source={require("../../assets/images/pizzaScreen/icon-like.png")}
                  style={styles.likeIcon}
                />
              </TouchableOpacity>
            </View>

            <View style={styles.priceRow}>
              <Text style={styles.price}>{currentPrice}</Text>
              <TouchableOpacity style={styles.orderButton}>
                <Text style={styles.orderButtonText}>Order</Text>
              </TouchableOpacity>
            </View>

            <View style={styles.sizeRow}>
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

            <Text style={styles.subtitle}>{item.title}</Text>
            <Text style={styles.description} numberOfLines={2}>
              {item.description}
            </Text>
            <Text style={styles.weight}>{currentWeight}</Text>
          </View>
        </View>
      </LinearGradient>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 16,
  },
  gradientCard: {
    borderRadius: 16,
    padding: 1,
    marginHorizontal: 14,
  },
  item: {
    padding: 12,
    backgroundColor: colors.panel,
    gap: 12,
    minHeight: 120,
    flexDirection: "row",
    alignItems: "flex-start",
    borderRadius: 14,
    borderWidth: 1,
    borderColor: colors.shadowBorderColor,
  },
  imageContainer: {
    justifyContent: "center",
    alignItems: "center",
    marginTop: 40,
  },
  image: {
    width: 110,
    height: 110,
    resizeMode: "cover",
    borderRadius: 12,
  },
  badgeNew: {
    position: "absolute",
    top: 6,
    left: 6,
    backgroundColor: colors.red,
    borderRadius: 10,
    paddingVertical: 4,
    paddingHorizontal: 12,
  },
  badgeText: {
    color: colors.white,
    fontWeight: "700",
    fontSize: 11,
  },
  hitBadge: {
    backgroundColor: colors.green,
  },
  content: {
    flex: 1,
    gap: 6,
  },
  topRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  priceRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    marginVertical: 4,
  },
  orderButton: {
    paddingVertical: 8,
    paddingHorizontal: 18,
    borderRadius: 16,
    borderWidth: 2,
    borderColor: colors.red,
    backgroundColor: "transparent",
  },
  orderButtonText: {
    fontSize: 16,
    fontWeight: "700",
    color: colors.white,
  },
  title: {
    fontSize: 18,
    fontWeight: "700",
    color: colors.title,
  },
  likeIcon: {
    width: 22,
    height: 22,
    tintColor: colors.white,
  },
  price: {
    fontSize: 20,
    fontWeight: "700",
    color: colors.white,
  },
  sizeRow: {
    flexDirection: "row",
    gap: 8,
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
  subtitle: {
    fontSize: 16,
    fontWeight: "600",
    color: colors.title,
    marginTop: 4,
  },
  description: {
    fontSize: 13,
    color: colors.textColor,
    lineHeight: 18,
  },
  weight: {
    fontSize: 12,
    color: colors.grey,
    marginTop: 2,
  },
});

export default ItemComponent;