import { Image, ImageSourcePropType, Pressable } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useNavigation, useIsFocused } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { launchImageLibrary } from 'react-native-image-picker';
import axios from 'axios';
import styles from './style';
import { API_URL } from "@env";

import { Text, View, TabBarIcon, TableColumn_SelectInput, TableCoulumn_TextInput } from '@/components/Themed';
import AdminTemplate from '@/components/AdminTemplate';

interface dataType{
  id: string,
  type: string,
  name: string,
  img: ImageSourcePropType,
  key: Number,
}

interface newDataType{
  [key: string]: dataType[];
}

interface overViewType{
  evaluationCount: number
  avgEvaluationScore: number,
  doneOrderCount: number,
  income: number,
}

const rebuildListData = (listData: dataType[]) => {
  const newData: { [key: string]: dataType[] } = {};
  for (let data of listData) {
    if (data.type in newData){
      if(data.img as string == "") data.img = require('../../../assets/images/000.jpg');
      newData[data.type].push(data);
    } 
    else {
      if(data.img as string == "") data.img = require('../../../assets/images/000.jpg');
      newData[data.type] = [data];
    }
  }
  return newData;
}

const TabHomeScreen = () => {
  const isFocused = useIsFocused();
  const [data, setData] = useState<newDataType>({});
  const [overview, setOverview] = useState<overViewType>();

  useEffect(() => {
    axios.get(`${API_URL}/get_product`)
    .then(response => {
      setData(rebuildListData(response.data));
    })
    .catch(error => {
      console.error('Error:', error);
    }); 
    
    axios.get(`${API_URL}/get_seller_overview`)
      .then(response => {
        setOverview(response.data[0]);
      })
      .catch(error => {
        console.error('Error:', error);
      })
  }, [isFocused]);

  return (
    <AdminTemplate
      topLayer={
        <>
          <Text style={styles.title}>HappyMango 後臺</Text>
          <View style={styles.mainCard}>
            <Text style={styles.cardTitle}>總收入：{overview?.income}</Text>
            <Text style={styles.cardTitle}>完成訂單：{overview?.doneOrderCount} 張</Text>
            <Text style={styles.cardTitle}>全部評論：{overview?.evaluationCount} 則</Text>
            <Text style={styles.cardTitle}>整體評論：{overview?.avgEvaluationScore} / 5</Text>
          </View>
        </>
      }
      middleLayer={
        <>
          {Object.keys(data).map((type, index) => (
            <MerchandiseTypeView key={type} type={type} data={data} />
          ))}
        </>
      }
    />
  );
}

const MerchandiseTypeView = (props:{
  type: string,
  data:  {[key: string]: dataType[]}
}) => {
  return (
    <>
      <View>
        <Text style={styles.listType}>商品類型：{props.type}</Text>
      </View>
      {props.data[props.type].map((item: dataType, index) => (
        <MerchandiseView key={index} item={item} />
      ))}
    </>
  )
}

const MerchandiseView = (props: {
  item: dataType,
}) => {
  const navigation = useNavigation();
  return (
    <View style={[styles.listFirstCard, styles.listCard]}>
      <Image style={{width: 80, height: 80}} source={props.item.img} />
      <View style={{padding: 10}}>
        <Text style={styles.listCardText}>商品名稱：{props.item.name}</Text>
        <Text
          style={{fontWeight: 'bold', padding: 2, paddingTop: 8}}
          onPress={() => navigation.navigate({name: 'Details', params: {...props}} as never)}
        >點擊進行查看</Text>
      </View>
    </View>
  )
}

interface commentType{
  grade: number,
  speed: number,
  content: string,
  customer: string
}

