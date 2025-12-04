import React, { useState, useRef } from "react";
import { View, Image, TextInput, StyleSheet, Text, TouchableOpacity, ScrollView} from "react-native";
import { colors } from "./Color";

type HeaderProps = {
  onSearch: (text: string) => void;
  totalItems?: number;
};

const categories = ["Pizza", "Sushi", "Burgers", "Lunch", "Sets", "Combo"];

const Header = ({ onSearch, totalItems = 0 }: HeaderProps) => {
    const [searchText, setSearchText] = useState("");
    const [isSearchVisible, setIsSearchVisible] = useState(false);
    const [activeTab, setActiveTab] = useState("Pizza");
    const inputRef = useRef<TextInput>(null);
    
    const handleSearch = (text: string) => {
        setSearchText(text);
        onSearch(text);
    }
    
    const toggleSearch = () => {
        const next = !isSearchVisible;
        setIsSearchVisible(next);
        if (!next) {
            setTimeout(() => {
                inputRef.current?.focus();
            }, 50);
        } else {
            setSearchText("");
            onSearch("");
        }
    }
    
    return(
    <View style={styles.container}>
        <View style={styles.inner}>
            <View style={styles.topBar}>
                <View style={styles.logoRow}>
                    <Text style={styles.logo}>PRONTO</Text>
                    <Text style={styles.logoSub}>Pizza & Sushi</Text>
                </View>
                <View style={styles.actions}>
                    <TouchableOpacity onPress={toggleSearch}>
                        <Image source={require("../../assets/images/header/icon-search.png")} style={styles.smallIcon} />
                    </TouchableOpacity>
                    <TouchableOpacity>
                        <Image source={require("../../assets/images/header/icon-like.png")} style={styles.smallIcon} />
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.basketContainer}>
                        <Image source={require("../../assets/images/homeScreen/icon-basket.png")} style={styles.smallIcon} />
                        {totalItems > 0 && (
                            <View style={styles.badge}>
                                <Text style={styles.badgeText}>{totalItems}</Text>
                            </View>
                        )}
                    </TouchableOpacity>
                </View>
            </View>
            
            {isSearchVisible && (
                <View style={styles.searchRow}>
                    <Image source={require("../../assets/images/header/icon-search.png")} style={styles.searchIcon} />
                    <TextInput
                        style={styles.input}
                        placeholder="Search pizza, drinks, toppings..."
                        placeholderTextColor={colors.grey}
                        value={searchText}
                        onChangeText={handleSearch}
                        ref={inputRef}
                    />
                </View>
            )}
            
            <View style={styles.tabWrapper}>
                <ScrollView horizontal contentContainerStyle={styles.tabRow}>
                {categories.map((tab) => (
                    <TouchableOpacity key={tab} onPress={() => setActiveTab(tab)}>
                    <View style={[styles.tab, activeTab === tab && styles.activeTab]}>
                        <Text style={[styles.tabText, activeTab === tab && styles.tabTextActive]}>
                        {tab}
                        </Text>
                    </View>
                    </TouchableOpacity>
                ))}
                </ScrollView>
            </View>
        </View>
    </View>
    )
}

const styles = StyleSheet.create({
    container: {
        marginHorizontal: -16,
        paddingHorizontal: 16,
    },
    inner: {
        paddingVertical: 12,
        gap: 12,
    },
    topBar: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
    },
    logoRow: {
        gap: 2,
    },
    logo: {
        fontSize: 18,
        fontWeight: "900",
        lineHeight: 0.5,
        color: colors.title,
    },
    logoSub: {
        fontSize: 12,
        color: colors.grey,
    },
    actions: {
        flexDirection: "row",
        gap: 12,
        alignItems: "center",
    },
    smallIcon: {
        width: 22,
        height: 22,
        tintColor: colors.title,
    },
    basketContainer: {
        position: 'relative',
    },
    badge: {
        position: 'absolute',
        top: -6,
        right: -6,
        backgroundColor: colors.red,
        borderRadius: 10,
        minWidth: 18,
        height: 18,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 4,
    },
    badgeText: {
        color: colors.white,
        fontSize: 10,
        fontWeight: '700',
    },
    searchRow: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: colors.itemBackground,
        borderRadius: 12,
        borderWidth: 1,
        borderColor: colors.borderMuted,
        paddingHorizontal: 12,
        paddingVertical: 10,
        gap: 10,
    },
    searchIcon: {
        width: 18,
        height: 18,
        tintColor: colors.grey,
    },
    input: {
        flex: 1,
        color: colors.textColor,
        fontSize: 15,
    },
    tabWrapper: {
        marginHorizontal: 0,
        paddingHorizontal: 0,
    },
    tabRow: {
        gap: 10,
        marginTop: 6,
        paddingRight: 24,
    },
    tab: {
        paddingVertical: 8,
        paddingHorizontal: 14,
        borderRadius: 12,
        borderWidth: 1,
        borderColor: colors.borderMuted,
        backgroundColor: colors.tabs,
    },
    activeTab: {
        backgroundColor: colors.white,
        borderColor: colors.white,
    },
    tabText: {
        fontWeight: "700",
        color: colors.textColor,
    },
    tabTextActive: {
        color: colors.black,
    },
});

export default Header;