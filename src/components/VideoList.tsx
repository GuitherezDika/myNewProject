import { useEffect, useRef, useState } from "react"
import { ActivityIndicator, Alert, FlatList, Text, TextInput, TouchableOpacity, View } from "react-native";
import axios from "axios";
import { videoType } from "../types";
import { ImageCard } from "./ImageCard";
import { getVideos } from "../api/pixabayVideo";
import { VideoCard } from "./VideoCard";

export const VideoList = () => {
    const controller = new AbortController();
    const videoListRef = useRef([]);

    const [data, setData] = useState<videoType[]>([]);
    const [loading, setLoading] = useState<boolean>(false);

    const onGetVideo = async () => {
        setLoading(true);
        try {
            const response = await getVideos({signal: controller.signal});
            const newData = response.data.hits.map((item: videoType) => {
                return({
                    ...item,
                    liked: false,
                    disliked: false,
                });
            });
            setData(newData);
            return response;
        }
        catch (error) {
            if(axios.isAxiosError(error)){
                console.log('true');
                Alert.alert('Error', `${error.message}`)
            } else {
                console.log('failed to catch an api');
                Alert.alert('Failed to Fetch API', `${error}`);
            }
        }
        finally {
            setLoading(false);
        }
    };

    useEffect(()=> {
        onGetVideo();
        return () => {
            controller.abort();
        };
    }, []);

    if(loading){
        return <ActivityIndicator size={"large"} color={'#0000ff'} />
    }

    const RenderItem = ({data, id}: {data: videoType, id: number}) => {
        return (
            <View>
                <VideoCard 
                itemData={data} 
                ref={el => {
                    videoListRef.current[id] = el
                }}
                // ref={videoListRef}
                isSoundButton={true}
                resizeMode='cover'
            />
            </View>
        )
    }

    return (
        <View>
            <FlatList
                data={data}
                renderItem={({item, index}) => {
                    return (
                        <View key={index}>                                                                                                                                                                           
                            <RenderItem data={item} id={index} />
                        </View>
                    )
                }}
                keyExtractor={(item, index) => index.toString()}
            />
        </View>
    )
}

