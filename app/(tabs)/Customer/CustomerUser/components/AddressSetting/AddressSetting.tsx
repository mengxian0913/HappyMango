import Header from "../Header/Header";
import React, { useState } from "react";
import { View, Text, TextInput, Button, StyleSheet } from "react-native";

const AddressSetting = () => {
  const [newLocation, setNewLocation] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleResetName = () => {
    if (!newLocation) {
      setErrorMessage("信箱不能為空");
      return;
    }
  };

  return (
    <>
      <Header />

      <View style={styles.container}>
        <Text style={styles.title}>重設地址</Text>
        {errorMessage ? <Text style={styles.error}>{errorMessage}</Text> : null}
        <TextInput
          style={styles.input}
          placeholder="新地址"
          value={newLocation}
          onChangeText={setNewLocation}
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

export default AddressSetting;
