import React, {useState} from "react";
import { colors } from "../components/Color";
import { View, Text , StyleSheet, Image, TouchableOpacity} from "react-native";
import { useRouter } from "expo-router";
import SupportModal from "../components/SupportModal";

export default function SettingsScreen() {
  const [showModel, setShowModel] = useState(false);
  const router = useRouter();
  
  const onPressSupport=()=>{
    setShowModel(true);
  }

  const onPressAboutUs = () => {
    router.push("/AboutUsScreen");
  }

  const onPressDelivery = () => {
    router.push("/DeliveryScreen");
  }

  const onPressContacts = () => {
    router.push("/ContactsScreen");
  }
  
  const ListItem = (({ iconCard, title, iconArrow, onPress}) => {
    return (
      <TouchableOpacity style={styles.wrap} onPress={onPress}>
        <View style={styles.listItem}>
          <Image source={iconCard} style={styles.icon} />
          <Text style={styles.title}>{title}</Text>
          <Image source={iconArrow} style={styles.icon} />
        </View>
      </TouchableOpacity>
    );
  });
  
  return (
    <View style={styles.container}>
      <ListItem
        iconCard={require("../../assets/images/settingsScreen/icon-team.png")}
        title="About Us"
        iconArrow={require("../../assets/images/settingsScreen/icon-right-arrow.png")}
        onPress={onPressAboutUs}
      />
      <ListItem
        iconCard={require("../../assets/images/settingsScreen/icon-pay.png")}
        title="Delivery and payment"
        iconArrow={require("../../assets/images/settingsScreen/icon-right-arrow.png")}
        onPress={onPressDelivery}
      />
      <ListItem
        iconCard={require("../../assets/images/settingsScreen/icon-contacts.png")}
        title="Contacts"
        iconArrow={require("../../assets/images/settingsScreen/icon-right-arrow.png")}
        onPress={onPressContacts}
      />
      <ListItem
        iconCard={require("../../assets/images/settingsScreen/icon-suport.png")}
        title="Support"
        iconArrow={require("../../assets/images/settingsScreen/icon-right-arrow.png")}
        onPress={onPressSupport}
      />
      {showModel && <SupportModal onClose={() => setShowModel(false)} />}
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: colors.itemBackground,
  },
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: colors.mainBackground,
  },
  listItem: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: colors.lightgrey,
    borderRadius: 8,
    padding: 10,
    margin: 5
  },
  icon: {
    width: 24,
    height: 24,
    marginHorizontal: 5,
  },
  title: {
    fontSize: 16,
    color: colors.textColor,
    flex: 1,
  },
});