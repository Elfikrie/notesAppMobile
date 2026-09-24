import { Tabs } from "expo-router";
import React from "react";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { HapticTab } from "@/components/haptic-tab";
import { IconSymbol } from "@/components/ui/icon-symbol";

export default function TabLayout() {
  const insets = useSafeAreaInsets();

  return (
    <Tabs
      screenOptions={{
        headerShown: false,

        tabBarStyle: {
          backgroundColor: "#FFD166",

          height: 60 + insets.bottom,

          paddingTop: 5,
          paddingBottom: insets.bottom + 5,

          borderTopWidth: 0,
        },

        tabBarActiveTintColor: "#333333",
        tabBarInactiveTintColor: "#FFFFFF",

        tabBarButton: HapticTab,
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Notes",

          tabBarIcon: ({ color }) => (
            <IconSymbol
              size={28}
              name="house.fill"
              color={color}
            />
          ),
        }}
      />
    </Tabs>
  );
}