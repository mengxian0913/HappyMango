import { TextInput, Pressable, Image } from 'react-native';
import React, { useState } from 'react';
import axios from 'axios';
import { launchImageLibrary } from 'react-native-image-picker';

import AdminTemplate from '@/components/AdminTemplate';
import { Text, View, TableCoulumn_TextInput, TableColumn_SelectInput } from '@/components/Themed';
import styles from "./style";

export default function TabNewScreen() {
  const [name, setName] = useState("");
  const [rowPrice, setRowPrice] = useState("");
  const [sellPrice, setSellPrice] = useState("");
  const [type, setType] = useState("");
  const [count, setCount] = useState("");
  const [date, setDate] = useState("");
  const [description, setDescription] = useState("");
  const [imageData, setImageData] = useState<string | null>(null);
  const [pressed, setPressed] = useState(false);
  const [typeSelectOpen, setTypeSelectOpen] = useState(false);
  const [typeItems, setTypeItems] = useState([
    {label: '農產', value: '農產'},
    {label: '精緻商品', value: '精緻商品'}
  ]);

  const handleImageUpload = () => {
    launchImageLibrary({
        mediaType: 'photo',
        maxWidth: 1000,
        maxHeight: 1000,
        quality: 0.8
    }, res=>{
        if(res.didCancel){
            return false;
        }
        if(res.assets !== undefined){
          setImageData(res.assets[0].uri as string);
          uploadImage({
            uri: res.assets[0].uri as string,
            type: res.assets[0].type as string,
            fileName: res.assets[0].uri?.split('/').pop() as string
          })
        }
    })
  }

  interface ImagePropsType {
    uri: string,
    type: string,
    fileName: string
  }

  const uploadImage = async (params: ImagePropsType) => {
    console.log(params)
      const formData = new FormData();
      const blob = new Blob([params.uri], { type: params.type });
      formData.append('file', blob, params.fileName);
      try {
        const response = await axios.post('http://localhost:3000/upload_product_image', formData, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        });
        return response.data;
      } catch (error) {
        console.error('Error uploading image:', error);
        throw error;
      }
  }

  const validateForm = () => {
    if(name === "") return false;
    if(rowPrice === "") return false;
    if(sellPrice === "") return false;
    if(type === "") return false;
    if(count === "") return false;
    if(date === "") return false;
    if(description === "") return false;
    return true;
  }

  const handleSubmit = () => {
    if(validateForm()){
      const [year, month, day] = date.split("/");
      axios.post('http://localhost:3000/add_new_product', {
          name, description, rowPrice, sellPrice, type, count, picture: "", year, month, day
        })
        .then(response => {
          console.log('Success:', response.data);
        })
        .catch(error => {
          console.error('Error:', error);
        });

      setName("");
      setRowPrice("");
      setSellPrice("");
      setType("");
      setCount("");
      setDate("");
      setDescription("")
      setImageData(null)
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
            <TableCoulumn_TextInput name="商品名稱" placeholder="商品名稱" onChange={setName} value={name}/>
            <TableCoulumn_TextInput name="商品說明" placeholder="商品說明" onChange={setDescription} value={description}/>
            <TableCoulumn_TextInput name="原始價格" placeholder="原始價格" onChange={setRowPrice} value={rowPrice}/>
            <TableCoulumn_TextInput name="售出價格" placeholder="售出價格" onChange={setSellPrice} value={sellPrice}/>
            <TableCoulumn_TextInput name="庫存數量" placeholder="庫存數量" onChange={setCount} value={count}/>
            <TableCoulumn_TextInput name="有效期限" placeholder="有效期限" onChange={setDate} value={date}/>
            <TableColumn_SelectInput name="商品類型" selectItems={[{label: '農產品', 'value': '農產品'}, {label: '精緻商品', value: '精緻商品'}]} chooseItem={type} setChooseItem={setType} />
            <View style={styles.divideLine}></View>
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