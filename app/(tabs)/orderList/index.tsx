import { Pressable } from 'react-native';
import React, { useEffect, useRef, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { TextInput } from '@/components/Themed';
import styles from './style';
import axios from 'axios';

import AdminTemplate from '@/components/AdminTemplate';
import { Text, View, TabBarIcon } from '@/components/Themed';
import { API_URL } from "@env";

interface dataType{
  id: string,
  time: string,
  customer: string,
}

interface newDataType{
  [key: string]: dataType[];
}

interface AllorderType{
  unchecked: dataType[],
  onprogress: dataType[],
  done: dataType[],
  cancel: dataType[]
}

interface productType{
  product_name: string,
  product_count: number,
  product_price: number
}

interface orderDetailsType{
  order_id: string,
  customer_id: string,
  customer_name: string,
  ship_way: string,
  ship_address: string, 
  pay_way: string
  customer_phone: string,
  order_time: string,
  note: string,
  total_cost: number,
  content: productType[],
  type: string
}

const rebuildOrderData = (listData: dataType[]) => {
  const newData: { [key: string]: dataType[] } = {};
  for (let data of listData) {
    const time = data.time.slice(0, 10);
    if (time in newData) newData[time].push({ ...data });
    else newData[time] = [{ ...data }];
  }
  return newData;
}

const OrderScreen = () => {
  const navigation = useNavigation();
  const [data, setData] = useState<newDataType>({});
  const all_order_data = useRef<AllorderType | null>(null);
  const [isPress, setIsPress] = useState([1, 0, 0]);
  const [latest_order, setLatestOrder] = useState<dataType| null>(null);

  useEffect(() => {
    axios.get<AllorderType>(`${API_URL}/get_all_order`)
    .then(response => {
      all_order_data.current = response.data;
      setData(rebuildOrderData(all_order_data.current.onprogress));
      setLatestOrder(all_order_data.current.unchecked.slice(-1)[0]);
    })
    .catch(err => {
      console.error(err);
    })
  }, [])
  return (
    <AdminTemplate
      topLayer={
        <>
          <Text style={styles.title}>查看訂單</Text>
          <Pressable
            onPress={() => navigation.navigate({name: 'Details', params: {id: latest_order?.id}} as never)}
            style={{width: '100%'}}
          >
            <View style={styles.mainCard}>
              <Text style={styles.cardTitle}>最新訂單</Text>
              <Text style={styles.cardContent}>訂單編號：{latest_order?.id}</Text>
              <Text style={styles.cardContent}>訂單人：{latest_order?.customer}</Text>
              <Text style={styles.cardContent}>下訂時間：{latest_order?.time}</Text>
              <Text style={styles.cardEvent}>點擊進行查看 </Text>
            </View>
          </Pressable>
          { all_order_data.current &&
            <View style={styles.navigator}>
              <Text style={[styles.tabLabel, {left: 110}]}>{all_order_data.current.onprogress.length}</Text>
              <Pressable
                onPressIn={() => setIsPress([1, 0, 0])}
                style={[(isPress[0] ? {backgroundColor: '#FFD52D'} : {backgroundColor: '#FFF'}), styles.navigatorTab]}
                onPress={() => setData(rebuildOrderData((all_order_data.current as AllorderType).onprogress))}
              >
                <Text style={{textAlign: 'center'}}>正在進行的訂單</Text>
              </Pressable>
              <Text style={[styles.tabLabel, {left: 220}]}>{all_order_data.current.unchecked.length}</Text>
              <Pressable
                onPressIn={() => setIsPress([0, 1, 0])}
                style={[(isPress[1] ? {backgroundColor: '#FFD52D'} : {backgroundColor: '#FFF'}), styles.navigatorTab]}
                onPress={() => setData(rebuildOrderData((all_order_data.current as AllorderType).unchecked))}
              >
                <Text style={{textAlign: 'center'}}>未確認的訂單</Text>
              </Pressable>
              <Pressable
                onPressIn={() => setIsPress([0, 0, 1])}
                style={[(isPress[2] ? {backgroundColor: '#FFD52D'} : {backgroundColor: '#FFF'}), styles.navigatorTab]}
                onPress={() => setData(rebuildOrderData((all_order_data.current as AllorderType).done))}
              >
                <Text style={{textAlign: 'center'}}>已完成的訂單</Text>
              </Pressable>
            </View>
           }
        </>
      }
      middleLayer={
        Object.keys(data).map((time, index) => (
          <TimeBasedView key={index} time={time} data={data} />
        ))
      }
    />
  );
}

const TimeBasedView = (props: {
  time: string
  data: {[key: string]: dataType[]},
}) => {
  return (
    <>
      <View>
        <Text style={styles.listTime}>{props.time}</Text>
      </View>
      {props.data[props.time].map((item, index) => (
        <OrderView key={index} index={index} item={item} />
      ))}
    </>
  )
}

const OrderView = (props: {
  index: number,
  item: dataType,
}) => {
  const navigation = useNavigation();
  return (
    <View style={[styles.listCard, (props.index === 0 && styles.listFirstCard)]}>
      <Text style={styles.listCardText}>訂單編號：{props.item.id}</Text>
      <Text style={styles.listCardText}>訂單人：{props.item.customer}</Text>
      <Text
        onPress={() => navigation.navigate({name: 'Details', params: {id: props.item.id}} as never)}
        style={{fontWeight: 'bold', padding: 2, paddingTop: 8}}
      >點擊進行查看 </Text>
    </View>
  )
}

const DetailsScreen = (props: any) => {
  const item = props.route.params;
  const navigation = useNavigation();
  const [order, setOrder] = useState<orderDetailsType | null>(null);
  const [cancelFactor, setCancelFactor] = useState("");

  useEffect(() => {
    axios.get(`${API_URL}/get_specific_order`, {
      params: {
        id: item.id
      }
    })
      .then(response => {
        const products: productType[] = []
        for(let i = 0; i < response.data.length; i++){
          products.push({
            product_name: response.data[i].product_name,
            product_price: response.data[i].product_price,
            product_count: response.data[i].product_count
          })
        }
        setOrder({
          ...response.data[0],
          content: products
        });
      })
      .catch(error => {
          console.error('Error:', error);
      })  
  }, [])

  return (
    <AdminTemplate
      topLayer={ order &&
        <>
          <View style={styles.back}>
            <Pressable onPress={() => navigation.navigate('Order' as never)}>
              <TabBarIcon name="arrow-back" size={32} color={'#000'}/>
            </Pressable>
            <Text
              style={{fontSize: 20, fontWeight: 'bold', marginLeft: 10}}
            >回到查看訂單</Text>
          </View>
          <TabBarIcon style={styles.imageCardChangeIcon} name="add-circle-sharp" size={32} color={'#FFF'} />
          <View style={[styles.mainCard, {width: '100%', marginLeft: 0}]}>
            <Text style={styles.orderTitle}>客戶資訊</Text>
            <View style={{width: '100%', marginBottom: 50}}>
              <View style={styles.tableColumn}>
                <Text style={styles.tableKey}>訂單編號</Text>
                <Text>{order.order_id}</Text>
              </View>
              <View style={styles.tableColumn}>
                <Text style={styles.tableKey}>客戶ID</Text>
                <Text>{order.customer_id}</Text>
              </View>
              <View style={styles.tableColumn}>
                <Text style={styles.tableKey}>客戶名稱</Text>
                <Text>{order.customer_name}</Text>
              </View>
              <View style={styles.tableColumn}>
                <Text style={styles.tableKey}>訂單時間</Text>
                <Text>{order.order_time}</Text>
              </View>

              <View style={styles.tableColumn}>
                <Text style={styles.tableKey}>連絡電話</Text>
                <Text>{order.customer_phone}</Text>
              </View>
              <View style={styles.tableColumn}>
                <Text style={styles.tableKey}>寄送方式</Text>
                <Text>{order.ship_way}</Text>
              </View>
              <View style={styles.tableColumn}>
                <Text style={styles.tableKey}>寄送地址</Text>
                <Text>{order.ship_address}</Text>
              </View>
              <View style={styles.tableColumn}>
                <Text style={styles.tableKey}>付款方式</Text>
                <Text>{order.pay_way}</Text>
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
              {order.content.map((product: productType, index) =>(
                <Product_details key={index} name={product.product_name} count={product.product_count} price={product.product_price} />
              ))}
              <View style={styles.tableColumn}>
                <Text style={styles.tableKey}>總金額</Text>
                <Text>{order.total_cost}</Text>
              </View>
            </View>
            <Text style={styles.orderTitle}>訂單備註</Text>
            <View style={{width: '100%', minHeight: 80, padding: 10}}>
              <Text>{order.note}</Text>
            </View>
          </View>
        </>
      }
      middleLayer={ order && order.type === 'unchecked' &&
        <>
          <Pressable style={styles.clickButton}>
            <Text style={{fontSize: 20, fontWeight: '700', color: '#FFF', textAlign: 'center'}}>確認訂單</Text>
          </Pressable>
          <View style={styles.cancelContainer}>
            <Text style={{marginBottom: 10}}>拒絕訂單</Text>
            <TextInput style={{height: 100, backgroundColor: '#FFF'}} placeholder='拒絕原因' value={cancelFactor} onChange={setCancelFactor} />
            <Pressable style={styles.cancelButton}>
              <Text style={{fontSize: 15, fontWeight: '700', color: '#FFF', textAlign: 'center'}}>送出拒絕</Text>
            </Pressable>
          </View>
        </>
      }
    />
  )
}

const Product_details = (props:{
  name: string,
  count: number,
  price: number
}) => {
  return (
    <View style={styles.tableColumn}>
      <Text style={styles.tableKey}>{props.name}</Text>
      <Text style={styles.tableKey}>x{props.count}</Text>
      <Text style={styles.tableKey}>{props.price}</Text>
    </View>
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