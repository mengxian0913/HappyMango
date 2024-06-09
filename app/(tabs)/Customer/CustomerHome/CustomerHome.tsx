import React, { createContext, useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import {
  createNativeStackNavigator,
  NativeStackNavigationProp,
} from "@react-navigation/native-stack";
import {
  ScrollView,
  TouchableHighlight,
  View,
  Text,
  Image,
  Pressable,
} from "react-native";
import styles from "./style";
import { SafeAreaView } from "react-native-safe-area-context";
import Colors from "@constants/Colors";
import data from "./data.json";
import { SimpleLineIcons } from "@expo/vector-icons";
import Detail from "./Detail/Detail";
import axios from "axios";

interface selectBarProps {
  onSelect: boolean;
  setOnSelect: (prop: boolean) => void;
}

interface itemProps {
  id: number;
  title: string;
  price: number;
  sell: number;
  description: string;
  image: string;
  bestDate: number;
}

const SelectBar = ({ onSelect, setOnSelect }: selectBarProps) => {
  // true => whole, false => processed
  return (
    <View style={styles.navigationContainer}>
      <TouchableHighlight
        style={styles.selection}
        onPress={() => setOnSelect(true)}
        underlayColor="transparent"
      >
        <View
          style={[
            styles.selectionText,
            onSelect ? { backgroundColor: Colors.light.tint } : null,
          ]}
        >
          <Text
            style={{
              textAlign: "center",
              fontSize: 15,
              fontWeight: 500,
            }}
          >
            原型食物
          </Text>
        </View>
      </TouchableHighlight>
      <TouchableHighlight
        style={styles.selection}
        onPress={() => setOnSelect(false)}
        underlayColor="transparent"
      >
        <View
          style={[
            styles.selectionText,
            !onSelect ? { backgroundColor: Colors.light.tint } : null,
          ]}
        >
          <Text style={{ textAlign: "center", fontSize: 15, fontWeight: 500 }}>
            加工食品
          </Text>
        </View>
      </TouchableHighlight>
    </View>
  );
};

type RootStackParamList = {
  Items: undefined;
  Detail: {
    id: number;
    title: string;
    price: number;
    sell: number;
    description: string;
    image: string;
    bestDate: number;
  };
};

const Item = ({
  id,
  title,
  price,
  sell,
  description,
  image,
  bestDate,
}: itemProps) => {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const handleNavigation = () => {
    console.log("Go to Detail Component");
    navigation.navigate("Detail", {
      id,
      title,
      price,
      sell,
      description,
      image,
      bestDate,
    });
  };

  return (
    <Pressable style={styles.itemContainer} onPress={handleNavigation}>
      <View style={styles.itemImageContainer}>
        <Image
          source={{
            uri: image,
          }}
          style={styles.itemImage}
        />
      </View>
      <View style={styles.itemContentContainer}>
        <Text style={{ fontSize: 18, fontWeight: 600, marginBottom: 5 }}>
          {title}
        </Text>
        <Text
          style={{
            fontSize: 14,
            color: "gray",
            textDecorationLine: "line-through",
          }}
        >
          {price} / 斤
        </Text>

        <Text>{sell} / 斤</Text>
      </View>
      <SimpleLineIcons
        name="arrow-right"
        size={20}
        color="black"
        style={styles.itemIcon}
      />
    </Pressable>
  );
};

const Items = () => {
  const [onSelect, setOnSelect] = useState<boolean>(false);
  const [itemData, setItemData] = useState<any>([]);
  const [itemDataWhole, setItemDataWhole] = useState<any>([]);
  const [itemDataProcessed, setItemDataProcessed] = useState<any>([]);
  const getItems = async () => {
    const response = await axios.get(
      `${process.env.EXPO_PUBLIC_API_URL}/getCustomerProduct`,
    );
    const data = await response.data;
    setItemData(data);
  };

  useEffect(() => {
    getItems();
  }, []);

  useEffect(() => {
    if (itemData) {
      const arrW = [];
      const arrP = [];
      for (let i of itemData) {
        if (i.PType === "whole") {
          arrW.push(i);
        } else {
          arrP.push(i);
        }
      }
      setItemDataWhole([...arrW]);
      setItemDataProcessed([...arrP]);
    }
  }, [itemData]);

  return (
    <>
      <SafeAreaView style={styles.navContainer}>
        <Text style={styles.title}>Happy Mango</Text>
        <SelectBar onSelect={onSelect} setOnSelect={setOnSelect} />
      </SafeAreaView>
      <ScrollView>
        <View style={styles.contentContainer}>
          {onSelect
            ? itemDataWhole.map((item: any) => (
                <Item
                  id={item.PID}
                  title={item.PName}
                  description={item.PDescribe}
                  sell={item.SalePrice}
                  price={item.Price}
                  image={item.img}
                  bestDate={7}
                  key={item.PID}
                />
              ))
            : itemDataProcessed.map((item: any) => (
                <Item
                  id={item.PID}
                  title={item.PName}
                  description={item.PDescribe}
                  sell={item.SalePrice}
                  price={item.Price}
                  image={item.img}
                  bestDate={7}
                  key={item.PID}
                />
              ))}
        </View>
      </ScrollView>
    </>
  );
};

const ItemStack = createNativeStackNavigator<RootStackParamList>();

const CustomerHome = () => {
  return (
    <ItemStack.Navigator
      initialRouteName="Items"
      screenOptions={{ headerShown: false, gestureEnabled: true }}
    >
      <ItemStack.Screen name="Items" component={Items} />
      <ItemStack.Screen name="Detail" component={Detail} />
    </ItemStack.Navigator>
  );
};

export default CustomerHome;
