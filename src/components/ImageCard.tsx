import { Image, TouchableOpacity, View } from "react-native"
import { styles } from "../styles"
import Icon from 'react-native-vector-icons/Ionicons';
import { imageType } from "../types";
import { useContext, useEffect, useState } from "react";
import { ThemeProvider, useTheme } from "./theme/ThemeContext";

export const ImageCard = ({ itemData }: { itemData: imageType }) => {
    const {theme} = useTheme();
    const [imageData, setImageData] = useState(itemData);

    useEffect(() => {
        setImageData(itemData);
    }, [itemData]);

    const onPressLeft = () => {
        setImageData((prevState) => ({
            ...prevState,
            liked: true,
            disliked: false,
        }));
    };
    const onPressRight = () => {
        setImageData((prevState) => ({
            ...prevState,
            liked: false,
            disliked: true,
        }));
    };

    return (
        <View style={[styles.imageContainer, {borderColor: theme.borderColor}]}>
            <Image
                style={styles.imageView}
                source={{ uri: imageData.webformatURL }}
            />
            <View style={styles.rowBetween}>
                <TouchableOpacity onPress={onPressLeft} style={styles.iconCard}>
                    <Icon name={imageData.liked ? 'heart' : 'heart-outline'} size={30} color={imageData.liked ? 'green' : 'gray'} />
                </TouchableOpacity>
                <TouchableOpacity onPress={onPressRight} style={styles.iconCard}>
                    <Icon name={imageData.disliked ? 'heart-dislike-sharp' : 'heart-dislike-outline'} size={30} color={imageData.disliked ? 'green' : 'gray'} />
                </TouchableOpacity>
            </View>
        </View>
    );
}