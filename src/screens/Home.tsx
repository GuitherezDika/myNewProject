import React, {useCallback, useEffect} from 'react';
import { SafeAreaView } from 'react-native';
import { styles } from '../styles';
import { useFocusEffect } from '@react-navigation/native';
import { ImageList } from '../components/ImageList';

function HomeScreen() {
  useEffect( ()=> {
    // hanya di panggil 1x saat masuk ke screen, dan tidak akan ke hit walaupun sudah bolak balik di klik
    console.log('home screen');
  },[]);

  useFocusEffect(
    // Akan run setiap button home di klik
    useCallback(()=> {
      console.log('callback HOME ^^^^');
    }, [])
  )
    return (
        <SafeAreaView style={styles.container}>
        {/* <TrailerList /> */}
        <ImageList />
      </SafeAreaView>
    );
  }

export default HomeScreen;