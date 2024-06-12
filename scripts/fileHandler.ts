import axios from "axios";
import { ImagePropsType } from "./types";
import * as ImagePicker from 'react-native-image-picker';

async function urltoFile(url: string, filename: string, mimeType: string){
    if (url.startsWith('data:')) {
        const arr = url.split(',');
        const mime = arr[0].match(/:(.*?);/)?.[1];
        const bstr = atob(arr[arr.length - 1]);
        let n = bstr.length;
        const u8arr = new Uint8Array(n);
        while(n--) u8arr[n] = bstr.charCodeAt(n);
        const file = new File([u8arr], filename, {type:mime || mimeType});
        return Promise.resolve(file);
    }
    const res = await fetch(url);
    const buf = await res.arrayBuffer();
    return new File([buf], filename, { type: mimeType });
}

export const launchImageLibrary = async (): Promise<string | false> => {
    return new Promise((resolve, reject) => {
        ImagePicker.launchImageLibrary({
            mediaType: 'photo',
            maxWidth: 1000,
            maxHeight: 1000,
            quality: 0.8
        }, res => {
            if(res.didCancel) resolve(false);
            if(res.assets !== undefined) resolve(res.assets[0].uri as string);
            reject(new Error('No assets found'));
        })
    })
}

export const uploadImage = async (params: ImagePropsType) => {
    if(params.url === null) return;
    const formData = new FormData();
    const file = await urltoFile(params.url, 'image.jpeg', 'image/jpeg');
    formData.append('file', file);
    try {
        const response = await axios.post(`${process.env.EXPO_PUBLIC_API_URL}/admin/upload_product_image`, formData, {
        headers: {
            'Content-Type': 'multipart/form-data'
        }
        });
        return response.data;
    } catch (error) {
        console.error('Error uploading image:', error);
        throw error;
    }
}