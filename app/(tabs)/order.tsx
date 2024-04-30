import { StyleSheet } from 'react-native';
import React from 'react';

import AdminTemplate from '@/components/AdminTemplate';
import EditScreenInfo from '@/components/EditScreenInfo';
import { Text, View } from '@/components/Themed';

export default function TabOrderScreen() {
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
            <Text style={[styles.navigatorTab, styles.navigatorTabActive]}>正在進行的訂單</Text>
            <Text style={styles.navigatorTab}>未確認的訂單</Text>
            <Text style={styles.navigatorTab}>已完成的訂單</Text>
          </View>
        </>
      }
      middleLayer={
        <>
          <View>
            <Text style={styles.listTime}>2024-04-14</Text>
          </View>
          <View style={[styles.listFirstCard, styles.listCard]}>
            <Text style={styles.listCardText}>訂單編號：00280187-10838-3092</Text>
            <Text style={styles.listCardText}>訂單人：Alan Jackson</Text>
            <Text style={{fontWeight: 'bold', padding: 2, paddingTop: 8}}>點擊進行查看 </Text>
          </View>
          <View style={styles.listCard}>
            <Text style={styles.listCardText}>訂單編號：00280187-10838-3071</Text>
            <Text style={styles.listCardText}>訂單人：Alan Jackson</Text>
            <Text style={{fontWeight: 'bold', padding: 2, paddingTop: 8}}>點擊進行查看 </Text>
          </View>
          <View style={styles.listCard}>
            <Text style={styles.listCardText}>訂單編號：00280187-10838-2292</Text>
            <Text style={styles.listCardText}>訂單人：Alan Jackson</Text>
            <Text style={{fontWeight: 'bold', padding: 2, paddingTop: 8}}>點擊進行查看 </Text>
          </View>
          <View style={styles.listCard}>
            <Text style={styles.listCardText}>訂單編號：00280187-10838-2292</Text>
            <Text style={styles.listCardText}>訂單人：Alan Jackson</Text>
            <Text style={{fontWeight: 'bold', padding: 2, paddingTop: 8}}>點擊進行查看 </Text>
          </View>
          <View style={styles.listCard}>
            <Text style={styles.listCardText}>訂單編號：00280187-10838-2292</Text>
            <Text style={styles.listCardText}>訂單人：Alan Jackson</Text>
            <Text style={{fontWeight: 'bold', padding: 2, paddingTop: 8}}>點擊進行查看 </Text>
          </View>
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
    // position: 'absolute',
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
    textAlign: 'center',
    textAlignVertical: 'center',
    fontWeight: 'bold',
    borderRadius: 30
  },
  navigatorTabActive: {
    backgroundColor: '#FFD52D',
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
  }
});
