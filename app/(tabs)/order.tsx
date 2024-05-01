import { StyleSheet, TouchableHighlight, TextInput, TouchableOpacity } from 'react-native';
import React, { useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import AdminTemplate from '@/components/AdminTemplate';
import { Text, View, TabBarIcon } from '@/components/Themed';

interface dataType{
  id: string,
  time: string,
  name: string,
}

const onProgressData: dataType[] = [{
  id: "00280187-10838-3092",
  name: "OuO",
  time: "2024-04-17"
},{
  id: "00280187-10838-3092",
  name: "NNNNNNNN",
  time: "2024-04-17"
}]
const unCheckData: dataType[] = [{
  id: "00280187-10838-3092",
  name: "Loss",
  time: "2024-04-17"
}]
const doneData: dataType[] = [{
  id: "00280187-10838-3092",
  name: "Alan Jackson",
  time: "2024-04-17"
},{
  id: "00280187-10838-3092",
  name: "Becker",
  time: "2024-04-17"
}]

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
  const [data, setData] = useState(rebuildOrderData(onProgressData));
  const [isPress, setIsPress] = useState([1, 0, 0])
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
            <TouchableHighlight
              onShowUnderlay={() => setIsPress([1, 0, 0])}
              style={[(isPress[0] ? {backgroundColor: '#FFD52D'} : {backgroundColor: '#FFF'}), styles.navigatorTab]}
              onPress={() => setData(rebuildOrderData(onProgressData))}
            >
              <Text style={{textAlign: 'center'}}>正在進行的訂單</Text>
            </TouchableHighlight>
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
            <View>
              <Text style={styles.listTime}>客戶資訊</Text>
            </View>
            <View>
              <Text style={styles.listTime}>訂單內容</Text>
            </View>
            <View>
              <Text style={styles.listTime}>訂單備註</Text>
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
const styles = StyleSheet.create({
  mainCard: {
    alignItems: 'flex-start',
    backgroundColor: "#FFF",
    width: '90%',
    height: 'auto',
    marginLeft: 20,
    borderRadius: 10,
    zIndex: 2,
    padding: 20
  },
  title: {
    fontSize: 40,
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
  cardContent: {
    fontSize: 15,
    fontWeight: 'bold',
    paddingBottom: 5
  },
  cardEvent: {
    fontSize: 18,
    marginTop: 20,
    fontWeight: 'bold'
  },
  navigator: {
    marginVertical: 20,
    width: '90%',
    height: 50,
    marginLeft: 20,
    borderRadius: 30,
    backgroundColor: "#FFF",
    flexDirection: 'row',
    justifyContent: 'center',
    padding: 10
  },
  navigatorTab: {
    width: '33%',
    padding: 5,
    textAlignVertical: 'center',
    fontWeight: 'bold',
    borderRadius: 30
  },
  listTime: {
    fontSize: 18,
    padding: 5,
    paddingLeft: 10,
    fontWeight: 'bold',
    backgroundColor: '#FFD52D',
    height: 50,
    width: 150
  },
  listFirstCard: {
    marginTop: -15,
  },
  listCardText: {
    fontWeight: 'bold',
    padding: 2
  },
  listCard: {
    marginVertical: 5,
    backgroundColor: '#FFF',
    width: 350,
    height: 100,
    borderRadius: 10,
    alignItems: 'flex-start',
    padding: 20,
    paddingTop: 10,
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
  imageCardChangeIcon: {
    position: 'absolute',
    top: 150,
    right: 40,
    zIndex: 2
  },
  back: {
    backgroundColor: 'none',
    alignItems: 'center',
    marginTop: 60,
    marginLeft: 20,
    flexDirection: 'row'
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
