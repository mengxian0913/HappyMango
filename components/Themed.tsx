import { ActivityIndicator, Text as DefaultText, View as DefaultView, StyleProp, StyleSheet, ViewStyle } from 'react-native';
import Colors from '@/constants/Colors';
import { useColorScheme } from './useColorScheme';
import React from 'react';
import { Ionicons } from '@expo/vector-icons';
import { Input, Box, Select, CheckIcon, CloseIcon, VStack, HStack, Center, Stack, Alert, IconButton } from "native-base";

type ThemeProps = {
  lightColor?: string;
  darkColor?: string;
};

export type TextProps = ThemeProps & DefaultText['props'];
export type ViewProps = ThemeProps & DefaultView['props'];

export function useThemeColor(
  props: { light?: string; dark?: string },
  colorName: keyof typeof Colors.light & keyof typeof Colors.dark
) {
  const theme = useColorScheme() ?? 'light';
  const colorFromProps = props[theme];

  if (colorFromProps) {
    return colorFromProps;
  } else {
    return Colors[theme][colorName];
  }
}

export function Text(props: TextProps) {
  const { style, lightColor, darkColor, ...otherProps } = props;
  const color = useThemeColor({ light: lightColor, dark: darkColor }, 'text');

  return <DefaultText style={[{ color }, style]} {...otherProps} />;
}

export function View(props: ViewProps) {
  const { style, lightColor, darkColor, ...otherProps } = props;
  const backgroundColor = useThemeColor({ light: lightColor, dark: darkColor }, 'background');

  return <DefaultView style={[{ backgroundColor }, style]} {...otherProps} />;
}

// You can explore the built-in icon families and icons on the web at https://icons.expo.fyi/
export function TabBarIcon(props: {
  name: React.ComponentProps<typeof Ionicons>['name'];
  color?: string;
  size?: number;
  style? : object
}) {
  return <Ionicons size={props.size || 28} style={[{ marginBottom: 0}, props.style]} {...props} />;
}

export function TextInput(props: {
  placeholder: string,
  value: string,
  onChange: React.Dispatch<React.SetStateAction<string>>,
  style?: object,
  type?: 'text' | 'password'
}) {
    return(
      <Box alignItems="center">
        <Input
          type={props.type || 'text'}
          style={[props.style, {fontSize: 12}]}
          onChangeText={props.onChange}
          value={props.value}
          mx="3"
          placeholder={props.placeholder}
          w="100%"
        />
      </Box>
    );
}

export function SelectInput(props: {
  selectItems: {label: string, value: string}[]
  chooseItem: string,
  setChooseItem: React.Dispatch<React.SetStateAction<string>>
}){
  return (
    <Box style={{width: '100%'}} maxW="300">
      <Select selectedValue={props.chooseItem} minWidth="200" accessibilityLabel="Choose Service" placeholder="Choose Service" _selectedItem={{
      bg: "teal.600",
      endIcon: <CheckIcon size="5" />
    }} mt={1} onValueChange={itemValue => props.setChooseItem(itemValue)}>
      {props.selectItems.map((select, index) => (
        <Select.Item key={index} label={select.label} value={select.value} />
      ))}
      </Select>
    </Box>
  )
}

export function TableColumn_SelectInput(props: {
  name: string,
  selectItems: {label: string, value: string}[]
  chooseItem: string,
  setChooseItem: React.Dispatch<React.SetStateAction<string>>
  style?: object
}){
  return (
    <HStack space={2} justifyContent="center" style={[styles.tableColumn]}>
      <Center h={"50px"} w="30%">
        <Text style={{textAlign: 'left'}}>{props.name}</Text>
      </Center>
      <Center h={"50px"} w="70%">
        <SelectInput selectItems={props.selectItems} chooseItem={props.chooseItem} setChooseItem={props.setChooseItem}></SelectInput>
      </Center>
    </HStack>
  )
}

export function TableCoulumn_TextInput(props: {
  name: string,
  placeholder: string,
  value: string,
  onChange: React.Dispatch<React.SetStateAction<string>>
  height?: number
}){
  return (
    <HStack space={2} justifyContent="center" style={[styles.tableColumn]}>
      <Center  h={props.height || "50px"} w="30%">
        <Text style={{textAlign: 'left'}}>{props.name}</Text>
      </Center>
      <Center  h={props.height || "50px"} w="70%">
        <TextInput style={{height: props.height}} onChange={props.onChange}  value={props.value} placeholder={props.placeholder}/>
      </Center>
    </HStack>
  )
}

export function Feedback(props: {
  status: "success" | "error" | "info" | "warning";
  title: string;
  onCancel: () => void;
}){
  return (
    <Stack space={3} w="100%" maxW="400">
      <Alert w="100%" status={props.status} style={{marginTop: 10}}>
          <VStack space={2} flexShrink={1} w="100%">
            <HStack flexShrink={1} space={2} justifyContent="space-between">
              <HStack space={2} flexShrink={1}>
                <Alert.Icon mt="1" />
                <Text>{props.title}</Text>
              </HStack>
              <IconButton onPressIn={() => props.onCancel()} variant="unstyled" _focus={{
                  borderWidth: 0
                }} icon={<CloseIcon size="3" />} _icon={{
                  color: "coolGray.600"
                }} 
              />
            </HStack>
          </VStack>
        </Alert>
    </Stack>
  )
}

export function Loading(props: {style: object} ) {
  return (
    <View style={props.style}>
      <ActivityIndicator size="small" color="#FFD52D" />
    </View>
  )
}

const styles = StyleSheet.create({
  tableColumn: {
    alignItems: 'center',
    marginBottom: 10,
  }
})