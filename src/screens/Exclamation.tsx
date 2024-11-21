import React, {forwardRef, useCallback, useImperativeHandle, useRef, useState} from 'react';
import { Button, SafeAreaView, Text } from 'react-native';
import { styles } from '../styles';
import { useFocusEffect } from '@react-navigation/native';
import { useTheme } from '../components/theme/ThemeContext';

const ChildComponent = forwardRef((props, ref) => {
  const [count, setCount] = useState(0);

  useImperativeHandle(ref, () => ({
    increment() {
      setCount(count + 1);
    },
    getCount() {
      return count;
    }
  }))

  return <Text>{count}</Text>
});

const ChildComponent2 = forwardRef((props, ref) => {
  const [count, setCount] = useState(10);

  useImperativeHandle(ref, () => ({
    decrement() {
      setCount(count - 1)
    },
    getCount() {
      return count
    }
  }))

  return <Text>Decrement - {count}</Text>
})


function ExclamationScreen() {
  const {theme} = useTheme();
  const childRef = useRef();
  const childRef2 = useRef();

  const handleClick = () => {
    childRef.current.increment();
  };

  const handleClick2 = () => {
    childRef2.current.decrement();
  }

  useFocusEffect(
    // Akan run setiap button setting di klik
    useCallback(()=> {
      console.log('callback setting +++');
    }, [])
  );

    return (
        <SafeAreaView style={[styles.container, {backgroundColor: theme.background}]}>
          {/* <VideoList /> */}
          <Text style={[styles.smallText, {color: theme.text}]}>
          useImperativeHandle + forwardRef
          </Text>
          <ChildComponent ref={childRef} />
          <Button title='one' onPress={handleClick} />

          <Text>Parent access child component directly </Text>
          <ChildComponent2 ref={childRef2} />
          <Button title='two' onPress={handleClick2} />

        </SafeAreaView>
    );
}
export default ExclamationScreen;
