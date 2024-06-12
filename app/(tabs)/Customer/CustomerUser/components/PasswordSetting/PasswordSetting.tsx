import Header from "../Header/Header";
import React, { useState } from "react";
import { View, Text, TextInput, Button, StyleSheet } from "react-native";

const PasswordSetting = () => {
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleResetPassword = () => {
    // 在这里编写重设密码的逻辑
    if (newPassword !== confirmPassword) {
      setErrorMessage("密碼輸入不同");
      return;
    }

    // 执行密码重设请求
    // 这里可以发送密码重设请求到服务器，处理成功或失败的响应
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
        <Button title="提交" onPress={handleResetPassword} />
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
