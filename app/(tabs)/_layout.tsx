import React, { useEffect, useState } from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
/* Admin */
import AdminHome from "./Admin/AdminHome/AdminHome";
import Analysis from "./Admin/Analysis/Analysis";
import NewProduct from "./Admin/NewProduct/NewProduct";
import OrderList from "./Admin/OrderList/OrderList";
import UserSetting from "./Admin/UserSetting/UserSetting";

/* Customer */
import CustomerHome from "./Customer/CustomerHome/CustomerHome";

import { NavigationContainer } from "@react-navigation/native";
import { TabBarIcon, Text } from "@/components/Themed";
import CustomerUser from "./Customer/CustomerUser/CustomerUser";

const Tab = createBottomTabNavigator();

const TabLayout = () => {
  const [isAdmin, setIsAdmin] = useState<boolean>(false);
  const [isLogin, setIsLogin] = useState<boolean>(true);

  useEffect(() => {
    // check is admin //
    setIsAdmin(false);
    setIsLogin(true);
  }, []);

  if (false) {
    return <Text style={{ fontSize: 33 }}>123</Text>;
  } else {
    return (
      <NavigationContainer independent={true}>
        <Tab.Navigator screenOptions={{ headerShown: false }}>
          <Tab.Screen
            name="index"
            component={isAdmin ? AdminHome : CustomerHome}
            options={{
              title: "Home",
              tabBarIcon: ({ color }) => (
                <TabBarIcon name="home-outline" color={color} />
              ),
            }}
          />
          <Tab.Screen
            name="order"
            component={OrderList}
            options={{
              title: "Order Info",
              tabBarIcon: ({ color }) => (
                <TabBarIcon name="receipt" color={color} />
              ),
            }}
          />
          <Tab.Screen
            name="new"
            component={NewProduct}
            options={{
              title: "New Product",
              tabBarIcon: ({ color }) => (
                <TabBarIcon name="add-circle-outline" color={color} />
              ),
            }}
          />
          <Tab.Screen
            name="analysis"
            component={Analysis}
            options={{
              title: "Analysis",
              tabBarIcon: ({ color }) => (
                <TabBarIcon name="analytics-outline" color={color} />
              ),
            }}
          />
          <Tab.Screen
            name="setting"
            component={isLogin ? CustomerUser : UserSetting}
            options={{
              title: "setting",
              tabBarIcon: ({ color }) => (
                <TabBarIcon name="person" color={color} />
              ),
            }}
          />
        </Tab.Navigator>
      </NavigationContainer>
    );
  }
};

export default TabLayout;
