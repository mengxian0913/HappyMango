import AdminTemplate from '@/components/AdminTemplate';
import { Pressable, Text, View } from 'react-native';
import { TextInput } from '@/components/Themed';
import styles from './style';
import { useState } from 'react';
import axios from 'axios';

export default function LoginScreen(params: any){
    const setAdmin = (state: boolean) => params.route.params.setAdmin(state);
    const setUser = (state: boolean) => params.route.params.setUser(state);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    
    const handleLogin = () => {
        axios.post(`${process.env.EXPO_PUBLIC_API_URL}/login`,{
            username, password
        })
            .then(res => {
                if(res.data === 'Admin Login'){
                    setAdmin(true);
                }
                else if(res.status == 200) {
                    setUser(true);
                }
                else{
                    console.log('Wrong User or Password');
                }
            })
            .catch(err => {
                console.error(err);
            })
    }

    return (
        <AdminTemplate
            topLayer={
                <>
                    <View style={styles.header}>
                        <Text style={styles.headerText}>HappyMango</Text>
                    </View>
                </>
            }
            middleLayer={
                <>
                    <View style={styles.login_container}>
                        <Text style={styles.loginText}>Login</Text>
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