import { StyleSheet } from "react-native";
import { screenWidth, screenHeight } from "@/constants/Config";
import Colors from "@/constants/Colors";

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

export default styles;
