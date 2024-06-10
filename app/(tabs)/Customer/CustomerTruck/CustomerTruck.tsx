import React, { useEffect, useState } from "react";
import { Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import styles from "./style";
import {
  GestureHandlerRootView,
  ScrollView,
} from "react-native-gesture-handler";
import axios from "axios";
import { useIsFocused } from "@react-navigation/native";
import { store } from "@/scripts/redux";

const Header = () => {
  return (
    <SafeAreaView style={styles.headerContainer}>
      <Text style={styles.headerText}>Orders</Text>
    </SafeAreaView>
  );
};

type OrderItemType = {
  PName: string;
  BuyNum: number;
};

type OrderType = {
  ONo: string;
  ShipWhere: string;
  OType: string;
  ShipAddress: string;
  orderItems: OrderItemType[] | string;
  UID: string;
};

interface OrderItemProps {
  dataOfOrder: OrderType;
}

const OrderItem = ({ dataOfOrder }: OrderItemProps) => {
  const orderItems: OrderItemType[] = JSON.parse(dataOfOrder.orderItems as string);
  return (
    <View style={styles.orderCard}>
      <Text>ONo: {dataOfOrder.ONo}</Text>
      <Text>OType: {dataOfOrder.OType}</Text>
      <Text>Delivery Status: {dataOfOrder.ShipWhere}</Text>
      <Text>Delivery Address: {dataOfOrder.ShipAddress}</Text>
      <View>
        {orderItems && orderItems.map((item, index) => (
          <OrderCard key={index} PName={item.PName} BuyNum={item.BuyNum} />
        ))}
      </View>
    </View>
  );
};

const OrderCard = (props: {PName: string, BuyNum: number}) => {
  return (
    <View>
      <View
        style={{
          borderBottomColor: "gray",
          borderBottomWidth: 1,
          marginVertical: 10,
        }}
      />

      <Text>PName: {props.PName}</Text>
      <Text>BuyNum: {props.BuyNum}</Text>
    </View>
  )
}

const CustomerTruck = () => {
  const getOrderList = async () => {
    const response = await axios.get(`${process.env.EXPO_PUBLIC_API_URL}/customer/get_all_order`);
    const data = await response.data as OrderType[];
    const orderList = data.filter(order => {
      return order.UID === store.getState().id;
    })
    setData(orderList);
  }

  const isFocused = useIsFocused();
  const [data, setData] = useState<OrderType[] | null>(null);

  useEffect(() => {
    getOrderList();
  }, [isFocused])

  return (
    <>
      <Header />
      <GestureHandlerRootView>
        <ScrollView>
          <View style={{ alignItems: "center" }}>
            {data && data.map((item, index) => (
              <OrderItem dataOfOrder={item} key={item.ONo + index.toString()} />
            ))}
          </View>
        </ScrollView>
      </GestureHandlerRootView>
    </>
  );
};

export default CustomerTruck;
