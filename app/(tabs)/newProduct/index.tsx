import { TextInput, TouchableOpacity, Image } from 'react-native';
import React, { useState } from 'react';
import axios from 'axios';
import { launchImageLibrary } from 'react-native-image-picker';
import { Select } from "native-base";

import AdminTemplate from '@/components/AdminTemplate';
import { Text, View } from '@/components/Themed';
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

      axios.post('http://localhost:3000/add_new_product', 
        {name, description, rowPrice, sellPrice, date, type, count}, {
        headers: {
          'Content-Type': 'application/json'
        }
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
            <View style={[styles.tableColumn, {height: 40}]}>
                  <Text style={styles.tableKey}>商品名稱</Text>
                  <TextInput
                    style={{
                      marginLeft: 10,
                      padding: 16,
                      backgroundColor: '#F1F1F1',
                      height: '100%',
                    }}
                    value={name}
                    onChangeText={setName}
                    placeholder="商品名稱"
                  />
                </View>
              <View style={[styles.tableColumn, {height: 100}]}>
                <Text style={styles.tableKey}>商品說明</Text>
                <TextInput
                  style={{
                    marginLeft: 10,
                    padding: 16,
                    backgroundColor: '#F1F1F1',
                    height: '100%',
                  }}
                  value={description}
                  onChangeText={setDescription}
                  placeholder="商品說明"
                />
              </View>
              <View style={[styles.tableColumn, {height: 40}]}>
                <Text style={styles.tableKey}>原始價格</Text>
                <TextInput
                  style={{
                    marginLeft: 10,
                    padding: 16,
                    backgroundColor: '#F1F1F1',
                    height: '100%',
                  }}
                  value={rowPrice}
                  onChangeText={setRowPrice}
                  placeholder="原始價格"
                />
              </View>
              <View style={[styles.tableColumn, {height: 40}]}>
              <Text style={styles.tableKey}>售出價格</Text>
              <TextInput
                style={{
                  marginLeft: 10,
                  padding: 16,
                  backgroundColor: '#F1F1F1',
                  height: '100%',
                }}
                value={sellPrice}
                onChangeText={setSellPrice}
                placeholder="售出價格"
              />
            </View>
            <View style={[styles.tableColumn, {height: 40}]}>
                <Text style={styles.tableKey}>商品類型</Text>
                <View>
                 
                </View>
              </View>
              <View style={[styles.tableColumn, {height: 40}]}>
                <Text style={styles.tableKey}>庫存數量</Text>
                <TextInput
                  style={{
                    marginLeft: 10,
                    padding: 16,
                    backgroundColor: '#F1F1F1',
                    height: '100%',
                  }}
                  value={count}
                  onChangeText={setCount}
                  placeholder="庫存數量"
                />
              </View>
              <View style={[styles.tableColumn, {height: 40}]}>
                <Text style={styles.tableKey}>有效期限</Text>
                <TextInput
                  style={{
                    marginLeft: 10,
                    padding: 16,
                    backgroundColor: '#F1F1F1',
                    height: '100%',
                  }}
                  value={date}
                  onChangeText={setDate}
                  placeholder="有效期限"
                />
              </View>
            <View style={styles.divideLine}></View>
          </View>
        </>
      }
      middleLayer={
        <>
          <Text style={styles.smallText}>完成請滑至底部</Text>
          <TouchableOpacity onPress={handleSubmit} style={styles.clickButton}>
            <Text style={{fontSize: 20, fontWeight: '700', color: '#FFF', textAlign: 'center'}}>新增此商品</Text>
          </TouchableOpacity>
        </>
      }
    />
  );
}