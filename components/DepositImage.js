import { Image, Platform } from 'react-native'
import React from 'react'

export default function DepositImage({ image }) {
    console.log(image, 'imahe9')
    return (
        <Image
            source={{ uri: Platform.OS === 'web' ? URL.createObjectURL(image) : image }}
            style={{ width: 150, height: 150 }}
        />
    )
}