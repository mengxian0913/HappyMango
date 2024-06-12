import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import * as SplashScreen from "expo-splash-screen";
import React, {
  ReactNode,
  FC,
  useEffect,
  createContext,
  PropsWithChildren,
} from "react";
import { useFonts } from "expo-font";
import "react-native-reanimated";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import {
  NavigationContainer,
  createNavigationContainerRef,
} from "@react-navigation/native";
import Login from "./Login/Login";
import { NativeBaseProvider } from "native-base";
import { TabBarIcon } from "@/components/Themed";
import { FontAwesome5 } from "@expo/vector-icons";
import FontAwesome from "@expo/vector-icons/FontAwesome";

import HomeStackScreen from "./(tabs)/Admin/AdminHome";
import TabAdminScreen from "./(tabs)/Admin/AdminProfile";
import TabNewScreen from "./(tabs)/Admin/NewProduct";
import OrderStackScreen from "./(tabs)/Admin/OrderList";

import CustomerHome from "./(tabs)/Customer/CustomerHome/CustomerHome";
import CustomerCart from "./(tabs)/Customer/CustomerCart/CustomerCart";
import CustomerTruck from "./(tabs)/Customer/CustomerTruck/CustomerTruck";
import CustomerUser from "./(tabs)/Customer/CustomerUser/CustomerUser";

import { useSelector, Provider } from "react-redux";
import { store, State } from "@/scripts/redux";
import { Store } from "redux";

const navigationRef = createNavigationContainerRef();

// const Auth = createContext<{store: Store} | null>(null);

// const Provider =({ store, children }: PropsWithChildren<{store: Store}>) => {
//   return <Auth.Provider value={{ store }}>{children}</Auth.Provider>;
// };

const navigate = (name: string, params?: any) => {
  if (navigationRef.isReady()) {
    navigationRef.navigate({ name, params } as never);
  }
};

const ButtomTabs = createBottomTabNavigator();
export {
  // Catch any errors thrown by the Layout component.
  ErrorBoundary,
} from "expo-router";

export const unstable_settings = {
  // Ensure that reloading on `/modal` keeps a back button present.
  initialRouteName: "(tabs)",
};

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [loaded, error] = useFonts({
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
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
  return (
    <Provider store={store}>
      <NativeBaseContainer />
    </Provider>
  );
}

function NativeBaseContainer() {
  const linking: any = {
    prefixes: [
      "http://localhost:8081",
      "https://coordinator-output-reject-thing.trycloudflare.com",
    ],
    config: {
      screens: {
        Login: "login",
        home: {
          screens: {
            Item: "item",
            Details: "details",
          },
        },
        cart: {
          screens: {
            OrderList: "order/list",
            OrderSetup: "order/setup",
          },
        },
        truck: "truck",
        setting: {
          screens: {
            settingList: "setting/list",
            passwordSetting: "setting/password",
            addressSetting: "setting/address",
            nameSetting: "setting/name",
            emailSetting: "setting/email",
            phoneSetting: "setting/phone",
          },
        },
        AdminHome: {
          screens: {
            Home: "admin/Home",
            Details: "admin/products/details",
          },
        },
        NewProduct: "admin/new",
        OrderLists: {
          screens: {
            Order: "order/list",
            Details: "order/details",
          },
        },
        AdminProfile: "admin/profile",

        NotFound: "*",
      },
    },
  };

  return (
    <NativeBaseProvider>
      <NavigationContainer
        ref={navigationRef}
        linking={linking}
        independent={true}
      >
        <RootLayoutNav />
      </NavigationContainer>
    </NativeBaseProvider>
  );
}

const RootLayoutNav = () => {
  const role: string = useSelector((state: State) => state.role);
  useEffect(() => {
    if (role === "admin") navigate("AdminHome");
    else if (role === "user") navigate("setting");
    else navigate("Login");
  }, [role]);

  return (
    <ThemeProvider value={DefaultTheme}>
      <ButtomTabs.Navigator screenOptions={{ headerShown: false }}>
        {role !== "admin" && (
          <>
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
            {(role as string) == "user" && (
              <>
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
              </>
            )}
            {(role as string) === "user" ? (
              <ButtomTabs.Screen
                name="setting"
                component={CustomerUser}
                options={{
                  title: "User",
                  tabBarIcon: ({ color }) => (
                    <TabBarIcon name="person" color={color} />
                  ),
                }}
              />
            ) : (
              <ButtomTabs.Screen
                name="Login"
                component={Login}
                options={{
                  title: "Login",
                  tabBarIcon: ({ color }) => (
                    <TabBarIcon name="person" color={color} />
                  ),
                }}
              />
            )}
          </>
        )}
        {role === "admin" && (
          <>
            <ButtomTabs.Screen
              name="AdminHome"
              component={HomeStackScreen}
              options={{
                title: "Home",
                tabBarIcon: ({ color }) => (
                  <TabBarIcon name="home-outline" color={color} />
                ),
              }}
            />
            <ButtomTabs.Screen
              name="OrderLists"
              component={OrderStackScreen}
              options={{
                title: "Order Info",
                tabBarIcon: ({ color }) => (
                  <TabBarIcon name="receipt" color={color} />
                ),
              }}
            />
            <ButtomTabs.Screen
              name="NewProduct"
              component={TabNewScreen}
              options={{
                title: "New Product",
                tabBarIcon: ({ color }) => (
                  <TabBarIcon name="add-circle-outline" color={color} />
                ),
              }}
            />
            <ButtomTabs.Screen
              name="AdminProfile"
              component={TabAdminScreen}
              options={{
                title: "Admin",
                tabBarIcon: ({ color }) => (
                  <TabBarIcon name="person" color={color} />
                ),
              }}
            />
          </>
        )}
      </ButtomTabs.Navigator>
    </ThemeProvider>
  );
};
