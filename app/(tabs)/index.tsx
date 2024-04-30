import { StyleSheet, Image, ImageSourcePropType } from 'react-native';
import React, { useState } from 'react';

import { Text, View } from '@/components/Themed';
import AdminTemplate from '@/components/AdminTemplate';

interface dataType{
  type: string,
  name: string,
  img: ImageSourcePropType
}

const listData: dataType[] = [
  {
    type: "原型食物",
    name: "愛文芒果",
    img: require('../../assets/images/001.png')
  },
  {
    type: "原型食物",
    name: "水果組合籃",
    img: require('../../assets/images/002.png')
  },
  {
    type: "精緻食品",
    name: "芒果冰沙奶蓋",
    img: require('../../assets/images/003.png')
  },  
]

const rebuildListData = (listData: dataType[]) => {
  const newData: { [key: string]: dataType[] } = {};
  for (let data of listData) {
    if (data.type in newData) newData[data.type].push({ ...data });
    else newData[data.type] = [{ ...data }];
  }
  return newData;
}


export default function TabHomeScreen() {
  const [data, setData] = useState(rebuildListData(listData));
  return (
    <AdminTemplate
      topLayer={
        <>
          <Text style={styles.title}>HappyMango 後臺</Text>
          <View style={styles.mainCard}>
            <Text style={styles.cardTitle}>總收入：11,615</Text>
            <Text style={styles.cardTitle}>完成訂單：151 張</Text>
            <Text style={styles.cardTitle}>全部評論：101 則</Text>
            <Text style={styles.cardTitle}>整體頻論：3.5 / 5</Text>
          </View>
        </>
      }
      middleLayer={
        <>
        {Object.keys(data).map(type => (
          <> 
            <View>
              <Text style={styles.listType}>商品類型：{type}</Text>
            </View>
            {data[type].map((item) => (
              <View style={[styles.listFirstCard, styles.listCard]}>
                <Image style={{width: 80, height: 80}} source={item.img} />
                <View style={{padding: 10}}>
                  <Text style={styles.listCardText}>商品名稱：{item.name}</Text>
                  <Text style={{fontWeight: 'bold', padding: 2, paddingTop: 8}}>點擊進行查看</Text>
                </View>
              </View>
            ))}
          </>
        ))}
        </>
      }
    />
  );
}

const styles = StyleSheet.create({
  mainCard: {
    alignItems: 'flex-start',
    backgroundColor: "#FFF",
    width: '90%',
    height: 'auto',
    marginLeft: 20,
    borderRadius: 10,
    zIndex: 2,
    padding: 20,
    marginBottom: 20,
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    marginTop: 80,
    marginLeft: 40,
    marginBottom: 10
  },
  cardTitle: {
    fontSize: 30,
    fontWeight: 'bold',
    marginBottom: 10
  },
  listType: {
    fontSize: 18,
    padding: 5,
    paddingLeft: 10,
    fontWeight: 'bold',
    backgroundColor: '#FFD52D',
    height: 50,
    width: 'auto'
  },
  listFirstCard: {
    marginTop: -15,
  },
  listCardText: {
    fontWeight: 'bold',
    padding: 2
  },
  listCard: {
    flexDirection: 'row',
    marginVertical: 30,
    backgroundColor: '#FFF',
    width: 350,
    height: 'auto',
    borderRadius: 10,
    alignItems: 'center',
    padding: 20,
    paddingTop: 10,
  }
});
