import React, { useState } from "react";
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from "react-native";
import { colors } from "./components/Color";
import { Ionicons } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";

export default function ContactsScreen() {
  const [showDetails, setShowDetails] = useState(false);

  const handleAddressPress = () => {
    setShowDetails(!showDetails);
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView 
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        <Text style={styles.mainTitle}>Contact Us</Text>

        {/* Phone Numbers Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Phone Numbers</Text>
          
          <TouchableOpacity style={styles.contactItem}>
            <Ionicons name="call-outline" size={24} color={colors.green} style={styles.icon} />
            <Text style={styles.contactText}>+380 67 123 45 67</Text>
          </TouchableOpacity>

          <View style={styles.separator} />

          <TouchableOpacity style={styles.contactItem}>
            <Ionicons name="call-outline" size={24} color={colors.green} style={styles.icon} />
            <Text style={styles.contactText}>+380 93 123 45 67</Text>
          </TouchableOpacity>
        </View>

        {/* Social Media Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>We are on social media</Text>
          
          <TouchableOpacity style={styles.contactItem}>
            <Ionicons name="logo-instagram" size={24} color={colors.green} style={styles.icon} />
            <Text style={styles.contactText}>Instagram</Text>
          </TouchableOpacity>

          <View style={styles.separator} />

          <TouchableOpacity style={styles.contactItem}>
            <Ionicons name="paper-plane-outline" size={24} color={colors.green} style={styles.icon} />
            <Text style={styles.contactText}>Telegram</Text>
          </TouchableOpacity>

          <View style={styles.separator} />

          <TouchableOpacity style={styles.contactItem}>
            <Ionicons name="chatbubble-ellipses-outline" size={24} color={colors.green} style={styles.icon} />
            <Text style={styles.contactText}>Viber</Text>
          </TouchableOpacity>
        </View>

        {/* Pickup Address Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Pickup Address</Text>
          
          <TouchableOpacity 
            style={styles.addressBlock}
            onPress={handleAddressPress}
          >
            <View style={styles.addressHeader}>
              <Ionicons name="location-outline" size={24} color={colors.white} style={styles.icon} />
              <Text style={styles.addressText}>
                Vinnytsya, Soborna Street 45
              </Text>
              <Ionicons 
                name={showDetails ? "chevron-up" : "chevron-down"} 
                size={24} 
                color={colors.white} 
              />
            </View>
          </TouchableOpacity>

          {showDetails && (
            <View style={styles.detailsBlock}>
              <View style={styles.detailItem}>
                <Text style={styles.detailLabel}>Phones:</Text>
                <Text style={styles.detailValue}>+380 67 123 45 67</Text>
                <Text style={styles.detailValue}>+380 93 123 45 67</Text>
              </View>

              <View style={styles.detailSeparator} />

              <View style={styles.detailItem}>
                <Text style={styles.detailLabel}>Email:</Text>
                <Text style={styles.detailValue}>info@pizzadelivery.com</Text>
              </View>

              <View style={styles.detailSeparator} />

              <View style={styles.detailItem}>
                <Text style={styles.detailLabel}>Working hours:</Text>
                <Text style={styles.detailValue}>Mon-Sun: 10:00 - 21:00</Text>
              </View>
            </View>
          )}
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
    marginBottom: 24,
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: colors.textColor,
    marginBottom: 12,
  },
  contactItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 12,
  },
  icon: {
    marginRight: 12,
  },
  contactText: {
    fontSize: 16,
    color: colors.textColor,
    flex: 1,
  },
  separator: {
    height: 1,
    backgroundColor: colors.lightgrey,
    marginVertical: 4,
  },
  addressBlock: {
    backgroundColor: colors.green,
    borderRadius: 12,
    padding: 16,
  },
  addressHeader: {
    flexDirection: "row",
    alignItems: "center",
  },
  addressText: {
    fontSize: 16,
    color: colors.white,
    flex: 1,
    fontWeight: "600",
  },
  detailsBlock: {
    backgroundColor: colors.itemBackground,
    borderRadius: 12,
    padding: 16,
    marginTop: 12,
    borderWidth: 1,
    borderColor: colors.shadowBorderColor,
  },
  detailItem: {
    paddingVertical: 8,
  },
  detailLabel: {
    fontSize: 14,
    color: colors.grey,
    marginBottom: 4,
  },
  detailValue: {
    fontSize: 16,
    color: colors.textColor,
    marginBottom: 2,
  },
  detailSeparator: {
    height: 1,
    backgroundColor: colors.lightgrey,
    marginVertical: 8,
  },
});