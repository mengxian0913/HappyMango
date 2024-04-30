import React, { ReactNode } from "react";
import { StyleSheet, ScrollView } from 'react-native';
import { Text, View } from './Themed';

type AdminTemplateProps = {
    topLayer: ReactNode;
    middleLayer: ReactNode;
    topLayerStyle?: object;
}

export default function AdminTemplate(props: AdminTemplateProps) {
    return(
        <ScrollView>
            <View
                style={styles.top_layer}
            >
                <View style={styles.top_layer_backgroud} />
                {props.topLayer}
            </View>
            <View
                style={styles.content_layer}
            >
                {props.middleLayer}
            </View>
        </ScrollView>
    ) 
}

const styles = StyleSheet.create({
    top_layer: {
        width: '100%',
        alignItems: 'flex-start',
        backgroundColor: '#F1F1F1'
    },
    top_layer_backgroud: {
        width: '100%',
        backgroundColor: '#FFD52D',
        height: '70%',
        position:'absolute',
        borderRadius: 10
    },
    content_layer: {
        width: '100%',
        alignItems: 'flex-start',
        backgroundColor: '#F1F1F1',
        paddingHorizontal: 20,
    }
})