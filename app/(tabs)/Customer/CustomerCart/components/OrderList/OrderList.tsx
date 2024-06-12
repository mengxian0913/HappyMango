import React, { useEffect, useRef, useState } from "react";
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
import { NavigationProp, useIsFocused } from "@react-navigation/native";
import { OrderRootStackParamList } from "../../CustomerCart";
import axios from "axios";
import { store } from "@/scripts/redux";
import { Feedback } from "@/components/Themed";
import { FeedbackType } from "@/constants/types/orderList";
import { position } from "native-base/lib/typescript/theme/styled-system";

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
  addFeedBack: (feedback: (FeedbackType & {id: string})) => void;
}

type CartItemType = {
  PID: string;
  PName: string;
  BNum: number;
  Sell: number;
  TMoney: number;
};

const Context = ({
  totalPrice,
  setTotalPrice,
  orderItems,
  setOrderItems,
  addFeedBack
}: contextProps) => {
  const [data, setData] = useState<CartItemType[] | null>(null);
  const isFocused = useIsFocused();
  const getCart = async () => {
    const response = await axios.post(
      `${process.env.EXPO_PUBLIC_API_URL}/customer/get_cart`,
      {
        UID: store.getState().id,
      },
    );
    const data = await response.data;
    setData(data);
  };

  useEffect(() => {
    getCart();
  }, [isFocused]);

  useEffect(() => {
    setTotalPrice(0);
  }, [data]);

  return (
    <ScrollView>
      <View
        style={{
          height: screenHeight * 0.71,
          alignItems: "center",
        }}
      >
        {data &&
          data.map((item) => (
            <ItemCard
              key={item.PID}
              orderItems={orderItems}
              setOrderItems={setOrderItems}
              dataOfOrderItems={item}
              totalPrice={totalPrice}
              setTotoalPrice={setTotalPrice}
              getCart={getCart}
              addFeedBack={addFeedBack}
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
    navigation.navigate("OrderSetUp", { orderItems });
  };

  return (
    <View
      style={styles.bottomCard}
    >
      <View style={{ flexDirection: "row" }}>
        <Text style={{ fontSize: 20, fontWeight: "600" }}>總金額： </Text>
        <Text style={{ fontSize: 20, color: "red", fontWeight: "600" }}>
          {totalPrice}
        </Text>
      </View>
      <Pressable onPress={() => orderItems.length > 0 && handleSubmitOrder()}>
        <View
          style={[{
            borderRadius: 6,
            backgroundColor: Colors.light.tint,
            padding: 15,
            paddingHorizontal: 20,
          }, (orderItems.length === 0 && { opacity: 0.4 })]}
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
  const [feedback_data, setFeedback] = useState<(FeedbackType & {id: string})[]>([]);

  const closeFeedBack = (id: string) => {
    feedback_data.forEach(feedback => {
      if (feedback.id === id) feedback.press = true;
    });
    setFeedback([...feedback_data]);
  }

  const addFeedBack = (feedback: (FeedbackType & {id: string})) => {
    setFeedback([...feedback_data.filter(feedback => !feedback.press), feedback]);
  }

  return (
    <>  
    <GestureHandlerRootView style={{ flex: 1 }}>
      <View style={{height: '100%', alignItems: 'center'}}>
        <Header />
        <Context
          totalPrice={totalPrice}
          setTotalPrice={setTotalPrice}
          orderItems={orderItems}
          setOrderItems={setOrderItems}
          addFeedBack={addFeedBack}
        />
        { feedback_data.length > 0 && feedback_data.map((feedback, index) => (!feedback.press && 
          <Feedback widith="90%" style={{marginBottom: 10}} key={index} status={feedback.status} title={feedback.title} onCancel={() => closeFeedBack(feedback.id)} />)
        )}
        <OrderArea totalPrice={totalPrice} orderItems={orderItems} />
      </View>
    </GestureHandlerRootView>
    </>
  );
};

export default OrderList;
