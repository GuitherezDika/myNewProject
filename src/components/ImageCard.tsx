import { useEffect, useState } from "react"
import { Image, View } from "react-native"
import { styles } from "../styles"

export const ImageCard = ({uri}:{uri: string}) => {

    return (
        <View style={styles.imageContainer}>
            <Image
                style={styles.imageView}
                source={{uri}}
            />
        </View>
    )
}