import { StyleSheet } from 'react-native';
import React, { useState } from 'react';

import AdminTemplate from '@/components/AdminTemplate';
import { Text, View } from '@/components/Themed';

export default function TabNewScreen() {
  // const [data, setData] = useState(tableData);
  return (
    <AdminTemplate topLayerStyle={{height: 400}}>
      <Text style={styles.title}>新增商品</Text>
      <View style={styles.appendCover}>
        <Text>上傳照片</Text>
      </View>
      <View style={styles.mainCard}>
      </View>
    </AdminTemplate>
  );
}

const styles = StyleSheet.create({
  mainCard: {
    marginVertical: 20,
    alignItems: 'flex-start',
    backgroundColor: "#FFF",
    width: '90%',
    height: 200,
    marginLeft: 20,
    borderRadius: 10,
    zIndex: 2,
    padding: 20
  },
  appendCover: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: "#F1F1F1",
    width: '90%',
    height: 150,
    marginLeft: 20,
    borderRadius: 10,
  },
  title: {
    fontSize: 40,
    fontWeight: 'bold',
    marginTop: 80,
    marginLeft: 40,
    marginBottom: 10
  }
});
