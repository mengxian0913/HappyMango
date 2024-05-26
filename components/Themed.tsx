import { Text as DefaultText, View as DefaultView, StyleSheet } from 'react-native';
import Colors from '@/constants/Colors';
import { useColorScheme } from './useColorScheme';
import React from 'react';
import { Ionicons } from '@expo/vector-icons';
import { Input, Box, Select, CheckIcon } from "native-base";

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
  onChange: React.Dispatch<React.SetStateAction<string>>
}) {
    return(
      <Box alignItems="center">
        <Input onChangeText={props.onChange} value={props.value} mx="3" placeholder={props.placeholder} w="100%" />
      </Box>
    );
}

export function SelectInput(props: {
  selectItems: {label: string, value: string}[]
  chooseItem: string,
  setChooseItem: React.Dispatch<React.SetStateAction<string>>
}){
  return (
    <Box maxW="300">
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
}){
  return (
    <View style={[styles.tableColumn, {height: 40}]}>
      <Text style={styles.tableKey}>{props.name}</Text>
      <SelectInput selectItems={props.selectItems} chooseItem={props.chooseItem} setChooseItem={props.setChooseItem}></SelectInput>
    </View>
  )
}

export function TableCoulumn_TextInput(props: {
  name: string,
  placeholder: string,
  value: string,
  onChange: React.Dispatch<React.SetStateAction<string>>
}){
  return (
    <View style={[styles.tableColumn, {height: 40}]}>
      <Text style={styles.tableKey}>{props.name}</Text>
      <TextInput onChange={props.onChange}  value={props.value} placeholder={props.placeholder}/>
    </View>
  )
}

const styles = StyleSheet.create({
  tableColumn: {
    alignItems: 'center',
    flexDirection: 'row',
    padding: 5,
    width: '100%',
    borderBottomWidth: 1,
    borderBottomColor: '#D8CEBD',
  },
  tableKey: {
    width: '50%',
  },
  tableValue: {
      width: '50%',
      alignItems: 'flex-end',
  },
})