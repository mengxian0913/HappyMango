import Colors from "@/constants/Colors";
import { screenHeight, screenWidth } from "@/constants/Config";
import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  headerContainer: {
    width: screenWidth,
    maxHeight: screenHeight * 0.12,
    backgroundColor: Colors.light.tint,
  },
  headerText: {
    width: screenWidth,
    height: screenHeight * 0.05,
    padding: 8,
    fontSize: 20,
    fontWeight: "600"
  },
  bottomCard: {
    shadowOffset: { width: 0, height: -10 }, // 阴影偏移
    shadowOpacity: 0.1, // 阴影不透明度
    shadowRadius: 10, // 阴影半径
    width: screenWidth,
    height: screenHeight * 0.08,
    backgroundColor: "white",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
  }
});

export default styles;
