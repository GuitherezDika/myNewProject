import { ActivityIndicator, Button, Image, Text, TouchableOpacity, View } from "react-native"
import { styles } from "../styles"
import Icon from 'react-native-vector-icons/Ionicons';
import { bufferType, videoType } from "../types";
import { forwardRef, useEffect, useImperativeHandle, useRef, useState } from "react";
import { useTheme } from "./theme/ThemeContext";
import Video, {VideoRef} from 'react-native-video';

export const VideoCard = forwardRef(({ itemData, resizeMode, isSoundButton }: { itemData: videoType, resizeMode: string, isSoundButton: boolean }, ref) => {
    const {theme} = useTheme();
    const videoRef = useRef<VideoRef>(null);
    const background = `${itemData.videos.tiny.url}`;
    const thumbnail = `${itemData.videos.tiny.thumbnail}`;
    const [smallLoader, setSmallLoader] = useState(false);

    const [paused, setPaused] = useState(true);
    const [currentTime, setCurrentTime] = useState(0);
    const [duration, setDuration] = useState(0);
    const [videoVolume, setVideoVolume] = useState(1.0);
    const [numbers, setNumbers] = useState(11);

    const onBuffer = (buffer: bufferType) => {
        if(buffer.isBuffering) {
            setSmallLoader(true);
        } else {
            setSmallLoader(false)
        }
    }

    const [videoData, setVideoData] = useState(itemData);

    useEffect(() => {
        setVideoData(itemData);
    }, [itemData]);

    const onPressLeft = () => {
        setVideoData((prevState) => ({
            ...prevState,
            liked: true,
            disliked: false,
        }));
    };
    const onPressRight = () => {
        setVideoData((prevState) => ({
            ...prevState,
            liked: false,
            disliked: true,
        }));
    };

    const onAdd = () => setNumbers(numbers + 1);
    const onReduce = () => setNumbers(numbers - 1);

    useImperativeHandle( ref, () => ({
        play: () => {if (currentTime !== 0) setPaused(false);},
        pause: () => setPaused(true),
        stop: () => {setPaused(true); videoRef.current?.seek(0); setCurrentTime(0); },
        seek: time => {videoRef.current?.seek(time); setCurrentTime(time)},
        addNumbers: () => setNumbers(numbers + 1),
        reduceNumbers: () => setNumbers(numbers - 1),
    }))

    const togglePlayPause = () => setPaused(!paused);
    const onProgress = data => setCurrentTime(data.currentTime);
    const onEnd = () => {
        setPaused(true);
        setTimeout(()=> {videoRef.current?.seek(0)}, 200);
        setCurrentTime(0);
    }

    const onLoad = data => {
        setSmallLoader(false);
        setDuration(data.duration)
    };

    const onSlide = value => {
        console.log('val = ', value);
        videoRef.current?.seek(value);
        setCurrentTime(value);
    };

    const formatTime = timeInSeconds => {
        if(isNaN(timeInSeconds)) return "00:00";
        const minutes = Math.floor(timeInSeconds / 60);
        const seconds = Math.floor(timeInSeconds % 60);
        return `${minutes < 10 ? '0' : ''}${minutes}:${seconds < 10 ? '0':''}${seconds}`;
    }

    const toggleMute = () => setVideoVolume(videoVolume === 0.0 ? 1.0 : 0.0)

    return (
        <View style={[styles.imageContainer, {borderColor: theme.borderColor}]}>
            <Video 
                ref={videoRef}  
                style={styles.backgroundVideo}
                paused={paused}
                onProgress={onProgress}
                source={{uri: background}}
                onEnd={onEnd}
                onLoad={onLoad}
                onBuffer={onBuffer}  
                volume={videoVolume}
                resizeMode={resizeMode}     
                repeat={false}
                fullscreen={false}
                bufferConfig={{
                    minBufferMs: 15000,
                    maxBufferMs: 30000,
                    bufferForPlaybackMs: 2500,
                    bufferForPlaybackAfterRebufferMs: 5000
                }}
                // onError={onError}
                poster={thumbnail}  
                // controls={true}
            />
            {smallLoader && (
                <ActivityIndicator size={'small'} color={theme.text} />
            )}
            <View style={styles.rowBetween}>
                <TouchableOpacity onPress={onPressLeft} style={styles.iconCard}>
                    <Icon name={videoData.liked ? 'heart' : 'heart-outline'} size={30} color={videoData.liked ? 'green' : 'gray'} />
                </TouchableOpacity>
                <Button title="-" onPress={onReduce} />
                <Text>{numbers}</Text>
                <Button title="++" onPress={onAdd} />
                <TouchableOpacity onPress={onPressRight} style={styles.iconCard}>
                    <Icon name={videoData.disliked ? 'heart-dislike-sharp' : 'heart-dislike-outline'} size={30} color={videoData.disliked ? 'green' : 'gray'} />
                </TouchableOpacity>
            </View>
        </View>
    );
})