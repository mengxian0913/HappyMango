import axios from "axios";
import Header from "../Header/Header";
import React, { useState } from "react";
import { View, Text, TextInput, StyleSheet, Pressable } from "react-native";
import { store } from "@/scripts/redux";
import { useNavigation } from "expo-router";
import { screenWidth } from "@/constants/Config";

const PasswordSetting = () => {
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const navigation = useNavigation();
  const handleResetPassword = async () => {
    if (newPassword !== confirmPassword) {
      setErrorMessage("密碼輸入不同");
      return;
    }

    const response = await axios.post(
      `${process.env.EXPO_PUBLIC_API_URL}/customer/reset_password`,
      {
        UID: store.getState().id,
        newPassword: newPassword,
      },
    );
    console.log(await response.data);
    navigation.goBack();
  };

  return (
    <>
      <Header />

      <View style={styles.container}>
        <Text style={styles.title}>重設密碼</Text>
        {errorMessage ? <Text style={styles.error}>{errorMessage}</Text> : null}
        <TextInput
          style={styles.input}
          placeholder="新密碼"
          secureTextEntry
          value={newPassword}
          onChangeText={setNewPassword}
        />
        <TextInput
          style={styles.input}
          placeholder="確認密碼"
          secureTextEntry
          value={confirmPassword}
          onChangeText={setConfirmPassword}
        />
        <Pressable
          onPress={handleResetPassword}
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

export default PasswordSetting;
