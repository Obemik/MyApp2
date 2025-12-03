import React, { useState } from "react";
import { View, Text, StyleSheet, ScrollView, FlatList, Image, Dimensions } from "react-native";
import { colors } from "./components/Color";
import { Ionicons } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";

const { width } = Dimensions.get("window");

export default function AboutUsScreen() {
  const [activeIndex, setActiveIndex] = useState(0);

  const advantages = [
    {
      id: '1',
      title: 'Guaranteed quality',
      description: 'We use only fresh ingredients from trusted suppliers. Our chefs prepare each pizza with love and attention to detail, ensuring every bite is delicious.',
      image: require("../assets/images/settingsScreen/delivery.jpg")
    },
    {
      id: '2',
      title: 'Fast delivery',
      description: 'Your order will be delivered hot and fresh within 30-45 minutes. Our delivery team works efficiently to bring your pizza to your door as quickly as possible.',
      image: require("../assets/images/settingsScreen/support.jpg")
    },
    {
      id: '3',
      title: 'Wide selection',
      description: 'We offer a diverse menu with traditional Italian pizzas, unique specialty options, and customizable toppings to satisfy every taste and preference.',
      image: require("../assets/images/settingsScreen/quality.jpg")
    },
    {
      id: '4',
      title: 'Affordable prices',
      description: 'Enjoy high-quality pizza at competitive prices. We believe great food should be accessible to everyone, with regular promotions and special offers.',
      image: require("../assets/images/settingsScreen/pizza.jpg")
    }
  ];

  const handleScroll = (event: any) => {
    const contentOffsetX = event.nativeEvent.contentOffset.x;
    const currentIndex = Math.round(contentOffsetX / width);
    setActiveIndex(currentIndex);
  };

  const renderAdvantageItem = ({ item }: any) => (
    <View style={styles.slideContainer}>
      <View style={styles.slideContent}>
        <Image source={item.image} style={styles.slideImage} />
        <View style={styles.slideTextContainer}>
          <Text style={styles.slideTitle}>{item.title}</Text>
          <View style={styles.underline} />
          <Text style={styles.slideDescription}>{item.description}</Text>
        </View>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView 
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        <Text style={styles.mainTitle}>About Us</Text>
        
        <Text style={styles.aboutText}>
          Welcome to our pizza delivery service! We are a team of passionate food lovers dedicated to bringing authentic Italian pizza right to your doorstep. Our journey began with a simple mission: to create the perfect pizza using traditional recipes and the finest ingredients.
        </Text>

        <Text style={styles.aboutText}>
          Every day, our skilled chefs hand-craft each pizza with care, ensuring that every order meets our high standards of quality and taste. We believe that great food brings people together, and we're honored to be part of your special moments.
        </Text>

        <Text style={styles.sectionTitle}>Our advantages</Text>

        <FlatList
          data={advantages}
          renderItem={renderAdvantageItem}
          keyExtractor={(item) => item.id}
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          onScroll={handleScroll}
          scrollEventThrottle={16}
          snapToInterval={width - 32}
          decelerationRate="fast"
          contentContainerStyle={styles.flatListContent}
        />

        <View style={styles.paginationContainer}>
          {advantages.map((_, index) => (
            <Ionicons
              key={index}
              name={index === activeIndex ? "ellipse" : "ellipse-outline"}
              size={12}
              color={index === activeIndex ? colors.green : colors.grey}
              style={styles.paginationDot}
            />
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.mainBackground,
  },
  scrollContent: {
    padding: 16,
    paddingBottom: 24,
  },
  mainTitle: {
    fontSize: 24,
    fontWeight: "bold",
    color: colors.green,
    textAlign: "center",
    marginBottom: 16,
  },
  aboutText: {
    fontSize: 16,
    color: colors.textColor,
    lineHeight: 24,
    textAlign: "justify",
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: colors.textColor,
    marginTop: 8,
    marginBottom: 16,
  },
  flatListContent: {
    paddingRight: 16,
  },
  slideContainer: {
    width: width - 32,
    paddingRight: 16,
  },
  slideContent: {
    flexDirection: "row",
    backgroundColor: colors.itemBackground,
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: colors.shadowBorderColor,
    alignItems: "center",
  },
  slideImage: {
    width: 100,
    height: 100,
    borderRadius: 8,
    marginRight: 16,
  },
  slideTextContainer: {
    flex: 1,
  },
  slideTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: colors.green,
    marginBottom: 4,
  },
  underline: {
    width: 40,
    height: 2,
    backgroundColor: colors.green,
    marginBottom: 8,
  },
  slideDescription: {
    fontSize: 14,
    color: colors.grey,
    lineHeight: 20,
    textAlign: "justify",
  },
  paginationContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 16,
    gap: 8,
  },
  paginationDot: {
    marginHorizontal: 2,
  },
});