import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { View, Pressable } from "react-native";
import { StyleSheet } from "react-native";
import { screenWidth, screenHeight } from "@/constants/Config";
import Colors from "@/constants/Colors";
import { FontAwesome6 } from "@expo/vector-icons";
import { useNavigation } from "expo-router";

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

export default Header;

const styles = StyleSheet.create({
  headerContainer: {
    width: screenWidth,
    height: screenHeight * 0.1,
    padding: 10,
    backgroundColor: Colors.light.tint,
  },
  headerText: {
    width: screenWidth,
    height: screenHeight * 0.05,
    padding: 8,
    fontSize: 20,
    fontWeight: "600",
  },
  orderCard: {
    width: screenWidth * 0.96,
    minHeight: screenHeight * 0.15,
    height: "auto",
    backgroundColor: "white",
    shadowOffset: { width: 0, height: 0.25 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    borderRadius: 20,
    marginVertical: 10,
    padding: 20,
  },
});
