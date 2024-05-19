import React, { useRef, useState } from "react";
import {
  Pressable,
  Text,
  View,
  ScrollView,
  SafeAreaView,
  NativeSyntheticEvent,
  NativeScrollEvent,
  Image,
} from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import styles from "./styles";
import { FontAwesome6 } from "@expo/vector-icons";
import { screenWidth } from "@/constants/Config";

interface paramsProps {
  title: string;
  sell: number;
  price: number;
  description: string;
  image: string;
}

const Detail = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const scrollViewRef = useRef<ScrollView>(null);
  const [isScrollEnabled, setIsScrollEnabled] = useState(true);
  const { title, sell, price, description, image }: paramsProps = route.params;

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
            <Image source={{ uri: image }} style={styles.itemImage} />
            <View style={styles.itemTitle}>
              <Text style={{ fontSize: 18, fontWeight: "500" }}>{title}</Text>
            </View>
          </View>
        </View>
      </SafeAreaView>
      <View style={styles.contentContainer}>
        <View style={styles.priceContainer}>
          <Text style={styles.sell}>NT {sell} / 斤</Text>
          <Text style={styles.price}>NT {price} / 斤</Text>
        </View>
        <View style={styles.descriptionContainer}>
          <Text style={{ fontSize: 14, fontWeight: "800" }}>商品描述</Text>
          <View style={styles.descriptionContentContainer}>
            <Text>{description}</Text>
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

export default Detail;
