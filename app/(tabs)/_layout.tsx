import { Tabs } from 'expo-router';
import React from 'react';
import { Ionicons } from '@expo/vector-icons';

import { HapticTab } from '@/components/haptic-tab';
import { IconSymbol } from '@/components/ui/icon-symbol';
import { colors } from '../components/Color'; 
import { useColorScheme } from '@/hooks/use-color-scheme';

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <Tabs
      screenOptions={{
        tabBarStyle:{
          backgroundColor:"#0c0c0f",
          borderTopColor:"#1c1c22"
        },
        tabBarActiveTintColor: colors.red,
        tabBarInactiveTintColor:"#6b6b78",
        tabBarLabelStyle:{
          fontWeight:"600",
          letterSpacing: 0.3
        },
        sceneStyle:{backgroundColor:"#0a0a0d"},
        headerShown: false,
        tabBarHideOnKeyboard:true
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarIcon: ({ color, size }) => <Ionicons size={size} name="home-outline" color={color} />,
        }}
      />
      <Tabs.Screen
        name="promotions"
        options={{
          title: 'Promotions',
          tabBarIcon: ({ color, size }) => <Ionicons size={size} name="sparkles-outline" color={color} />,
        }}
      />
      <Tabs.Screen
        name="settings"
        options={{
          title: 'Settings',
            tabBarIcon: ({ color, size }) => <Ionicons size={size} name="settings-outline" color={color} />,
        }}
      />
       <Tabs.Screen
        name="cart"
        options={{
          title: 'Cart',
            tabBarIcon: ({ color, size }) => <Ionicons size={size} name="cart-outline" color={color} />,
        }}
      />
      <Tabs.Screen
        name="wishlist"
        options={{
          title: 'WishList',
          tabBarIcon: ({ color, size }) => <Ionicons size={size} name="heart-outline" color={color} />,
        }}
      />
    </Tabs>
  );
}

 