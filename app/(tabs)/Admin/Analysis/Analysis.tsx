import React from "react";
import EditScreenInfo from "@/components/EditScreenInfo";
import { Text, View } from "@/components/Themed";
import styles from "./style";

const Analysis = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Analysis</Text>
      <View
        style={styles.separator}
        lightColor="#eee"
        darkColor="rgba(255,255,255,0.1)"
      />
      <EditScreenInfo path="app/(tabs)/analysis.tsx" />
    </View>
  );
};

export default Analysis;
