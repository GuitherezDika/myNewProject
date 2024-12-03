import { Text, TextInput, View } from "react-native"
import React, { useState } from "react";

const Home = () => {
    const [data, setData] = useState('test');
    const onChange = (x: string) => {
        setData(x);
    };

    return (
        <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
            <TextInput
                testID="username"
                onChangeText={text => onChange(text)}
                style={{ backgroundColor: 'gray', marginBottom: 15 }}
                placeholder="Enter the username"
            />
        </View>
    )
}

export default Home;