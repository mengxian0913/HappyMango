import React, { ReactNode, useEffect, useRef, useState } from "react";
import { StyleSheet, ScrollView, Animated } from 'react-native';
import { Text, View } from './Themed';

type AdminTemplateProps = {
    topLayer: ReactNode;
    middleLayer: ReactNode;
    topLayerStyle?: object;
}

type DynamicHeaderProps = {
    children: ReactNode;
    value: any
}

const Header_Max_Height = 350;
const Header_Min_Height = 100;
const Scroll_Distance = Header_Max_Height - Header_Min_Height;

const DynamicHeader = (props: DynamicHeaderProps) => {
    const animatedHeaderHeight = props.value.interpolate({
        inputRange: [0, Scroll_Distance],
        outputRange: [Header_Max_Height, Header_Min_Height],
        extrapolate: 'clamp',
    });
    const animatedHeaderColor = props.value.interpolate({
        inputRange: [0, Scroll_Distance],
        outputRange: ['#F1F1F1', '#FFD52D'],
        extrapolate: 'clamp',
    });

    return (
        <Animated.View
            style={[styles.top_layer]}
        >
            <View style={[styles.top_layer_backgroud]}></View>
            {props.children}
        </Animated.View>
    )
}

export default function AdminTemplate(props: AdminTemplateProps) {
    const scrollOffsetY = useRef(new Animated.Value(0)).current;
    return(
        <>
            <ScrollView
                scrollEventThrottle={5}
                showsVerticalScrollIndicator={false}
                onScroll={Animated.event(
                    [{nativeEvent: {contentOffset: {y: scrollOffsetY}}}],
                    { useNativeDriver: true },
                )}    
            >
                <DynamicHeader
                    value={scrollOffsetY}
                >
                    {props.topLayer}
                </DynamicHeader>
                <View
                    style={styles.content_layer}
                >
                    {props.middleLayer}
                </View>
            </ScrollView>
        </>
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
        height: '70%',
        backgroundColor: '#FFD52D',
        position:'absolute',
        borderRadius: 10,
    },
    content_layer: {
        width: '100%',
        alignItems: 'flex-start',
        backgroundColor: '#F1F1F1',
        paddingHorizontal: 20,
    }
})