import React from "react";
import { Text, SafeAreaView, View, ScrollView, Pressable } from "react-native";
import styles from "./style";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Feather } from "@expo/vector-icons";
import { screenWidth } from "@/constants/Config";
import { useNavigation } from "expo-router";
import PasswordSetting from "./components/PasswordSetting/PasswordSetting";
import AddressSetting from "./components/AddressSetting/AddressSetting";
import NameSetting from "./components/NameSetting/NameSetting";
import EmailSetting from "./components/EmailSetting/EmailSetting";
import PhoneSetting from "./components/PhoneSetting/PhoneSetting";
import { Logout, store } from "@/scripts/redux";
import Colors from "@/constants/Colors";

const Header = () => {
  return (
    <SafeAreaView style={styles.headerContainer}>
      <Text style={styles.headerText}>User Setting</Text>
    </SafeAreaView>
  );
};

const ItemStack = createNativeStackNavigator();

interface SettingItemProps {
  setting: {
    label: string;
    name: string;
  };
}

const SettingItem = ({ setting }: SettingItemProps) => {
  const navigation = useNavigation();

  const handleOnClick = () => {
    navigation.navigate(setting.name as never);
    return;
  };

  return (
    <Pressable onPress={handleOnClick}>
      <View
        style={{
          backgroundColor: "white",
          width: screenWidth * 0.95,
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          paddingHorizontal: 15,
          paddingVertical: 20,
          marginVertical: 5,
          borderRadius: 15,
        }}
      >
        <Text>{setting.label}</Text>
        <Feather name="chevron-right" size={24} color="black" />
      </View>
    </Pressable>
  );
};

const SettingList = () => {
  const userSettings = [
    { label: "密碼設定", name: "passwordSetting" },
    { label: "地址設定", name: "addressSetting" },
    { label: "名字設定", name: "nameSetting" },
    { label: "信箱設定", name: "emailSetting" },
    { label: "電話號碼設定", name: "phoneSetting" },
  ];

  const currentUser = {
    userName: store.getState().name,
  };

  const handleLogout = () => {
    store.dispatch(Logout());
  };

  return (
    <View style={{ alignItems: "center" }}>
      <Header />
      <ScrollView>
        <View
          style={{
            width: screenWidth,
            padding: 10,
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
          <Text style={{ fontSize: 16, fontWeight: "500" }}>用戶:</Text>
          <Text style={{ fontSize: 16, fontWeight: "500" }}>
            {currentUser.userName}
          </Text>
        </View>

        <View
          style={{
            width: screenWidth * 0.98,
            height: "auto",
            alignItems: "center",
          }}
        >
          {userSettings.map((item, index) => (
            <SettingItem key={index} setting={item} />
          ))}
        </View>
      </ScrollView>
      <Pressable onPress={() => handleLogout()} style={[styles.pressButton]}>
        <Text
          style={{
            fontSize: 20,
            fontWeight: "700",
            color: "#FFF",
            textAlign: "center",
          }}
        >
          登出
        </Text>
      </Pressable>
    </View>
  );
};

const CustomerUser = () => {
  return (
    <>
      <ItemStack.Navigator
        initialRouteName="settingList"
        screenOptions={{
          headerShown: false,
        }}
      >
        <ItemStack.Screen name="settingList" component={SettingList} />
        <ItemStack.Screen name="passwordSetting" component={PasswordSetting} />
        <ItemStack.Screen name="addressSetting" component={AddressSetting} />
        <ItemStack.Screen name="nameSetting" component={NameSetting} />
        <ItemStack.Screen name="emailSetting" component={EmailSetting} />
        <ItemStack.Screen name="phoneSetting" component={PhoneSetting} />
      </ItemStack.Navigator>
    </>
  );
};

export default CustomerUser;
