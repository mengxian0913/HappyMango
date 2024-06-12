import Header from "../Header/Header";
import React, { useState } from "react";
import { View, Text, TextInput, Button, StyleSheet } from "react-native";

const NameSetting = () => {
  const [newName, setNewName] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleResetName = () => {
    // 在这里编写重设姓名的逻辑
    if (!newName) {
      setErrorMessage("新姓名不能为空");
      return;
    }

    // 执行姓名重设请求
    // 这里可以发送姓名重设请求到服务器，处理成功或失败的响应
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
        <Button title="提交" onPress={handleResetName} />
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
