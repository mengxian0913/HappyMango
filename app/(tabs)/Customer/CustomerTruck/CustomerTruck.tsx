import React, { useEffect, useState } from "react";
import { Pressable, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import styles from "./style";
import {
  GestureHandlerRootView,
  ScrollView,
} from "react-native-gesture-handler";
import axios from "axios";
import { useIsFocused } from "@react-navigation/native";
import { store } from "@/scripts/redux";
import { screenWidth } from "@/constants/Config";
import Colors from "@/constants/Colors";
import { useEvent } from "react-native-reanimated";

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
  const orderItems: OrderItemType[] = JSON.parse(
    dataOfOrder.orderItems as string,
  );

  return (
    <View style={styles.orderCard}>
      <View style={styles.infoContainer}>
        <Text style={styles.title}>訂單編號:</Text>
        <Text style={styles.content}>{dataOfOrder.ONo.toUpperCase()}</Text>
      </View>
      <View style={styles.infoContainer}>
        <Text style={styles.title}>運送狀態:</Text>
        <Text style={styles.content}>{dataOfOrder.ShipWhere}</Text>
      </View>

      <View>
        <Text style={[styles.title, { marginTop: 10 }]}>運送地址:</Text>
        <View style={styles.addressContainer}>
          <Text style={{ fontSize: 14, fontWeight: "400" }}>
            Delivery Address: {dataOfOrder.ShipAddress}
          </Text>
        </View>
      </View>
      <View style={{ width: screenWidth * 0.9, marginTop: 15 }}>
        <Text style={styles.title}>購買商品:</Text>
      </View>
      <View>
        {orderItems &&
          orderItems.map((item, index) => (
            <OrderCard key={index} PName={item.PName} BuyNum={item.BuyNum} />
          ))}
      </View>
    </View>
  );
};

const OrderCard = (props: { PName: string; BuyNum: number }) => {
  return (
    <View
      style={{
        width: screenWidth * 0.9,
        backgroundColor: "orange",
        marginVertical: 10,
        flexDirection: "row",
        justifyContent: "space-between",
        padding: 12,
        borderRadius: 10,
      }}
    >
      <Text>商品: {props.PName}</Text>
      <Text>購買數量: {props.BuyNum}</Text>
    </View>
  );
};

interface CategoryProps {
  category: string;
  setCategory: (key: string) => void;
}

const Category = ({ setCategory, category }: CategoryProps) => {
  const status = ["unchecked", "cancel", "onprogress", "done"];

  return (
    <View
      style={{
        width: screenWidth * 0.95,
        flexDirection: "row",
        justifyContent: "space-around",
        alignItems: "center",
        marginVertical: 20,
      }}
    >
      {status.map((item) => (
        <Pressable
          style={{
            padding: 14,
            backgroundColor: category === item ? Colors.light.tint : "white",
            borderRadius: 30,
          }}
          key={item}
          onPress={() => setCategory(item)}
        >
          <Text>{cateMap[item]}</Text>
        </Pressable>
      ))}
    </View>
  );
};

const cateMap: { [key: string]: string } = {
  unchecked: "待確認",
  onprogress: "進行中",
  cancel: "已取消",
  done: "已完成",
};

const CustomerTruck = () => {
  const getOrderList = async () => {
    const response = await axios.get(
      `${process.env.EXPO_PUBLIC_API_URL}/customer/get_all_order`,
    );
    const data = (await response.data) as OrderType[];
    const orderList = data.filter((order) => {
      return order.UID === store.getState().id;
    });
    setData(orderList);
  };

  const isFocused = useIsFocused();
  const [data, setData] = useState<OrderType[] | null>(null);
  const [category, setCategory] = useState<string>("unchecked");

  useEffect(() => {
    getOrderList();
  }, [isFocused]);

  return (
    <>
      <Header />
      <GestureHandlerRootView>
        <ScrollView>
          <View style={{ width: screenWidth, alignItems: "center" }}>
            <Category setCategory={setCategory} category={category} />
          </View>

          <View style={{ alignItems: "center" }}>
            {data ? (
              <>
                {data.some((item) => item.OType === category) ? (
                  <>
                    {data.map(
                      (item, index) =>
                        item.OType === category && (
                          <OrderItem
                            dataOfOrder={item}
                            key={item.ONo + index.toString()}
                          />
                        ),
                    )}
                  </>
                ) : (
                  <>
                    <View style={styles.orderCard}>
                      <Text>查無 {cateMap[category]} 的訂單</Text>
                    </View>
                  </>
                )}
              </>
            ) : (
              <>
                <View style={styles.orderCard}>
                  <Text>你沒有任何訂單紀錄</Text>
                </View>
              </>
            )}
          </View>
        </ScrollView>
      </GestureHandlerRootView>
    </>
  );
};

export default CustomerTruck;
