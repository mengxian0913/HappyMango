import { Pressable, Image } from 'react-native';
import React, { useState } from 'react';
import axios from 'axios';
import { uploadImage, launchImageLibrary } from '@/scripts/fileHandler';

import AdminTemplate from '@/components/AdminTemplate';
import { Text, View, TableCoulumn_TextInput, TableColumn_SelectInput } from '@/components/Themed';
import styles from "./style";

const warningState = {
  name: {
    state: false,
    error: ""
  },
  price: {
    state: false,
    error: ""
  },
  salePrice: {
    state: false,
    error: ""
  },
  count: {
    state: false,
    error: ""
  },
  date: {
    state: false,
    error: ""
  },
  type: {
    state: false,
    error: ""
  },
  description: {
    state: false,
    error: ""
  }
}

export default function TabNewScreen() {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [salePrice, setSalePrice] = useState("");
  const [type, setType] = useState("");
  const [count, setCount] = useState("");
  const [date, setDate] = useState("");
  const [description, setDescription] = useState("");
  const [imageData, setImageData] = useState<string | null>(null);
  const [pressed, setPressed] = useState(false);
  const [warning, setWarning] = useState(warningState);

  const handleImageUpload = async () => {
    const image = await launchImageLibrary();
    if(image) setImageData(image);
  }

  const validateForm = () => {
    let flag = true;
    const warning_result = {...warningState};
    if(name === ""){
      flag = false;
      warning_result['name'] = { state: true, error: "商品名稱不得為空" };
    }
    if(parseInt(price) < 0 || isNaN(parseInt(price))){
      flag = false;
      warning_result['price'] = { state: true, error: "原始價格不可小於零或非數字輸入" };
    } 
    if(parseInt(salePrice) < 0 || isNaN(parseInt(salePrice))){
      flag = false;
      warning_result['salePrice'] = { state: true, error: "售出價格不可小於零或非數字輸入" };
    }
    if(type === ""){
      flag = false;
      warning_result['type'] = { state: true, error: "得選擇商品類型" };
    } 
    if(parseInt(count) < 0 || isNaN(parseInt(count))){
      flag = false;
      warning_result['count'] = { state: true, error: "庫存數量不可小於零或非數字輸入" };
    }
    if(date.split('/').length != 3){
      flag = false;
      warning_result['date'] = { state: true, error: "有效日期得為 2024/01/01 的形式" };
    }
    if(description === ""){
      flag = false;
      warning_result['description'] = { state: true, error: "商品介紹不得為空" };
    } 
    setWarning(warning_result);
    return flag;
  }

  const handleSubmit = async () => {
    setWarning({...warningState});
    if(validateForm()){
      const [year, month, day] = date.split("/");
      const imagePath = await uploadImage({
        url: imageData,
        fileName: imageData?.split('/').pop() as string
      })
      axios.post(`${process.env.EXPO_PUBLIC_API_URL}/admin/add_new_product`, {
          name, description, price, salePrice, type, count, imagePath, year, month, day
        })
        .then(response => {
          console.log('Success:', response.data);
        })
        .catch(error => {
          console.error('Error:', error);
        })
        .finally(() => {
          setName("");
          setPrice("");
          setSalePrice("");
          setType("");
          setCount("");
          setDate("");
          setDescription("");
          setImageData(null);
        })
    };
  }

  return (
    <AdminTemplate
      topLayerStyle={{height: 400}}
      topLayer={
        <>
          <Text style={styles.title}>新增商品</Text>
          <View onTouchStart={handleImageUpload} style={styles.appendCover}>
            {
              imageData ? 
              <Image style={{width: '100%', height: '100%'}} resizeMode='cover' source={{uri: imageData}} /> :
              <Text>上傳照片</Text>
            }
          </View>
          <View style={styles.mainCard}>
            { warning.name.state && <Text style={styles.warningText}>{warning.name.error}</Text> }
            <TableCoulumn_TextInput name="商品名稱" placeholder="商品名稱" onChange={setName} value={name}/>
            { warning.price.state && <Text style={styles.warningText}>{warning.price.error}</Text> }
            <TableCoulumn_TextInput name="原始價格" placeholder="原始價格" onChange={setPrice} value={price}/>
            { warning.salePrice.state && <Text style={styles.warningText}>{warning.salePrice.error}</Text> }
            <TableCoulumn_TextInput name="售出價格" placeholder="售出價格" onChange={setSalePrice} value={salePrice}/>
            { warning.count.state && <Text style={styles.warningText}>{warning.count.error}</Text> }
            <TableCoulumn_TextInput name="庫存數量" placeholder="庫存數量" onChange={setCount} value={count}/>
            { warning.date.state && <Text style={styles.warningText}>{warning.date.error}</Text> }
            <TableCoulumn_TextInput name="有效期限" placeholder="有效期限" onChange={setDate} value={date}/>
            { warning.type.state && <Text style={styles.warningText}>{warning.type.error}</Text> }
            <TableColumn_SelectInput name="商品類型" selectItems={[{label: '農產品', 'value': 'whole'}, {label: '精緻商品', value: 'processed'}]} chooseItem={type} setChooseItem={setType} />
            { warning.description.state && <Text style={styles.warningText}>{warning.description.error}</Text> }
            <TableCoulumn_TextInput height={100} name="商品說明" placeholder="商品說明" onChange={setDescription} value={description}/>
          </View>
        </>
      }
      middleLayer={
        <>
          <Text style={styles.smallText}>完成請滑至底部</Text>
          <Pressable onPress={handleSubmit} style={pressed ? styles.pressOutButton : styles.pressInButton}>
            <Text style={{fontSize: 20, fontWeight: '700', color: '#FFF', textAlign: 'center'}}>{pressed ? "此商品成功送出" : "新增此商品"}</Text>
          </Pressable>
        </>
      }
    />
  );
}