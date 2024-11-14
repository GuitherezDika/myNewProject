import { useEffect, useState } from "react"
import { ActivityIndicator, Alert, FlatList, Text, TextInput, TouchableOpacity, View } from "react-native";
import { styles } from "../styles";
import { getImage } from "../api/pixabayImg";
import axios from "axios";
import { imageType } from "../types";
import { ImageCard } from "./ImageCard";

export const ImageList = () => {
    const controller = new AbortController();

    const [data, setData] = useState<imageType[]>([]);
    const [loading, setLoading] = useState<boolean>(false);

    const onGetImage = async () => {
        console.log('ON GET IMAGE----');
        
        setLoading(true);
        try {
            const response = await getImage({signal: controller.signal});
            setData(response.data.hits);
            return response;
        }
        catch (error) {
            if(axios.isAxiosError(error)){
                console.log('true');
                Alert.alert('Error', `${error.message}`)
            } else {
                console.log('ggg');
                Alert.alert('Failed to Fetch API', `${error}`)
            }
        }
        finally {
            setLoading(false)
        }
    };

    useEffect(()=> {
        onGetImage()
        return () => {
            controller.abort()
        }
    }, []);

    if(loading){
        return <ActivityIndicator size={"large"} color={'#0000ff'} />
    }

    const RenderItem = ({data}: {data: imageType}) => {
        return (
            <View>
                <ImageCard uri={data.webformatURL}/>
            </View>
        )
    }

    return (
        <View>
            <TouchableOpacity>
                <Text style={styles.text}>Image +</Text>
            </TouchableOpacity>
            <Text style={styles.text}>Elapsed seconds:</Text>
            <FlatList
                data={data}
                renderItem={({item, index}) => {
                    return (
                        <View key={index}>                                                                                                                                                                           
                            <RenderItem data={item} />
                        </View>
                    )
                    
                }}
                // keyExtractor={(item) => item.id}
            />
        </View>
    )
}

