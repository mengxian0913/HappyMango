import { Pressable } from 'react-native';
import React, { useEffect, useRef, useState } from 'react';
import { useNavigation, useIsFocused } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { orderType, AllorderType, productType, orderDetailsType } from '@/constants/types/orderList';
import { TextInput } from '@/components/Themed';
import styles from './style';
import axios from 'axios';

import AdminTemplate from '@/components/AdminTemplate';
import { Text, View, TabBarIcon, Feedback } from '@/components/Themed';

const rebuildOrderData = (listData: orderType[]) => {
  const newData: { [key: string]: orderType[] } = {};
  for (let data of listData) {
    const time = data.time.slice(0, 10);
    if (time in newData) newData[time].push({ ...data });
    else newData[time] = [{ ...data }];
  }
  return newData;
}

const OrderScreen = () => {
  const isFocused = useIsFocused();
  const navigation = useNavigation();
  const [data, setData] = useState<{[key: string]: orderType[]}>({});
  const all_order_data = useRef<AllorderType | null>(null);
  const [isPress, setIsPress] = useState([1, 0, 0]);
  const [latest_order, setLatestOrder] = useState<orderType| null>(null);
  const [feedback_data, setFeedbackData] = useState([{
    status: "" as "success" | "error" | "info" | "warning",
    title: "",
    press: false
  }]);

  const addFeedback = (feedback: {id: string, status: "success" | "error" | "info" | "warning", title: string, press: boolean}) => {
    setFeedbackData([...feedback_data, feedback]);
  }

  useEffect(() => {
    console.log(`${process.env.EXPO_PUBLIC_API_URL}/get_all_order`);
    setIsPress([1, 0, 0]);
    axios.get<AllorderType>(`${process.env.EXPO_PUBLIC_API_URL}/admin/get_all_order`)
    .then(response => {
      all_order_data.current = response.data;
      setData(rebuildOrderData(all_order_data.current.onprogress));
      setLatestOrder(all_order_data.current.unchecked.slice(-1)[0]);
    })
    .catch(err => {
      console.error(err);
    })
  }, [isFocused])

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
          { feedback_data.map((feedback, index) => (
            !feedback.press && feedback.title.length > 0 && <Feedback key={index} status={feedback.status} title={feedback.title} onCancel={() => feedback.press = true} />
          ))}
          { all_order_data.current &&
            <View style={styles.navigator}>
              <Text style={[styles.tabLabel, {left: 110}]}>{all_order_data.current.onprogress.length}</Text>
              <Pressable
                onPressIn={() => setIsPress([1, 0, 0])}
                style={[(isPress[0] ? {backgroundColor: '#FFD52D'} : {backgroundColor: '#FFF'}), styles.navigatorTab]}
                onPress={() => setData(rebuildOrderData((all_order_data.current as AllorderType).onprogress))}
              >
                <Text style={{textAlign: 'center'}}>進行中的訂單</Text>
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
          <TimeBasedView addFeedback={addFeedback} key={index} time={time} data={data} />
        ))
      }
    />
  );
}

const TimeBasedView = (props: {
  time: string
  data: {[key: string]: orderType[]},
  addFeedback: (feedback: {
    id: string;
    status: "success" | "error" | "info" | "warning";
    title: string;
    press: boolean;
}) => void
}) => {
  return (
    <>
      <View style={{width: '100%', backgroundColor: '#F1F1F1'}}>
        <Text style={styles.listTime}>{props.time}</Text>
      </View>
      {props.data[props.time].map((item, index) => (
        <OrderView key={index} index={index} item={item} addFeedback={props.addFeedback} />
      ))}
    </>
  )
}

const OrderView = (props: {
  index: number,
  item: orderType,
  addFeedback: (feedback: {
    id: string;
    status: "success" | "error" | "info" | "warning";
    title: string;
    press: boolean;
}) => void
}) => {
  const navigation = useNavigation();
  return (
    <View style={[styles.listCard, (props.index === 0 && styles.listFirstCard)]}>
      <Text style={styles.listCardText}>訂單編號：{props.item.id}</Text>
      <Text style={styles.listCardText}>訂單人：{props.item.customer}</Text>
      <Text
        onPress={() => navigation.navigate({name: 'Details', params: {id: props.item.id, addFeedback: props.addFeedback}} as never)}
        style={{fontWeight: 'bold', padding: 2, paddingTop: 8}}
      >點擊進行查看 </Text>
    </View>
  )
}

const DetailsScreen = (props: any) => {
  const isFocused = useIsFocused();
  const item = props.route.params;
  const addFeedback = props.route.params.addFeedback;
  const navigation = useNavigation();
  const [order, setOrder] = useState<orderDetailsType | null>(null);
  const [cancelFactor, setCancelFactor] = useState("");

  const handleConfirm = () => {
    axios.post(`${process.env.EXPO_PUBLIC_API_URL}/admin/confirm_order`, {
      id: item.id
    })
      .then(res => {
        console.log(res.data);
        addFeedback({
          id: item.id,
          status: "success",
          title: `Order ${item.id} is confirmed.`,
          press: false
        })
        navigation.navigate('Order' as never);
      })
      .catch(err => {
        console.error(err);
      })
  }

  const handleCancel = () => {
    axios.post(`${process.env.EXPO_PUBLIC_API_URL}/admin/delete_order`, {
      id: item.id,
      factor: cancelFactor
    })
      .then(res => {
        addFeedback({
          id: item.id,
          status: "warning",
          title: `Order ${item.id} is cancel.`,
          press: false
        })
        navigation.navigate('Order' as never);
      })
      .catch(err => {
        console.error(err);
      })
  }

  useEffect(() => {
    if(!isFocused) return;
    axios.get(`${process.env.EXPO_PUBLIC_API_URL}/admin/get_specific_order`, {
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
  }, [isFocused])

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
            </View>
            <Text style={styles.orderTitle}>訂單內容</Text>
            <View style={{width: '100%', marginBottom: 50}}>
              <View style={[styles.tableColumn]}>
                <Text style={{width: '50%'}}>商品名稱</Text>
                <Text style={{width: '20%', textAlign: 'right'}}>下訂數量</Text>
                <Text style={{width: '30%', textAlign: 'right'}}>所需金額</Text>
              </View>
              {order.content.map((product: productType, index) =>(
                <Product_details key={index} name={product.product_name} count={product.product_count} price={product.product_price} />
              ))}
              <View style={styles.tableColumn}>
                <Text style={{width: '50%'}}>總金額</Text>
                <Text style={{width: '50%', textAlign: 'right', fontSize: 25, fontWeight: 500, color: '#FC2F00'}}>{order.total_cost}</Text>
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
          <Text style={styles.smallText}>確認完成請滑至底部</Text>
          <Pressable style={styles.clickButton} onPress={() => handleConfirm()}>
            <Text style={{fontSize: 20, fontWeight: '700', color: '#FFF', textAlign: 'center'}}>確認訂單</Text>
          </Pressable>
          <View style={styles.cancelContainer}>
            <Text style={{marginBottom: 10}}>拒絕訂單</Text>
            <TextInput style={{weight: '100%', height: 100, backgroundColor: '#FFF'}} placeholder='拒絕原因' value={cancelFactor} onChange={setCancelFactor} />
            <Pressable style={styles.cancelButton} onPress={() => handleCancel()}>
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
      <Text style={{width: '50%'}}>{props.name}</Text>
      <Text style={{width: '20%', textAlign: 'right'}}>x{props.count}</Text>
      <Text style={{width: '30%', textAlign: 'right'}}>{props.price}</Text>
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