import React, { useEffect, useState } from "react";
import { Text, View } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import styles from "./style";
import { orderItemType } from "../OrderList";
import { AntDesign } from "@expo/vector-icons";
import { screenWidth } from "@/constants/Config";

interface itemProps {
  dataOfOrderItems: orderItemType;
  orderItems: orderItemType[];
  setOrderItems: (key: orderItemType[]) => void;
  setTotoalPrice: (key: number) => void;
  totalPrice: number; // 所有品項金額加總
}

const ItemCard = ({
  dataOfOrderItems,
  orderItems,
  setOrderItems,
  setTotoalPrice,
  totalPrice,
}: itemProps) => {
  const [onSelected, setOnSelected] = useState<boolean>(false);

  const handleOnSelected = () => {
    setOnSelected(!onSelected);
  };

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
          <AntDesign name="delete" size={24} color="black" />
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
