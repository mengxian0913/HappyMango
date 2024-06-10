import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeStackScreen from './Admin/AdminHome';
import TabAdminScreen from './Admin/AdminProfile';
import TabNewScreen from './Admin/NewProduct';
import OrderStackScreen from './Admin/OrderList';

import { useColorScheme } from '@/components/useColorScheme';
import { TabBarIcon } from '@/components/Themed';

const ButtomTabs = createBottomTabNavigator();

function TabLayout() {
  const colorScheme = useColorScheme();

  return (
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
          name="admin"
          component={TabAdminScreen}
          options={{
            title: 'Admin',
            tabBarIcon: ({ color }) => <TabBarIcon name="person" color={color} />,
          }}
        />
      </ButtomTabs.Navigator>
  )
}

export default TabLayout;
