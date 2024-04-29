import { StyleSheet } from 'react-native';
import React from 'react';

import EditScreenInfo from '@/components/EditScreenInfo';
import AdminTemplate from '@/components/AdminTemplate';
import { Text, View } from '@/components/Themed';

export default function TabAdminScreen() {
  return (
    <View style={styles.container}>
      <AdminTemplate>
        <Text style={styles.title}>Admin</Text>
      </AdminTemplate>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
});
