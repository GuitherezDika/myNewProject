import React, {useCallback, useEffect} from 'react';
import { SafeAreaView, Text, View } from 'react-native';
import { Counter } from '../components/Counter';
import { styles } from '../styles';
import { useFocusEffect } from '@react-navigation/native';



function SettingsScreen() {
  useEffect(()=> {
    console.log('setting screen');
  },[]);

  useFocusEffect(
    // Akan run setiap button setting di klik
    useCallback(()=> {
      console.log('callback setting +++');
    }, [])
  ) 
    return (
        <SafeAreaView style={styles.container}>
        <Counter />
      </SafeAreaView>
    );
}
export default SettingsScreen;