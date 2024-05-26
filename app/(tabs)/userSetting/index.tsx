import React, { useEffect, useState } from 'react';
import { Pressable } from 'native-base';
import AdminTemplate from '@/components/AdminTemplate';
import { Text, View, TableCoulumn_TextInput } from '@/components/Themed';
import styles from './style';
import axios from 'axios';

export default function TabAdminScreen() {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [pressed, setPressed] = useState(false);
  const [id, setId] = useState("");

  const handleSubmit = () => {
    axios.post('http://localhost:3000/update_seller', {
      id, name, description, phone, address
    })
      .then(response => {
        console.log(response.data);
      })
      .catch(err => {
        console.error(err);
      })
  }

  useEffect(() => {
    axios.get('http://localhost:3000/get_seller', {
      })
        .then(response => {
          const seller = response.data[0];
          setId(seller.id);
          setName(seller.name);
          setDescription(seller.description);
          setPhone(seller.phone);
          setAddress(seller.address);
        })
        .catch(error => {
            console.error('Error:', error);
        })
  }, [])
  return (
    <AdminTemplate
      topLayer={
        <>
          <Text style={styles.title}>商家檔案設定</Text>
          <View style={styles.mainCard}>
            <TableCoulumn_TextInput name="商家名稱" placeholder='輸入商家名稱' value={name} onChange={setName} />
            <TableCoulumn_TextInput name="商家介紹" placeholder='輸入商家介紹' value={description} onChange={setDescription} />
            <TableCoulumn_TextInput name="連絡電話" placeholder='輸入商家電話' value={phone} onChange={setPhone} />
            <TableCoulumn_TextInput name="商家地址" placeholder='輸入商家地址' value={address} onChange={setAddress} />
            <View style={styles.divideLine}></View>
          </View>
        </>
      }
      middleLayer={
        <>
          <Pressable onPress={handleSubmit} style={pressed ? styles.pressOutButton : styles.pressInButton}>
            <Text style={{fontSize: 20, fontWeight: '700', color: '#FFF', textAlign: 'center'}}>{pressed ? "成功修改商家" : "修改商家設定"}</Text>
          </Pressable>
        </>
      }
    />
  );
}