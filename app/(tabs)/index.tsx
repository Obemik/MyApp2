import React, { useState } from "react";
import { StyleSheet } from "react-native";
import Header from "../components/Header";
import { LinearGradient } from "expo-linear-gradient";
import { colors } from "../components/Color";
import Animated, { useAnimatedScrollHandler, useSharedValue, useAnimatedStyle, interpolate } from "react-native-reanimated";
import { SafeAreaView } from "react-native-safe-area-context";
import { mockItemData, type Item } from "../components/MockData";
import ItemComponent from "../components/ItemList";
import { useOrderStore } from "../store/index";

export default function HomeScreen() {
  const [filteredData, setFilteredData] = useState(mockItemData);
  const scrollY = useSharedValue(0);
  
  const totalItems = useOrderStore((state) => 
    state.orders.reduce((total, item) => total + (item.quantity || 0), 0)
  );

  const scrollHandler = useAnimatedScrollHandler((event) => {
    scrollY.value = event.contentOffset.y;
  });

  const onSearch = (text: string) => {
    const filteredItems = mockItemData.filter((item) =>
      item.title.toLowerCase().includes(text.toLowerCase())
    );
    setFilteredData(filteredItems);
  };

  const togglePizzaSize = (selectedItem: Item) => {
    setFilteredData((prevData) =>
      prevData.map((item) =>
        item.id === selectedItem.id
          ? { ...item, selectedSize: item.selectedSize === 32 ? 42 : 32 }
          : item
      )
    );
  };

  const animatedTextStyle = useAnimatedStyle(() => {
    return {
      paddingTop: interpolate(scrollY.value, [0, 100], [0, 30]),
      marginBottom: interpolate(scrollY.value, [0, 100], [0, -100]),
      opacity: interpolate(scrollY.value, [0, 50], [1, 0]),
      transform: [
        {
          translateY: interpolate(scrollY.value, [0, 100], [0, -30]),
        },
      ],
    };
  });

  return (
    <LinearGradient colors={[colors.gradientStart, colors.gradientEnd]} style={styles.gradient}>
      <SafeAreaView style={styles.container}>
        <Animated.View style={[animatedTextStyle, styles.headerWrap]}>
          <Header onSearch={onSearch} totalItems={totalItems} />
        </Animated.View>

        <Animated.FlatList
          data={filteredData}
          renderItem={({ item, index }) => (
            <ItemComponent item={item} index={index} togglePizzaSize={togglePizzaSize} />
          )}
          keyExtractor={(item) => item.id}
          onScroll={scrollHandler}
          scrollEventThrottle={16}
          contentContainerStyle={styles.listContent}
        />
      </SafeAreaView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  gradient: {
    flex: 1,
  },
  container: {
    flex: 1,
  },
  headerWrap: {
    paddingHorizontal: 16,
    paddingTop: 10,
  },
  listContent: {
    paddingTop: 16,
    paddingBottom: 24,
  },
});