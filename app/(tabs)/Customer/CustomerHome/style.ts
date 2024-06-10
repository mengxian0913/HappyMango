import { Dimensions, StyleSheet } from "react-native";
import Colors from "@/constants/Colors";
const screenWidth = Dimensions.get("window").width;
const screenHeight = Dimensions.get("window").height;

const styles = StyleSheet.create({
  navContainer: {
    width: screenWidth,
    height: screenHeight * 0.2,
    backgroundColor: Colors.light.tint,
    borderBottomLeftRadius: 15,
    borderBottomRightRadius: 15,
    alignItems: "center",
  },
  title: {
    width: screenWidth,
    fontSize: 22,
    paddingLeft: 10,
    fontWeight: "600",
    textAlign: "left",
    marginVertical: 15,
  },
  navigationContainer: {
    width: screenWidth * 0.6,
    height: screenHeight * 0.05,
    flexDirection: "row",
    backgroundColor: Colors.light.background,
    borderRadius: 20,
  },
  selection: {
    flex: 1,
    padding: 4,
  },
  selectionText: {
    flex: 1,
    justifyContent: "center",
    borderRadius: 20,
  },
  contentContainer: {
    width: screenWidth,
    // backgroundColor: "red",
    padding: 10,
    alignItems: "center",
    justifyContent: "space-around",
  },
  itemContainer: {
    position: "relative",
    width: screenWidth * 0.95,
    height: screenHeight * 0.12,
    marginVertical: 10,
    backgroundColor: Colors.light.background,
    borderRadius: 10,
    flexDirection: "row",
    padding: 10,
  },
  itemImageContainer: {
    flex: 3,
  },
  itemImage: {
    flex: 1,
    borderRadius: 10,
  },
  itemContentContainer: {
    flex: 8,
    padding: 10,
  },
  itemIcon: {
    flex: 1,
    position: "absolute",
    top: 40,
    right: 10,
  },
});

export default styles;
