import React, { useEffect, useState } from "react";
import { Text, View } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import styles from "./style";
import { orderItemType } from "../OrderList";
import { AntDesign } from "@expo/vector-icons";
import { screenWidth } from "@/constants/Config";
import axios from "axios";
import { store } from "@/scripts/redux";
import { FeedbackType } from "@/constants/types/orderList";

interface itemProps {
  dataOfOrderItems: orderItemType;
  orderItems: orderItemType[];
  setOrderItems: (key: orderItemType[]) => void;
  setTotoalPrice: (key: number) => void;
  getCart: () => Promise<void>;
  totalPrice: number; // 所有品項金額加總
  addFeedBack: (feedback: (FeedbackType & {id: string})) => void;
}

const ItemCard = ({
  dataOfOrderItems,
  orderItems,
  setOrderItems,
  setTotoalPrice,
  getCart,
  totalPrice,
  addFeedBack
}: itemProps) => {
  const [onSelected, setOnSelected] = useState<boolean>(false);
  const handleOnSelected = () => {
    setOnSelected(!onSelected);
  };

  const handleRemove = async () => {
    await axios.delete(`${process.env.EXPO_PUBLIC_API_URL}/customer/delete_cart`, {
      params: { orderID: {PID: dataOfOrderItems.PID, UID: store.getState().id}},
    })
    getCart();
    addFeedBack({
      id: dataOfOrderItems.PID,
      status: 'warning',
      title: `${dataOfOrderItems.PID} 成功從購物車移除`,
      press: false
    })
  }

  useEffect(() => {
    if (onSelected === true) {
      setOrderItems([...orderItems, dataOfOrderItems]);
      setTotoalPrice(
        totalPrice + dataOfOrderItems.Sell * dataOfOrderItems.BNum,
      );
    } else {
      const currentOrderItems = orderItems.filter(
        (item) => item.PID !== dataOfOrderItems.PID,
      );

      setOrderItems(currentOrderItems);
      setTotoalPrice(
        Math.max(0, totalPrice - dataOfOrderItems.Sell * dataOfOrderItems.BNum),
      );
    }
  }, [onSelected]);

  return (
    <View style={styles.container}>
      <MaterialIcons
        onPress={handleOnSelected}
        name={!onSelected ? "radio-button-unchecked" : "radio-button-checked"}
        size={24}
        color="black"
      />
      <View style={styles.itemContent}>
        <View
          style={{
            width: screenWidth * 0.75,
            alignItems: "flex-end",
          }}
        >
          <AntDesign onPress={handleRemove} name="delete" size={24} color="black" />
        </View>
        <Text style={{ fontSize: 18, fontWeight: "500" }}>
          {dataOfOrderItems.PName}
        </Text>
        <Text style={{ fontSize: 17, fontWeight: "500", marginTop: 15 }}>
          數量： {dataOfOrderItems.BNum}
        </Text>
        <Text
          style={{
            fontSize: 18,
            fontWeight: "600",
            marginTop: 20,
            color: "lightred",
          }}
        >
          {dataOfOrderItems.Sell} / 份
        </Text>
      </View>
    </View>
  );
};

export default ItemCard;
