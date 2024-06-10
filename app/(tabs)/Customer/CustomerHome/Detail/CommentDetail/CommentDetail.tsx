import React, { useContext, useEffect, useState } from "react";
import styles from "./styles";
import { ItemContext } from "../Detail";
import { SafeAreaView } from "react-native-safe-area-context";
import { FontAwesome6 } from "@expo/vector-icons";
import { useNavigation } from "expo-router";
import { View, Pressable, Text, ScrollView } from "react-native";
import Colors from "@/constants/Colors";
import axios from "axios";
import { CommentType } from "@/constants/types/customerHome";

const CommentDetail = () => {
  const navigation = useNavigation();
  const item = useContext(ItemContext);
  const [comments, setComments] = useState<CommentType[]>([]);

  const getComments = async () => {
    const response = await axios.post(
      `${process.env.EXPO_PUBLIC_API_URL}/customer/get_comments`, {
        PID: item?.id,
      },
    );
    const data = await response.data;
    setComments(data);
  };

  useEffect(() => {
    getComments();
  }, []);

  return (
    <>
      <SafeAreaView style={styles.navContainer}>
        <View style={styles.goBackContainer}>
          <Pressable onPress={() => navigation.goBack()}>
            <FontAwesome6 name="arrow-left" size={24} color="black" />
          </Pressable>
        </View>
      </SafeAreaView>
      <ScrollView style={styles.contentContainer}>
        <View>
          {comments.length > 0 && comments.map((item, index) => (
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
      </ScrollView>
    </>
  );
};

export default CommentDetail;
