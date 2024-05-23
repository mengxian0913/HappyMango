import { TouchableHighlight, TextInput, TouchableOpacity } from 'react-native';
import React, { useEffect, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import styles from './style';
import axios from 'axios';

import AdminTemplate from '@/components/AdminTemplate';
import { Text, View, TabBarIcon } from '@/components/Themed';

interface dataType{
  id: string,
  time: string,
  name: string,
}

interface newDataType{
  [key: string]: dataType[];
}

const tableData = [
  {
    key: "",
    placeholder: ""
  }
]

const rebuildOrderData = (listData: dataType[]) => {
  const newData: { [key: string]: dataType[] } = {};
  for (let data of listData) {
    if (data.time in newData) newData[data.time].push({ ...data });
    else newData[data.time] = [{ ...data }];
  }
  return newData;
}

const OrderScreen = () => {
  const navigation = useNavigation();
  const [data, setData] = useState<newDataType>({});
  const [onProgressData, setOnProgressData] = useState<dataType[]>([]);
  const [unCheckData, setUnCheckData] = useState<dataType[]>([]);
  const [doneData, setDoneData] = useState<dataType[]>([]);
  const [isPress, setIsPress] = useState([1, 0, 0]);

  useEffect(() => {
    axios.get('http://localhost:3000/get_order_data')
    .then(response => {
      setOnProgressData(response.data.onprogress);
      setUnCheckData(response.data.uncheck);
      setDoneData(response.data.done);
      setData(rebuildOrderData(onProgressData));
    })
    .catch(err => {
      console.log(err);
    })
  }, [])
  return (
    <AdminTemplate
      topLayer={
        <>
          <Text style={styles.title}>查看訂單</Text>
          <View style={styles.mainCard}>
            <Text style={styles.cardTitle}>最新訂單</Text>
            <Text style={styles.cardContent}>訂單編號：00280187-10838-3092</Text>
            <Text style={styles.cardContent}>訂單人：Alan Jackson</Text>
            <Text style={styles.cardContent}>下訂時間：2024/04/15/12：15 </Text>
            <Text style={styles.cardEvent}>點擊進行查看 </Text>
          </View>
          <View style={styles.navigator}>
            <Text style={[styles.tabLabel, {left: 110}]}>{onProgressData.length}</Text>
            <TouchableHighlight
              onShowUnderlay={() => setIsPress([1, 0, 0])}
              style={[(isPress[0] ? {backgroundColor: '#FFD52D'} : {backgroundColor: '#FFF'}), styles.navigatorTab]}
              onPress={() => setData(rebuildOrderData(onProgressData))}
            >
              <Text style={{textAlign: 'center'}}>正在進行的訂單</Text>
            </TouchableHighlight>
            <Text style={[styles.tabLabel, {left: 220}]}>{unCheckData.length}</Text>
            <TouchableHighlight
              onShowUnderlay={() => setIsPress([0, 1, 0])}
              style={[(isPress[1] ? {backgroundColor: '#FFD52D'} : {backgroundColor: '#FFF'}), styles.navigatorTab]}
              onPress={() => setData(rebuildOrderData(unCheckData))}
            >
              <Text style={{textAlign: 'center'}}>未確認的訂單</Text>
            </TouchableHighlight>
            <TouchableHighlight
              onShowUnderlay={() => setIsPress([0, 0, 1])}
              style={[(isPress[2] ? {backgroundColor: '#FFD52D'} : {backgroundColor: '#FFF'}), styles.navigatorTab]}
              onPress={() => setData(rebuildOrderData(doneData))}
            >
              <Text style={{textAlign: 'center'}}>已完成的訂單</Text>
            </TouchableHighlight>
          </View>
        </>
      }
      middleLayer={
        <>
          {Object.keys(data).map((time, index) => (
            <>
              <View>
                <Text style={styles.listTime}>{time}</Text>
              </View>
              {data[time].map((item, index) => (
                <View style={[styles.listCard, (index === 0 && styles.listFirstCard)]}>
                  <Text style={styles.listCardText}>訂單編號：{item.id}</Text>
                  <Text style={styles.listCardText}>訂單人：{item.name}</Text>
                  <Text
                    onPress={() => navigation.navigate({name: 'Details', params: {...item}} as never)}
                    style={{fontWeight: 'bold', padding: 2, paddingTop: 8}}
                  >點擊進行查看 </Text>
                </View>
              ))}
            </>
          ))}
        </>
      }
    />
  );
}

const DetailsScreen = (props: any) => {
  const item = props.route.params;
  const navigation = useNavigation();
  const [data, setData] = useState(tableData);
  return (
    <AdminTemplate
      topLayer={
        <>
          <View style={styles.back}>
            <TabBarIcon
              name="arrow-back" size={32} color={'#000'}
            />
            <Text
              style={{fontSize: 20, fontWeight: 'bold', marginLeft: 10}}
              onPress={() => navigation.navigate('Order' as never)}
            >回到查看訂單</Text>
          </View>
          <TabBarIcon style={styles.imageCardChangeIcon} name="add-circle-sharp" size={32} color={'#FFF'} />
          <View style={[styles.mainCard, {width: '100%', marginLeft: 0}]}>
            <Text style={styles.orderTitle}>客戶資訊</Text>
            <View style={{width: '100%', marginBottom: 50}}>
              <View style={styles.tableColumn}>
                <Text style={styles.tableKey}>訂單編號</Text>
                <Text>0000000000</Text>
              </View>
              <View style={styles.tableColumn}>
                <Text style={styles.tableKey}>客戶ID</Text>
                <Text>0000000000</Text>
              </View>
              <View style={styles.tableColumn}>
                <Text style={styles.tableKey}>客戶名稱</Text>
                <Text>0000000000</Text>
              </View>
              <View style={styles.tableColumn}>
                <Text style={styles.tableKey}>訂單時間</Text>
                <Text>0000000000</Text>
              </View>

              <View style={styles.tableColumn}>
                <Text style={styles.tableKey}>連絡電話</Text>
                <Text>0000000000</Text>
              </View>
              <View style={styles.tableColumn}>
                <Text style={styles.tableKey}>寄送方式</Text>
                <Text>0000000000</Text>
              </View>
              <View style={styles.tableColumn}>
                <Text style={styles.tableKey}>付款方式</Text>
                <Text>0000000000</Text>
              </View>
              <View style={styles.divideLine}></View>
            </View>
            <Text style={styles.orderTitle}>訂單內容</Text>
            <View style={{width: '100%', marginBottom: 50}}>
              <View style={styles.tableColumn}>
                <Text style={styles.tableKey}>商品名稱</Text>
                <Text style={styles.tableKey}>下訂數量</Text>
                <Text style={styles.tableKey}>所需金額</Text>
              </View>
              <View style={styles.tableColumn}>
                <Text style={styles.tableKey}>水果組合籃</Text>
                <Text style={styles.tableKey}>x10</Text>
                <Text style={styles.tableKey}>1000</Text>
              </View>
              <View style={styles.tableColumn}>
                <Text style={styles.tableKey}>總金額</Text>
                <Text>1000</Text>
              </View>
            </View>
            <Text style={styles.orderTitle}>訂單備註</Text>
            <View style={{width: '100%', minHeight: 80, padding: 10}}>
              <Text>無</Text>
            </View>
          </View>
        </>
      }
      middleLayer={
        <>
          <TouchableOpacity style={styles.clickButton}>
            <Text style={{fontSize: 20, fontWeight: '700', color: '#FFF', textAlign: 'center'}}>確認訂單</Text>
          </TouchableOpacity>
        </>
      }
    />
  )
}

const OrderStack = createNativeStackNavigator();
export default function OrderStackScreen() {
  return (
    <OrderStack.Navigator screenOptions={{ headerShown: false }}>
      <OrderStack.Screen name="Order" component={OrderScreen} />
      <OrderStack.Screen name="Details" component={DetailsScreen} />
    </OrderStack.Navigator>
  );
};