import { Image, ImageSourcePropType, TextInput } from "react-native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useNavigation } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import styles from "./style";

import { Text, View, TabBarIcon } from "@/components/Themed";
import AdminTemplate from "@/components/AdminTemplate";

interface dataType {
  id: string;
  type: string;
  name: string;
  img: ImageSourcePropType;
}

interface newDataType {
  [key: string]: dataType[];
}

const tableData = [
  {
    key: "商品名稱",
    placeholder: "輸入商品名稱",
  },
  {
    key: "原始價格",
    placeholder: "0NTD",
  },
  {
    key: "售出價格",
    placeholder: "NTD",
  },
  {
    key: "商品類型",
    placeholder: "選擇商品類型",
  },
  {
    key: "庫存數量",
    placeholder: "0",
  },
  {
    key: "有效期限",
    placeholder: "0000/00/00",
  },
  {
    key: "商品說明",
    placeholder: "輸入商品說明",
  },
];

// const rebuildListData = (listData: dataType[]) => {
//   const newData: { [key: string]: dataType[] } = {};
//   for (let data of listData) {
//     if (data.type in newData) {
//       data.img = require("../../../assets/images/002.png");
//       newData[data.type].push(data);
//     } else {
//       data.img = require("../../../assets/images/001.png");
//       newData[data.type] = [data];
//     }
//   }
//   return newData;
// };
//
const TabHomeScreen = () => {
  const navigation = useNavigation();
  const [data, setData] = useState<newDataType>({});

  // useEffect(() => {
  //   axios
  //     .get("http://localhost:3000/get_data")
  //     .then((response) => {
  //       setData(rebuildListData(response.data));
  //     })
  //     .catch((error) => {
  //       console.error("Error:", error);
  //     });
  // }, []);
  return (
    <AdminTemplate
      topLayer={
        <>
          <Text style={styles.title}>HappyMango 後臺</Text>
          <View style={styles.mainCard}>
            <Text style={styles.cardTitle}>總收入：611,615</Text>
            <Text style={styles.cardTitle}>完成訂單：151 張</Text>
            <Text style={styles.cardTitle}>全部評論：101 則</Text>
            <Text style={styles.cardTitle}>整體評論：3.5 / 5</Text>
          </View>
        </>
      }
      middleLayer={
        <>
          {Object.keys(data).map((type, index) => (
            <>
              <View>
                <Text style={styles.listType}>商品類型：{type}</Text>
              </View>
              {data[type].map((item, index) => (
                <View style={[styles.listFirstCard, styles.listCard]}>
                  <Image style={{ width: 80, height: 80 }} source={item.img} />
                  <View style={{ padding: 10 }}>
                    <Text style={styles.listCardText}>
                      商品名稱：{item.name}
                    </Text>
                    <Text
                      style={{ fontWeight: "bold", padding: 2, paddingTop: 8 }}
                      onPress={() =>
                        navigation.navigate({
                          name: "Details",
                          params: { ...item },
                        } as never)
                      }
                    >
                      點擊進行查看
                    </Text>
                  </View>
                </View>
              ))}
            </>
          ))}
        </>
      }
    />
  );
};

const DetailsScreen = (props: any) => {
  const item = props.route.params;
  const navigation = useNavigation();
  const [data, setData] = useState(tableData);
  return (
    <AdminTemplate
      topLayer={
        <>
          <View style={styles.back}>
            <TabBarIcon name="arrow-back" size={32} color={"#000"} />
            <Text
              style={{ fontSize: 20, fontWeight: "bold", marginLeft: 10 }}
              onPress={() => navigation.navigate("Home" as never)}
            >
              回到首頁
            </Text>
          </View>
          <Image source={item.img} style={styles.imageContainer} />
          <TabBarIcon
            style={styles.imageCardChangeIcon}
            name="add-circle-sharp"
            size={32}
            color={"#FFF"}
          />
          <View style={styles.imageCard}>
            <Text style={[styles.cardTitle, { marginBottom: 0 }]}>
              {item.name}
            </Text>
            <Text style={styles.cardSubTitle}>Mango Smoothie Milk Cap</Text>
            <View style={styles.imageCardBottom}>
              <TabBarIcon name="star" size={20} color={"#FFD52D"} />
              <Text style={{ paddingLeft: 10 }}>4.5 (15則評價)</Text>
            </View>
          </View>
        </>
      }
      middleLayer={
        <View style={[styles.mainCard, { width: "100%", marginLeft: 0 }]}>
          {data.map((pair) => (
            <View
              style={[
                styles.tableColumn,
                { height: pair.key !== "商品說明" ? 40 : 100 },
              ]}
            >
              <Text style={styles.tableKey}>{pair.key}</Text>
              <TextInput
                style={{
                  marginLeft: 10,
                  padding: 16,
                  backgroundColor: "#F1F1F1",
                  height: "100%",
                }}
                placeholder={pair.placeholder}
              />
            </View>
          ))}
          <View style={styles.divideLine}></View>
        </View>
      }
    />
  );
};

const HomeStack = createNativeStackNavigator();
const AdminHome = () => {
  return (
    <HomeStack.Navigator screenOptions={{ headerShown: false }}>
      <HomeStack.Screen name="Home" component={TabHomeScreen} />
      <HomeStack.Screen name="Details" component={DetailsScreen} />
    </HomeStack.Navigator>
  );
};

export default AdminHome;
