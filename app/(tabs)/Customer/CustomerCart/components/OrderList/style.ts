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
    fontWeight: "600",
  },
});

export default styles;
