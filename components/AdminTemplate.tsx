import React, { ReactNode } from "react";
import { StyleSheet } from 'react-native';
import { Text, View } from './Themed';

type AdminTemplateProps = {
    children: ReactNode;
    topLayerStyle?: object;
}

export default function AdminTemplate(props: AdminTemplateProps) {
    return(
        <>
            <View
                style={[styles.top_layer, props.topLayerStyle]}
                lightColor="#FFD52D"
            >
                {props.children}
            </View>
            <View
                style={styles.content_layer}
                lightColor="#F1F1F1"
            >
            </View>
        </>
    ) 
}

const styles = StyleSheet.create({
    top_layer: {
        width: '100%',
        height: 280,
        alignItems: 'flex-start',
        borderRadius: 10
    },
    content_layer: {
        width: '100%',
        alignItems: 'center',
    }
})