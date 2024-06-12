import axios from "axios";
import Header from "../Header/Header";
import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  Pressable,
} from "react-native";
import { store, userLogin } from "@/scripts/redux";
import { useNavigation } from "expo-router";
import { screenWidth } from "@/constants/Config";

const NameSetting = () => {
  const [newName, setNewName] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const navigaion = useNavigation();

  const handleResetName = async () => {
    if (!newName) {
      setErrorMessage("新姓名不能為空");
      return;
    }

    const response = await axios.post(
      `${process.env.EXPO_PUBLIC_API_URL}/customer/reset_name`,
      {
        UID: store.getState().id,
        newName: newName,
      },
    );
    console.log(await response.data);

    store.dispatch(
      userLogin({
        id: store.getState().id,
        name: newName,
        address: store.getState().address,
        phone: store.getState().phone,
      }),
    ),
      navigaion.goBack();
  };

  return (
    <>
      <Header />

      <View style={styles.container}>
        <Text style={styles.title}>重設姓名</Text>
        {errorMessage ? <Text style={styles.error}>{errorMessage}</Text> : null}
        <TextInput
          style={styles.input}
          placeholder="新姓名"
          value={newName}
          onChangeText={setNewName}
        />
        <Pressable
          onPress={handleResetName}
          style={{
            marginTop: 10,
            backgroundColor: "orange",
            width: screenWidth * 0.6,
            borderRadius: 20,
          }}
        >
          <Text
            style={{
              fontSize: 20,
              fontWeight: "500",
              color: "white",
              padding: 6,
              textAlign: "center",
            }}
          >
            提交
          </Text>
        </Pressable>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  input: {
    width: "100%",
    height: 40,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    marginBottom: 10,
    paddingHorizontal: 10,
  },
  error: {
    color: "red",
    marginBottom: 10,
  },
});

export default NameSetting;
