import { StyleSheet, TextInput, TouchableOpacity } from 'react-native';
import React, { useState } from 'react';

import AdminTemplate from '@/components/AdminTemplate';
import { Text, View } from '@/components/Themed';

const tableData = [
  {
    key:"商品名稱",
    placeholder: "輸入商品名稱"
  }, 
  {
    key:"原始價格",
    placeholder: "0NTD"
  }, 
  {
    key:"售出價格",
    placeholder: "0NTD"
  }, 
  {
    key:"商品類型",
    placeholder: "選擇商品類型"
  },
  {
    key:"庫存數量",
    placeholder: "0"
  },
  {
    key:"有效期限",
    placeholder: "0000/00/00"
  },
  {
    key:"商品說明",
    placeholder: "輸入商品說明"
  }
]

export default function TabNewScreen() {
  const [data, setData] = useState(tableData);
  return (
    <AdminTemplate
      topLayerStyle={{height: 400}}
      topLayer={
        <>
          <Text style={styles.title}>新增商品</Text>
          <View style={styles.appendCover}>
            <Text>上傳照片</Text>
          </View>
          <View style={styles.mainCard}>
            {data.map((pair) => (
              <View style={[styles.tableColumn, {height: pair.key !== '商品說明' ? 40 : 100}]}>
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
          <Text style={styles.smallText}>完成請滑至底部</Text>
          <TouchableOpacity style={styles.clickButton}>
            <Text style={{fontSize: 20, fontWeight: '700', color: '#FFF', textAlign: 'center'}}>新增此商品</Text>
        </TouchableOpacity>
        </>
      }
    />
  );
}

const styles = StyleSheet.create({
  mainCard: {
    marginVertical: 20,
    alignItems: 'flex-start',
    backgroundColor: "#FFF",
    width: '90%',
    height: 'auto',
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
  },
  smallText: {
    fontSize: 15,
    textAlign: 'center',
    width: '100%'
  },
  tableColumn: {
    alignItems: 'center',
    flexDirection: 'row',
    padding: 5,
    width: '100%',
    borderBottomWidth: 1,
    borderBottomColor: '#D8CEBD',
  },
  tableKey: {
    width: 'auto',
    fontSize: 20,
    fontWeight: 'bold',
  },
  divideLine: {
    position: 'absolute',
    left: 110,
    width: 1,
    height: '90%',
    backgroundColor: '#000'
  },
  clickButton: {
    marginTop: 200,
    marginBottom: 10,
    borderRadius: 15,
    justifyContent: 'center',
    height: 40,
    width: '100%',
    backgroundColor: '#EC9039',
  }
});
