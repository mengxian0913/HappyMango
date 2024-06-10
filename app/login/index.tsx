import AdminTemplate from '@/components/AdminTemplate';
import { Pressable, Text, View } from 'react-native';
import { useIsFocused } from '@react-navigation/native';
import { TextInput } from '@/components/Themed';
import styles from './style';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { store, userLogin, adminLogin } from '@/scripts/redux';

export default function LoginScreen(params: any){
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [isWarn, setIsWarn] = useState(false);
    const warning = "Wrong Username or Password!!";
    const isFocused = useIsFocused();

    useEffect(() => {
        setUsername('');
        setPassword('');
        setIsWarn(false);
    }, [isFocused]);

    const handleLogin = () => {
        axios.post(`${process.env.EXPO_PUBLIC_API_URL}/login`,{
            username, password
        })
            .then(res => {
                const data = res.data;
                if(data.result === 'Admin Login'){
                    store.dispatch(adminLogin({
                        id: data.SID,
                        name: data.SName,
                        address: data.SAddress,
                        phone: data.SPhone
                    }));
                }
                else if(data.result == 'User Login') {
                    store.dispatch(userLogin({
                        id: data.UID,
                        name: data.UName,
                        address: data.UAddress,
                        phone: data.UPhone
                    }));
                }
                else if(data.result == 'No exist'){
                    setIsWarn(true);
                }
            })
            .catch(err => {
                console.error(err);
            })
            .finally(() => {
                console.log(store.getState());
            })
    }

    return (
        <AdminTemplate
            topLayer={
                <>
                    <View style={styles.header}>
                        <Text style={styles.headerText}>{process.env.EXPO_PUBLIC_APP_NAME}</Text>
                    </View>
                </>
            }
            middleLayer={
                <>
                    <View style={styles.login_container}>
                        <Text style={styles.loginText}>Login</Text>
                        { isWarn && <Text style={[styles.warningText, {textAlign: 'center'}]}>{warning}</Text> }
                        <View style={styles.input_box}>
                            <Text style={styles.labelText}>UserName</Text>
                            <TextInput placeholder='Enter your username' value={username} onChange={setUsername}></TextInput>
                        </View>
                        <View style={styles.input_box}>
                            <Text style={styles.labelText}>Password</Text>
                            <TextInput type='password' placeholder='Enter your password' value={password} onChange={setPassword}></TextInput>
                        </View>
                        <Pressable
                            style={styles.confirmButtom}
                            onPress={() => handleLogin()}
                        >
                            <Text style={[styles.labelText]}>Confirm</Text>
                        </Pressable>
                    </View>
                </>
            }
        />
    );
}