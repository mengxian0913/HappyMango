import React, { createContext, useContext, useRef, useState } from "react";
import {
  Pressable,
  Text,
  View,
  ScrollView,
  SafeAreaView,
  NativeSyntheticEvent,
  NativeScrollEvent,
  Image,
  Button,
} from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import styles from "./styles";
import { FontAwesome6 } from "@expo/vector-icons";
import { screenWidth } from "@/constants/Config";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import NotFoundScreen from "@/app/+not-found";
import { SimpleLineIcons } from "@expo/vector-icons";
import CommentDetail from "./CommentDetail/CommentDetail";
import comments from "./CommentDetail/comments.json";
import Colors from "@/constants/Colors";
import { Feather } from "@expo/vector-icons";

interface paramsProps {
  id: number;
  title: string;
  sell: number;
  price: number;
  description: string;
  image: string;
  bestDate: number;
}

const ItemContext = createContext<paramsProps | undefined>(undefined);

const ItemDetail = () => {
  const navigation = useNavigation();
  const scrollViewRef = useRef<ScrollView>(null);
  const [isScrollEnabled, setIsScrollEnabled] = useState(true);
  const item = useContext(ItemContext);
  const fewComment = comments.slice(0, 3);

  const handleOnPress = () => {
    console.log("Go Back");
    navigation.goBack();
  };

  const handleOnScroll = (e: NativeSyntheticEvent<NativeScrollEvent>) => {
    if (e.nativeEvent.contentOffset.y < 0) {
      if (scrollViewRef.current) {
        scrollViewRef.current.scrollTo({ y: 0, animated: false });
        setIsScrollEnabled(false);
      }
    } else {
      setIsScrollEnabled(true);
    }
  };

  if (!item) {
    console.error("Item is not found");
    return <NotFoundScreen />;
  }

  return (
    <ScrollView
      ref={scrollViewRef}
      scrollEnabled={isScrollEnabled}
      onScroll={handleOnScroll}
      scrollEventThrottle={16}
    >
      <SafeAreaView style={styles.navbarContainer}>
        <View style={{ width: screenWidth * 0.3 }}>
          <Pressable onPress={handleOnPress}>
            <View style={styles.backContainer}>
              <FontAwesome6 name="arrow-left" size={24} color="black" />
              <Text style={styles.navTitle}>Return</Text>
            </View>
          </Pressable>
          <View style={{ alignItems: "center", width: screenWidth }}>
            <Image source={{ uri: item.image }} style={styles.itemImage} />
            <View style={styles.itemTitle}>
              <Text style={{ fontSize: 18, fontWeight: "500" }}>
                {item.title}
              </Text>
            </View>
          </View>
        </View>
      </SafeAreaView>
      <View style={styles.contentContainer}>
        <View style={styles.priceContainer}>
          <Text style={styles.sell}>NT {item.sell} / 斤</Text>
          <Text style={styles.price}>NT {item.price} / 斤</Text>
        </View>
        <View style={styles.descriptionContainer}>
          <Text style={{ fontSize: 14, fontWeight: "800" }}>商品描述</Text>
          <View style={styles.descriptionContentContainer}>
            <Text>{item.description}</Text>
            <View style={styles.bestDate}>
              <Text style={{ fontSize: 14, fontWeight: "500" }}>
                最佳賞味期限：到貨後 {item.bestDate} 天
              </Text>
            </View>
          </View>
        </View>

        <Pressable
          onPress={() => navigation.navigate("CommentDetail" as never)}
        >
          <View style={styles.commentContainer}>
            <Text style={{ flex: 7 }}>全部評論(25)</Text>
            <Text style={{ flex: 1, fontSize: 12, color: "gray" }}>展開</Text>
            <SimpleLineIcons
              name="arrow-right"
              size={16}
              color="black"
              style={styles.commentIcon}
            />
          </View>
        </Pressable>
        <View>
          {fewComment.map((item, index) => (
            <View
              key={index}
              style={{
                marginVertical: 10,
                backgroundColor: Colors.light.background,
                borderRadius: 10,
                padding: 15,
              }}
            >
              <Text style={{ fontWeight: "500", marginBottom: 5 }}>
                客戶名稱: {item.customerName}
              </Text>
              <View style={{ flexDirection: "row", marginBottom: 5 }}>
                <Text style={{ marginRight: 10 }}>商品評分: {item.score}</Text>
                <Text>送貨品質: {item.delivery}</Text>
              </View>
              <View
                style={{
                  padding: 10,
                  borderRadius: 6,
                  backgroundColor: "lightgray",
                }}
              >
                <Text>{item.comment}</Text>
              </View>
            </View>
          ))}
        </View>
        <Pressable onPress={() => console.log("AAA")}>
          <View
            style={{
              borderRadius: 10,
              backgroundColor: Colors.light.tint,
              padding: 15,
            }}
          >
            <Text>
              加入購物車&ensp;
              <Feather name="shopping-cart" size={18} color="black" />
            </Text>
          </View>
        </Pressable>
      </View>
    </ScrollView>
  );
};

interface DetailStackParamList {
  ItemDetail: undefined;
  CommentDetail: undefined;
}

const DetailStack = createNativeStackNavigator<DetailStackParamList>();

const Detail = () => {
  const route = useRoute();
  const { id, title, sell, price, description, image, bestDate } = route.params;
  const item = {
    id: id,
    title: title,
    sell: sell,
    price: price,
    description: description,
    image: image,
    bestDate,
  };

  return (
    <ItemContext.Provider value={item}>
      <DetailStack.Navigator
        initialRouteName="ItemDetail"
        screenOptions={{ headerShown: true, gestureEnabled: true }}
      >
        <DetailStack.Screen name="ItemDetail" component={ItemDetail} />
        <DetailStack.Screen name="CommentDetail" component={CommentDetail} />
      </DetailStack.Navigator>
    </ItemContext.Provider>
  );
};

export default Detail;
