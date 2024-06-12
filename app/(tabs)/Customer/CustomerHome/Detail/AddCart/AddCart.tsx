import React, {
  useContext,
  useMemo,
  useRef,
  useState,
  RefObject,
  useEffect,
} from "react";
import { Button, Text, View, Pressable } from "react-native";
import BottomSheet from "@gorhom/bottom-sheet";
import { PanGestureHandler } from "react-native-gesture-handler";
import { ItemContext } from "../Detail";
import { screenHeight, screenWidth } from "@/constants/Config";
import Colors from "@/constants/Colors";
import { useNavigation } from "expo-router";
import axios from "axios";
import { store } from "@/scripts/redux";

interface submitProps {
  totalPrice: number;
  handleOnSubmit: () => void;
}

const TotalPriceAndButton = ({ totalPrice, handleOnSubmit }: submitProps) => {
  return (
    <View
      style={{
        width: screenWidth,
        position: "absolute",
        bottom: 100,
        right: -20,
        alignItems: "center",
      }}
    >
      <View
        style={{
          width: screenWidth * 0.8,
        }}
      >
        <View
          style={{
            margin: 10,
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
          <Text style={{ fontSize: 16, fontWeight: "400" }}>總金額</Text>
          <Text style={{ fontSize: 16, fontWeight: "400" }}>{totalPrice}</Text>
        </View>
        <Pressable onPress={handleOnSubmit}>
          <View
            style={[
              {
                backgroundColor: Colors.light.tint,
                borderRadius: 20,
                padding: 10,
              },
              totalPrice <= 0 && { opacity: 0.4 },
            ]}
          >
            <Text
              style={{ fontSize: 18, fontWeight: 500, textAlign: "center" }}
            >
              加入購物車
            </Text>
          </View>
        </Pressable>
      </View>
    </View>
  );
};

interface counterProps {
  amount: number;
  totalAmount: number;
  setTotalAmount: (value: number) => void;
}

const AmountAndCounter = ({
  amount,
  totalAmount,
  setTotalAmount,
}: counterProps) => {
  return (
    <View
      style={{
        marginTop: 50,
        flexDirection: "row",
        justifyContent: "space-between",
      }}
    >
      <View style={{ flexDirection: "row" }}>
        <Text style={{ fontWeight: "500" }}>數量 </Text>
        <Text>(剩餘 {amount} 份)</Text>
      </View>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
        }}
      >
        <Pressable onPress={() => setTotalAmount(Math.max(0, totalAmount - 1))}>
          <View
            style={{
              padding: 5,
              borderRadius: 20,
              backgroundColor: Colors.light.tabIconDefault,
            }}
          >
            <Text>-</Text>
          </View>
        </Pressable>
        <Text style={{ marginHorizontal: 10 }}>{totalAmount}</Text>
        <Pressable
          onPress={() => setTotalAmount(Math.min(totalAmount + 1, amount))}
        >
          <View
            style={{
              padding: 5,
              borderRadius: 20,
              backgroundColor: Colors.light.tabIconDefault,
            }}
          >
            <Text>+</Text>
          </View>
        </Pressable>
      </View>
    </View>
  );
};

interface addCartProps {
  bottomSheetRef: RefObject<BottomSheet>;
}

const AddCart = ({ bottomSheetRef }: addCartProps) => {
  const navigation = useNavigation();
  const snapPoints = useMemo(() => ["50%"], []);
  const [totalAmount, setTotalAmount] = useState<number>(0);
  const item = useContext(ItemContext);
  const [amount, setAmount] = useState<number>(0);

  const getAmountOfItem = async () => {
    const response = await axios.post(
      `${process.env.EXPO_PUBLIC_API_URL}/customer/get_amount`,
      {
        PID: item?.id,
      },
    );
    setAmount(await response.data);
  };

  // 加入購物車
  const handleOnSubmit = async () => {
    if (store.getState().role === "") {
      navigation.navigate("Login" as never);
      return;
    }

    if (totalAmount <= 0) {
      return;
    }

    bottomSheetRef.current?.close();
    const response = await axios.post(
      `${process.env.EXPO_PUBLIC_API_URL}/customer/add_to_cart`,
      {
        UID: store.getState().id,
        PID: item.id,
        PName: item.title,
        BNum: totalAmount,
        TMoney: totalAmount * item.sell,
      },
    );
    navigation.navigate("cart" as never);
  };

  if (!item) {
    return null;
  }

  useEffect(() => {
    getAmountOfItem();
  }, []);

  return (
    <BottomSheet
      snapPoints={snapPoints}
      style={{ padding: 20 }}
      ref={bottomSheetRef}
      index={-1}
      enablePanDownToClose={true}
    >
      <PanGestureHandler>
        <View style={{ height: screenHeight * 0.5 }}>
          <View>
            <Text style={{ fontSize: 18, fontWeight: "500" }}>
              NT {item.sell} / 份
            </Text>
            <Text
              style={{
                fontSize: 14,
                fontWeight: "200",
                color: "gray",
                textDecorationLine: "line-through",
              }}
            >
              NT {item.price} / 份
            </Text>
          </View>
          <AmountAndCounter
            amount={amount}
            totalAmount={totalAmount}
            setTotalAmount={setTotalAmount}
          />
          <TotalPriceAndButton
            totalPrice={totalAmount * item.sell}
            handleOnSubmit={handleOnSubmit}
          />
        </View>
      </PanGestureHandler>
    </BottomSheet>
  );
};

export default AddCart;
