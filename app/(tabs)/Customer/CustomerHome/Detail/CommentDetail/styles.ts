import { StyleSheet } from "react-native";
import Colors from "@/constants/Colors";
import { screenWidth, screenHeight } from "@/constants/Config";

const styles = StyleSheet.create({
  navContainer: {
    width: screenWidth,
    height: screenHeight * 0.1,
    backgroundColor: Colors.light.tint,
    paddingLeft: 10,
  },

  goBackContainer: {
    width: screenWidth * 0.08,
    height: screenHeight * 0.03,
  },
  contentContainer: {
    width: screenWidth,
    padding: 10,
  },
});

export default styles;
