import { screenHeight, screenWidth } from "@/constants/Config";
import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    width: screenWidth * 0.95,
    minHeight: screenHeight * 0.15,
    marginVertical: 10,
    backgroundColor: "white",
    height: "auto",
    flexDirection: "row",
    padding: 20,
    borderRadius: 20,
    shadowOffset: { width: 0, height: 1 }, // 阴影偏移
    shadowOpacity: 0.25, // 阴影不透明度
    shadowRadius: 3.84, // 阴影半径
  },
  itemContent: {
    marginLeft: 16,
  },
});

export default styles;
