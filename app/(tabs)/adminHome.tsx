import { StyleSheet, Image, ImageSourcePropType, TextInput } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';

import { Text, View, TabBarIcon } from '@/components/Themed';
import AdminTemplate from '@/components/AdminTemplate';

interface dataType{
  id: string,
  type: string,
  name: string,
  img: ImageSourcePropType
}

const listData: dataType[] = [
  {
    id: '001',
    type: "原型食物",
    name: "愛文芒果",
    img: require('../../assets/images/001.png')
  },
  {
    id: '002',
    type: "原型食物",
    name: "水果組合籃",
    img: require('../../assets/images/002.png')
  },
  {
    id: '003',
    type: "精緻食品",
    name: "芒果冰沙奶蓋",
    img: require('../../assets/images/003.png')
  },  
]

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

const rebuildListData = (listData: dataType[]) => {
  const newData: { [key: string]: dataType[] } = {};
  for (let data of listData) {
    if (data.type in newData) newData[data.type].push({ ...data });
    else newData[data.type] = [{ ...data }];
  }
  return newData;
}

const TabHomeScreen = () => {
  const navigation = useNavigation();
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
                <Image style={{width: 80, height: 80}} source={item.img} />
                <View style={{padding: 10}}>
                  <Text style={styles.listCardText}>商品名稱：{item.name}</Text>
                  <Text
                    style={{fontWeight: 'bold', padding: 2, paddingTop: 8}}
                    onPress={() => navigation.navigate({name: 'Details', params: {...item}} as never)}
                  >點擊進行查看</Text>
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
              onPress={() => navigation.navigate('Home' as never)}
            >回到首頁</Text>
          </View>
          <Image
            source={item.img}
            style={styles.imageContainer}
          />
          <TabBarIcon style={styles.imageCardChangeIcon} name="add-circle-sharp" size={32} color={'#FFF'} />
          <View style={styles.imageCard}>
            <Text style={[styles.cardTitle, {marginBottom: 0}]}>{item.name}</Text>
            <Text style={styles.cardSubTitle}>Mango Smoothie Milk Cap</Text>
            <View style={styles.imageCardBottom}>
              <TabBarIcon name="star" size={20} color={'#FFD52D'} />
              <Text style={{paddingLeft: 10}}>4.5 (15則評價)</Text>
            </View>
          </View>
        </>
      }
      middleLayer={
        <View style={[styles.mainCard, {width: '100%', marginLeft: 0}]}>
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
      }
    />
  )
}

const HomeStack = createNativeStackNavigator();
export default function HomeStackScreen() {
  return (
    <HomeStack.Navigator screenOptions={{ headerShown: false }}>
      <HomeStack.Screen name="Home" component={TabHomeScreen} />
      <HomeStack.Screen name="Details" component={DetailsScreen} />
    </HomeStack.Navigator>
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
  cardSubTitle: {
      fontSize: 18,
      fontWeight: '500',
      marginBottom: 10,
      color: '#D8CEBD'
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
  },
  imageContainer: {
      marginTop: 20,
      alignItems: 'flex-start',
      backgroundColor: "#FFF",
      width: '90%',
      minHeight: 300,
      height: 'auto',
      marginLeft: 20,
      borderRadius: 10,
      zIndex: 2,
      padding: 20,
      marginBottom: 20,
  },
  imageCard: {
      position: 'absolute',
      zIndex: 2,
      top: 120,
      left: 20,
      marginTop: 150,
      marginHorizontal: 20,
      width: '80%',
      height: 120,
      borderRadius: 20,
      padding: 10,
  },
  imageCardBottom: {
      flexDirection: 'row',
      alignItems: 'center',
      width: '100%',
      height: 30,
      paddingHorizontal: 10,
      borderRadius: 30,
      backgroundColor: '#F1F1F1'
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
  }
});
