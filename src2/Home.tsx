import { Text, TextInput, TouchableOpacity, View } from "react-native"
import React, { useCallback, useEffect, useState } from "react";
import { useFocusEffect } from "@react-navigation/native";

type dataFruit = {
    el: string,
    index: number,
};

type childType = {
    el: string,
    index: number,
    onPress: ({el, index}: dataFruit) =>  void
}

const useHomeHooks = () => {
    
    const [dataA, setDataA] = useState(['Banana', 'Apple', 'Citrus', 'Durian']);
    const [dataB, setDataB] = useState(['Zucchini', 'Yaca', 'Xaver', 'Vinegar']);
    const [counter, setCounter] = useState(0);

    const handleDataA = ({el, index}: dataFruit ) => {
        dataA.splice(index, 1);
        let dataBv2 = [...dataB, el];
        setDataB(dataBv2);
    }
    
    const handleDataB = ({el, index}: dataFruit) => {
        dataB.splice(index, 1);
        let dataAv2 = [...dataA, el];
        setDataA(dataAv2);
    }

    return {
        dataA,
        dataB,
        setDataA,
        setDataB,
        handleDataA,
        handleDataB,
        counter,
        setCounter
    }
}
const Home = () => {
    const [data, setData] = useState('test');
    const onChange = (x: string) => {
        setData(x);
    };

    const {
        dataA, 
        dataB, 
        handleDataA,
        handleDataB,
        counter,
        setCounter
    } = useHomeHooks();

    const ListDataView = ({el, index, onPress}: childType) => {
        return (
            <TouchableOpacity key={index} onPress={()=> onPress({el, index})}>
                <Text style={{fontSize: 20, marginBottom: 20}}>{el}</Text>
            </TouchableOpacity>
        )
    }

    return (
        <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
            <TextInput
                testID="username"
                onChangeText={text => onChange(text)}
                style={{ backgroundColor: 'gray', marginBottom: 15 }}
                placeholder="Enter the username"
            />
            <Text>=========== LIST A ===========</Text>

            {dataA.map((el, index) => (
                <ListDataView
                    index={index}
                    el={el}
                    onPress={handleDataA}
                />
            ))}

            <Text>=========== LIST B ===========</Text>
            {dataB.map((el, index) => (
                <ListDataView
                index={index}
                el={el}
                onPress={handleDataB}
            />
            ))}
        </View>
    )
}

export default Home;