import React, { createContext, useState } from "react";
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

  return (
    <>
      <SafeAreaView style={styles.navContainer}>
        <Text style={styles.title}>Happy Mango</Text>
        <SelectBar onSelect={onSelect} setOnSelect={setOnSelect} />
      </SafeAreaView>
      <ScrollView>
        <View style={styles.contentContainer}>
          {data["archetypal-food"].map((item, index) => (
            <Item
              id={item.id}
              title={item.title}
              description={item.description}
              sell={item.sell}
              price={item.price}
              image={item.image}
              bestDate={item.bestDate}
              key={index}
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