const DetailsScreen = (props: any) => {
  const item = props.route.params.item;
  const navigation = useNavigation();
  const [name, setName] = useState(item.name);
  const [type, setType] = useState(item.type);
  const [description, setDescription] = useState(item.description);
  const [rowPrice, setRowPrice] = useState(item.rowPrice);
  const [sellPrice, setSellPrice] = useState(item.sellPrice);
  const [count, setCount] = useState(item.count);
  const [date, setDate] = useState(item.date);
  const [imageData, setImageData] = useState(item.img);
  const [imageType, setImageType] = useState<string | null>(null);
  const [score, setScore] = useState(0);
  const [evaluationCount, setEvaluationCount] = useState(0);
  const [showComment, setShowComment] = useState(false);
  const [comments, setComments] = useState<commentType[] | null>(null);
  const [pressToUpdate, setPressToUpdate] = useState(false);
  const [pressToDelete, setPressToDelete] = useState(false);

  const handleUpateProduct = async () => {
    const [year, month, day] = date.split('/');
    let imagePath = "";
    if(!imageType) imagePath = imageData.substring(imageData.lastIndexOf('/') + 1, imageData.indexOf('.jpg'));
    else imagePath = await uploadImage({
      uri: imageData as string,
      type: imageType,
      fileName: imageData?.split('/').pop() as string
    })
    console.log(imagePath);

    axios.post(`${API_URL}/update_product`, {
        id: item.id,
        name, type, description, rowPrice, sellPrice, count, year, month, day, imagePath
    })
      .then(res => {
        navigation.navigate('Home' as never);
      })
      .catch(err => {
        console.error(err);
      })
  }

  const handleDeleteProduct = () => {
    axios.post(`${API_URL}/delete_product`,{
      id: item.id
    })
      .then(res => {
        navigation.navigate('Home' as never);
      })
      .catch(err => {
        console.error(err);
      })
  }

  const handleChangePicture = () => {
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
        setImageType(res.assets[0].type as string);
      }
    })
  }

  interface ImagePropsType {
    uri: string,
    type: string,
    fileName: string
  }

  const uploadImage = async (params: ImagePropsType) => {
    const formData = new FormData();
    const blob = new Blob([params.uri], { type: params.type });
    formData.append('file', blob, params.fileName);
    try {
      const response = await axios.post(`${API_URL}/upload_product_image`, formData, {
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

  useEffect(() => {
    if(showComment){
      axios.get(`${API_URL}/get_product_evaluation`, {
        params: {
          name: name
        }
      })
        .then(response => {
          setComments(response.data as commentType[]);
        })
        .catch(error => {
            console.error('Error:', error);
        })    
    }else{
      axios.get(`${API_URL}/get_specific_product`, {
        params: {
          id: item.id
        }
      })
        .then(response => {
          const data = response.data[0];
          setScore(data.score);
          setEvaluationCount(data.count);
        })
    }
  }, [showComment])

  return (
    <AdminTemplate
      topLayer={
        <>
          <View
            style={styles.back}
          >
            <Pressable onPress={() => navigation.navigate('Home' as never)}>
              <TabBarIcon
                name="arrow-back" size={32} color={'#000'}
              />
            </Pressable>
            <Text
              style={{fontSize: 20, fontWeight: 'bold', marginLeft: 10}}
            >回到首頁</Text>
          </View>
          <Image
            source={imageData}
            style={styles.imageContainer}
          />
          <Pressable style={styles.imageCardChangeIcon} onPress={() => handleChangePicture()}>
            <TabBarIcon 
              name="add-circle-sharp"
              size={32}
              color={'#FFF'}
            />
          </Pressable>
          <View style={styles.imageCard}>
            <Text style={[styles.cardTitle, {marginBottom: 0}]}>{item.name}</Text>
            <Text style={styles.cardSubTitle}>Mango Smoothie Milk Cap</Text>
            <Pressable
              style={styles.imageCardBottom}
              onPress={() => evaluationCount !== 0 && setShowComment(!showComment) }
            >
              <TabBarIcon name="star" size={20} color={'#FFD52D'} />
              <Text
                style={{paddingLeft: 10}}
               >
                  {showComment ? "詳細商品資訊" : evaluationCount === 0 ? "目前還未有任何評論" : `${score} (${evaluationCount}則評價)`}
                </Text>
            </Pressable>
          </View>
        </>
      }
      middleLayer={
        showComment && comments !== null ?
        <>
          <Text>顧客評論</Text>
          {comments.map((comment, index) => (
            <CommentView key={index} comment={comment} />
          ))}
        </>
          :
        <>
          <View style={[styles.mainCard, {width: '100%', marginLeft: 0}]}>
            <TableCoulumn_TextInput value={name} name='商品名稱' placeholder='商品名稱' onChange={setName}/>
            <TableColumn_SelectInput chooseItem={type} selectItems={[{label: '精緻商品', value: 'processed'}, {label: '農產品', value: 'whole'}]} name='商品類型' setChooseItem={setType}/>
            <TableCoulumn_TextInput value={description} name='商品說明' placeholder='商品說明' onChange={setDescription}/>
            <TableCoulumn_TextInput value={rowPrice} name='原始價格' placeholder='原始價格' onChange={setRowPrice}/>
            <TableCoulumn_TextInput value={sellPrice} name='售出價格' placeholder='售出價格' onChange={setSellPrice}/>
            <TableCoulumn_TextInput value={count} name='庫存數量' placeholder='庫存數量' onChange={setCount}/>
            <TableCoulumn_TextInput value={date} name='有效期限' placeholder='0000/00/00' onChange={setDate}/>
            <View style={styles.divideLine}></View>
          </View>
          <Text style={styles.smallText}>完成請滑至底部</Text>
          <Pressable 
            onPress={() => handleUpateProduct()}
            onPressIn={() => setPressToUpdate(true)}
            onPressOut={() => setPressToUpdate(false)}
            style={pressToUpdate ? styles.pressInButton : styles.pressOutButton}
          >
            <Text style={{fontSize: 20, fontWeight: '700', color: '#FFF', textAlign: 'center'}}>
              {pressToUpdate ? "此商品成功更改" : "更改此商品"}
            </Text>
          </Pressable>
          <Pressable 
            onPress={() => handleDeleteProduct()}
            onPressIn={() => setPressToDelete(true)}
            onPressOut={() => setPressToDelete(false)}
            style={(pressToDelete ? styles.pressInDeleteButton : styles.pressOutDeleteButton)}
          >
            <Text style={{fontSize: 20, fontWeight: '700', color: '#FFBC0A', textAlign: 'center'}}>
              {pressToDelete ? "此商品成功刪除" : "刪除此商品"}
            </Text>
          </Pressable>
        </>
      }
    />
  )
}

const CommentView = (props: {
  comment: commentType
}) => {
  return (
    <View style={[styles.mainCard, {width: '100%', marginLeft: 0, borderCurve: 'circular', padding: 10}]}>
      <Text>顧客名稱：{props.comment.customer}</Text>
      <View style={{flexDirection: 'row'}}>
        <Text>商品品質：{props.comment.grade}</Text>
        <Text>送貨品質：{props.comment.speed}</Text>
        <TabBarIcon name="star" size={20} color={'#FFD52D'} />
      </View>
      <View style={{backgroundColor: '#F1F1F1', padding: 10}}>
        <Text>{props.comment.content}</Text>
      </View>
    </View>
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
