import { useEffect, useState } from 'react';
import { useUpdateEffect } from '@/components/reactTools';
import { Pressable } from 'native-base';
import AdminTemplate from '@/components/AdminTemplate';
import { Text, View, TableCoulumn_TextInput, Feedback } from '@/components/Themed';
import styles from './style';
import axios from 'axios';
import { useIsFocused } from '@react-navigation/native';
import { Logout, store } from '@/scripts/redux';

const warningState = {
  name: {
    state: false,
    error: ""
  },
  description: {
    state: false,
    error: ""
  },
  phone: {
    state: false,
    error: ""
  },
  address: {
    state: false,
    error: ""
  }
}


export default function TabAdminScreen(params: any) {
  const isFocused = useIsFocused();
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [pressed, setPressed] = useState(false);
  const [success, setSuccess] = useState(false);
  const [update, setUpdate] = useState(false);
  const [id, setId] = useState("");
  const [warning,  setWarning] = useState(warningState);
  console.log(process.env.EXPO_PUBLIC_API_URL);

  const validateForm = () => {
    let flag = true;
    const warning_result = {...warningState};
    if(name == ""){
      warning_result['name'] = { state: true, error: "店家名稱不得為空" };
      flag = false;
    }
    if(description == ""){
      warning_result['description'] = { state: true, error: "店家介紹不得為空" };
      flag = false;
    }
    if(address == ""){
      warning_result['address'] = { state: true, error: "地址不得為空" };
      flag = false;
    }
    if(phone == "" || isNaN(parseInt(phone))){
      warning_result['phone'] = { state: true, error: "連絡電話不得為空或非數字" };
      flag = false;
    }
    setWarning(warning_result);
    return flag;
  }

  const handleSubmit = () => {
    setWarning({...warningState});
    if(!validateForm()) return;
    setPressed(true);
    axios.post(`${process.env.EXPO_PUBLIC_API_URL}/admin/update_seller`, {
      id, name, description, phone, address
    })
      .then(response => {
        console.log(response.data);
      })
      .catch(err => {
        console.error(err);
      })
      .finally(() => {
        setPressed(false);
        setSuccess(true);
        setUpdate(false);
      })
  }

  const handleLogout = () => {
    store.dispatch(Logout());
  }

  useEffect(() => {
    setUpdate(false);
    if(!isFocused) return;
    setPressed(false);
    setSuccess(false);
    axios.get(`${process.env.EXPO_PUBLIC_API_URL}/admin/get_seller`, {
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
        .finally(() => {
          setUpdate(false);
        })
  }, [isFocused])

  useUpdateEffect(() => {
    setUpdate(true);
  }, [name, description, address, phone])
  
  return (
    <AdminTemplate
      topLayer={
        <>
          <Text style={styles.title}>商家檔案設定</Text>
          <View style={styles.mainCard}>
            { warning.name.state && <Text style={styles.warningText}>{warning.name.error}</Text> }
            <TableCoulumn_TextInput name="商家名稱" placeholder='輸入商家名稱' value={name} onChange={setName} />
            { warning.phone.state && <Text style={styles.warningText}>{warning.phone.error}</Text> }
            <TableCoulumn_TextInput name="連絡電話" placeholder='輸入商家電話' value={phone} onChange={setPhone} />
            { warning.address.state && <Text style={styles.warningText}>{warning.address.error}</Text> }
            <TableCoulumn_TextInput name="商家地址" placeholder='輸入商家地址' value={address} onChange={setAddress} />
            { warning.description.state && <Text style={styles.warningText}>{warning.description.error}</Text> }
            <TableCoulumn_TextInput height={100} name="商家介紹" placeholder='輸入商家介紹' value={description} onChange={setDescription} />
          </View>
        </>
      }
      middleLayer={
        <>
          <Pressable onPress={() => update && handleSubmit()} style={[styles.pressButton, ((!update || pressed) && {opacity: .5} )]}>
            <Text style={{fontSize: 20, fontWeight: '700', color: '#FFF', textAlign: 'center'}}>{pressed ? "成功修改商家" : "修改商家設定"}</Text>
          </Pressable>
          <Pressable onPress={() => handleLogout()} style={[styles.pressButton]}>
            <Text style={{fontSize: 20, fontWeight: '700', color: '#FFF', textAlign: 'center'}}>登出商家</Text>
          </Pressable>
          {success && <Feedback status="success" title="成功修改商家檔案" onCancel={() => setSuccess(false)}/>}
        </>
      }
    />
  );
}