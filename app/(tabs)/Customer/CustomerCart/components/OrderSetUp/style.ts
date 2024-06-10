import Colors from "@/constants/Colors";
import { screenHeight, screenWidth } from "@/constants/Config";
import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  headerContainer: {
    width: screenWidth,
    height: screenHeight * 0.1,
    padding: 10,
    backgroundColor: Colors.light.tint,
  },
  payWayContainer: {
    width: screenWidth * 0.96,
    height: screenHeight * 0.15,
    backgroundColor: "white",
    shadowOffset: { width: 0, height: 0.25 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    borderRadius: 20,
    marginVertical: 10,
    padding: 20,
  },
  deliveryContainer: {
    width: screenWidth * 0.96,
    height: screenHeight * 0.15,
    backgroundColor: "white",
    shadowOffset: { width: 0, height: 0.25 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    borderRadius: 20,
    marginVertical: 10,
    padding: 20,
  },
  deliveryAddressContainer: {
    width: screenWidth * 0.96,
    height: screenHeight * 0.15,
    backgroundColor: "white",
    shadowOffset: { width: 0, height: 0.25 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    borderRadius: 20,
    marginVertical: 10,
    padding: 20,
  },
  addressInput: {
    marginTop: 25,
    height: 40,
    borderColor: "gray",
    borderWidth: 0.5,
    paddingLeft: 8,
    width: "100%",
    borderRadius: 5,
  },
  submitContainer: {
    marginTop: 30,
    width: screenWidth * 0.45,
    minHeight: 50,
    justifyContent: "center",
    backgroundColor: Colors.light.tint,
    borderRadius: 20,
  },
  showItemContainer: {
    width: screenWidth * 0.96,
    height: screenHeight * 0.15,
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
