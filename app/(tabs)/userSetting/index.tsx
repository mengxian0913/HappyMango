import { TextInput } from 'react-native';
import React, { useState } from 'react';
import AdminTemplate from '@/components/AdminTemplate';
import { Text, View } from '@/components/Themed';
import styles from './style';

const tableData = [
  {
    key:"商家名稱",
    placeholder: "輸入商家名稱"
  }, 
  {
    key:"聯絡電話",
    placeholder: "輸入聯絡電話"
  }, 
  {
    key:"聯絡地址",
    placeholder: "輸入聯絡地址"
  }, 
  {
    key:"商家介紹",
    placeholder: "輸入商家介紹"
  },
]

export default function TabAdminScreen() {
  const [data, setData] = useState(tableData);
  return (
    <AdminTemplate
      topLayer={
        <>
          <Text style={styles.title}>商家檔案設定</Text>
          <View style={styles.mainCard}>
            {data.map((pair) => (
              <View style={[styles.tableColumn, {height: pair.key !== '商家介紹' ? 40 : 300}]}>
                <Text style={styles.tableKey}>{pair.key}</Text>
                <TextInput
                  style={{
                    marginLeft: 10,
                    padding: 16,
                    backgroundColor: '#F1F1F1',
                    height: '100%',
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
        </>
      }
    />
  );
}