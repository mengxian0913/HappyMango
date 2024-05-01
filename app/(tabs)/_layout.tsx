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
export default function TabLayout() {
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
  );
}
