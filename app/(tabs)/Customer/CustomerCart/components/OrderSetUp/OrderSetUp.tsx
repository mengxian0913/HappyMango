import React, { useState } from "react";
import { FontAwesome6 } from "@expo/vector-icons";
import { useNavigation } from "expo-router";
import { Text, Pressable, View, Button, TextInput } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import styles from "./style";
import {
  GestureHandlerRootView,
  ScrollView,
} from "react-native-gesture-handler";
import { screenHeight, screenWidth } from "@/constants/Config";
import Colors from "@/constants/Colors";
import { useRoute, RouteProp } from "@react-navigation/native";
import { OrderRootStackParamList } from "../../CustomerCart";

type orderItemType = {
  PID: string;
  PName: string;
  Sell: number;
  BNum: number;
  TMoney: number;
};

interface orderSetUpProps {
  orderItems: orderItemType[];
}

const Header = () => {
  const navigation = useNavigation();
  return (
    <SafeAreaView style={styles.headerContainer}>
      <View style={{ height: screenHeight * 0.1, width: screenWidth * 0.3 }}>
        <Pressable onPress={() => navigation.goBack()}>
          <FontAwesome6 name="arrow-left" size={24} color="black" />
        </Pressable>
      </View>
    </SafeAreaView>
  );
};

interface itemPrps {
  item: orderItemType;
}

const ShowItems = ({ item }: itemPrps) => {
  return (
    <View style={styles.showItemContainer}>
      <Text style={{ fontSize: 16, marginVertical: 5, fontWeight: "600" }}>
        商品名稱: {item.PName}
      </Text>
      <Text style={{ fontSize: 16, marginVertical: 5, fontWeight: "600" }}>
        商品價格: {item.Sell}
      </Text>
      <Text style={{ fontSize: 16, marginVertical: 5, fontWeight: "600" }}>
        購買數量: {item.BNum}
      </Text>
    </View>
  );
};

const SetUpForm = ({ orderItems }: orderSetUpProps) => {
  const [payWay, setPayWay] = useState<string>("credit");
  const [deliveryWay, setDeliveryWay] = useState<string>("air"); // air, land, sea
  const [deliveryAddress, setDeliveryAddress] = useState<string>("");

  const navigation = useNavigation();

  const onSubmitOrder = async () => {
    const deliveryInfo = {
      payWay: payWay,
      deliveryWay: deliveryWay,
      deliveryAddress: deliveryAddress,
    };
    console.log("deliveryInfo: ", deliveryInfo);
    console.log("myItems: ", orderItems);
    console.log("submit the order form...");
    // Connect to backed-end ...
    navigation.goBack();
    navigation.navigate("truck" as never);
    return;
  };

  return (
    <ScrollView>
      <View style={{ alignItems: "center", paddingBottom: 20 }}>
        {orderItems.map((item) => (
          <ShowItems item={item} key={item.PID} />
        ))}
        <View style={styles.payWayContainer}>
          <Text style={{ fontSize: 18, fontWeight: "500" }}>付款方式</Text>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-around",
              alignItems: "center",
              marginTop: 20,
            }}
          >
            <Pressable onPress={() => setPayWay("credit")}>
              <View
                style={{
                  paddingVertical: 12,
                  paddingHorizontal: 16,
                  borderRadius: 15,
                  backgroundColor:
                    payWay === "credit" ? Colors.light.tint : "white",
                  borderColor: Colors.light.tint,
                  borderWidth: 2,
                }}
              >
                <Text>Credit</Text>
              </View>
            </Pressable>
            <Pressable onPress={() => setPayWay("cash")}>
              <View
                style={{
                  paddingVertical: 12,
                  paddingHorizontal: 16,
                  borderRadius: 15,
                  backgroundColor:
                    payWay === "cash" ? Colors.light.tint : "white",
                  borderColor: Colors.light.tint,
                  borderWidth: 2,
                }}
              >
                <Text>Cash</Text>
              </View>
            </Pressable>
          </View>
        </View>
        <View style={styles.deliveryContainer}>
          <Text style={{ fontSize: 18, fontWeight: "500" }}>運送方式</Text>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-around",
              alignItems: "center",
              marginTop: 20,
            }}
          >
            <Pressable onPress={() => setDeliveryWay("air")}>
              <View
                style={{
                  paddingVertical: 12,
                  paddingHorizontal: 16,
                  borderRadius: 15,
                  backgroundColor:
                    deliveryWay === "air" ? Colors.light.tint : "white",
                  borderColor: Colors.light.tint,
                  borderWidth: 2,
                }}
              >
                <Text>Air</Text>
              </View>
            </Pressable>
            <Pressable onPress={() => setDeliveryWay("sea")}>
              <View
                style={{
                  paddingVertical: 12,
                  paddingHorizontal: 16,
                  borderRadius: 15,
                  backgroundColor:
                    deliveryWay === "sea" ? Colors.light.tint : "white",
                  borderColor: Colors.light.tint,
                  borderWidth: 2,
                }}
              >
                <Text>Sea</Text>
              </View>
            </Pressable>
            <Pressable onPress={() => setDeliveryWay("land")}>
              <View
                style={{
                  paddingVertical: 12,
                  paddingHorizontal: 16,
                  borderRadius: 15,
                  backgroundColor:
                    deliveryWay === "land" ? Colors.light.tint : "white",
                  borderColor: Colors.light.tint,
                  borderWidth: 2,
                }}
              >
                <Text>Land</Text>
              </View>
            </Pressable>
          </View>
        </View>
        <View style={styles.deliveryAddressContainer}>
          <Text style={{ fontSize: 18, fontWeight: "500" }}>運送地址</Text>
          <TextInput
            style={styles.addressInput}
            placeholder="Type here..."
            value={deliveryAddress}
            onChangeText={(newText) => setDeliveryAddress(newText)}
          />
        </View>
        <Pressable onPress={onSubmitOrder}>
          <View style={styles.submitContainer}>
            <Text
              style={{
                fontSize: 16,
                fontWeight: "600",
                textAlign: "center",
              }}
            >
              送出訂單
            </Text>
          </View>
        </Pressable>
      </View>
    </ScrollView>
  );
};

type OrderSetUpRouteProp = RouteProp<OrderRootStackParamList, "OrderSetUp">;

const OrderSetUp = () => {
  const route = useRoute<OrderSetUpRouteProp>();
  const { orderItems } = route.params;
  console.log("myOrderItems: ", orderItems);

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <Header />
      <SetUpForm orderItems={orderItems} />
    </GestureHandlerRootView>
  );
};

export default OrderSetUp;
