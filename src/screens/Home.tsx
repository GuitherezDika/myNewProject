import React, { useCallback, useEffect } from 'react';
import { SafeAreaView } from 'react-native';
import { styles } from '../styles';
import { useFocusEffect } from '@react-navigation/native';
import { ImageList } from '../components/ImageList';
import { useTheme } from '../components/theme/ThemeContext';

function HomeScreen() {
  const { theme } = useTheme();

  useEffect(() => {
    // hanya di panggil 1x saat masuk ke screen, dan tidak akan ke hit walaupun sudah bolak balik di klik
    console.log('home screen');
  }, []);

  useFocusEffect(
    // Akan run setiap button home di klik
    useCallback(() => {
      console.log('callback HOME ^^^^', theme);
    }, [])
  )

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.background}]}>
      <ImageList />
    </SafeAreaView>
  );
}

export default HomeScreen;