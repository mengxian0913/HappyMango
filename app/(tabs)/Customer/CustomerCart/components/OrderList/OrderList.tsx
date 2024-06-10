import React, { useState } from "react";
import { Pressable, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import styles from "./style";
import {
  GestureHandlerRootView,
  ScrollView,
} from "react-native-gesture-handler";
import ItemCard from "./ItemCard/ItemCard";
import { screenHeight, screenWidth } from "@/constants/Config";
import Colors from "@/constants/Colors";
import { useNavigation } from "expo-router";
import { NavigationProp } from "@react-navigation/native";
import { OrderRootStackParamList } from "../../CustomerCart";

const Header = () => {
  return (
    <SafeAreaView style={styles.headerContainer}>
      <Text style={styles.headerText}>Cart</Text>
    </SafeAreaView>
  );
};

interface contextProps {
  totalPrice: number;
  setTotalPrice: (key: number) => void;
  orderItems: orderItemType[];
  setOrderItems: (key: orderItemType[]) => void;
}

const Context = ({
  totalPrice,
  setTotalPrice,
  orderItems,
  setOrderItems,
}: contextProps) => {
  // fetch data from backend function ...
  const data = [
    {
      PID: "00000001",
      PName: "愛文芒果",
      Sell: 35,
      BNum: 10,
      TMoney: 350,
    },
    {
      PID: "00000002",
      PName: "玉井芒果",
      Sell: 40,
      BNum: 10,
      TMoney: 400,
    },
  ];

  return (
    <ScrollView>
      <View
        style={{
          height: screenHeight * 0.71,
          alignItems: "center",
        }}
      >
        {data.map((item) => (
          <ItemCard
            key={item.PID}
            orderItems={orderItems}
            setOrderItems={setOrderItems}
            dataOfOrderItems={item}
            totalPrice={totalPrice}
            setTotoalPrice={setTotalPrice}
          />
        ))}
      </View>
    </ScrollView>
  );
};

export type orderItemType = {
  PID: string;
  PName: string;
  Sell: number;
  BNum: number;
  TMoney: number;
};

interface props {
  totalPrice: number;
  orderItems: orderItemType[];
}

const OrderArea = ({ totalPrice, orderItems }: props) => {
  const navigation = useNavigation<NavigationProp<OrderRootStackParamList>>();
  const handleSubmitOrder = () => {
    if (orderItems.length > 0) {
      navigation.navigate("OrderSetUp", { orderItems });
    } else {
      console.log("Empty Selected");
    }
  };

  return (
    <View
      style={{
        width: screenWidth,
        height: screenHeight * 0.08,
        backgroundColor: "white",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-around",
      }}
    >
      <View style={{ flexDirection: "row" }}>
        <Text style={{ fontSize: 20, fontWeight: "600" }}>總金額: </Text>
        <Text style={{ fontSize: 20, color: "red", fontWeight: "600" }}>
          {totalPrice}
        </Text>
      </View>
      <Pressable onPress={handleSubmitOrder}>
        <View
          style={{
            borderRadius: 6,
            backgroundColor: Colors.light.tint,
            padding: 15,
            paddingHorizontal: 20,
          }}
        >
          <Text>我要下訂&ensp;</Text>
        </View>
      </Pressable>
    </View>
  );
};

const OrderList = () => {
  const [totalPrice, setTotalPrice] = useState<number>(0);
  const [orderItems, setOrderItems] = useState<orderItemType[]>([]);

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <View>
        <Header />
        <Context
          totalPrice={totalPrice}
          setTotalPrice={setTotalPrice}
          orderItems={orderItems}
          setOrderItems={setOrderItems}
        />
        <OrderArea totalPrice={totalPrice} orderItems={orderItems} />
      </View>
    </GestureHandlerRootView>
  );
};

export default OrderList;
