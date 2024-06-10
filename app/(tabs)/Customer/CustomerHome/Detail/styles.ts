import { StyleSheet } from "react-native";
import Colors from "@/constants/Colors";
import { screenWidth, screenHeight } from "@/constants/Config";

const styles = StyleSheet.create({
  navbarContainer: {
    width: screenWidth,
    height: screenHeight * 0.35,
    backgroundColor: Colors.light.tint,
  },
  backContainer: {
    flexDirection: "row",
    width: screenWidth * 0.3,
    padding: 10,
    alignItems: "center",
  },
  navTitle: {
    fontSize: 20,
    marginLeft: 8,
    fontWeight: "600",
  },
  itemImage: {
    width: screenWidth * 0.9,
    height: screenHeight * 0.2,
    borderRadius: 10,
  },
  itemTitle: {
    position: "relative",
    bottom: screenWidth * 0.1,
    width: screenWidth * 0.8,
    paddingVertical: 15,
    paddingHorizontal: 10,
    borderRadius: 10,
    backgroundColor: Colors.light.background,
  },
  contentContainer: {
    width: screenWidth,
    paddingVertical: 15,
    paddingHorizontal: 20,
    alignItems: "center",
  },
  priceContainer: {
    width: screenWidth * 0.9,
    marginBottom: 10,
  },
  sell: {
    fontSize: 18,
    fontWeight: "500",
  },
  price: {
    textDecorationLine: "line-through",
    fontSize: 16,
    fontWeight: "300",
    color: "gray",
  },
  descriptionContainer: {
    width: screenWidth * 0.9,
    marginVertical: 10,
  },
  descriptionContentContainer: {
    backgroundColor: Colors.light.background,
    padding: 15,
    borderRadius: 10,
    marginTop: 10,
  },
  bestDate: {
    marginTop: 10,
    width: screenWidth * 0.85,
    padding: 10,
    borderRadius: 15,
    backgroundColor: Colors.light.tint,
  },
  commentContainer: {
    marginTop: 10,
    width: screenWidth * 0.9,
    padding: 15,
    borderRadius: 10,
    backgroundColor: Colors.light.background,
    flexDirection: "row",
    alignItems: "center",
  },
  commentIcon: {
    flex: 1,
    position: "absolute",
    top: 15,
    right: 10,
  },
});

export default styles;
