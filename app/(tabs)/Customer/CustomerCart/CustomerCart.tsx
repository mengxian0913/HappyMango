import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React, { useEffect } from "react";
import OrderList from "./components/OrderList/OrderList";
import OrderSetUp from "./components/OrderSetUp/OrderSetUp";

type orderItemType = {
  PID: string;
  PName: string;
  Sell: number;
  BNum: number;
  TMoney: number;
};

export type OrderRootStackParamList = {
  OrderList: undefined;
  OrderSetUp: {
    orderItems: orderItemType[];
  };
};

const ItemStack = createNativeStackNavigator<OrderRootStackParamList>();

const CustomerCart = () => {

  return (
    <ItemStack.Navigator
      initialRouteName="OrderList"
      screenOptions={{ headerShown: false, gestureEnabled: true }}
    >
      <ItemStack.Screen name="OrderList" component={OrderList} />
      <ItemStack.Screen name="OrderSetUp" component={OrderSetUp} />
    </ItemStack.Navigator>
  );
};

export default CustomerCart;
