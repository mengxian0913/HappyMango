import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeStackScreen from './adminHome';
import TabAdminScreen from './userSetting';
import TabAnalysisScreen from './analysis';
import TabNewScreen from './newProduct';
import OrderStackScreen from './orderList';

import { useColorScheme } from '@/components/useColorScheme';
import { NavigationContainer } from '@react-navigation/native';
import { TabBarIcon } from '@/components/Themed';

const ButtomTabs = createBottomTabNavigator();


function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <NavigationContainer independent={true}>
      <ButtomTabs.Navigator screenOptions={{ headerShown: false }}>
        <ButtomTabs.Screen
          name="index"
          component={HomeStackScreen}
          options={{
            title: 'Home',
            tabBarIcon: ({ color }) => <TabBarIcon name="home-outline" color={color} />,
          }}
        />
        <ButtomTabs.Screen
          name="order"
          component={OrderStackScreen}
          options={{
            title: 'Order Info',
            tabBarIcon: ({ color }) => <TabBarIcon name="receipt" color={color} />,
          }}
        />
        <ButtomTabs.Screen
          name="new"
          component={TabNewScreen}
          options={{
            title: 'New Product',
            tabBarIcon: ({ color }) => <TabBarIcon name="add-circle-outline" color={color} />,
          }}
        />
        <ButtomTabs.Screen
          name="analysis"
          component={TabAnalysisScreen}
          options={{
            title: 'Analysis',
            tabBarIcon: ({ color }) => <TabBarIcon name="analytics-outline" color={color} />,
          }}
        />
        <ButtomTabs.Screen
          name="admin"
          component={TabAdminScreen}
          options={{
            title: 'Admin',
            tabBarIcon: ({ color }) => <TabBarIcon name="person" color={color} />,
          }}
        />
      </ButtomTabs.Navigator>
    </NavigationContainer>
=======
import React from "react";
import { Ionicons } from "@expo/vector-icons";
import { Tabs } from "expo-router";

import Colors from "@/constants/Colors";
import { useColorScheme } from "@/components/useColorScheme";
import { useClientOnlyValue } from "@/components/useClientOnlyValue";

interface Props {
  name: React.ComponentProps<typeof Ionicons>["name"];
  color: string;
}

// You can explore the built-in icon families and icons on the web at https://icons.expo.fyi/
const TabBarIcon = ({ name, color }: Props) => {
  return (
    <Ionicons size={28} style={{ marginBottom: 0 }} name={name} color={color} />
  );
};

const TabLayout = () => {
  const colorScheme = useColorScheme();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? "light"].tint,
        headerShown: useClientOnlyValue(false, false),
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          tabBarIcon: ({ color }) => (
            <TabBarIcon name="home-outline" color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="order"
        options={{
          title: "Order Info",
          tabBarIcon: ({ color }) => (
            <TabBarIcon name="receipt" color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="new"
        options={{
          title: "New Product",
          tabBarIcon: ({ color }) => (
            <TabBarIcon name="add-circle-outline" color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="analysis"
        options={{
          title: "Analysis",
          tabBarIcon: ({ color }) => (
            <TabBarIcon name="analytics-outline" color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="admin"
        options={{
          title: "Admin",
          tabBarIcon: ({ color }) => <TabBarIcon name="person" color={color} />,
        }}
      />
    </Tabs>
  );
};

export default TabLayout;
