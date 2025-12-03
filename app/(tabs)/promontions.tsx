import React, {useState} from "react";
import { View, Text, StyleSheet, ScrollView, Image, Dimensions, TouchableWithoutFeedback, Share, FlatList} from "react-native";
import { colors } from "../components/Color";

const data = [
  {
    id: 1,
    image: require("../../assets/images/header/food-story-1.jpg"),
    shareLink: "https://example.com/1",
  },
  {
    id: 2,
    image: require("../../assets/images/header/food-story-2.jpg"),
    shareLink: "https://example.com/2",
  },
  {
    id: 3,
    image: require("../../assets/images/header/food-story-3.jpg"),
    shareLink: "https://example.com/3",
  },
];

const {width, height} = Dimensions.get("screen");

const PromotionsScreen = () => {
  const [selectedId, setSelectedId] = useState(0);
  const handleItemSelect = (id, shareLink) => {
    setSelectedId(id);
    handleShare(shareLink);
  };
  const handleShare = async (shareLink) => {
    try {
      const result = await Share.share({
        message: `Check out this image: ${shareLink}`,
      });
      if (result.action === Share.sharedAction) {
        console.log("Shared successfully");
      } else if (result.action === Share.dismissedAction) {
        console.log("Share dismissed");
      }
    } catch (error) {
      console.error("Error sharing promotion:", error.message);
    }
  };
  const renderItem=({item, index}) => {
    return (
      <View style={{width: width}}>
        <TouchableWithoutFeedback onPress={() => handleItemSelect(index,item.shareLink)}>
          <View>
            <Image source={item.image} style={styles.itemImage} />
          </View>
        </TouchableWithoutFeedback>
      </View>
    );
  };

  return (
    <FlatList
      data={data}
      renderItem={renderItem}
      keyExtractor={(item) => item.id}
      horizontal
      showsHorizontalScrollIndicator={false}
      extraData={selectedId}
      pagingEnabled
    />
  );
};
const styles = StyleSheet.create({
  
});