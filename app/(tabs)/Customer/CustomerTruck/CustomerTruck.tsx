import React from "react";
import { Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import styles from "./style";
import {
  GestureHandlerRootView,
  ScrollView,
} from "react-native-gesture-handler";

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
  orderItems: OrderItemType[];
};

interface OrderItemProps {
  dataOfOrder: OrderType;
}

const OrderItem = ({ dataOfOrder }: OrderItemProps) => {
  return (
    <View style={styles.orderCard}>
      <Text>ONo: {dataOfOrder.ONo}</Text>
      <Text>OType: {dataOfOrder.OType}</Text>
      <Text>Delivery Status: {dataOfOrder.ShipWhere}</Text>
      <Text>Delivery Address: {dataOfOrder.ShipAddress}</Text>
      <View>
        {dataOfOrder.orderItems.map((item) => (
          <View>
            <View
              style={{
                borderBottomColor: "gray",
                borderBottomWidth: 1,
                marginVertical: 10,
              }}
            />

            <Text>PName: {item.PName}</Text>
            <Text>BuyNum: {item.BuyNum}</Text>
          </View>
        ))}
      </View>
    </View>
  );
};

const CustomerTruck = () => {
  const data: OrderType[] = [
    {
      ONo: "00000001",
      ShipWhere: "OnDelivery",
      OType: "Acccess",
      ShipAddress: "Maple Street, Springfield, CA",
      orderItems: [
        {
          PName: "MonagoA",
          BuyNum: 20,
        },
        {
          PName: "MonagoB",
          BuyNum: 20,
        },
      ],
    },
  ];

  return (
    <>
      <Header />
      <GestureHandlerRootView>
        <ScrollView>
          <View style={{ alignItems: "center" }}>
            {data.map((item, index) => (
              <OrderItem dataOfOrder={item} key={item.ONo + index.toString()} />
            ))}
            {data.map((item, index) => (
              <OrderItem dataOfOrder={item} key={item.ONo + index.toString()} />
            ))}
            {data.map((item, index) => (
              <OrderItem dataOfOrder={item} key={item.ONo + index.toString()} />
            ))}
            {data.map((item, index) => (
              <OrderItem dataOfOrder={item} key={item.ONo + index.toString()} />
            ))}
          </View>
        </ScrollView>
      </GestureHandlerRootView>
    </>
  );
};

export default CustomerTruck;
