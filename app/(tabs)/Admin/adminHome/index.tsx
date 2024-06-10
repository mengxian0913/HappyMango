import { useEffect, useState } from 'react';
import { Image, Pressable } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useNavigation, useIsFocused } from '@react-navigation/native';
import { uploadImage, launchImageLibrary } from '@/scripts/fileHandler';
import { productType, overViewType, commentType } from '@/constants/types/adminHome';
import axios from 'axios';
import styles from './style';

import { Text, View, TabBarIcon, TableColumn_SelectInput, TableCoulumn_TextInput } from '@/components/Themed';
import AdminTemplate from '@/components/AdminTemplate';

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

const typeMap: { [key: string]: string } = {
  processed: '精緻商品',
  whole: '農產品'
}

const rebuildListData = (listData: productType[]) => {
  const newData: { [key: string]: productType[] } = {};
  for (let data of listData) {
    const type = typeMap[data.type];
    if (type in newData) newData[type].push(data);
    else newData[type] = [data];
  }
  return newData;
}

const TabHomeScreen = () => {
  const isFocused = useIsFocused();
  const [data, setData] = useState<{[key: string]: productType[]}>({});
  const [overview, setOverview] = useState<overViewType>();
  console.log(process.env.EXPO_PUBLIC_API_URL);
  useEffect(() => {
    if(isFocused){
      axios.get(`${process.env.EXPO_PUBLIC_API_URL}/admin/get_product`)
        .then(response => {
          setData(rebuildListData(response.data));
        })
        .catch(error => {
          console.error('Error:', error);
        });
    
      axios.get(`${process.env.EXPO_PUBLIC_API_URL}/admin/get_seller_overview`)
        .then(response => {
          setOverview(response.data[0]);
        })
        .catch(error => {
          console.error('Error:', error);
        })
    }
  }, [isFocused]);

  return (
    <AdminTemplate
      topLayer={
        <>
          <Text style={styles.title}>{process.env.EXPO_PUBLIC_APP_NAME} 後臺</Text>
          <View style={[styles.mainCard, {width: '90%', marginLeft: 20}]}>
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
  data:  {[key: string]: productType[]}
}) => {
  return (
    <>
      <View>
        <Text style={styles.listType}>商品類型：{props.type}</Text>
      </View>
      {props.data[props.type].map((item: productType, index) => (
        <MerchandiseView key={index} item={item} />
      ))}
    </>
  )
}

const MerchandiseView = (props: {
  item: productType,
}) => {
  const navigation = useNavigation();
  return (
    <View style={[styles.listFirstCard, styles.listCard]}>
      <Image style={{width: 80, height: 80}} source={{uri: props.item.img}} />
      <View style={{padding: 10}}>
        <Text style={styles.listCardText}>商品名稱：{props.item.name}</Text>
        <Text
          style={{fontWeight: 'bold', padding: 2, paddingTop: 8}}
          onPress={() => navigation.navigate({name: 'Details', params: {id: props.item.id, img: props.item.img, imgKey: props.item.imgKey}} as never)}
        >點擊進行查看</Text>
      </View>
    </View>
  )
}



const DetailsScreen = (props: any) => {
  const item = props.route.params;
  const navigation = useNavigation();
  const [name, setName] = useState("");
  const [type, setType] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState<string>("");
  const [salePrice, setSalePrice] = useState<string>("");
  const [count, setCount] = useState<string>("");
  const [date, setDate] = useState("");
  const [imageData, setImageData] = useState<string>(item.img);
  const [imageChange, setImageChange] = useState<boolean>(false);
  const [score, setScore] = useState(0);
  const [evaluationCount, setEvaluationCount] = useState(0);
  const [showComment, setShowComment] = useState(false);
  const [comments, setComments] = useState<commentType[] | null>(null);
  const [pressToUpdate, setPressToUpdate] = useState(false);
  const [pressToDelete, setPressToDelete] = useState(false);
  const [warning, setWarning] = useState(warningState);
  const [imageKey, setImageKey] = useState(item.imgKey);

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

  const handleUpateProduct = async () => {
    setWarning({...warningState});
    if(!validateForm()) return;
    const [year, month, day] = date.split('/');
    let imagePath = imageKey;
    if(imageChange){
      imagePath = await uploadImage({
        url: imageData as string,
        fileName: imageData?.split('/').pop() as string
      })
    }
    axios.post(`${process.env.EXPO_PUBLIC_API_URL}/admin/update_product`, {
        id: item.id,
        name, type, description, price, salePrice, count, year, month, day, imagePath
    })
      .then(res => {
        navigation.navigate('Home' as never);
      })
      .catch(err => {
        console.error(err);
      })
  }

  const handleDeleteProduct = () => {
    axios.post(`${process.env.EXPO_PUBLIC_API_URL}/admin/delete_product`,{
      id: item.id
    })
      .then(res => {
        navigation.navigate('Home' as never);
      })
      .catch(err => {
        console.error(err);
      })
  }

  const handleChangePicture = async () => {
    const image = await launchImageLibrary();
    if(image){
      setImageData(image);
      setImageChange(true);
    }
  }

  useEffect(() => {
    if(showComment){
      axios.get(`${process.env.EXPO_PUBLIC_API_URL}/admin/get_product_evaluation`, {
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
      axios.get(`${process.env.EXPO_PUBLIC_API_URL}/admin/get_specific_product`, {
        params: {
          id: item.id
        }
      })
        .then(response => {
          const data = response.data;
          setName(data.name);
          setDescription(data.description);
          setDate(data.date);
          setType(data.type);
          setPrice(data.price as string);
          setSalePrice(data.salePrice as string);
          setCount(data.count as string);
          setScore(data.score);
          setEvaluationCount(data.ecount);
        })
    }
    setImageChange(false);
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
            source={{uri: imageData}}
            style={styles.imageContainer}
          />
          <Pressable style={styles.imageCardChangeIcon} onPress={() => handleChangePicture()}>
            <TabBarIcon 
              name="add-circle-sharp"
              size={32}
              color={'#F2545B'}
            />
          </Pressable>
          <View style={styles.imageCard}>
            <Text style={[styles.cardTitle, {marginBottom: 0}]}>{name}</Text>
            <Text style={styles.cardSubTitle}>{name.toLowerCase()}</Text>
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
          <View style={[styles.mainCard]}>
            { warning.name.state && <Text style={styles.warningText}>{warning.name.error}</Text> }
            <TableCoulumn_TextInput value={name} name='商品名稱' placeholder='商品名稱' onChange={setName}/>
            { warning.price.state && <Text style={styles.warningText}>{warning.price.error}</Text> }
            <TableCoulumn_TextInput value={String(price)} name='原始價格' placeholder='原始價格' onChange={setPrice}/>
            { warning.salePrice.state && <Text style={styles.warningText}>{warning.salePrice.error}</Text> }
            <TableCoulumn_TextInput value={String(salePrice)} name='售出價格' placeholder='售出價格' onChange={setSalePrice}/>
            { warning.type.state && <Text style={styles.warningText}>{warning.type.error}</Text> }
            <TableColumn_SelectInput chooseItem={type} selectItems={[{label: '精緻商品', value: 'processed'}, {label: '農產品', value: 'whole'}]} name='商品類型' setChooseItem={setType}/>
            { warning.count.state && <Text style={styles.warningText}>{warning.count.error}</Text> }
            <TableCoulumn_TextInput value={String(count)} name='庫存數量' placeholder='庫存數量' onChange={setCount}/>
            { warning.date.state && <Text style={styles.warningText}>{warning.date.error}</Text> }
            <TableCoulumn_TextInput value={date} name='有效期限' placeholder='0000/00/00' onChange={setDate}/>
            { warning.description.state && <Text style={styles.warningText}>{warning.description.error}</Text> }
            <TableCoulumn_TextInput height={100} value={description} name='商品說明' placeholder='商品說明' onChange={setDescription}/>
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
