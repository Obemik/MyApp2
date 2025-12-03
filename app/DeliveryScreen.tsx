import React from "react";
import { View, Text, StyleSheet, ScrollView, Image } from "react-native";
import MapView, { Marker } from "react-native-maps";
import { colors } from "./components/Color";
import { SafeAreaView } from "react-native-safe-area-context";

export default function DeliveryScreen() {
  const paymentOptions = [
    {
      id: 1,
      icon: require("../assets/images/settingsScreen/delivery.jpg"),
      title: "Cash on Delivery",
      description: "Pay with cash when you receive your order at your doorstep."
    },
    {
      id: 2,
      icon: require("../assets/images/settingsScreen/support.jpg"),
      title: "Card Payment",
      description: "Secure payment with credit or debit card through our system."
    },
    {
      id: 3,
      icon: require("../assets/images/settingsScreen/quality.jpg"),
      title: "Online Banking",
      description: "Direct bank transfer with instant confirmation of payment."
    }
  ];

  const orderTypes = [
    {
      id: 1,
      icon: require("../assets/images/settingsScreen/pizza.jpg"),
      title: "Delivery",
      description: "We deliver hot and fresh pizza right to your door within 30-45 minutes."
    },
    {
      id: 2,
      icon: require("../assets/images/settingsScreen/delivery.jpg"),
      title: "Pickup",
      description: "Order online and pick up from our location. Get 10% discount on pickup orders."
    },
    {
      id: 3,
      icon: require("../assets/images/settingsScreen/support.jpg"),
      title: "Dine-In",
      description: "Enjoy your meal at our cozy restaurant with family and friends."
    }
  ];

  const InfoCard = ({ icon, title, description }) => (
    <View style={styles.infoCard}>
      <Image source={icon} style={styles.cardIcon} />
      <View style={styles.cardTextContainer}>
        <Text style={styles.cardTitle}>{title}</Text>
        <Text style={styles.cardDescription}>{description}</Text>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView 
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        <Text style={styles.mainTitle}>Terms of delivery</Text>
        <Text style={styles.subtitle}>Delivery time from 10a.m – 21p.m</Text>

        <View style={styles.mapContainer}>
          <MapView
            style={styles.map}
            region={{
              latitude: 49.2331,
              longitude: 28.4682,
              latitudeDelta: 0.0922,
              longitudeDelta: 0.0421,
            }}
          >
            <Marker
              coordinate={{ latitude: 49.2331, longitude: 28.4682 }}
              title="Delivery Location"
            />
          </MapView>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Payment options</Text>
          {paymentOptions.map((option) => (
            <InfoCard
              key={option.id}
              icon={option.icon}
              title={option.title}
              description={option.description}
            />
          ))}
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Types of orders</Text>
          {orderTypes.map((type) => (
            <InfoCard
              key={type.id}
              icon={type.icon}
              title={type.title}
              description={type.description}
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
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: colors.grey,
    textAlign: "center",
    marginBottom: 16,
  },
  mapContainer: {
    height: 200,
    borderRadius: 12,
    overflow: "hidden",
    marginBottom: 24,
  },
  map: {
    width: "100%",
    height: "100%",
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: colors.textColor,
    marginBottom: 16,
  },
  infoCard: {
    flexDirection: "row",
    backgroundColor: colors.itemBackground,
    borderRadius: 12,
    padding: 12,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: colors.shadowBorderColor,
  },
  cardIcon: {
    width: 60,
    height: 60,
    borderRadius: 8,
    marginRight: 12,
  },
  cardTextContainer: {
    flex: 1,
    justifyContent: "center",
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: colors.textColor,
    marginBottom: 4,
  },
  cardDescription: {
    fontSize: 14,
    color: colors.grey,
    lineHeight: 20,
  },
});