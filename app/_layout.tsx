import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import * as SplashScreen from 'expo-splash-screen';
import React, { useState, useEffect } from 'react';
import { useFonts } from 'expo-font';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import 'react-native-reanimated';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer, createNavigationContainerRef } from '@react-navigation/native';
import LoginScreen from './login';
import { useColorScheme } from '@/hooks/useColorScheme';
import { NativeBaseProvider } from 'native-base';
import { TabBarIcon } from '@/components/Themed';
import HomeStackScreen from './(tabs)/Admin/adminHome';
import TabAdminScreen from './(tabs)/Admin/userSetting';
import TabNewScreen from './(tabs)/Admin/newProduct';
import OrderStackScreen from './(tabs)/Admin/orderList';

import CustomerHome from './(tabs)/Customer/CustomerHome/CustomerHome';
import CustomerCart from './(tabs)/Customer/CustomerCart/CustomerCart';
import CustomerTruck from './(tabs)/Customer/CustomerTruck/CustomerTruck';
import CustomerUser from './(tabs)/Customer/CustomerUser/CustomerUser';

import { FontAwesome5 } from "@expo/vector-icons";

const navigationRef = createNavigationContainerRef();

const navigate = (name: string, params?: any) => {
  if(navigationRef.isReady()){
    navigationRef.navigate({name, params} as never);
  }
}

const ButtomTabs = createBottomTabNavigator();
export {
  // Catch any errors thrown by the Layout component.
  ErrorBoundary,
} from 'expo-router';

export const unstable_settings = {
  // Ensure that reloading on `/modal` keeps a back button present.
  initialRouteName: '(tabs)',
};

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {

  const [loaded, error] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
    ...FontAwesome.font,
  });

  useEffect(() => {
    if (error) throw error;
  }, [error]);

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }
  return <RootLayoutNav />
}

const RootLayoutNav = () => {
  const colorScheme = useColorScheme();
  const [admin, setAdmin] = useState(false);
  const [user, setUser] = useState(false);
  const linking: any = {
    prefixes: ['http://localhost:8081', 'https://coordinator-output-reject-thing.trycloudflare.com'],
    config: {
      screens: {
        Login: 'login',
        AdminHome: {
          screens: {
            Home: 'admin/Home',
            Details: 'admin/products/details'
          }
        },
        NewProduct: 'admin/new',
        Order: {
          screens: {
            Order: 'order/list',
            Details: 'order/details'
          }
        },
        AdminProfile: 'admin/profile',
        NotFound: '*',
      },
    }
  }

  useEffect(() => {
    if(admin) navigate('AdminHome');
    else navigate('Login');
  }, [admin]);

  return (
    <NativeBaseProvider>
      <NavigationContainer ref={navigationRef} linking={linking} independent={true}>
        <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
          <ButtomTabs.Navigator screenOptions={{ headerShown: false }}>
              { !admin &&  <>
                <ButtomTabs.Screen
                  name="home"
                  component={CustomerHome}
                  options={{
                    title: "Home",
                    tabBarIcon: ({ color }) => (
                      <TabBarIcon name="home" color={color} />
                    ),
                  }}
                />
                <ButtomTabs.Screen
                  name="cart"
                  component={CustomerCart}
                  options={{
                    title: "Cart",
                    tabBarIcon: ({ color }) => (
                      <TabBarIcon name="cart" color={color} />
                    ),
                  }}
                />

                <ButtomTabs.Screen
                  name="truck"
                  component={CustomerTruck}
                  options={{
                    title: "Orders",
                    tabBarIcon: ({ color }) => (
                      <FontAwesome5 name="truck" size={20} color={color} />
                    ),
                  }}
                />
                { user ? 
                  <ButtomTabs.Screen
                    name="setting"
                    component={CustomerUser}
                    options={{
                      title: "User",
                      tabBarIcon: ({ color }) => (
                        <TabBarIcon name="person" color={color} />
                      ),
                    }}
                  />  :
                  <ButtomTabs.Screen
                    name="Login"
                    component={LoginScreen}
                    initialParams={{setAdmin, setUser}}
                    options={{
                      title: 'Login',
                      tabBarIcon: ({ color }) => (
                        <TabBarIcon name="person" color={color} /> 
                      )
                    }}
                  />
                } 
                </>
              }
              { admin &&
                <>
                  <ButtomTabs.Screen
                    name="AdminHome"
                    component={HomeStackScreen}
                    options={{
                      title: 'Home',
                      tabBarIcon: ({ color }) => <TabBarIcon name="home-outline" color={color} />,
                    }}
                  />
                  <ButtomTabs.Screen
                    name="Order"
                    component={OrderStackScreen}
                    options={{
                      title: 'Order Info',
                      tabBarIcon: ({ color }) => <TabBarIcon name="receipt" color={color} />,
                    }}
                  />
                  <ButtomTabs.Screen
                    name="NewProduct"
                    component={TabNewScreen}
                    options={{
                      title: 'New Product',
                      tabBarIcon: ({ color }) => <TabBarIcon name="add-circle-outline" color={color} />,
                    }}
                  />
                  <ButtomTabs.Screen
                    name="AdminProfile"
                    component={TabAdminScreen}
                    initialParams={{setAdmin}}
                    options={{
                      title: 'Admin',
                      tabBarIcon: ({ color }) => <TabBarIcon name="person" color={color} />,
                    }}
                  />
                </> 
              }
          </ButtomTabs.Navigator>
        </ThemeProvider>
      </NavigationContainer>
    </NativeBaseProvider>
  );
}
