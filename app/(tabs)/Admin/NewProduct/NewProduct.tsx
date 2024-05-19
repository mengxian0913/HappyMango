import { TextInput, TouchableOpacity } from "react-native";
import React, { useState } from "react";

import AdminTemplate from "@/components/AdminTemplate";
import { Text, View } from "@/components/Themed";
import styles from "./style";

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
    placeholder: "0NTD",
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

const NewProduct = () => {
  const [data, setData] = useState(tableData);
  return (
    <AdminTemplate
      topLayerStyle={{ height: 400 }}
      topLayer={
        <>
          <Text style={styles.title}>新增商品</Text>
          <View style={styles.appendCover}>
            <Text>上傳照片</Text>
          </View>
          <View style={styles.mainCard}>
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
        </>
      }
      middleLayer={
        <>
          <Text style={styles.smallText}>完成請滑至底部</Text>
          <TouchableOpacity style={styles.clickButton}>
            <Text
              style={{
                fontSize: 20,
                fontWeight: "700",
                color: "#FFF",
                textAlign: "center",
              }}
            >
              新增此商品
            </Text>
          </TouchableOpacity>
        </>
      }
    />
  );
};

export default NewProduct;
